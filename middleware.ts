import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export function middleware(request: NextRequest) {
  // Check if the request is for admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Skip middleware for login page
    if (request.nextUrl.pathname === "/admin") {
      return NextResponse.next();
    }

    // Check for token in cookies or headers
    const token =
      request.cookies.get("adminToken")?.value ||
      request.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, "bdcff81d27bb513a6eb30d7093cfad5474691826702ed1466500e5a4446171a664769ea3546f14f07c0623748059d75446e359beddf4ef022523677596fd2c58") as JWTPayload;

      // Check if user has admin role
      if (decoded.role !== "admin") {
        return NextResponse.redirect(new URL("/admin", request.url));
      }

      // Token is valid, continue
      return NextResponse.next();
    } catch (err) {
      // Token is invalid
      console.error("JWT verification failed:", err);
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
