import { NextRequest, NextResponse } from "next/server";
import Interview from "@/models/Interview";
import { connectDB } from "@/lib/mongodb";
import { authenticate } from "@/lib/auth";

// GET: Fetch interviews
export async function GET(req: NextRequest) {
  await connectDB();
  const user = await authenticate(req);

  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let interviews;
  if (user.role === "admin") {
    interviews = await Interview.find().populate("createdBy").sort({
      createdAt: -1,
    });
  } else if (user.role === "employee") {
    interviews = await Interview.find({ createdBy: user.id }).sort({
      createdAt: -1,
    });
  } else {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json({ interviews });
}

// POST: Create interview (employee only)
export async function POST(req: NextRequest) {
  await connectDB();
  const user = await authenticate(req);

  if (!user || user.role !== "employee")
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const {
    candidateName,
    candidateEmail,
    candidatePhone,
    candidateGender,
    candidateExp,
    position,
    interviewDate,
    interviewTime,
    joiningLocation,
  } = await req.json();

  if (
    !candidateName ||
    !candidateEmail ||
    !candidatePhone ||
    !candidateGender ||
    !candidateExp ||
    !position ||
    !interviewDate ||
    !interviewTime ||
    !joiningLocation
  ) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    const interview = await Interview.create({
      candidateName,
      candidateEmail,
      candidatePhone,
      candidateGender,
      candidateExp,
      position,
      interviewDate,
      interviewTime,
      joiningLocation,
      createdBy: user.id,
    });
    return NextResponse.json({ interview }, { status: 201 });
  } catch (err) {
    console.log("Error to create Inretview:", err);
    return NextResponse.json(
      { error: "Failed to create interview" },
      { status: 400 }
    );
  }
}
