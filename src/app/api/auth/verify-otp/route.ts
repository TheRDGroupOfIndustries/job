import { hashPassword } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Otp from "@/models/Otp";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { otp, email } = await req.json();

    const existingOtp = await Otp.findOne({ email });
    if (otp !== existingOtp.otp) {
      return NextResponse.json({ message: "Invalid otp. Try again." });
    }

    const hashedPassword = await hashPassword(existingOtp.password);

    const newUser = await User.create({
      name: existingOtp.name,
      email,
      password: hashedPassword,
      role: existingOtp.role,
      phone: existingOtp.phone,
    });

    await Otp.deleteOne({email})
    return NextResponse.json({
      message: "User registered successfully",
      newUser: {
        ...newUser,
        password: undefined,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
