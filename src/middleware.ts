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

  // -----------------------
  // ✅ Global CORS for all APIs
  // -----------------------

  // -----------------------
  // 🔐 Authentication & Role-based route protection
  // -----------------------
  const token = req.cookies.get("job-auth-token")?.value;
  const role = await getRoleFromToken(token);

  // If not logged in
  if (!token) {
    if (pathname.startsWith("/admin") || pathname.startsWith("/employee")) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    return res;
  }

  // Role-based protection
  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (pathname.startsWith("/employee") && role !== "employee") {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (pathname === "/" && role !== "user") {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Prevent logged-in users from accessing auth pages
  if (pathname.startsWith("/auth") && token) {
    if (role === "admin") return NextResponse.redirect(new URL("/admin", req.url));
    if (role === "employee") return NextResponse.redirect(new URL("/employee", req.url));
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
