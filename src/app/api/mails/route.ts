import { authenticate } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Mail } from "@/models/Mail";
import { sendEmail } from "@/lib/emailServices";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const user = authenticate(req as any);

    if (!user) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { to, subject, body } = await req.json();

    if (!to || !subject || !body) {
      return NextResponse.json(
        { error: "All fields required" },
        { status: 400 }
      );
    }

    // const receiver = await User.findOne({email: to});

    // if (!receiver) {
    //   return NextResponse.json(
    //     { error: "Receiver not found" },
    //     { status: 404 }
    //   );
    // }
    // console.log("receiver ", receiver)

    await sendEmail({ to, subject, text: body, html: `<p>${body}</p>` });

    const mail = await Mail.create({
      createdBy: user.id,
      to,
      subject,
      message: body,
    });

    const createdMail = await Mail.findById(mail._id).populate(
      "createdBy",
      "name email"
    );


    return NextResponse.json(
      { message: "Mail sent successfully", mail:createdMail },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const user = authenticate(req as any);

    if (!user || (user.role !== "admin" && user.role !== "employee")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const mails = await Mail.find({ createdBy: user.id })
      .populate("createdBy", "name email role") 
      .sort({ createdAt: -1 });

    return NextResponse.json({ mails }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
