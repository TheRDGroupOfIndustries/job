"use client";

import React, { useEffect, useState } from "react";
import { ArrowRightIcon, Edit2, Loader2, PlusIcon, Trash2 } from "lucide-react";
import { Interview } from "@/types/Interview";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  deleteInterview,
  fetchInterviews,
} from "@/redux/features/interviewSlice";
import InterviewForm from "./InterviewForm";
import PageLoader from "./PageLoader";

// export const mockInterviews: Interview[] = [
//   {
//     _id: "68ea59df3f95bafea33b5946",
//     candidateName: "Aditya Verma",
//     candidateEmail: "aditya.verma@ex.com",
//     candidatePhone: "+91 9812345678",
//     candidateGender: "Male",
//     candidateExp: 4,
//     candidateSkills: ["React", "Next.js", "TypeScript"],
//     interviewDate: "2025-10-28T00:00:00.000Z",
//     interviewTime: "9:45 AM",
//     joiningLocation: "Delhi Office",
//     createdBy: "68dbd20dfb4601466b89b84b",
//     status: "done",
//     createdAt: "2025-10-11T13:21:36.024Z",
//     updatedAt: "2025-10-11T13:41:56.084Z",
//   },
//   {
//     _id: "68ea59df3f95bafea33b5947",
//     candidateName: "Radha Sharma",
//     candidateEmail: "radha.sharma@ex.com",
//     candidatePhone: "+91 9812345679",
//     candidateGender: "Female",
//     candidateExp: 7,
//     candidateSkills: ["JavaScript", "Node.js", "MongoDB"],
//     interviewDate: "2025-10-29T00:00:00.000Z",
//     interviewTime: "11:00 AM",
//     joiningLocation: "Mumbai Office",
//     createdBy: "68dbd20dfb4601466b89b84c",
//     status: "scheduled",
//     createdAt: "2025-10-12T10:00:00.000Z",
//     updatedAt: "2025-10-12T10:00:00.000Z",
//   },
//   {
//     _id: "68ea59df3f95bafea33b5948",
//     candidateName: "Priya Singh",
//     candidateEmail: "priya.singh@ex.com",
//     candidatePhone: "+91 9812345680",
//     candidateGender: "Female",
//     candidateExp: 2,
//     candidateSkills: ["HTML", "CSS", "Sass"],
//     interviewDate: "2025-10-30T00:00:00.000Z",
//     interviewTime: "2:30 PM",
//     joiningLocation: "Bangalore Office",
//     createdBy: "68dbd20dfb4601466b89b84d",
//     status: "done",
//     createdAt: "2025-10-13T10:00:00.000Z",
//     updatedAt: "2025-10-13T10:00:00.000Z",
//   },
//   {
//     _id: "68ea59df3f95bafea33b5949",
//     candidateName: "Rahul Kumar",
//     candidateEmail: "rahul.kumar@ex.com",
//     candidatePhone: "+91 9812345681",
//     candidateGender: "Male",
//     candidateExp: 5,
//     candidateSkills: ["Java", "Spring Boot", "MySQL"],
//     interviewDate: "2025-10-31T00:00:00.000Z",
//     interviewTime: "10:00 AM",
//     joiningLocation: "Hyderabad Office",
//     createdBy: "68dbd20dfb4601466b89b84e",
//     status: "scheduled",
//     createdAt: "2025-10-14T10:00:00.000Z",
//     updatedAt: "2025-10-14T10:00:00.000Z",
//   },
// ];

interface InterviewCardProps {
  interview: Interview;
}

interface DataRowProps {
  label: string;
  value: string | number;
  postFix?: string;
}

const DataRow: React.FC<DataRowProps> = ({ label, value, postFix }) => {
  return (
    <span className="w-full flex items-start ">
      <p className="font-semibold">{label}:</p>
      <p className="ml-2 break-all ">{value}</p>
      <p className="ml-1">{postFix}</p>
    </span>
  );
};

const InterviewCard: React.FC<InterviewCardProps> = ({ interview }) => {
  const [deleting, setDeleting] = useState<any>(null);
  const dispatch = useDispatch();
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    // Format to "MM/DD/2025"
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  const formatTime = (time24h: string): string => {
    const [hours, minutes] = time24h.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);

    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formattedInterviewTime = interview.interviewTime
    ? formatTime(interview.interviewTime)
    : "N/A";

  const handleDeleteInterview = (id: string) => {
    setDeleting(id);
    dispatch(deleteInterview(id as string) as any)
      .unwrap()
      .then(() => {
        console.log("Interview deleted successfully");
      })
      .catch((error: any) => {
        console.error("Error deleting interview:", error);
      })
      .finally(() => {
        setDeleting(false);
      });
  };

  // console.log("Interview deleted successfully

  return (
    <div className="relative px-4 py-3 bg-white rounded-xl shadow-md transition-all duration-300 hover:shadow-lg border border-gray-100 flex">
      <div className="grid grid-cols-3 gap-5 text-sm flex-1">
        <div className=" ">
          <DataRow label="Name" value={interview.candidateName} />
          <DataRow label="Email" value={interview.candidateEmail} />
          <DataRow label="Phone" value={interview.candidatePhone} />
          <DataRow label="Gender" value={interview.candidateGender} />
        </div>

        <div className=" ">
          <DataRow label="Joining Location" value={interview.joiningLocation} />
          <DataRow label="Position" value={interview.position} />
          <DataRow
            label="Work Exp"
            value={interview.candidateExp}
            postFix="Years"
          />
        </div>

        <div className=" ">
          <div className="w-full flex items-start ">
            <p className="font-semibold">Status:</p>
            <span
              className={`ml-2 capitalize px-2 py-0.5 text-xs font-medium rounded-full ${
                interview.status === "done"
                  ? "bg-green-100 text-green-800"
                  : interview.status === "scheduled"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800"
              }`}
            >
              {interview.status}
            </span>
          </div>
          <DataRow
            label="Interview Date"
            value={formatDate(interview.interviewDate)}
          />
          <DataRow label="Interview Time" value={formattedInterviewTime} />
        </div>
      </div>

      {/* Bottom Section: Date and Arrow */}
      <div className=" flex flex-col items-center justify-between h-full">
        {/* <button className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-500 text-white shadow-md hover:bg-orange-600 transition-colors cursor-pointer">
          <Edit2 className="w-4 h-4" />
        </button> */}
        <InterviewForm editId={interview._id} mode="update" />
        <button
          onClick={() => {
            handleDeleteInterview(interview._id);
          }}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-500 text-white shadow-md hover:bg-orange-600 transition-colors cursor-pointer"
        >
          {deleting === interview._id ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
};

const NewCard: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white border-2 border-dashed border-gray-300 rounded-xl shadow-sm transition-all duration-300 hover:border-orange-500 hover:shadow-lg cursor-pointer h-full min-h-[180px]">
      <div className="w-16 h-16 flex items-center justify-center rounded-full border-4 border-orange-500 text-orange-500 mb-2">
        <PlusIcon className="w-8 h-8" />
      </div>
      <span className="text-orange-500 text-lg font-medium">New</span>
    </div>
  );
};

const InterviewGrid: React.FC = () => {
  // In a real application, you'd fetch this data from an API
  // const interviews = mockInterviews;
  const { interviews, loading, error } = useSelector(
    (state: RootState) => state.interview
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInterviews() as never);
  }, []);

  if (loading) {
    return <PageLoader />;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="container mx-auto pl-20 pr-10 my-10">
      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 gap-4">
        {/* The 'New' Card */}
        {/* <NewCard /> */}

        {/* List of Interview Cards */}
        {interviews.map((interview) => (
          <InterviewCard key={interview._id} interview={interview} />
        ))}
      </div>
    </div>
  );
};

export default InterviewGrid;
