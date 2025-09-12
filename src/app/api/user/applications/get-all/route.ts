import { authenticate } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { User, Job, Application } from "@/models";  
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const user = authenticate(req as any);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let applications;

    if (user.role === "admin") {
      applications = await Application.find()
        .populate("appliedBy", "name email")
        .populate("jobId", "designation jobDescription")
        .sort({ createdAt: -1 });
    } else if (user.role === "employee") {
      applications = await Application.find({ appliedBy: user.id })
        .populate("jobId", "designation jobDescription")
        .sort({ createdAt: -1 });
    } else {
      return NextResponse.json(
        { error: "You are not allowed to view applications" },
        { status: 403 }
      );
    } 

    return NextResponse.json(
      { message: "Applications fetched successfully", applications },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
