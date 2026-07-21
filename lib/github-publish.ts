/**
 * Publishes a new client data file to GitHub and updates the client registry.
 * Vercel picks up the push and redeploys automatically (~30s).
 *
 * Required env vars: GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO
 */

const BASE = 'https://api.github.com'
const BRANCH = process.env.GITHUB_BRANCH ?? 'main'

function headers() {
  return {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json',
  }
}

async function getFile(path: string): Promise<{ sha: string; content: string } | null> {
  const owner = process.env.GITHUB_OWNER
  const repo  = process.env.GITHUB_REPO
  const res = await fetch(`${BASE}/repos/${owner}/${repo}/contents/${path}?ref=${BRANCH}`, { headers: headers() })
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`GitHub GET ${path}: ${res.status}`)
  const json = await res.json()
  return {
    sha:     json.sha,
    content: Buffer.from(json.content, 'base64').toString('utf-8'),
  }
}

async function putFile(path: string, content: string, message: string, sha?: string) {
  const owner = process.env.GITHUB_OWNER
  const repo  = process.env.GITHUB_REPO
  const body: Record<string, string> = {
    message,
    content: Buffer.from(content).toString('base64'),
    branch:  BRANCH,
  }
  if (sha) body.sha = sha

  const res = await fetch(`${BASE}/repos/${owner}/${repo}/contents/${path}`, {
    method:  'PUT',
    headers: headers(),
    body:    JSON.stringify(body),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`GitHub PUT ${path}: ${res.status} — ${text.slice(0, 200)}`)
  }
  return res.json()
}

function addClientToRegistry(current: string, slug: string): string {
  const camel      = toCamel(slug)
  const importLine = `import { data as ${camel} } from '@/clients/${slug}/data'`
  const entry      = `  ${camel},`

  let updated = current

  // Add import after the last existing @/clients import line
  const lastImportIdx = updated.lastIndexOf("from '@/clients/")
  if (lastImportIdx !== -1) {
    const lineEnd = updated.indexOf('\n', lastImportIdx)
    updated = updated.slice(0, lineEnd + 1) + importLine + '\n' + updated.slice(lineEnd + 1)
  } else {
    updated = importLine + '\n' + updated
  }

  // Add to allClients array — anchor to `= [` to skip past the type annotation `ClientData[]`
  const arrayDeclIdx = updated.indexOf('export const allClients')
  if (arrayDeclIdx !== -1) {
    const arrayOpenIdx = updated.indexOf('= [', arrayDeclIdx)
    if (arrayOpenIdx !== -1) {
      // Find `\n]` — the closing bracket on its own line
      const closingIdx = updated.indexOf('\n]', arrayOpenIdx)
      if (closingIdx !== -1) {
        updated = updated.slice(0, closingIdx + 1) + entry + '\n' + updated.slice(closingIdx + 1)
      }
    }
  }

  return updated
}

function toCamel(slug: string): string {
  return slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
}

export interface PublishResult {
  success: boolean
  commitUrl?: string
  error?: string
  alreadyExisted: boolean
}

export async function publishProposalHtml(
  slug: string,
  html: string,
  businessName: string,
): Promise<PublishResult> {
  if (!process.env.GITHUB_TOKEN || !process.env.GITHUB_OWNER || !process.env.GITHUB_REPO) {
    return { success: false, error: 'GitHub env vars not set', alreadyExisted: false }
  }
  try {
    const path     = `public/proposals/${slug}.html`
    const existing = await getFile(path)
    await putFile(path, html, `proposal: ${businessName} (${slug})`, existing?.sha)
    return { success: true, alreadyExisted: existing !== null }
  } catch (err) {
    return { success: false, error: (err as Error).message, alreadyExisted: false }
  }
}

export async function publishConceptHtml(
  slug: string,
  html: string,
  businessName: string,
): Promise<PublishResult> {
  if (!process.env.GITHUB_TOKEN || !process.env.GITHUB_OWNER || !process.env.GITHUB_REPO) {
    return { success: false, error: 'GitHub env vars not set', alreadyExisted: false }
  }
  try {
    const path     = `public/concepts/${slug}.html`
    const existing = await getFile(path)
    await putFile(path, html, `concept: ${businessName} (${slug})`, existing?.sha)
    return { success: true, alreadyExisted: existing !== null }
  } catch (err) {
    return { success: false, error: (err as Error).message, alreadyExisted: false }
  }
}

export async function publishClient(
  slug: string,
  dataFileContent: string,
  businessName: string,
): Promise<PublishResult> {
  if (!process.env.GITHUB_TOKEN || !process.env.GITHUB_OWNER || !process.env.GITHUB_REPO) {
    return { success: false, error: 'GITHUB_TOKEN, GITHUB_OWNER, or GITHUB_REPO not set in env', alreadyExisted: false }
  }

  try {
    const dataPath      = `clients/${slug}/data.ts`
    const registryPath  = 'lib/clients.ts'
    const attributionPath = 'data/attribution-log.json'

    // Check if client already exists
    const [existing, registry, attribution] = await Promise.all([
      getFile(dataPath),
      getFile(registryPath),
      getFile(attributionPath),
    ])

    const alreadyExisted = existing !== null

    // 1. Write the data file
    await putFile(
      dataPath,
      dataFileContent,
      `audit: add ${businessName} report (${slug})`,
      existing?.sha,
    )

    // 2. Update the client registry (only if this is a new client)
    if (!alreadyExisted && registry) {
      const updatedRegistry = addClientToRegistry(registry.content, slug)
      await putFile(
        registryPath,
        updatedRegistry,
        `audit: register ${slug} in client registry`,
        registry.sha,
      )
    }

    // 3. Append to attribution log
    if (attribution) {
      const log = JSON.parse(attribution.content) as Array<Record<string, string>>
      const today = new Date().toISOString().split('T')[0]
      const exists = log.some((e) => e.slug === slug && e.dateGenerated === today)
      if (!exists) {
        log.push({ slug, businessName, dateGenerated: today })
        await putFile(
          attributionPath,
          JSON.stringify(log, null, 2) + '\n',
          `audit: log ${slug} in attribution record`,
          attribution.sha,
        )
      }
    }

    const owner = process.env.GITHUB_OWNER
    const repo  = process.env.GITHUB_REPO
    const commitUrl = `https://github.com/${owner}/${repo}/commits/${BRANCH}`

    return { success: true, commitUrl, alreadyExisted }
  } catch (err) {
    return { success: false, error: (err as Error).message, alreadyExisted: false }
  }
}
