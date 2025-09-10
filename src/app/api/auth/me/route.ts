// app/api/auth/me/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  const token = req.headers.get("cookie")?.split("job-auth-token=")[1];

console.log("token", token)
  if (!token) {
    return NextResponse.json({ user: null });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.json({ user: decoded });
  } catch (error) {
    console.error("Error verifying token:", error);
    const res = NextResponse.json({ user: null });
    res.cookies.delete("job-auth-token");
    return res;
  }
}
