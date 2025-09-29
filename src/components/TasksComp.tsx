"use client";

import { IKanban } from "@/models/Kanban";
import {
  deleteTask,
  getEmployeeTasks,
  getTasks,
  updateTaskStatus,
} from "@/redux/features/taskSlice";
import { RootState } from "@/redux/store";
import {
  DeleteIcon,
  EditIcon,
  PencilLine,
  Trash,
  MessageSquare,
  Paperclip,
  MoreVertical,
  Flag,
  Eye,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskForm from "./TaskForm";
import toast from "react-hot-toast";
import TaskDetails from "./TaskDetails";

// Helper function to get status-specific colors
const getStatusColors = (status: string) => {
  switch (status) {
    case "Completed":
      return {
        dot: "bg-green-500",
        tag: "bg-green-100 text-green-700",
        text: "text-green-600",
      };
    case "In Progress":
      return {
        dot: "bg-blue-500",
        tag: "bg-blue-100 text-blue-700",
        text: "text-blue-600",
      };
    case "Pending":
    default:
      return {
        dot: "bg-purple-500",
        tag: "bg-purple-100 text-purple-700",
        text: "text-purple-600",
      };
  }
};

const MarkAsDoneCheckbox = ({ status, id }: { status: string; id: string }) => {
  const [isDone, setIsDone] = useState(status === "Completed");
  const dispatch = useDispatch();

  const handleToggle = () => {
    // Optimistically update the UI
    const newStatus = isDone ? "Pending" : "Completed";
    setIsDone(!isDone);

    // Dispatch the actual update to the backend
    dispatch(
      updateTaskStatus({
        newData: { status: newStatus },
        id,
      }) as any
    )
      .unwrap()
      .then(() => {
        toast.success(`Task marked as ${newStatus}`);
        // No need to reset state on success as it's already updated optimistically
      })
      .catch(() => {
        toast.error(`Failed to mark task as ${newStatus}`);
        // Revert state on failure
        setIsDone(isDone);
      });
  };

  // Only show the checkbox if the task is not yet completed
  if (status === "Completed") {
    return (
      <div className="flex items-center space-x-1 rounded-full text-green-600">
        <svg
          className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.323 4.983-1.66-1.66a.75.75 0 1 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.625Z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-sm font-medium">Completed</span>
      </div>
    );
  }

  return (
    <button
      onClick={handleToggle}
      className={`
        flex items-center space-x-1 rounded-full cursor-pointer 
        transition-colors duration-300 ease-in-out p-1 px-3 border border-gray-300
        ${isDone ? "bg-green-500 text-white" : "hover:bg-gray-100 text-gray-700"}
      `}
    >
      <svg
        className={`w-4 h-4 transition-opacity duration-300 ${
          isDone ? "text-white" : "text-gray-400"
        }`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
      <span className="text-sm font-medium">Mark as Done</span>
    </button>
  );
};

// New component for the Assignee Avatar Stack
const AssigneeAvatars = ({
  assignedTo,
  createdBy,
}: {
  assignedTo: any;
  createdBy: any;
}) => {
  // Only show the assignedTo avatar for now, as in the image
  const avatarUrl = assignedTo?.profileImage || "/images/profile-placeholder.webp";

  return (
    <div className="flex -space-x-2 overflow-hidden">
      {/* Assigned To Avatar */}
      <img
        className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
        src={avatarUrl}
        alt={assignedTo?.name || "Assignee"}
      />
      {/* You can add createdBy or other assignees here if needed */}
    </div>
  );
};

const formatDate = (dateString: Date) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// A placeholder for the priority tag since it's not in the data
const PriorityTag = ({ priority = "Medium" }: { priority?: string }) => {
  const colorClass =
    priority === "High"
      ? "bg-red-100 text-red-700"
      : priority === "Low"
        ? "bg-blue-100 text-blue-700"
        : "bg-yellow-100 text-yellow-700";
  return (
    <span
      className={`text-xs font-semibold px-3 py-1 rounded-full ${colorClass}`}
    >
      {priority}
    </span>
  );
};

// -------------------------------------------------------------
// MODIFIED AdminTasksCard
// -------------------------------------------------------------

const TasksCard = ({ task }: { task: any }) => {
  const [editId, setEditId] = useState<string | null>(null);
  const [viewId, setViewId] = useState<string | null>(null)
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteTask = () => {
    toast.loading("Deleting Task", { id: "deleting" });
    dispatch(deleteTask(task._id) as any)
      .unwrap()
      .then(() => {
        toast.success("Task deleted successfully", { id: "deleting" });
        // Optionally refetch tasks here if needed, though Redux should handle it
      })
      .catch(() => {
        toast.error("Failed to delete Task", { id: "deleting" });
      });
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const statusColors = getStatusColors(task.status);
  const deadlineDate = formatDate(task.deadline);
  const createdAtDate = formatDate(task.createdAt);

  return (
    <div className="bg-card rounded-xl p-5 w-full transition-all duration-300 hover:shadow h-[230px] flex flex-col justify-between">
      <div className="flex-1">
        {/* Status, Edit, Delete, View */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <AssigneeAvatars
              assignedTo={task.assignedTo}
              createdBy={task.createdBy}
            />
            <p className="text-primary">{task.assignedTo?.name || "N/A"}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewId(task._id)}
              className="p-2 rounded-full hover:bg-white transition cursor-pointer"
              title="Edit Task"
            >
              <Eye size={16} className="text-gray-500 " />
            </button>
            <button
              onClick={() => setEditId(task._id)}
              className="p-2 rounded-full hover:bg-white transition cursor-pointer"
              title="Edit Task"
            >
              <PencilLine size={16} className="text-gray-500 " />
            </button>
            <button
              onClick={handleDeleteTask}
              className="p-2 rounded-full hover:bg-red-100 transition cursor-pointer"
              title="Delete Task"
            >
              <Trash size={16} className="text-red-500" />
            </button>
          </div>
        </div>

        {/* Title, Details */}
        <div className="mb-4">
          <h2 className="text-lg font-bold break-words capitalize">
            {task.title}
          </h2>
          <p
            className={` text-sm text-gray-600 break-words ${isExpanded ? "" : "line-clamp-2"}`}
          >
            {task.details}
          </p>
        </div>
      </div>

      {/* Deadline, Assign To */}
      <div className="text-sm space-y-1 border-t pt-4 border-gray-100 flex items-center justify-between">
        <p className="text-gray-700 flex items-center space-x-2">
          <Flag size={16} /> <span>{deadlineDate}</span>
        </p>
        {/* <div className="flex items-center space-x-2">
          <p className="text-gray-700">{task.assignedTo?.name || "N/A"}</p>
          <AssigneeAvatars
            assignedTo={task.assignedTo}
            createdBy={task.createdBy}
          />
        </div> */}
      </div>

      {editId && (
        <TaskForm mode="Update" id={editId} close={() => setEditId(null)} />
      )}

      {viewId && (
        <TaskDetails taskId={viewId} close={() => setViewId(null)} />
      )}

    </div>
  );
};

// -------------------------------------------------------------
// MODIFIED EmployeeTasksCard
// -------------------------------------------------------------

const EmployeeTasksCard = ({ task }: { task: any }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const { userData } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDeleteTask = () => {
    toast.loading("Deleting Task", { id: "deleting" });
    dispatch(deleteTask(task._id) as any)
      .unwrap()
      .then(() => {
        toast.success("Task deleted successfully", { id: "deleting" });
      })
      .catch(() => {
        toast.error("Failed to delete Task", { id: "deleting" });
      });
  };

  const statusColors = getStatusColors(task.status);
  const deadlineDate = formatDate(task.deadline);

  // Check if the employee created the task themselves (to allow editing/deletion)
  const canEditOrDelete =
    userData?._id === task.createdBy._id &&
    userData?._id === task.assignedTo._id;

  return (
    <div className="bg-white rounded-xl shadow-lg p-5 w-full transition-all duration-300 hover:shadow-xl">
      {/* Card Header (Top Row) */}
      <div className="flex justify-end items-center mb-4">
        {/* Status Tag */}
        <span
          className={`${statusColors.tag} text-xs font-semibold px-3 py-1 rounded-lg`}
        >
          {task.status === "Pending" ? "Not Started" : task.status}
        </span>
        <button className="ml-auto text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100">
          <MoreVertical size={20} />
        </button>
      </div>

      {/* Title and Details */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-800 break-words mb-1">
          {task.title}
        </h2>
        <p
          className={`mt-2 text-sm text-gray-600 break-words ${isExpanded ? "" : "line-clamp-2"}`}
        >
          {task.details}
        </p>
      </div>

      {/* Tags and Assignee Avatars in a flexible row */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <PriorityTag />
        </div>
        <AssigneeAvatars
          assignedTo={task.assignedTo}
          createdBy={task.createdBy}
        />
      </div>

      {/* Task Info (Only visible when not expanded) */}
      {!isExpanded && (
        <div className="text-sm space-y-1 mb-4 border-t pt-4 border-gray-100">
          <p className="text-gray-700">
            <span className="font-semibold">Deadline</span> - {deadlineDate}
          </p>
        </div>
      )}

      {/* Action Bar (Bottom Row) */}
      <div className="border-t border-gray-100 pt-4 flex items-center justify-between text-gray-500 text-sm">
        {/* Left Action Icons: Comments, Links, Edit, Delete */}
        <div className="flex space-x-3 items-center">
          <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-600 transition">
            <MessageSquare size={16} />
            <span>0</span>
          </div>
          <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-600 transition">
            <Paperclip size={16} />
            <span>0</span>
          </div>
          {/* Edit/Delete only if the employee created the task for themselves */}
          {canEditOrDelete && (
            <>
              <button
                onClick={() => setEditId(task._id)}
                className="p-1 rounded-full hover:bg-gray-100 transition"
                title="Edit Task"
              >
                <PencilLine
                  size={16}
                  className="text-gray-500 hover:text-section"
                />
              </button>
              <button
                onClick={handleDeleteTask}
                className="p-1 rounded-full hover:bg-red-100 transition"
                title="Delete Task"
              >
                <Trash size={16} className="text-red-500" />
              </button>
            </>
          )}
        </div>

        {/* Right Action: Mark as Done & Expand/Collapse Button */}
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleExpand}
            className="text-blue-600 text-sm font-medium px-4 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 transition focus:outline-none"
          >
            {isExpanded ? "Collapse" : "Expand"}
          </button>
          <MarkAsDoneCheckbox status={task.status} id={task._id} />
        </div>
      </div>

      {/* Edit Form Modal */}
      {editId && (
        <TaskForm mode="Update" id={editId} close={() => setEditId(null)} />
      )}
    </div>
  );
};

// -------------------------------------------------------------
// UNMODIFIED TasksComp
// -------------------------------------------------------------

export default function TasksComp() {
  const { tasks } = useSelector((state: RootState) => state.task);

  const { userData, isAutheticated } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData && userData.role === "admin") {
      dispatch(getTasks() as any);
    } else if (userData && userData.role === "employee") {
      dispatch(getEmployeeTasks() as any);
    } else {
    }
  }, [userData, dispatch]); // Added dispatch to dependency array

  // Added a background to the main container to match the kanban style
  return (
    <div className="flex-1 h-[calc(100vh-80px)] pr-10 pl-20 py-10 grid grid-cols-3 gap-4 overflow-hidden">
      {/* Pending */}
      <div className="w-full min-h-[200px] flex flex-col gap-2">
        <div className="sticky top-0 left-0 bg-primary text-white w-fit px-4 py-1 rounded-full z-10 font-semibold flex items-center gap-2">
          <div className="h-3 w-3 bg-white rounded-full"></div> Pending
        </div>
        <div className="flex-1 overflow-y-auto flex flex-col gap-4 custom-scrollbar pr-2">
          {userData && tasks.length > 0 ? (
            tasks
              .filter((task: any) => task.status === "Pending")
              .map((task: any) => <TasksCard key={task._id} task={task} />)
          ) : (
            <p className="text-center text-gray-500">No tasks found.</p>
          )}
        </div>
      </div>

      {/* In Progress */}
      <div className="w-full min-h-[200px] flex flex-col gap-2">
        <div className="sticky top-0 left-0 bg-primary text-white w-fit px-4 py-1 rounded-full z-10 font-semibold flex items-center gap-2">
          <div className="h-3 w-3 bg-white rounded-full"></div> In Progress
        </div>
        <div className="flex-1 overflow-y-auto flex flex-col gap-4 custom-scrollbar pr-2">
          {userData && tasks.length > 0 ? (
            tasks
              .filter((task: any) => task.status === "In Progress")
              .map((task: any) => <TasksCard key={task._id} task={task} />)
          ) : (
            <p className="text-center text-gray-500">No tasks found.</p>
          )}
        </div>
      </div>

      {/* Done */}
      <div className="w-full min-h-[200px] flex flex-col gap-2">
        <div className="sticky top-0 left-0 bg-primary text-white w-fit px-4 py-1 rounded-full z-10 font-semibold flex items-center gap-2">
          <div className="h-3 w-3 bg-white rounded-full"></div> Done
        </div>
        <div className="flex-1 overflow-y-auto flex flex-col gap-4 custom-scrollbar pr-2">
          {userData && tasks.length > 0 ? (
            tasks
              .filter((task: any) => task.status === "Completed")
              .map((task: any) => <TasksCard key={task._id} task={task} />)
          ) : (
            <p className="text-center text-gray-500">No tasks found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
