import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Kanban from "@/models/Kanban";
import { authenticate } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await context.params;

    const task = await Kanban.findById(id).populate(
      "assignedTo createdBy",
      "name email role"
    );

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(task, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const user = authenticate(req as any);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (user.role !== "admin" && user.role !== "employee") {
      return NextResponse.json(
        { error: "Only admin or employee allowed" },
        { status: 403 }
      );
    }

    const { id } = await context.params;
    const body = await req.json();
    // console.log("Body", body);

    const updatedTask = await Kanban.findByIdAndUpdate(id, body, {
      new: true,
    }).populate("assignedTo createdBy");

    if (!updatedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    

    return NextResponse.json(
      { message: "Task updated", task: updatedTask },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const user = authenticate(req as any);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    // if (user.role !== "admin") {
    //   return NextResponse.json(
    //     { error: "Only admin allowed" },
    //     { status: 403 }
    //   );
    // }

    const { id } = await context.params;
    const deletedTask = await Kanban.findByIdAndDelete(id);

    if (!deletedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Task deleted", task: deletedTask },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
