import { IKanban } from "@/models/Kanban";
import { DeleteIcon, EditIcon, PencilLine, Trash } from "lucide-react";

export default function TasksComp({ tasks }: { tasks: any }) {
  const formatDate = (dateString: Date) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  return (
      <div className="flex-1 h-[calc(100vh-80px)] overflow-y-auto pr-10 pl-20 my-10 py-2 grid grid-cols-1 lg:grid-cols-2 gap-5">
        {tasks.map((task: any) => (
          <div className="bg-card rounded-xl p-6 w-full">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-800 break-words">
                {task.title}
              </h2>
              <p className="mt-2 text-sm text-gray-600 break-words line-clamp-4">
                {task.details} Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores corporis repellendus tenetur architecto dolorem exercitationem, ullam accusantium veniam nihil in minus mollitia esse saepe eligendi recusandae doloremque sequi cupiditate nisi.
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
              <div className="flex space-x-4">
                <PencilLine />
                <Trash className="text-primary" />
              </div>
            </div>
          </div>
        ))}
      </div>
  );
}
