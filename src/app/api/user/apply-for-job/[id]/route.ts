import { adminOnly } from "@/app/api/middleware/adminOnly";
import { authenticate } from "@/lib/auth";
import { NextResponse, NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params;
    const user = authenticate(req as any);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
    }
    adminOnly(user);

    // const { appliedBy, jobDesignation, userEmail } = await req.json();
    
  } catch (error) {}
}
