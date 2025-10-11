export interface Interview {
  _id: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  candidateGender: string;
  candidateExp: number;
  position: string;
  interviewDate: string; // ISO string
  interviewTime: string;
  joiningLocation: string;
  createdBy: string; // Interviewer ID
  status: "scheduled" | "done";
  createdAt: string;
  updatedAt: string;
}
