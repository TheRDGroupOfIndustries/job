import mongoose, { Document, Schema } from "mongoose";

export interface IMail extends Document {
  subject: string;
  message: string;
  createdBy: mongoose.Types.ObjectId;
  to: string;
}

const MailSchema = new Schema<IMail>(
  {
    subject: { type: String, required: true },
    message: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    to: { type: String, required: true },
  },
  { timestamps: true }
);

export const Mail =
  mongoose.models.Mail || mongoose.model<IMail>("Mail", MailSchema);
