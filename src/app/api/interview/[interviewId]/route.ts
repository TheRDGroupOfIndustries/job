import { NextRequest, NextResponse } from "next/server";
import Interview from "@/models/Interview";
import { connectDB } from "@/lib/mongodb";
import { authenticate } from "@/lib/auth";

// Update interview
export async function PUT(
  req: NextRequest,
  { params }: { params: { interviewId: string } }
) {
  await connectDB();
  const user = await authenticate(req);
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { interviewId } = await params;
  const updateData = await req.json();

  // Find interview
  const interview = await Interview.findById(interviewId);
  if (!interview)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Employee can only update their own interview
  if (user.role === "employee" && interview.createdBy.toString() !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Admin can update any interview
  try {
    const updatedInterview = await Interview.findByIdAndUpdate(
      interviewId,
      updateData,
      { new: true }
    );
    return NextResponse.json({ interview: updatedInterview });
  } catch (err) {
    console.log("Error to update interview:", err);
    return NextResponse.json({ error: "Failed to update" }, { status: 400 });
  }
}

// Delete interview
export async function DELETE(
  req: NextRequest,
  { params }: { params: { interviewId: string } }
) {
  await connectDB();
  const user = await authenticate(req);
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { interviewId } = await params;
  const interview = await Interview.findById(interviewId);
  if (!interview)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Employee can only delete their own interview
  if (user.role === "employee" && interview.createdBy.toString() !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Admin can delete any interview
  try {
    await Interview.findByIdAndDelete(interviewId);
    return NextResponse.json({ message: "Interview deleted", interviewId });
  } catch (err) {
    console.log("Error to delete interview:", err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 400 });
  }
}
