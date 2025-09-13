"use client";

import { IKanban } from "@/models/Kanban";
import { getEmployeeTasks, getTasks, updateTaskStatus } from "@/redux/features/taskSlice";
import { RootState } from "@/redux/store";
import { DeleteIcon, EditIcon, PencilLine, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const MarkAsDoneCheckbox = ({status, id}: {status: string, id: string}) => {
  const [isDone, setIsDone] = useState(status === "Completed");
  const dispatch = useDispatch()

  const handleToggle = () => {
    setIsDone(!isDone);
    dispatch(updateTaskStatus({status: isDone ? "Pending": "Completed", id}) as any)
  };

  return (
    <div
      onClick={handleToggle}
      className={`
        flex items-center space-x-1 px-1 rounded-full cursor-pointer 
        transition-colors duration-300 ease-in-out
        ${isDone ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"}
        ${isDone ? "ring-2 ring-green-600" : "ring-2 ring-gray-400"}
      `}
    >
      <div
        className={`
          w-4 h-4 rounded-full flex items-center justify-center 
          transition-all duration-300 ease-in-out
          ${isDone ? "bg-white" : "bg-gray-400"}
        `}
      >
        <svg
          className={`
            w-4 h-4 text-green-500 transition-opacity duration-300 
            ${isDone ? "opacity-100" : "opacity-0"}
          `}
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
      <span className="text-sm font-medium">Mark as Done</span>
    </div>
  );
};


const AdminTasksCard = ({ task }: { task: any }) => {
  const formatDate = (dateString: Date) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  return (
    <div className="bg-card rounded-xl p-6 w-full">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800 break-words">
          {task.title}
        </h2>
        <p className="mt-2 text-sm text-gray-600 break-words line-clamp-4">
          {task.details} Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
          corporis repellendus tenetur architecto dolorem exercitationem, ullam
          accusantium veniam nihil in minus mollitia esse saepe eligendi
          recusandae doloremque sequi cupiditate nisi.
        </p>
      </div>

      <div className="text-sm space-y-2">
        <p className="text-gray-700">
          <span className="font-semibold">Assign To</span> -{" "}
          {task.assignedTo?.name || "N/A"}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Assigned At</span> -{" "}
          {formatDate(task.createdAt)}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Deadline</span> -{" "}
          {formatDate(task.deadline)}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <a
          href="#"
          className="text-blue-600 text-sm font-medium hover:underline"
        >
          Expand
        </a>
        <div className="flex space-x-2">
          <button className="p-2 rounded-full hover:bg-secondary flex items-center justify-center cursor-pointer transition duration-200 ease-in-out group">
            <PencilLine size={20} className="group-hover:text-section" />
          </button>
          <button className="p-2 rounded-full hover:bg-secondary flex items-center justify-center cursor-pointer transition duration-200 ease-in-out group">
            <Trash
              size={20}
              className="text-primary group-hover:text-section"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

const EmployeeTasksCard = ({ task }: { task: any }) => {
  const formatDate = (dateString: Date) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  return (
    <div className="bg-card rounded-xl p-6 w-full">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800 break-words">
          {task.title}
        </h2>
        <p className="mt-2 text-sm text-gray-600 break-words line-clamp-4">
          {task.details} Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
          corporis repellendus tenetur architecto dolorem exercitationem, ullam
          accusantium veniam nihil in minus mollitia esse saepe eligendi
          recusandae doloremque sequi cupiditate nisi.
        </p>
      </div>

      <div className="text-sm space-y-2">
        <p className="text-gray-700">
          <span className="font-semibold">Deadline</span> -{" "}
          {formatDate(task.deadline)}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <a
          href="#"
          className="text-blue-600 text-sm font-medium hover:underline"
        >
          Expand
        </a>
        <div className="flex space-x-2">
          <MarkAsDoneCheckbox status={task.status} id={task._id} />
        </div>
      </div>
    </div>
  );
};

export default function TasksComp() {
  const [tasks, setTasks] = useState([]);

  const { userData, isAutheticated } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData && userData.role === "admin") {
      dispatch(getTasks() as any)
        .unwrap()
        .then((res: any) => {
          console.log("Tasks:", res);
          setTasks(res);
        })
        .catch((err: any) => {
          console.log(err);
        });
    } else if (userData && userData.role === "employee") {
      dispatch(getEmployeeTasks() as any)
        .unwrap()
        .then((res: any) => {
          console.log("Tasks:", res);
          setTasks(res);
        })
        .catch((err: any) => {
          console.log(err);
        });
    } else {
    }
  }, [userData]);

  return (
    <div className="flex-1 h-[calc(100vh-80px)] overflow-y-auto pr-10 pl-20 my-10 py-2 grid grid-cols-1 lg:grid-cols-2 gap-5 custom-scrollbar">
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
