import { authenticate } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Job } from "@/models/Job";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const user = authenticate(req as any);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (user.role !== "admin") {
      return NextResponse.json(
        { error: "Only admin allowed" },
        { status: 400 }
      );
    }

    const jobs = await Job.find({ createdBy: user.id }).sort({ createdAt: -1 });

    return NextResponse.json({
      message: `Jobs created by ${user.email.split("@")[0]}`,
      jobs,
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
