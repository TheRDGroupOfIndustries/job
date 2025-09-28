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

    // --- START: REQUIRED CHANGES FOR NEW SCHEMA FIELDS ---
    const skillsString = formData.get("skills") as string;
    const image = formData.get("image") as string | null;
    const ratingsString = formData.get("ratings") as string;
    const location = formData.get("location") as string;

    // Basic validation for new required fields
    if (!skillsString || !ratingsString || !location) {
        return NextResponse.json(
            { error: "Skills, ratings, and location are required." },
            { status: 400 }
        );
    }
    

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

    const cloudForm = new FormData();
    cloudForm.append(
      "file",
      new Blob([buffer], { type: resumeFile.type }), 
      resumeFile.name
    );
    cloudForm.append("upload_preset", "unsigned_raw"); 
    cloudForm.append("folder", "resumes");

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

    const application = await Application.create({
      appliedBy: new mongoose.Types.ObjectId(appliedBy),
      jobId: new mongoose.Types.ObjectId(id),
      jobDesignation,
      userEmail: user.email,
      resume: uploadResult.secure_url,
      status: "pending",

      skills: skillsString.split(',').map(s => s.trim()), 
      image: image ? image : undefined, 
      ratings: parseFloat(ratingsString),
      location,
      
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