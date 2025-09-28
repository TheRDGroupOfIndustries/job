import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./User";
import { IJob } from "./Job";

export interface IApplication extends Document {
  appliedBy: mongoose.Types.ObjectId | IUser;
  jobId: mongoose.Types.ObjectId | IJob;
  jobDesignation: string;
  userEmail: string;
  resume: string;
  status: "rejected" | "accepted" | "pending";
  // New fields
  skills: string[];
  image?: string; // Optional field
  ratings: number;
  location: string;
}

const ApplicationSchema = new Schema<IApplication>(
  {
    appliedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
    jobDesignation: { type: String, required: true },
    userEmail: { type: String, required: true },
    resume: { type: String, required: true },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
      required: true,
    },

    skills: { type: [String], required: true }, 
    image: { type: String }, 
    ratings: { type: Number, min: 0, max: 5, required: true },
    location: { type: String, required: true },
  },
  { timestamps: true }
);

delete mongoose.models.Application;

export const Application = mongoose.model<IApplication>(
  "Application",
  ApplicationSchema
);