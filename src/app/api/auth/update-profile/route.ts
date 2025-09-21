import { authenticate } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    await connectDB();
    const user = authenticate(req as any);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    // if (!phone) {
    //   return NextResponse.json({ error: "Phone is required" }, { status: 400 });
    // }

    const updated = await User.findByIdAndUpdate(
      user.id,
      body,
      { new: true }
    ).select("-password");

    return NextResponse.json(
      { message: "Profile updated successfully", user: updated },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
