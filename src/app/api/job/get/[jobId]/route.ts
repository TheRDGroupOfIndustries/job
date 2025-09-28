import { authenticate } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Job } from "@/models/Job";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,
  { params }: { params: { jobId: string }) {
  try {
    await connectDB();
    const 

    const jobs = await Job.findById(jobId);

    return NextResponse.json({
      jobs,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
