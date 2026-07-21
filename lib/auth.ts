import { SignJWT, jwtVerify } from 'jose'

const SECRET = new TextEncoder().encode(process.env.AUTH_SECRET ?? 'dev-secret-change-in-production')
const COOKIE = 'trabelo_session'
const TTL = 60 * 60 * 24 * 7 // 7 days

function getUsers(): Record<string, string> {
  const raw = process.env.ADMIN_USERS ?? ''
  return Object.fromEntries(
    raw.split(',')
      .map(s => s.trim().split(':'))
      .filter(p => p.length === 2)
      .map(([u, p]) => [u.toLowerCase(), p])
  )
}

export function validateCredentials(username: string, password: string): boolean {
  const users = getUsers()
  return users[username.toLowerCase()] === password
}

export async function createSessionToken(username: string): Promise<string> {
  return new SignJWT({ username })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(SECRET)
}

export async function verifySessionToken(token: string): Promise<{ username: string } | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET)
    return { username: payload.username as string }
  } catch {
    return null
  }
}

export { COOKIE, TTL }
