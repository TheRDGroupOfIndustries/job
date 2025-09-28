// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface IUser {
  id: string;
  email: string;
  role: string;
  name: string;
}

function getRoleFromToken(token?: string): string | null {
  if (!token) return null;
  try {
    const payload = jwt.decode(token) as { role?: string };
    return payload?.role || null;
  } catch {
    return null;
  }
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // -----------------------
  // ✅ Add CORS headers
  // -----------------------
  const res = NextResponse.next();
  const allowedOrigin = "http://localhost:5173"; // 🔑 change to "*" if you want to allow all

  res.headers.set("Access-Control-Allow-Origin", allowedOrigin);
  res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight request quickly
  if (req.method === "OPTIONS") {
    return new NextResponse(null, { status: 204, headers: res.headers });
  }

  // -----------------------
  // 🔒 Authentication logic
  // -----------------------
  const token = req.cookies.get("job-auth-token")?.value;
  const role = getRoleFromToken(token);

  if (!token && !pathname.startsWith("/auth"))
    return NextResponse.redirect(new URL("/auth/login", req.url));

  // 🔒 Protect /admin → only admin
  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // 🔒 Protect /employee → only employee
  if (pathname.startsWith("/employee") && role !== "employee") {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // 🔒 If authenticated user visits /auth routes → redirect them
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

  // ✅ Continue with response (with CORS headers included)
  return res;
}

export const config = {
  matcher: [
    "/api/:path*", // 👈 added so CORS applies to all API routes
    "/admin/:path*",
    "/employee/:path*",
    "/auth/:path*",
  ],
};
