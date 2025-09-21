import mongoose, { Document, Model, Schema } from "mongoose";

export type UserRole = "user" | "admin" | "employee";

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: UserRole;
  profileImage?: string;
  employeeId?: string;
  otherDetails?: string;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: false },
    role: {
      type: String,
      enum: ["user", "admin", "employee"],
      default: "user", 
    },
    employeeId: { type: String, required: false },
    otherDetails: { type: String, required: false },
    profileImage: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

delete mongoose.models.User;

export const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
