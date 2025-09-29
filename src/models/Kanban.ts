import mongoose, { Schema, Document, Types } from "mongoose";

export interface IKanban extends Document {
  title: string;
  details: string;
  status: "Pending" | "In Progress" | "Completed";
  deadline: Date;
  assignedTo: Types.ObjectId;
  createdBy: Types.ObjectId;
}

const KanbanSchema: Schema<IKanban> = new Schema(
  {
    title: { type: String, required: true },
    details: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
    deadline: { type: Date },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User", required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Kanban ||
  mongoose.model<IKanban>("Kanban", KanbanSchema);
