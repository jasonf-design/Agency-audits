import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url')
  if (!url) return NextResponse.json({ ready: false })
  try {
    const res = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(5000) })
    return NextResponse.json({ ready: res.ok })
  } catch {
    return NextResponse.json({ ready: false })
  }
}
