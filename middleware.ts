import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const adminAuth = req.cookies.get("admin-auth");

  // Allow login page always
  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  // Protect all admin routes
  if (pathname.startsWith("/admin")) {
    if (!adminAuth) {
      return NextResponse.redirect(
        new URL("/admin/login", req.url)
      );
    }
  }

  // allow both paths
if (pathname === "/admin/login" || pathname === "/admin-login") {
  return NextResponse.next();
}


  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
