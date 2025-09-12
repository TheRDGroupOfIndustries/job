import { adminOnly } from "@/app/api/middleware/adminOnly";
import { authenticate } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/mongodb";
import { Application } from "@/models/Application";
import mongoose from "mongoose";
import { NextResponse, NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const id = params.id;
    const user = authenticate(req as any);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
    }

    console.log(user.role);
    
    if (user.role !== "user") {
      return NextResponse.json(
        { error: "Only users can apply" },
        { status: 403 }
      );
    }

    const formData = await req.formData();
    const appliedBy = formData.get("appliedBy") as string;
    const jobDesignation = formData.get("jobDesignation") as string;
    const userEmail = user.email;
    const resumeFile = formData.get("resume") as File;

    if (!resumeFile) {
      return NextResponse.json(
        { error: "Resume file required" },
        { status: 400 }
      );
    }

    const existingApplication = await Application.findOne({
      appliedBy: new mongoose.Types.ObjectId(appliedBy),
      jobId: new mongoose.Types.ObjectId(id),
    });

    if (existingApplication) {
      return NextResponse.json(
        { error: "You have already applied for this job." },
        { status: 409 } 
      );
    }

    const arrayBuffer = await resumeFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "raw",
            public_id: `resumes/${uuidv4()}`,
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    const application = await Application.create({
      appliedBy: new mongoose.Types.ObjectId(appliedBy),
      jobId: new mongoose.Types.ObjectId(id),
      jobDesignation,
      userEmail,
      resume: uploadResult.secure_url,
      status: "pending"
    });

    return NextResponse.json(
      { message: "Application submitted successfully", application },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
