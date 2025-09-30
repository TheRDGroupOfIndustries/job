// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

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
  // ✅ Global CORS for all APIs
  // -----------------------
  const allowedOrigin = process.env.ALLOWED_ORIGIN ?? "*"; // 👈 change to "*" or prod domain
  const res = NextResponse.next();

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
  const role = getRoleFromToken(token);
  console.log("Role: ", role)
  console.log("Token: ", token)


  // if there is no token means no logged in, we can allow "/" and "/auth" only
  if (!token) {
    if (pathname.startsWith("/admin") || pathname.startsWith("/employee")) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    if (pathname === '/' || pathname.startsWith("/auth")) {
      return res;
    }
  }

  // have token means user logged in
  // if other try to go "/admin" except "admin" redirect to "/auth/login" | only admin route
  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // if other try to go "/employee" except "employee" redirect to "/auth/login" | only employee route
  if (pathname.startsWith("/employee") && role !== "employee") {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // if other try to go "/" except "user" redirect to "/auth/login" | only user route
  if (pathname === "/" && role !== "user") {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // "/auth" redirect users to right place
  if ((pathname.startsWith("/auth")) && token) {
    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin", req.url));
    } else if (role === "employee") {
      return NextResponse.redirect(new URL("/employee", req.url));
    } else {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // ✅ Allow everything else
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/public).*)"],

};
