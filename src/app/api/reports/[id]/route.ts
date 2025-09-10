import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Kanban from "@/models/Kanban";
import User from "@/models/User";
import { getGeminiSummary } from "@/lib/gemini";
import { adminOnly } from "../../middleware/adminOnly";
import { authenticate } from "@/lib/auth";
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const user = authenticate(req as any);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (user.role !== "admin") {
      return NextResponse.json(
        { error: "Only admin allowed" },
        { status: 400 }
      );
    }
    
    const employee = await User.findById(params.id).select("name email role");
    if (!employee) {
      return NextResponse.json(
        { error: "Employee not found" },
        { status: 404 }
      );
    }

    const tasks = await Kanban.find({ assignedTo: params.id })
      .populate("createdBy", "name email role")
      .sort({ createdAt: -1 });

    if (!tasks || tasks.length === 0) {
      return NextResponse.json(
        { message: "No tasks assigned to this employee" },
        { status: 404 }
      );
    }

    const summary = await getGeminiSummary(tasks);

    return NextResponse.json(
      {
        employee,
        tasks,
        summary,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error generating report:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
