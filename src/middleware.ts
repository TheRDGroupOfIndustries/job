// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

async function getRoleFromToken(token?: string): Promise<string | null> {
  if (!token) return null;
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    return payload.role as string;
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const res = NextResponse.next();

  const allowedOrigin = "*";

  res.headers.set("Access-Control-Allow-Origin", allowedOrigin);
  res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    return new NextResponse(null, { status: 204, headers: res.headers });
  }

  // -----------------------
  // 🔒 Authentication & Role-based routes
  // -----------------------
  const token = req.cookies.get("job-auth-token")?.value;
  const role = await getRoleFromToken(token);

  if (!token && !pathname.startsWith("/auth") && !pathname.startsWith("/api")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (pathname.startsWith("/employee") && role !== "employee") {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (pathname.startsWith("/auth") && token) {
    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin", req.url));
    } else if (role === "employee") {
      return NextResponse.redirect(new URL("/employee", req.url));
    } else if (role === "user") {
      return NextResponse.redirect(new URL("/", req.url));
    } else {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  // ✅ Allow everything else
  return res;
}

export const config = {
  matcher: [
    "/api/:path*",   // 👈 apply CORS to all API routes
    "/admin/:path*",
    "/employee/:path*",
    "/auth/:path*",
  ],
};
