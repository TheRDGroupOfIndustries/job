import { connectDB } from "@/lib/mongodb";
import { Sheet } from "@/models/Sheet";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  console.log(body);
  
  const newSheet = await Sheet.create({
    title: body.title || "Untitled Sheet",
    data: body.data || [], // Luckysheet JSON
    createdBy: body.createdBy,
  });

  return NextResponse.json(newSheet);
}

export async function GET() {
  await connectDB();
  const sheets = await Sheet.find().sort({ updatedAt: -1 });
  return NextResponse.json(sheets);
}
