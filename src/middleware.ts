import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ["/login", "/signup", "/"];
  const isPublicRoute =
    publicRoutes.includes(pathname) || pathname.startsWith("/api");

  // Protected routes
  const isProtectedRoute =
    pathname.startsWith("/t/") || pathname.startsWith("/super-admin");

  // If accessing protected route without token, redirect to login
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If accessing login/signup with token, try to redirect to user's tenant
  // (We'll redirect to a default since we don't have user context in middleware)
  if ((pathname === "/login" || pathname === "/signup") && token) {
    // Extract tenant from pathname if available, otherwise use default
    const tenantMatch = pathname.match(/\/t\/([^/]+)/);
    if (tenantMatch) {
      return NextResponse.next();
    }
    // For now, just allow access - the page will handle redirect
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
