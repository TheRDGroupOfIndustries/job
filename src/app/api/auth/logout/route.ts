// src/app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true, message: "Logged out" });

  // Clear the token cookie
  res.cookies.delete("job-auth-token");

  return res;
}
