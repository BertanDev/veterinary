import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value

  const signInURL = new URL('/', request.url)
  const dashboardURL = new URL(`${request.nextUrl.origin}/dashboard`)

  if (!token) {
    if (request.nextUrl.pathname === '/') {
      // Se já estamos na rota de painel, não há necessidade de redirecionar novamente
      return NextResponse.next()
    }
    return NextResponse.redirect(signInURL)
  }

  if (token && request.nextUrl.pathname === '/') {
    return NextResponse.redirect(dashboardURL)
  }
}

export const config = {
  matcher: ['/', '/dashboard/:path*'],
}
