import { authenticate } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { Application } from "@/models/Application";
import { Job } from "@/models/Job";
import { Mail } from "@/models/Mail";
import { Sheet } from "@/models/Sheet";
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

    const employees = await User.countDocuments({ role: "employee" });
    const applications = await Application.countDocuments();
    const jobs = await Job.countDocuments();
    const mails = await Mail.countDocuments();
    const sheets = await Sheet.countDocuments();

    return NextResponse.json(
      { employees, applications, jobs, mails, sheets },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
