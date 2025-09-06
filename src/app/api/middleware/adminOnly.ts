import { DecodedUser } from "@/lib/auth";
import { IUser } from "@/models/User";
import { NextResponse } from "next/server";

export async function adminOnly(user: DecodedUser) {
    if (user.role !== "admin") {
      return NextResponse.json({ error: "Only admin allowed" }, { status: 400 });
    }
}