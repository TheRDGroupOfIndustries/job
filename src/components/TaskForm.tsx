import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { Forward, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { createTask, updateTaskStatus } from "@/redux/features/taskSlice";
import toast from "react-hot-toast";
import BtnLoader from "./BtnLoader";
import { RootState } from "@/redux/store";

export default function TaskForm({
  mode = "Create",
  close,
  id,
}: {
  mode: "Create" | "Update";
  close: () => void;
  id?: string;
}) {
  const [loading, setLoading] = useState(false);
  const { tasks } = useSelector((state: RootState) => state.task);
  const { userData } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    if (id) {
      const task = tasks.find((task) => task._id === id);

      if (!task) return;
      setValue("title", task.title);
      setValue("details", task.details);
      const deadlineDate = new Date(task.deadline).toISOString().split("T")[0];
      setValue("deadline", deadlineDate);
      setValue("assignedTo", task.assignedTo._id);
      setSelectedUser(
        `${(task?.assignedTo as any)?.name} (${
          (task?.assignedTo as any)?.email
        }) `
      );
    }
  }, [id]);

  // dummy users (replace with API later)
  const users = [
    {
      id: "68c1e050450c5ea38e67a836",
      name: "Dolamani",
      email: "dolamanirohidas696@gmail.com",
    },
    {
      id: "68c1e050450c5ea38e67a836",
      name: "Aarav Singh",
      email: "aarav.singh@example.com",
    },
    {
      id: "68c1e050450c5ea38e67a836",
      name: "Priya Patel",
      email: "priya.patel@example.com",
    },
  ];

  const [selectedUser, setSelectedUser] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const onSubmit = (data: any) => {
    if (userData?.role === "employee") {
      data.assignedTo = userData.id;
    }
    console.log("Form Data:", data);
    setLoading(true);
    if (!id) {
      toast.loading(
        userData?.role === "admin" ? "Assigning Task ..." : "Adding Task ...",
        { id: "task" }
      );
      dispatch(createTask(data) as any)
        .unwrap()
        .then((res: any) => {
          console.log(res);
          toast.success(res.message, { id: "task" });
          close();
          reset();
          setSelectedUser("");
          setShowDropdown(false);
        })
        .catch((err: any) => {
          console.log(err);
          toast.error(err.message || "Failed To Assign Task!", { id: "task" });
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      toast.loading("Updating Task ...", { id: "task" });
      dispatch(updateTaskStatus({ newData: data, id }) as any)
        .unwrap()
        .then((res: any) => {
          console.log(res);
          toast.success(res.message, { id: "task" });
          close();
          reset();
          setSelectedUser("");
          setShowDropdown(false);
        })
        .catch((err: any) => {
          console.log(err);
          toast.error(err.message || "Failed To Assign Task!", { id: "task" });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div className="fixed inset-0 bg-secondary/50 z-50 flex items-center justify-center backdrop-blur-[6px]">
      <div className="w-[90vw] md:w-[80vw] lg:w-[60vw] h-[80vh] bg-card rounded-4xl px-8 py-4 flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">{mode} Work</h2>
          <Button
            className="text-card rounded-full cursor-pointer"
            onClick={() => {
              close();
              reset();
              setSelectedUser("");
              setShowDropdown(false);
            }}
          >
            <X />
          </Button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          {/* Title */}
          <input
            type="text"
            placeholder="Title"
            className={`w-full border-b-2 focus:border-primary ${
              errors.title ? "border-primary" : "border-background"
            } text-lg outline-0`}
            {...register("title", { required: "Title is required" })}
          />

          {/* Assign To */}
          {userData?.role === "admin" && (
            <div className="relative">
              {/* Visible input */}
              <input
                type="text"
                value={selectedUser}
                placeholder="Assign To"
                readOnly
                onFocus={() => setShowDropdown(true)}
                className={`w-full border-b-2 focus:border-primary ${
                  errors.assignedTo ? "border-primary" : "border-background"
                } text-lg outline-0`}
              />

              {/* Hidden field for ID */}
              <input
                type="hidden"
                {...register("assignedTo", {
                  required: "Recipient is required",
                })}
              />

              {/* Dropdown */}
              {showDropdown && (
                <div className="absolute top-10 w-full shadow left-0 bg-card rounded-2xl overflow-hidden z-50">
                  <ul className="h-[250px] overflow-y-auto w-full custom-scrollbar">
                    {users.map((user) => (
                      <li
                        key={user.id}
                        onClick={() => {
                          setSelectedUser(`${user.name} (${user.email})`);
                          setValue("assignedTo", user.id);
                          setShowDropdown(false); // close after select
                        }}
                        className="px-4 py-3 hover:bg-background text-secondary cursor-pointer"
                      >
                        {user.name} ({user.email})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Deadline */}
          <input
            type="date"
            placeholder="Deadline"
            className={`w-full border-b-2 focus:border-primary ${
              errors.deadline ? "border-primary" : "border-background"
            } text-lg outline-0`}
            {...register("deadline", { required: "Due Date is required" })}
          />

          {/* Details */}
          <textarea
            placeholder="Description of work"
            rows={10}
            className={`w-full border-b-2 focus:border-primary ${
              errors.details ? "border-primary" : "border-background"
            } text-lg outline-0 resize-none`}
            {...register("details", {
              required: "Description cannot be empty",
            })}
          />

          {/* Submit */}
          <div className="w-full flex justify-end py-4">
            <Button type="submit" className="text-card text-lg cursor-pointer">
              {mode === "Create"
                ? userData?.role === "admin"
                  ? "Assign"
                  : "Add"
                : "Update"}{" "}
              {loading ? <BtnLoader /> : <Forward />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
