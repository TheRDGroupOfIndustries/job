import { IUser } from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export interface DecodedUser {
  id: string;
  email: string;
  role: string;
}

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = (user: IUser) => {
  if (!process.env.JWT_SECRET) {
    return "No secret token provided";
  }
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "10m",
    }
  );
};

export function authenticate(req: NextRequest): DecodedUser | null {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return null;

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedUser;
    return decoded; 
  } catch {
    return null;
  }
}
