// src/app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true, message: "Logged out" });

  // Clear the token cookie
  res.cookies.set("job-auth-token", "", {
    httpOnly: true,
    expires: new Date(0), // set expired date
    path: "/", 
  });

  return res;
}
