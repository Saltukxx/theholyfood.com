import { NextResponse } from 'next/server';
 
export function middleware(request) {
  // Check if this is an admin page
  if (request.nextUrl.pathname.startsWith('/admin') && 
      !request.nextUrl.pathname.includes('/admin/login')) {
    
    // Get the token from cookies
    const token = request.cookies.get('adminToken')?.value;
    
    // If no token is present, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
}
 
export const config = {
  matcher: '/admin/:path*',
}