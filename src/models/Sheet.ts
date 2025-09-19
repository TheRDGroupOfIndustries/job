import mongoose, { Document, Schema } from "mongoose";

export interface ISheet extends Document {
  _id: string;
  title: string;
  data: Record<string, any>;
  createdBy: mongoose.Types.ObjectId;
}

const SheetSchema = new Schema<ISheet>(
  {
    title: { type: String, required: true },
    data: { type: Object, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Sheet =
  mongoose.models.Sheet || mongoose.model<ISheet>("Sheet", SheetSchema);
