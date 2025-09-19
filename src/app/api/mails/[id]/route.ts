import { authenticate } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Mail } from "@/models/Mail";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const user = authenticate(req as any);

    if (!user || (user.role !== "admin" && user.role !== "employee")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const mailId = params.id;
    if (!mongoose.Types.ObjectId.isValid(mailId)) {
      return NextResponse.json({ error: "Invalid mail ID" }, { status: 400 });
    }

    const { subject, message } = await req.json();

    const updated = await Mail.findOneAndUpdate(
      { _id: mailId, createdBy: user.id },
      { subject, message },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Mail not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Mail updated", mail: updated }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const user = authenticate(req as any);

    if (!user || (user.role !== "admin" && user.role !== "employee")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const mailId = params.id;
    if (!mongoose.Types.ObjectId.isValid(mailId)) {
      return NextResponse.json({ error: "Invalid mail ID" }, { status: 400 });
    }

    const deleted = await Mail.findOneAndDelete({ _id: mailId, createdBy: user.id });

    if (!deleted) {
      return NextResponse.json({ error: "Mail not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Mail deleted" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
