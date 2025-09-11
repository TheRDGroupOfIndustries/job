import { authenticate } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Job } from "@/models/Job";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { jobId: string } }
) {
  try {
    await connectDB();
    const user = authenticate(req as any);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
    }

    const { jobId } = params;

    const job = await Job.findById(jobId);
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    if (job.createdBy.toString() !== user.id) {
      return NextResponse.json(
        { error: "You are not allowed to delete this job" },
        { status: 403 }
      );
    }

    await Job.findByIdAndDelete(jobId);

    return NextResponse.json(
      { message: "Deleted successfully", job},
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
 