import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Kanban from "@/models/Kanban";
import User from "@/models/User";
import { authenticate } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const user = authenticate(req as any);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (user.role !== "admin") {
      return NextResponse.json({ error: "Only admin allowed" }, { status: 403 });
    }

    const body = await req.json();
    const { title, details, assignedTo } = body;

    if (!title || !details || !assignedTo) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const employee = await User.findById(assignedTo);
    if (!employee) {
      return NextResponse.json({ error: "Assigned employee not found" }, { status: 404 });
    }

    const newTask = await Kanban.create({
      ...body,
      createdBy: user.id, 
    });

    return NextResponse.json(
      { message: "Task created successfully", task: newTask },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      { message: "Error creating task", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const tasks = await Kanban.find()
      .populate("assignedTo createdBy", "name email role")
      .sort({ createdAt: -1 });

    return NextResponse.json(tasks, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
