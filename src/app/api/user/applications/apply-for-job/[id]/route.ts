import { authenticate } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Application } from "@/models/Application";
import mongoose from "mongoose";
import { NextResponse, NextRequest } from "next/server";

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

    if (user.role !== "user") {
      return NextResponse.json(
        { error: "Only users can apply" },
        { status: 403 }
      );
    }

    const formData = await req.formData();
    const appliedBy = formData.get("appliedBy") as string;
    const jobDesignation = formData.get("jobDesignation") as string;
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

    // 🔹 Convert File to Buffer
    const arrayBuffer = await resumeFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 🔹 Prepare formData for Cloudinary unsigned upload
    const cloudForm = new FormData();
    cloudForm.append(
      "file",
      new Blob([buffer], { type: resumeFile.type }), // <-- correct MIME
      resumeFile.name
    );
    cloudForm.append("upload_preset", "unsigned_raw"); // your preset
    cloudForm.append("folder", "resumes");

    // 🔹 Upload to Cloudinary (unsigned)
    const cloudRes = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/raw/upload`,
      {
        method: "POST",
        body: cloudForm,
      }
    );

    const uploadResult = await cloudRes.json();

    console.log("Cloudinary upload result:", uploadResult);

    if (!uploadResult.secure_url) {
      return NextResponse.json(
        { error: "Cloudinary upload failed", details: uploadResult },
        { status: 500 }
      );
    }

    // 🔹 Save application in DB
    const application = await Application.create({
      appliedBy: new mongoose.Types.ObjectId(appliedBy),
      jobId: new mongoose.Types.ObjectId(id),
      jobDesignation,
      userEmail: user.email,
      resume: uploadResult.secure_url,
      status: "pending",
    });

    console.log("Application saved in DB:", application);

    return NextResponse.json(
      { message: "Application submitted successfully", application },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
