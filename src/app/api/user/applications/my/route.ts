import { authenticate } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Application } from "@/models";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const user = authenticate(req as any);

        if (!user || user.role !== "user") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const userApplications = await Application.find({ appliedBy: user.id }).populate("job appliedBy").sort({ createdAt: -1 });

        return NextResponse.json({ message: "Success", applications: userApplications }, { status: 200 });
    } catch (error) {
        console.error("Error fetching user applications:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}