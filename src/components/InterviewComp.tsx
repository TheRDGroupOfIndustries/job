"use client";

import React, { useEffect, useState } from "react";
import { ArrowRightIcon, Edit2, Loader2, PlusIcon, Trash2 } from "lucide-react";
import { Interview } from "@/types/Interview";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  deleteInterview,
  fetchInterviews,
  toggleInterviewSelection,
} from "@/redux/features/interviewSlice";
import InterviewForm from "./InterviewForm";
import PageLoader from "./PageLoader";
import { Checkbox } from "./ui/checkbox";

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
  const { selectedInterviews } = useSelector(
    (state: RootState) => state.interview
  );

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
      <div className="h-full flex items-center justify-center w-10">
        <Checkbox
          checked={selectedInterviews.includes(interview._id as never)}
          onCheckedChange={() =>
            dispatch(toggleInterviewSelection(interview._id))
          }
          // Style checkbox to match a more modern, rounded look if possible (requires custom styling or shadcn component properties)
          className="mt-1 rounded-md border-gray-300 cursor-pointer"
        />
      </div>

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
        {interviews.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No Interview found.
          </div>
        ) : (
          interviews.map((interview) => (
            <InterviewCard key={interview._id} interview={interview} />
          ))
        )}
      </div>
    </div>
  );
};

export default InterviewGrid;
