import { authenticate } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Mail } from "@/models/Mail";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        await connectDB();
        const user = authenticate(req as any);

        const { mailIds }: { mailIds: string[] } = await req.json();
        // console.log(mailIds);

        if (!user || (user.role !== "admin" && user.role !== "employee")) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        // Perform bulk delete operation
        const result = await Mail.deleteMany({ _id: { $in: mailIds }, createdBy: user.id });
        return NextResponse.json({ message: "Mails deleted", deletedCount: result.deletedCount }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}