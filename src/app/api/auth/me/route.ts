// app/api/auth/me/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { DecodedUser } from "@/lib/auth";
import { User } from "@/models";

export async function GET(req: Request) {
  const token = req.headers.get("cookie")?.split("job-auth-token=")[1];

  console.log("token", token);
  if (!token) {
    return NextResponse.json({
      success: false,
      message: "Unauthorized",
      user: null,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedUser;
    const details = await User.findById(decoded?.id).select("-password");

    console.log("Authorized user details:", details)

    return NextResponse.json({
      success: true,
      message: "Authorized",
      user: details,
    });

  } catch (error) {
    // console.error("Error verifying token:", error);
    console.log("Unauthorized user :", error)

    const res = NextResponse.json({
      success: false,
      message: "Unauthorized",
      user: null,
    });
    // res.cookies.delete("job-auth-token");
    return res;
  }
}
