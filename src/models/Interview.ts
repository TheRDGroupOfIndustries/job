import { model, models, Schema, Document, Types } from "mongoose";

export interface IInterview extends Document {
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  candidateGender: string;
  candidateExp: number;
  position: string;
  interviewDate: Date;
  interviewTime: string;
  joiningLocation: string;
  createdBy: Types.ObjectId;
  status: "scheduled" | "done";
}

const InterviewSchema: Schema<IInterview> = new Schema(
  {
    candidateName: { type: String, required: true },
    candidateEmail: { type: String, required: true },
    candidatePhone: { type: String, required: true },
    candidateGender: { type: String, required: true },

    position: { type: String, required: true },
    candidateExp: { type: Number, required: true },

    interviewDate: { type: Date, required: true },
    interviewTime: { type: String, required: true },
    joiningLocation: { type: String, required: true },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["scheduled", "done"],
      default: "scheduled",
    },
  },
  { timestamps: true }
);

const Interview =
  models.Interview || model<IInterview>("Interview", InterviewSchema);
export default Interview;
