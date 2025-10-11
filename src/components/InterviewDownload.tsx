"use client";

import { setSelectediInterviews } from "@/redux/features/interviewSlice";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

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

export default function InterviewDownload() {
  const { interviews, selectedInterviews } = useSelector(
    (state: RootState) => state.interview
  );
  const dispatch = useDispatch();

  const handleToggleSelectAll = () => {
    if (interviews.length === selectedInterviews.length) {
      dispatch(setSelectediInterviews([]) as never);
    } else {
      dispatch(
        setSelectediInterviews(
          interviews.map((interview) => interview._id) as never
        )
      );
    }
  };

  const handleDownloadInterviews = () => {
    const selected = interviews
      .filter((i) => selectedInterviews.includes(i._id as never))
      .map((i) => ({
        "Name": i.candidateName,
        "Email": i.candidateEmail,
        "Phone": i.candidatePhone,
        "Gender": i.candidateGender,
        "Position": i.position,
        "Joining Location": i.joiningLocation,
        "Interview Date": new Date(i.interviewDate).toLocaleDateString(),
        "Interview Time": formatTime(i.interviewTime),
        "Status": i.status,
      }));
    console.log("Selected Interviews: ", selected);

    // Convert to worksheet
    const worksheet = XLSX.utils.json_to_sheet(selected);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Interviews");

    // Export file
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "selected_interviews.xlsx");
    dispatch(setSelectediInterviews([]) as never);
  };

  return (
    <div className="flex items-center gap-5 ">
      <button
        type="button"
        onClick={handleToggleSelectAll}
        className="px-4 py-2 gap-2 flex items-center justify-center rounded-lg bg-orange-500 text-white shadow-md hover:bg-orange-600 transition-colors cursor-pointer "
      >
        {interviews.length === selectedInterviews.length
          ? "Unselect All"
          : "Select All"}{" "}
      </button>
      <button
        type="button"
        onClick={handleDownloadInterviews}
        className="px-4 py-2 gap-2 flex items-center justify-center rounded-lg bg-orange-500 text-white shadow-md hover:bg-orange-600 transition-colors cursor-pointer "
      >
        Download ({selectedInterviews.length})
      </button>
    </div>
  );
}
