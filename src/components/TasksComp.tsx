"use client";

import {
  deleteTask,
  getEmployeeTasks,
  getTasks,
  updateTaskStatus,
} from "@/redux/features/taskSlice";
import { RootState } from "@/redux/store";
import { PencilLine, Trash, Flag, Eye, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskForm from "./TaskForm";
import toast from "react-hot-toast";
import TaskDetails from "./TaskDetails";
import Image from "next/image";

// New component for the Assignee Avatar Stack
const AssigneeToAvatars = ({
  assignedTo,
  createdBy,
}: {
  assignedTo: any;
  createdBy: any;
}) => {
  // Only show the assignedTo avatar for now, as in the image
  const avatarUrl =
    assignedTo?.profileImage || "/images/profile-placeholder.png";

  return (
    <div className="flex -space-x-2 overflow-hidden">
      {/* Assigned To Avatar */}
      <Image
        height={40}
        width={40}
        className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
        src={avatarUrl}
        alt={assignedTo?.name || "Assignee"}
      />
      {/* You can add createdBy or other assignees here if needed */}
    </div>
  );
};

const AssigneeByAvatars = ({
  assignedTo,
  createdBy,
}: {
  assignedTo: any;
  createdBy: any;
}) => {
  // Only show the assignedTo avatar for now, as in the image
  const avatarUrl =
    createdBy?.profileImage || "/images/profile-placeholder.png";

  return (
    <div className="flex -space-x-2 overflow-hidden">
      {/* Assigned To Avatar */}
      <Image
        height={40}
        width={40}
        className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
        src={avatarUrl}
        alt={createdBy?.name || "Assignee"}
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

const TasksCard = ({ task }: { task: any }) => {
  const { userData } = useSelector((state: RootState) => state.auth);
  const [editId, setEditId] = useState<string | null>(null);
  const [viewId, setViewId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();

  // 🔹 States for status dropdown
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(task.status);

  const statusOptions = ["Pending", "In Progress", "Completed"];

  // Handle status selection
  const handleStatusSelect = (status: string) => {
    if (status === selectedStatus) {
      setIsStatusOpen(false);
      return;
    }
    // console.log(status);
    setSelectedStatus(status);
    toast.loading("Updating Task ...", { id: "task" });
    dispatch(updateTaskStatus({ newData: { status }, id: task._id }) as any)
      .unwrap()
      .then((res: any) => {
        toast.success("Task updated successfully", { id: "task" });
      });
    setIsStatusOpen(false);
  };

  const handleDeleteTask = () => {
    toast.loading("Deleting Task...", { id: "deleting" });
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

  const deadlineDate = formatDate(task.deadline);

  return (
    <div className="bg-card rounded-xl p-5 w-full transition-all duration-300 hover:shadow h-[230px] flex flex-col justify-between">
      <div className="flex-1">
        {/* Status, Edit, Delete, View */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            {userData?.role === "admin" ? (
              <>
                <AssigneeToAvatars
                  assignedTo={task.assignedTo}
                  createdBy={task.createdBy}
                />
                <p className="text-primary">{task.assignedTo?.name || "N/A"}</p>
              </>
            ) : (
              <>
                <AssigneeByAvatars
                  assignedTo={task.assignedTo}
                  createdBy={task.createdBy}
                />
                <p className="text-primary">{task.createdBy?.name || "N/A"}</p>
              </>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewId(task._id)}
              className="p-2 rounded-full hover:bg-white transition cursor-pointer"
              title="Edit Task"
            >
              <Eye size={16} className="text-gray-500 " />
            </button>
            {userData?.role === "admin" && (
              <>
                <button
                  onClick={() => setEditId(task._id)}
                  className="p-2 rounded-full hover:bg-white transition cursor-pointer"
                  title="Edit Task"
                >
                  <PencilLine size={16} className="text-gray-500 " />
                </button>
              </>
            )}
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
        {userData?.role !== "admin" && (
          <div className=" relative">
            {/* Custom Input/Trigger */}
            <div
              className="flex items-center w-full bg-card border-background p-3 cursor-pointer transition duration-150"
              onClick={() => setIsStatusOpen(!isStatusOpen)}
            >
              <span className="text-base flex-1 mr-2">{selectedStatus}</span>
              <ChevronDown
                size={18}
                className={`text-gray-400 transition-transform ${isStatusOpen ? "rotate-180" : "rotate-0"}`}
              />
            </div>

            {isStatusOpen && (
              <ul className="absolute z-10 w-full mt-1 bg-card border border-background rounded-lg shadow-xl max-h-60 overflow-y-auto">
                {statusOptions.map((status) => (
                  <li
                    key={status}
                    className={`p-3 cursor-pointer transition duration-150 
                            ${status === selectedStatus ? "bg-primary/10 font-semibold" : "hover:bg-background"}`}
                    onClick={() => handleStatusSelect(status)}
                  >
                    {status}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {editId && (
        <TaskForm mode="Update" id={editId} close={() => setEditId(null)} />
      )}

      {viewId && <TaskDetails taskId={viewId} close={() => setViewId(null)} />}
    </div>
  );
};

export default function TasksComp() {
  const { tasks } = useSelector((state: RootState) => state.task);
  const { userData } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData?.role === "admin") {
      dispatch(getTasks() as any);
    } else if (userData?.role === "employee") {
      dispatch(getEmployeeTasks() as any);
    }
  }, [userData, dispatch]);

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

