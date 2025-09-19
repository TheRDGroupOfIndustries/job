import { authenticate } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectDB();
  const user = authenticate(req as any);

  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const employees = await User.find({ role: "employee" }).select("-password");
  return NextResponse.json({ employees }, { status: 200 });
}

export async function POST(req: NextRequest) {
  await connectDB();
  const user = authenticate(req as any);

  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { name, email, phone } = await req.json();
  const newEmployee = await User.create({ name, email, phone, role: "employee" });

  return NextResponse.json({ message: "Employee created", employee: newEmployee }, { status: 201 });
}
