import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";
import { hashPassword } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import Otp from "@/models/Otp";
import { sendOTP } from "@/lib/emailServices";

function generateOTP() {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { name, email, password, role, phone } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "All fields should be filled." },
        { status: 400 }
      );
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exist" },
        { status: 400 }
      );
    }

    const OTP = generateOTP();
    console.log(OTP);

    const reg = "register";
    await sendOTP(email, OTP, "Register");

    const OptUser = await Otp.findOne({ email });
    if (OptUser) {
      await Otp.findOneAndUpdate({ email }, { otp: OTP });
    } else {
      await Otp.create({
        name,
        email,
        password,
        role,
        phone,
        otp: OTP, 
      });
    }

    return NextResponse.json({ success: true, message: "Otp send to the email" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}
