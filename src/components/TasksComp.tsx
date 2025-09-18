"use client";

import { IKanban } from "@/models/Kanban";
import {
  deleteTask,
  getEmployeeTasks,
  getTasks,
  updateTaskStatus,
} from "@/redux/features/taskSlice";
import { RootState } from "@/redux/store";
import { DeleteIcon, EditIcon, PencilLine, Trash } from "lucide-react";
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
      className={`
        flex items-center space-x-1 rounded-full cursor-pointer 
        transition-colors duration-300 ease-in-out p-2
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

// const AdminTasksCard = ({ task }: { task: any }) => {
//   const [editId, setEditId] = useState<string | null>(null);
//   const dispatch = useDispatch();

//   const handleDeleteTask = () => {
//     toast.loading("Deleting Task", { id: "deleting" })
//     dispatch(deleteTask(task._id) as any)
//       .unwrap()
//       .then(() => {
//         toast.success("Task deleted successfully", { id: "deleting" });
//       })
//       .catch(() => {
//         toast.success("Failed to deleted Task", { id: "deleting" });
//       });
//   };

//   const formatDate = (dateString: Date) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };
//   return (
//     <div className="bg-card rounded-xl p-6 w-full">
//       <div className="mb-4">
//         <h2 className="text-xl font-bold text-gray-800 break-words">
//           {task.title}
//         </h2>
//         <p className="mt-2 text-sm text-gray-600 break-words line-clamp-4">
//           {task.details} Lorem ipsum dolor sit amet consectetur adipisicing
//           elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
//           corporis repellendus tenetur architecto dolorem exercitationem, ullam
//           accusantium veniam nihil in minus mollitia esse saepe eligendi
//           recusandae doloremque sequi cupiditate nisi.
//         </p>
//       </div>

//       <div className="text-sm space-y-2">
//         <p className="text-gray-700">
//           <span className="font-semibold">Assign To</span> -{" "}
//           {task.assignedTo?.name || "N/A"}
//         </p>
//         <p className="text-gray-700">
//           <span className="font-semibold">Assigned At</span> -{" "}
//           {formatDate(task.createdAt)}
//         </p>
//         <p className="text-gray-700">
//           <span className="font-semibold">Deadline</span> -{" "}
//           {formatDate(task.deadline)}
//         </p>
//       </div>

//       <div className="mt-6 flex items-center justify-between">
//         <a
//           href="#"
//           className="text-blue-600 text-sm font-medium hover:underline"
//         >
//           Expand
//         </a>
//         <div className="flex space-x-2">
//           <button className="p-2 rounded-full hover:bg-secondary flex items-center justify-center cursor-pointer transition duration-200 ease-in-out group">
//             <PencilLine
//               onClick={() => setEditId(task._id)}
//               size={20}
//               className="group-hover:text-section"
//             />
//           </button>
//           <button
//             onClick={handleDeleteTask}
//             className="p-2 rounded-full hover:bg-secondary flex items-center justify-center cursor-pointer transition duration-200 ease-in-out group"
//           >
//             <Trash
//               size={20}
//               className="text-primary group-hover:text-section"
//             />
//           </button>
//         </div>
//       </div>
//       {editId && (
//         <TaskForm mode="Update" id={editId} close={() => setEditId(null)} />
//       )}
//     </div>
//   );
// };

// const EmployeeTasksCard = ({ task }: { task: any }) => {
//   const formatDate = (dateString: Date) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };
//   return (
//     <div className="bg-card rounded-xl p-6 w-full">
//       <div className="mb-4">
//         <h2 className="text-xl font-bold text-gray-800 break-words">
//           {task.title}
//         </h2>
//         <p className="mt-2 text-sm text-gray-600 break-words line-clamp-4">
//           {task.details} Lorem ipsum dolor sit amet consectetur adipisicing
//           elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
//           corporis repellendus tenetur architecto dolorem exercitationem, ullam
//           accusantium veniam nihil in minus mollitia esse saepe eligendi
//           recusandae doloremque sequi cupiditate nisi.
//         </p>
//       </div>

//       <div className="text-sm space-y-2">
//         <p className="text-gray-700">
//           <span className="font-semibold">Deadline</span> -{" "}
//           {formatDate(task.deadline)}
//         </p>
//       </div>

//       <div className="mt-6 flex items-center justify-between">
//         <a
//           href="#"
//           className="text-blue-600 text-sm font-medium hover:underline"
//         >
//           Expand
//         </a>
//         <div className="flex space-x-2">
//           <MarkAsDoneCheckbox status={task.status} id={task._id} />
//         </div>
//       </div>
//     </div>
//   );
// };

const AdminTasksCard = ({ task }: { task: any }) => {
  const [editId, setEditId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteTask = () => {
    toast.loading("Deleting Task", { id: "deleting" });
    dispatch(deleteTask(task._id) as any)
      .unwrap()
      .then(() => {
        toast.success("Task deleted successfully", { id: "deleting" });
      })
      .catch(() => {
        toast.success("Failed to deleted Task", { id: "deleting" });
      });
  };

  const formatDate = (dateString: Date) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-card rounded-xl p-6 w-full flex flex-col min-h-[280px] h-[280px]">
      <div className="flex-1 overflow-y-auto pr-2 mb-4 custom-scrollbar">
        <h2 className="text-xl font-bold text-gray-800 break-words">
          {task.title}
        </h2>
        <p
          className={`mt-2 text-sm text-gray-600 break-words ${
            isExpanded ? "" : "line-clamp-3"
          }`}
        >
          {task.details}
          <br />
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi,
          vitae! Voluptates autem quia illo assumenda accusantium non
          voluptatibus odit blanditiis consequatur dolorum. Dolorem quo neque
          velit, laudantium hic quam in! Rem quia explicabo accusantium non
          ducimus consequuntur. Quasi laboriosam facere libero sunt ea unde,
          laudantium, quam, officia optio hic itaque numquam pariatur similique.
          Vel repellat iusto veritatis corporis, tenetur sed! Ea, ipsam
          explicabo earum cupiditate illum asperiores ducimus consectetur
          mollitia distinctio veniam tenetur pariatur commodi, aliquam
          molestias, dolorum unde odit? Alias doloribus sequi eveniet itaque
          autem tempora magni fuga reprehenderit. Quasi officiis, recusandae
          cupiditate nisi quaerat totam illum ab facilis asperiores. Sed
          pariatur itaque harum! Fuga sequi veniam quidem officiis? Non dolorem
          laboriosam tenetur, ipsam quis laudantium veniam? Velit, dolor?
        </p>
      </div>

      {!isExpanded && (
        <div className="text-sm mb-4">
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
      )}

      <div className="flex items-center justify-between">
        <button
          onClick={toggleExpand}
          className="text-blue-600 text-sm font-medium hover:underline focus:outline-none cursor-pointer"
        >
          {isExpanded ? "Collapse" : "Expand"}
        </button>
        <div className="flex space-x-2">
          <button className="p-2 rounded-full hover:bg-secondary flex items-center justify-center cursor-pointer transition duration-200 ease-in-out group">
            <PencilLine
              onClick={() => setEditId(task._id)}
              size={20}
              className="group-hover:text-section"
            />
          </button>
          <button
            onClick={handleDeleteTask}
            className="p-2 rounded-full hover:bg-secondary flex items-center justify-center cursor-pointer transition duration-200 ease-in-out group"
          >
            <Trash
              size={20}
              className="text-primary group-hover:text-section"
            />
          </button>
        </div>
      </div>
      {editId && (
        <TaskForm mode="Update" id={editId} close={() => setEditId(null)} />
      )}
    </div>
  );
};

const EmployeeTasksCard = ({ task }: { task: any }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const { userData, isAutheticated } = useSelector(
    (state: RootState) => state.auth
  );

  const dispatch = useDispatch();

  const formatDate = (dateString: Date) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

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
        toast.success("Failed to deleted Task", { id: "deleting" });
      });
  };

  return (
    <div className="bg-card rounded-xl p-6 w-full flex flex-col min-h-[260px] h-[260px]">
      <div className="flex-1 overflow-y-auto pr-2 mb-4 custom-scrollbar">
        <h2 className="text-xl font-bold text-gray-800 break-words">
          {task.title}
        </h2>
        <p
          className={`mt-2 text-sm text-gray-600 break-words ${
            isExpanded ? "" : "line-clamp-4"
          }`}
        >
          {task.details} Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Asperiores ipsa suscipit accusamus veniam repellendus. Dolorem
          odio maiores maxime culpa necessitatibus alias ipsa provident!
          Possimus temporibus ad doloribus accusamus nam aliquam? Voluptates,
          alias explicabo, voluptatibus dolorem mollitia sint distinctio, ut
          libero error animi quibusdam delectus provident reprehenderit nisi
          dolore ipsum nostrum officiis totam a quis eligendi voluptas modi
          aliquid cupiditate. Magnam. Deleniti dolore ipsam voluptate qui ea
          illo eos soluta obcaecati commodi necessitatibus unde tempora ab nulla
          voluptatem repellendus saepe, blanditiis magnam perspiciatis
          perferendis, iure, est nobis quae reiciendis? Adipisci, sed. Nam
          similique vero iusto ducimus aut at ullam totam odio a accusamus,
          quibusdam, explicabo dolores quidem? Quas ratione vitae reiciendis,
          odit at distinctio provident est quibusdam ab, ipsum porro asperiores.
          Ex debitis reprehenderit sequi magni, animi iusto quos quibusdam eum
          hic, officiis sed. Cum odio ad voluptates quisquam animi accusamus,
          dolores voluptas dolor magnam ratione, sint hic modi fugiat qui?
          Tenetur, eligendi quod eaque illum, quaerat praesentium architecto
          cumque, at sequi laudantium dolores quos atque ipsam consectetur
          tempora sunt voluptatibus obcaecati quo! Maxime, sint libero doloribus
          id odit odio error!
        </p>
      </div>

      {!isExpanded && (
        <div className="text-sm mb-4">
          <p className="text-gray-700">
            <span className="font-semibold">Deadline</span> -{" "}
            {formatDate(task.deadline)}
          </p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <button
          onClick={toggleExpand}
          className="text-blue-600 text-sm font-medium hover:underline focus:outline-none cursor-pointer"
        >
          {isExpanded ? "Collapse" : "Expand"}
        </button>
        <div className="flex space-x-2 flex-shrink-0">
          {task.createdBy === task.assignedTo && (
            <div className="flex space-x-2">
              <button className="p-2 rounded-full hover:bg-secondary flex items-center justify-center cursor-pointer transition duration-200 ease-in-out group">
                <PencilLine
                  onClick={() => setEditId(task._id)}
                  size={20}
                  className="group-hover:text-section"
                />
              </button>
              <button
                onClick={handleDeleteTask}
                className="p-2 rounded-full hover:bg-secondary flex items-center justify-center cursor-pointer transition duration-200 ease-in-out group"
              >
                <Trash
                  size={20}
                  className="text-primary group-hover:text-section"
                />
              </button>
            </div>
          )}
          <MarkAsDoneCheckbox status={task.status} id={task._id} />
        </div>
      </div>
      {editId && (
        <TaskForm mode="Update" id={editId} close={() => setEditId(null)} />
      )}
    </div>
  );
};

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
