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
  // Allow the requesting origin (or * if no origin header)
  response.headers.set("Access-Control-Allow-Origin", origin || "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
  // Only set credentials if we're allowing a specific origin (not *)
  if (origin) {
    response.headers.set("Access-Control-Allow-Credentials", "true");
  }
  
  return response;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const origin = req.headers.get("origin");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    const response = new NextResponse(null, { status: 204 });
    return addCorsHeaders(response, origin);
  }

  // For API routes, just add CORS headers and continue
  if (pathname.startsWith("/api")) {
    const response = NextResponse.next();
    return addCorsHeaders(response, origin);
  }

  // -----------------------
  // 🔒 Authentication & Role-based routes
  // -----------------------
  const token = req.cookies.get("job-auth-token")?.value;
  const role = await getRoleFromToken(token);

  if (!token && !pathname.startsWith("/auth")) {
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
