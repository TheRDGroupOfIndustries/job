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
    const user = authenticate(req as any);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    if (user.role === "employee" && user.id.toString() !== id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const tasks = await Kanban.find({ assignedTo: id }).populate("createdBy").populate("assignedTo")
      .sort({ createdAt: -1 });

    if (!tasks || tasks.length === 0) {
      return NextResponse.json(
        { message: "No tasks assigned to this employee" },
        { status: 404 }
      );
    }

    return NextResponse.json(tasks, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
