import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

const roleRoutes = {
  admin: '/login/admin',
  billstaff: '/login/billingstaff',
  doctor: '/login/doctor',
  receptionist: '/login/receptionist',
  patient: '/login/patient'
}

export function proxy(req: NextRequest) {

  const { pathname } = req.nextUrl
  const token = req.cookies.get('auth_token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { role: string }
    
    const requiredRole = Object.entries(roleRoutes)
      .find(([role, route]) => pathname.startsWith(route))?.[0]

    if (requiredRole && decoded.role !== requiredRole) {
      return NextResponse.redirect(new URL('/?error=forbidden', req.url))
    }

    return NextResponse.next()

  } catch (err) {

    const res = NextResponse.redirect(new URL('/?error=invalid_token', req.url))
    res.cookies.delete('auth_token')
    return res
  }
}

export const config = {
  matcher: [
    '/login/admin/:path*',
    '/login/billingstaff/:path*',
    '/login/doctor/:path*',
    '/login/receptionist/:path*',
    '/login/patient/:path*',
  ]
}