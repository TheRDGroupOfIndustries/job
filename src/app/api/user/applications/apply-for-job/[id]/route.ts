import { authenticate } from "@/lib/auth";
import { uploadFileToCloudinary } from "@/lib/cloudinary";
import { connectDB } from "@/lib/mongodb";
import { Job, User } from "@/models";
import { Application } from "@/models/Application";
import mongoose from "mongoose";
import { NextResponse, NextRequest } from "next/server";

// // Helper function to upload a file to Cloudinary
// async function uploadFileToCloudinary(file: File, folder: string) {
//   const arrayBuffer = await file.arrayBuffer();
//   const buffer = Buffer.from(arrayBuffer);

//   const cloudForm = new FormData();
//   cloudForm.append(
//     "file",
//     new Blob([buffer], { type: file.type }),
//     file.name
//   );
//   cloudForm.append("upload_preset", "unsigned_raw");
//   cloudForm.append("folder", folder);

//   const cloudRes = await fetch(
//     `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/upload`, // Changed to /upload for general files/images
//     {
//       method: "POST",
//       body: cloudForm,
//     }
//   );

//   const uploadResult = await cloudRes.json();
//   return uploadResult;
// }

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const jobId = params.id; // job id corresponds to 'job' in schema
    const user = authenticate(req as any);

    // if (!user) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    // if (user.role !== "user") {
    //   return NextResponse.json(
    //     { error: "Only users can apply" },
    //     { status: 403 }
    //   );
    // }

    const formData = await req.formData();
    // Fields from the client form (JobApplicationForm.tsx)
    const appliedBy = formData.get("appliedBy") as string;
    const userLocation = formData.get("userLocation") as string;
    const skillsString = formData.get("skills") as string;
    const yearOfExperienceString = formData.get("yearOfExperience") as string; // NEW/RENAMED
    const ratingString = formData.get("rating") as string; // RENAMED
    const userProfileImageFile = formData.get("userProfileImage") as File | null; // RENAMED & File
    const resumeFile = formData.get("resume") as File;

    // --- Validation and Conversion ---

    const requiredFields = {
      appliedBy,
      userLocation,
      skills: skillsString,
      yearOfExperience: yearOfExperienceString,
      rating: ratingString,
    };

    for (const [key, value] of Object.entries(requiredFields)) {
      if (!value) {
        return NextResponse.json(
          { error: `${key} is required.` },
          { status: 400 }
        );
      }
    }

    if (!resumeFile) {
      return NextResponse.json(
        { error: "Resume file is required" },
        { status: 400 }
      );
    }

    const yearOfExperience = parseFloat(yearOfExperienceString);
    const rating = parseFloat(ratingString);
    const skillsArray = skillsString.split(',').map(s => s.trim()).filter(Boolean);

    if (isNaN(yearOfExperience) || yearOfExperience < 0) {
      return NextResponse.json({ error: "Invalid Year of Experience value." }, { status: 400 });
    }
    if (isNaN(rating) || rating < 0 || rating > 5) {
      return NextResponse.json({ error: "Invalid rating value. Must be between 0 and 5." }, { status: 400 });
    }
    if (skillsArray.length === 0) {
      return NextResponse.json({ error: "Skills field cannot be empty." }, { status: 400 });
    }

    // Check if the user has already applied
    const existingApplication = await Application.findOne({
      appliedBy: new mongoose.Types.ObjectId(appliedBy),
      job: new mongoose.Types.ObjectId(jobId), // Use 'job' as per schema
    });

    if (existingApplication) {
      return NextResponse.json(
        { error: "You have already applied for this job." },
        { status: 409 }
      );
    }

    // --- File Uploads to Cloudinary ---

    // 1. Upload Resume
    const resumeUploadResult = await uploadFileToCloudinary(resumeFile, "job/resumes");

    if (!resumeUploadResult.secure_url) {
      console.error("Cloudinary resume upload failed:", resumeUploadResult);
      return NextResponse.json(
        { error: "Resume upload failed. Try again.", details: resumeUploadResult },
        { status: 500 }
      );
    }

    let userProfileImageUrl = undefined;

    // 2. Upload Profile Image (if provided)
    if (userProfileImageFile) {
      const imageUploadResult = await uploadFileToCloudinary(userProfileImageFile, "job/profile_images");

      if (imageUploadResult.secure_url) {
        userProfileImageUrl = imageUploadResult.secure_url;
      } else {
        // Log error but continue since the image is optional in the schema
        console.error("Cloudinary profile image upload failed:", imageUploadResult);
      }
    }


    // --- Create Application Document ---

    const application = await Application.create({
      appliedBy: appliedBy,
      job: jobId, // Corresponds to job ID from params
      userLocation, // RENAMED
      userProfileImage: userProfileImageUrl, // RENAMED (Optional URL)
      skills: skillsArray, // Correctly formatted as array
      resume: resumeUploadResult.secure_url,
      yearOfExperience, // NEW FIELD
      rating, // RENAMED
    });
    console.log("Application saved in DB:", application);

    const appUser = await User.findById(appliedBy).select("name email profileImage");
    const appJob = await Job.findById(jobId).select("designation jobDescription workMode companyDetails employmentType");

    if (!appUser || !appJob) {
      return NextResponse.json(
        { error: "Application created but not found for details." },
        { status: 500 }
      );
    }

    application.appliedBy = appUser;
    application.job = appJob;


    return NextResponse.json(
      { message: "Application submitted successfully", application },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}