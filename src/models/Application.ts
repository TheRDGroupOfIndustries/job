import mongoose, { Schema } from "mongoose";

export interface IApplication extends Document {
  appliedBy: mongoose.Types.ObjectId;
  jobId: mongoose.Types.ObjectId;
  jobDesignation: string;
  userEmail: string;
  resume: string;
  createdAt: Date;
  updatedAt: Date;
}

const ApplicationSchema = new mongoose.Schema<IApplication>(
  {
    appliedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    jobDesignation: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    resume: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Application =mongoose.models.Application || mongoose.model<IApplication>(
  "Application",
  ApplicationSchema
);
