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

// Helper function to add CORS headers to any response
function addCorsHeaders(response: NextResponse, origin: string | null): NextResponse {
  response.headers.set("Access-Control-Allow-Origin", origin || "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
  if (origin) {
    response.headers.set("Access-Control-Allow-Credentials", "true");
  }
  
  return response;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const origin = req.headers.get("origin");

  // ========================================
  // 🌍 HANDLE API ROUTES FIRST (CORS)
  // ========================================
  if (pathname.startsWith("/api")) {
    // Handle preflight requests
    if (req.method === "OPTIONS") {
      const response = new NextResponse(null, { status: 200 });
      return addCorsHeaders(response, origin);
    }

    // For all other API requests, add CORS and continue
    const response = NextResponse.next();
    return addCorsHeaders(response, origin);
  }

  // ========================================
  // 🔒 HANDLE PAGE ROUTES (Authentication)
  // ========================================
  const token = req.cookies.get("job-auth-token")?.value;
  const role = await getRoleFromToken(token);

  // Redirect to login if no token (except for /auth pages)
  if (!token && !pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Protect admin routes
  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Protect employee routes
  if (pathname.startsWith("/employee") && role !== "employee") {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Redirect authenticated users away from auth pages
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

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/:path*",
    "/admin/:path*",
    "/employee/:path*",
    "/auth/:path*",
  ],
};
