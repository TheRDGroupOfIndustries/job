"use client";

import { IKanban } from "@/models/Kanban";
import {
  deleteTask,
  getEmployeeTasks,
  getTasks,
  updateTaskStatus,
} from "@/redux/features/taskSlice";
import { RootState } from "@/redux/store";
import { PencilLine, Trash, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskForm from "./TaskForm";
import toast from "react-hot-toast";

const MarkAsDoneCheckbox = ({ status, id }: { status: string; id: string }) => {
  const [isDone, setIsDone] = useState(status === "Completed");
  const dispatch = useDispatch();

  const handleToggle = () => {
    setIsDone(!isDone);
    dispatch(
      updateTaskStatus({
        newData: isDone ? { status: "Pending" } : { status: "Completed" },
        id,
      }) as any
    );
  };

  return (
    <div
      onClick={handleToggle}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full cursor-pointer text-sm font-medium transition
        ${isDone ? "bg-green-100 text-green-700 ring-2 ring-green-500" : "bg-gray-100 text-gray-600 ring-2 ring-gray-300"}`}
    >
      <div
        className={`w-4 h-4 rounded-full flex items-center justify-center transition
          ${isDone ? "bg-green-600" : "bg-gray-400"}`}
      >
        <svg
          className={`w-3 h-3 text-white transition-opacity ${isDone ? "opacity-100" : "opacity-0"}`}
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
      </div>
      {isDone ? "Completed" : "Mark as Done"}
    </div>
  );
};

const formatDate = (dateString: Date) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return `${String(date.getDate()).padStart(2, "0")}/${String(
    date.getMonth() + 1
  ).padStart(2, "0")}/${date.getFullYear()}`;
};

const AdminTasksCard = ({ task }: { task: any }) => {
  const [editId, setEditId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteTask = () => {
    toast.loading("Deleting Task...", { id: "deleting" });
    dispatch(deleteTask(task._id) as any)
      .unwrap()
      .then(() => toast.success("Task deleted successfully", { id: "deleting" }))
      .catch(() => toast.error("Failed to delete task", { id: "deleting" }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition p-6 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{task.title}</h2>
          <p className="text-sm text-gray-500">
            Assigned to:{" "}
            <span className="font-medium text-gray-700">
              {task.assignedTo?.name || "N/A"}
            </span>
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setEditId(task._id)}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <PencilLine size={18} className="text-gray-600" />
          </button>
          <button
            onClick={handleDeleteTask}
            className="p-2 rounded-full hover:bg-red-100 transition"
          >
            <Trash size={18} className="text-red-500" />
          </button>
        </div>
      </div>

      <p
        className={`text-sm text-gray-700 leading-relaxed ${
          isExpanded ? "" : "line-clamp-3"
        }`}
      >
        {task.details}
      </p>

      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="flex items-center gap-1 text-gray-500">
          <Calendar size={14} /> Deadline:{" "}
          <span className="font-medium text-gray-700">
            {formatDate(task.deadline)}
          </span>
        </span>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 font-medium hover:underline"
        >
          {isExpanded ? "Collapse" : "Expand"}
        </button>
      </div>

      {editId && <TaskForm mode="Update" id={editId} close={() => setEditId(null)} />}
    </div>
  );
};

const EmployeeTasksCard = ({ task }: { task: any }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const { userData } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleDeleteTask = () => {
    toast.loading("Deleting Task...", { id: "deleting" });
    dispatch(deleteTask(task._id) as any)
      .unwrap()
      .then(() => toast.success("Task deleted successfully", { id: "deleting" }))
      .catch(() => toast.error("Failed to delete task", { id: "deleting" }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition p-6 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">{task.title}</h2>
        {task.createdBy === task.assignedTo && (
          <div className="flex gap-2">
            <button
              onClick={() => setEditId(task._id)}
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <PencilLine size={18} className="text-gray-600" />
            </button>
            <button
              onClick={handleDeleteTask}
              className="p-2 rounded-full hover:bg-red-100 transition"
            >
              <Trash size={18} className="text-red-500" />
            </button>
          </div>
        )}
      </div>

      <p
        className={`text-sm text-gray-700 leading-relaxed ${
          isExpanded ? "" : "line-clamp-3"
        }`}
      >
        {task.details}
      </p>

      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="flex items-center gap-1 text-gray-500">
          <Calendar size={14} /> Deadline:{" "}
          <span className="font-medium text-gray-700">
            {formatDate(task.deadline)}
          </span>
        </span>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 font-medium hover:underline"
        >
          {isExpanded ? "Collapse" : "Expand"}
        </button>
      </div>

      <div className="mt-3 flex justify-end">
        <MarkAsDoneCheckbox status={task.status} id={task._id} />
      </div>

      {editId && <TaskForm mode="Update" id={editId} close={() => setEditId(null)} />}
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
  }, [userData]);

  return (
    <div className="flex-1 h-[calc(100vh-80px)] overflow-y-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-6 custom-scrollbar">
      {userData &&
        tasks.map((task: any) =>
          userData.role === "admin" ? (
            <AdminTasksCard key={task._id} task={task} />
          ) : (
            <EmployeeTasksCard key={task._id} task={task} />
          )
        )}
    </div>
  );
}

