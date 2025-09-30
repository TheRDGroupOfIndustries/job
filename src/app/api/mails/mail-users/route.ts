import { connectDB } from "@/lib/mongodb";
import { User } from "@/models";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const suggetions = await User.find({ $or: [{ role: "admin"}, { role: "employee"}]})
        .select("name email _id role")
      .sort({ role: 1 });

    return NextResponse.json({ suggetions }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}