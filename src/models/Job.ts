import mongoose, { Schema, Document } from "mongoose";

export interface IJob extends Document {
  designation: string;
  employmentType: "flul-time" | "part-time" | "contract" | "internship";
  keySkills: string[];
  skills: string[];
  department: string;
  roleCategory: string;
  workMode: "in-office" | "remote" | "hybrid";
  location: string[];
  willingToRelocate?: boolean;
  workExperience: {
    min: number;
    max: number;
  };
  annualSalary: {
    min: number;
    max: number;
    hideFromCandidates?: boolean;
  };
  companyIndustry: string;
  educationQualification: string;
  candidateIndustry: string;
  diversityHiring?: {
    women?: boolean;
    womenReturning?: boolean;
    exDefence?: boolean;
    differentlyAbled?: boolean;
  };
  companyDetails: {
    name: string;
    established: number;
    sector: string;
    locatedAt: string;
  };
  jobDescription: string;
  vacancy: number;
}

const JobSchema: Schema<IJob> = new Schema(
  {
    designation: { type: String, required: true },

    employmentType: {
      type: String,
      enum: ["full-time", "part-time", "contract", "internship"],
      required: true,
    },

    keySkills: { type: [String], required: true },
    skills: { type: [String], required: true },

    department: { type: String, required: true },
    roleCategory: { type: String, required: true },

    workMode: {
      type: String,
      enum: ["in-office", "remote", "hybrid"],
      required: true,
    },

    location: { type: [String], required: true, maxlength: 3 },
    willingToRelocate: { type: Boolean, default: false },

    workExperience: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
    },

    annualSalary: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
      currency: { type: String, default: "INR" },
      hideFromCandidates: { type: Boolean, default: false },
    },

    companyIndustry: { type: String, required: true },
    educationQualification: { type: String, required: true },
    candidateIndustry: { type: String, required: true },

    diversityHiring: {
      women: { type: Boolean, default: false },
      womenReturning: { type: Boolean, default: false },
      exDefence: { type: Boolean, default: false },
      differentlyAbled: { type: Boolean, default: false },
    },

    companyDetails: {
      name: { type: String, required: true },
      established: { type: Number, required: true },
      sector: { type: String, required: true },
      locatedAt: { type: String, required: true },
    },

    jobDescription: { type: String, required: true },
    vacancy: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Job = mongoose.model<IJob>("Job", JobSchema);
