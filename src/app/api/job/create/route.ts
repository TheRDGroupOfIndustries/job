import { NextRequest, NextResponse } from "next/server";
import { IJob, Job } from "@/models/Job";
import { connectDB } from "@/lib/mongodb";
import { authenticate } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const user = authenticate(req as any);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (user.role !== "admin") {
      return NextResponse.json({ error: "Only admin allowed" }, { status: 400 });
    }

    const body: IJob = await req.json();

    if (
      !body.designation ||
      !body.employmentType ||
      !body.department ||
      !body.roleCategory ||
      !body.workExperience ||
      !body.candidateIndustry ||
      !body.educationQualification ||
      !body.jobDescription ||
      !body.companyIndustry
    ) {
      return NextResponse.json(
        { error: "All fields required" },
        { status: 400 }
      );
    }

    const newJob = await Job.create(body);

    return NextResponse.json(
      { message: "Job created successfully", job: newJob },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { message: "Error creating job", error: error.message },
      { status: 500 }
    );
  }
}
