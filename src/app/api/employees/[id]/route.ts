import { authenticate } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const {id } = await params
  await connectDB();
  const user = authenticate(req as any);

  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const body = await req.json();
  const updated = await User.findByIdAndUpdate(id, body.details, { new: true }).select("-password");

  return NextResponse.json({ message: "Employee updated", employee: updated }, { status: 200 });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const user = authenticate(req as any);

  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

   const res = await User.findByIdAndDelete(params.id);

  return NextResponse.json({ message: "Employee deleted", user: res }, { status: 200 });
}
