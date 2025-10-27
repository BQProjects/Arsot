import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export async function middleware(request: NextRequest) {
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
      // Verify token using jose
      const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!));
      const decoded = payload as unknown as JWTPayload;

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
  matcher: [],
};
