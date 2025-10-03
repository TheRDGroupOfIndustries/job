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
  } catch (err) {
    return null; 
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // -----------------------
  // Global CORS for all APIs
  // -----------------------
  const allowedOrigin = process.env.ALLOWED_ORIGIN ?? "*"; 
  const res = NextResponse.next();

  res.headers.set("Access-Control-Allow-Origin", allowedOrigin);
  res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    return new NextResponse(null, { status: 204, headers: res.headers });
  }

  // -----------------------
  // Authentication & Role-based routes
  // -----------------------
  const token = req.cookies.get("job-auth-token")?.value;
  const role = await getRoleFromToken(token);


  // If there is no token, meaning no user is logged in
  if (!token) {
    // Redirect to login if trying to access admin or employee routes
    if (pathname.startsWith("/admin") || pathname.startsWith("/employee")) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    // Allow access to the home page and auth pages
    return res;
  }

  // If a token exists (user is logged in)

  // If trying to access "/admin" and the role is not "admin", redirect to login
  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // If trying to access "/employee" and the role is not "employee", redirect to login
  if (pathname.startsWith("/employee") && role !== "employee") {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // If trying to access "/" and the role is not "user", redirect to login
  // This condition seems problematic if you want non-user roles to also access the home page.
  // Consider if this is the desired behavior. For now, keeping it as is based on original logic.
  if (pathname === "/" && role !== "user") {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // If logged in user tries to access "/auth" pages, redirect them to their respective dashboards
  if (pathname.startsWith("/auth") && token) {
    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin", req.url));
    } else if (role === "employee") {
      return NextResponse.redirect(new URL("/employee", req.url));
    } else {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Allow everything else
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/public).*)"],

};
