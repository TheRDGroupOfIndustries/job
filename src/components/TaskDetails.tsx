import { X, Calendar, User, Info, FileText } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

// Helper function to format the date
const formatDate = (dateString: string) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Interface for the task structure (optional but good practice)
interface UserDetails {
  name: string;
  email: string;
  profileImage?: string;
}

interface Task {
  _id: string;
  title: string;
  details: string;
  status: string;
  deadline: string;
  assignedTo: UserDetails;
  createdBy: UserDetails;
  createdAt: string;
}

export default function TaskDetails({
  taskId,
  close,
}: {
  taskId: string;
  close: () => void;
}) {
  const { tasks } = useSelector((state: RootState) => state.task);
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    // Find the task by ID from the Redux store
    if (taskId) {
      const foundTask = tasks.find((t: any) => t._id === taskId);
      setTask(foundTask || (null as any)); // Ensure task is null if not found
    }
  }, [taskId, tasks]); // Added 'tasks' as a dependency

  if (!task) {
    // Basic loading state or handle case where task isn't found
    return (
      <div className="fixed inset-0 bg-secondary/50 z-50 flex items-center justify-center backdrop-blur-[6px]">
        <div className="w-[90vw] md:w-[80vw] lg:w-[60vw] h-[20vh] bg-card rounded-4xl px-8 py-4 flex flex-col justify-center items-center">
          <p>Loading task details...</p>
          <Button onClick={close} className="mt-4">
            Close
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-secondary/50 z-50 flex items-center justify-center backdrop-blur-[6px]">
      {/* Modal Container */}
      <div className="w-[90vw] md:w-[80vw] lg:w-[60vw] h-[80vh] bg-card rounded-4xl px-8 py-4 flex flex-col gap-6 shadow-2xl">
        {/* Header Section */}
        <div className="flex justify-between items-start pt-2 border-b pb-4">
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold text-gray-800 capitalize">
              {task.title}
            </h2>
            {/* Status Badge */}
            <span
              className={`mt-2 px-3 py-1 text-sm font-medium rounded-full text-white w-fit
                ${task.status === "Completed" ? "bg-green-500" : ""}
                ${task.status === "In Progress" ? "bg-orange-500" : ""}
                ${task.status === "Pending" ? "bg-red-500" : ""}
             `}
            >
              {task.status}
            </span>
          </div>

          <Button
            variant="ghost" // Use ghost variant for a cleaner look
            size="icon"
            className="text-gray-500 hover:text-red-500 rounded-full cursor-pointer transition-colors"
            onClick={close}
          >
            <X size={24} />
          </Button>
        </div>

        {/* Details Section (Scrollable) */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-6">
          {/* Core Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-xl">
            {/* Assigned To */}
            <div className="flex items-center gap-3">
              <User className="text-orange-500 min-w-4" size={20} />
              <div>
                <p className="text-sm font-medium text-gray-500">Assigned To</p>
                <p className="font-semibold text-gray-700">
                  {task.assignedTo.name}
                </p>
              </div>
            </div>

            {/* Created By */}
            <div className="flex items-center gap-3">
              <User className="text-orange-500 min-w-4" size={20} />
              <div>
                <p className="text-sm font-medium text-gray-500">Created By</p>
                <p className="font-semibold text-gray-700">
                  {task.createdBy.name}
                </p>
              </div>
            </div>

            {/* Deadline */}
            <div className="flex items-center gap-3">
              <Calendar className="text-orange-500 min-w-4" size={20} />
              <div>
                <p className="text-sm font-medium text-gray-500">Deadline</p>
                <p className="font-semibold text-gray-700">
                  {formatDate(task.deadline)}
                </p>
              </div>
            </div>

            {/* Created On */}
            <div className="flex items-center gap-3">
              <Info className="text-orange-500 min-w-4" size={20} />
              <div>
                <p className="text-sm font-medium text-gray-500">Created On</p>
                <p className="font-semibold text-gray-700">
                  {formatDate(task.createdAt)}
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Description */}
          <div className="space-y-3">
            <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-800 border-b pb-2">
              <FileText size={20} className="text-orange-500" />
              Description
            </h3>
            {/* Use pre-wrap to respect newlines from the JSON data */}
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed bg-gray-50 p-4 rounded-xl">
              {task.details}
            </p>
          </div>

          {/* Add more sections here like Comments, Attachments, History if you had that data */}
        </div>
      </div>
    </div>
  );
}
