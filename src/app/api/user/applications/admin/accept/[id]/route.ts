import { authenticate } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Application } from "@/models/Application";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const user = authenticate(req as any);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (user.role !== "admin" && user.role !== "employee") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const applicationId = params.id;
    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
      return NextResponse.json({ error: "Invalid application ID" }, { status: 400 });
    }

    const application = await Application.findById(applicationId);
    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    application.status = "accepted";
    await application.save();

    return NextResponse.json({ message: "Application accepted", application }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
