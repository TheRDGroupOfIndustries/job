import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { Job, IJob } from "@/models/Job";
import { connectDB } from "@/lib/mongodb";
import { authenticate } from "@/lib/auth";

export async function PUT(
  req: NextRequest,
  { params }: { params: { jobId: string } }
) {
  try {
    await connectDB();

    const user = authenticate(req as any);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (user.role !== "admin") {
      return NextResponse.json({ error: "Only admin allowed" }, { status: 403 });
    }

    const { jobId } = params;
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
    }

    const body: Partial<IJob> = await req.json();

    const immutableFields: (keyof IJob)[] = [
      "createdBy",
      "designation",
      "employmentType",
    ];

    immutableFields.forEach((field) => {
      if (field in body) {
        delete body[field];
      }
    });

    const updatedJob = await Job.findByIdAndUpdate(jobId, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedJob) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Job updated successfully", job: updatedJob },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating job:", error);
    return NextResponse.json(
      { message: "Error updating job", error: error.message },
      { status: 500 }
    );
  }
}
