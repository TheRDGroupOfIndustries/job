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
  const token = req.cookies.get("job-auth-token")?.value;
  const role = getRoleFromToken(token);

  if (!token && !pathname.startsWith("/auth"))
    return NextResponse.redirect(new URL("/auth/login", req.url));

  // Protect only specific API routes
  if (pathname.startsWith("/api/job/create")) {
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const role = getRoleFromToken(token);
    if (role !== "admin") {
      return NextResponse.json(
        { error: "Only admin allowed" },
        { status: 400 }
      );
    }
  }

  // 🔒 Protect /admin → only admin
  if (pathname.startsWith("/admin")) {
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  // 🔒 Protect /employee → only employee
  if (pathname.startsWith("/employee")) {
    if (role !== "employee") {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  if (pathname.startsWith("/auth") && token) {
    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin", req.url));
    } else if (role === "employee") {
      return NextResponse.redirect(new URL("/employee", req.url));
    } else {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // ✅ Everything else → public
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/employee/:path*",
    "/auth/:path*",
    "/api/job/create",
  ],
};
