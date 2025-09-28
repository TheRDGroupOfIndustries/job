import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./User";
import { IJob } from "./Job";

export interface IApplication extends Document {
  appliedBy: mongoose.Types.ObjectId | IUser;
  job: mongoose.Types.ObjectId | IJob;
  resume: string;
  status: "rejected" | "accepted" | "pending";
  skills: string[];
  yearOfExperience: number;
  userProfileImage?: string; 
  rating: number;
  userLocation: string;
}

const ApplicationSchema = new Schema<IApplication>(
  {
    appliedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    job: { type: Schema.Types.ObjectId, ref: "Job", required: true },
    userLocation: { type: String, required: true },
    userProfileImage: { type: String },
    skills: { type: [String], required: true },
    resume: { type: String, required: true },
    yearOfExperience: { type: Number, required: true },
    rating: { type: Number, min: 0, max: 5, required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
      required: true,
    },
  },
  { timestamps: true }
);

delete mongoose.models.Application;

export const Application = mongoose.model<IApplication>(
  "Application",
  ApplicationSchema
);