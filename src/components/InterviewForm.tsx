import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { X, Save, Clock, Calendar, Edit2, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  createInterview,
  updateInterview,
} from "@/redux/features/interviewSlice";

const InterviewForm = ({
  mode = "create",
  editId,
}: {
  mode: "create" | "update";
  editId?: string | null;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      gender: "Male",
      joiningLocation: "",
      position: "",
      workExp: "",
      status: "scheduled",
      interviewDate: "",
      interviewTime: "",
    },
  });

  const { interviews } = useSelector((state: RootState) => state.interview);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpenForm && mode === "update" && editId) {
      const initialData = interviews.find(
        (interview) => interview._id === editId
      );
      if (initialData) {
        // Format date to YYYY-MM-DD for date input
        const dateObj = new Date(initialData?.interviewDate);
        const formattedDate = dateObj.toISOString().split("T")[0];

        reset({
          name: initialData?.candidateName || "",
          email: initialData?.candidateEmail || "",
          phone: initialData?.candidatePhone || "",
          gender: initialData?.candidateGender || "Male",
          joiningLocation: initialData?.joiningLocation || "",
          position: initialData?.position || "",
          workExp: (initialData?.candidateExp).toString() || "",
          status: initialData?.status || "scheduled",
          interviewDate: formattedDate,
          interviewTime: initialData?.interviewTime || "",
        });
      }
    }
  }, [isOpenForm, mode, editId, interviews, reset]);

  const onSubmit = async (data: any) => {
    const dataToSubmit = {
      candidateName: data.name,
      candidateEmail: data.email,
      candidatePhone: data.phone,
      candidateGender: data.gender,
      candidateExp: data.workExp,
      position: data.position,
      status: data.status,
      interviewDate: data.interviewDate,
      interviewTime: data.interviewTime,
      joiningLocation: data.joiningLocation,
    };
    setLoading(true);
    if (mode === "update") {
      // console.log("--- UPDATE INTERVIEW RECORD ---");
      // console.log("ID:", editId || "N/A");
      // console.log("Updated Data:", dataToSubmit);

      dispatch(
        updateInterview({
          interviewId: editId,
          updateData: dataToSubmit,
        } as any) as any
      )
        .unwrap()
        .then(() => {
          setIsOpenForm(false);
          reset();
        })
        .catch((err: any) => {
          console.log(err);
        })
        .finally(() => setLoading(false));
    } else {
      // console.log("--- CREATE NEW INTERVIEW RECORD ---");
      // console.log("New Data:", dataToSubmit);

      dispatch(createInterview(dataToSubmit as any) as any)
        .unwrap()
        .then((res: any) => {
          console.log(res);
          setIsOpenForm(false);
          reset();
        })
        .catch((err: any) => {
          console.log(err);
        })
        .finally(() => setLoading(false));
    }

    // console.log(
    //   `Success! Interview for ${data.name} ${mode === "update" ? "updated" : "created"}.`
    // );
  };

  const formTitle =
    mode === "update" ? "Edit Interview Record" : "Create New Interview";
  const submitButtonText =
    mode === "update" ? "Save Changes" : "Create Interview";

  return (
    <>
      {mode === "create" ? (
        <button
          type="button"
          onClick={() => setIsOpenForm(true)}
          className="px-4 py-2 gap-2 flex items-center justify-center rounded-lg bg-orange-500 text-white shadow-md hover:bg-orange-600 transition-colors cursor-pointer "
        >
          <Plus className="w-4 h-4" /> <span>Add Interview</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpenForm(true)}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-500 text-white shadow-md hover:bg-orange-600 transition-colors cursor-pointer"
        >
          <Edit2 className="w-4 h-4" />
        </button>
      )}

      {isOpenForm && (
        <div className="fixed inset-0 bg-secondary/50 z-50 flex items-center justify-center backdrop-blur-[6px]">
          <div className="w-full max-w-4xl h-[90vh] shadow-lg rounded-2xl overflow-y-auto border-none bg-white relative p-4">
            {/* Header and Close Button */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-extrabold text-gray-900">
                {formTitle}
              </h2>
              <button
                onClick={() => {
                  setIsOpenForm(false);
                  reset();
                }}
                className="p-2 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 transition duration-150"
                aria-label="Close form"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="grid gap-2">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    placeholder="e.g., John Doe"
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters",
                      },
                    })}
                    className={`w-full px-3 py-3 rounded-xl bg-gray-100 border border-transparent focus:border-zinc-500 focus:outline-none ${
                      errors.name ? "border-red-500 border" : ""
                    }`}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">
                      {errors?.name?.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="grid gap-2">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="e.g., john@example.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Invalid email address",
                      },
                    })}
                    className={`w-full px-3 py-3 rounded-xl bg-gray-100 border border-transparent focus:border-zinc-500 focus:outline-none ${
                      errors.email ? "border-red-500 border" : ""
                    }`}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors?.email?.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="grid gap-2">
                  <label htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="e.g., +1-555-0123"
                    {...register("phone", {
                      required: "Phone is required",
                      minLength: {
                        value: 10,
                        message: "Phone must be at least 10 characters",
                      },
                    })}
                    className={`w-full px-3 py-3 rounded-xl bg-gray-100 border border-transparent focus:border-zinc-500 focus:outline-none ${
                      errors.phone ? "border-red-500 border" : ""
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500">
                      {errors?.phone?.message}
                    </p>
                  )}
                </div>

                {/* Gender (Radio Group) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <div className="flex items-center space-x-4 p-3 bg-gray-100 rounded-lg">
                    {["Male", "Female", "Other"].map((g) => (
                      <label
                        key={g}
                        className="flex items-center text-sm font-normal text-gray-700 cursor-pointer"
                      >
                        <input
                          type="radio"
                          value={g}
                          {...register("gender", { required: true })}
                          className="w-full px-3 py-3 rounded-xl bg-gray-100 border border-transparent focus:border-zinc-500 focus:outline-none"
                        />
                        {g}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Position */}
                <div className="grid gap-2">
                  <label htmlFor="position">Position</label>
                  <input
                    id="position"
                    placeholder="e.g., Senior Frontend Developer"
                    {...register("position", {
                      required: "Position is required",
                      minLength: {
                        value: 2,
                        message: "Position must be at least 2 characters",
                      },
                    })}
                    className={`w-full px-3 py-3 rounded-xl bg-gray-100 border border-transparent focus:border-zinc-500 focus:outline-none ${
                      errors.position ? "border-red-500 border" : ""
                    }`}
                  />
                  {errors.position && (
                    <p className="text-sm text-red-500">
                      {errors?.position?.message}
                    </p>
                  )}
                </div>

                {/* Work Experience */}
                <div className="grid gap-2">
                  <label htmlFor="workExp">Work Experience (Years)</label>
                  <input
                    id="workExp"
                    type="text"
                    placeholder="e.g., 5"
                    {...register("workExp", {
                      required: "Work Experience is required",
                    })}
                    className={`w-full px-3 py-3 rounded-xl bg-gray-100 border border-transparent focus:border-zinc-500 focus:outline-none ${
                      errors.workExp ? "border-red-500 border" : ""
                    }`}
                  />
                  {errors.workExp && (
                    <p className="text-sm text-red-500">
                      {errors?.workExp?.message}
                    </p>
                  )}
                </div>

                {/* Joining Location */}
                <div className="grid gap-2">
                  <label htmlFor="joiningLocation">Joining Location</label>
                  <input
                    id="joiningLocation"
                    placeholder="e.g., New York"
                    {...register("joiningLocation", {
                      required: "Joining Location is required",
                    })}
                    className={`w-full px-3 py-3 rounded-xl bg-gray-100 border border-transparent focus:border-zinc-500 focus:outline-none ${
                      errors.joiningLocation ? "border-red-500 border" : ""
                    }`}
                  />
                  {errors.joiningLocation && (
                    <p className="text-sm text-red-500">
                      {errors?.joiningLocation?.message}
                    </p>
                  )}
                </div>

                {/* Status (Select/Dropdown) */}
                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    className="w-full px-3 py-3 rounded-xl bg-gray-100 border border-transparent focus:border-zinc-500 focus:outline-none"
                    defaultValue="scheduled"
                    {...register("status", { required: "Status is required" })}
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="done">Done</option>
                  </select>
                  {errors.status && (
                    <p className="text-sm text-red-500">
                      {errors.status.message}
                    </p>
                  )}
                </div>

                {/* Interview Date */}
                <div>
                  <label
                    htmlFor="interviewDate"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Interview Date
                  </label>
                  <div className="relative">
                    <input
                      id="interviewDate"
                      type="date"
                      className={`w-full px-3 py-3 rounded-xl bg-gray-100 border border-transparent focus:border-zinc-500 focus:outline-none ${
                        errors.interviewDate ? "border-red-500 border" : ""
                      }`}
                      {...register("interviewDate", {
                        required: "Date is required",
                      })}
                    />
                    <Calendar className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                  {errors.interviewDate && (
                    <p className="text-sm text-red-500">
                      {errors.interviewDate.message}
                    </p>
                  )}
                </div>

                {/* Interview Time */}
                <div>
                  <label
                    htmlFor="interviewTime"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Interview Time
                  </label>
                  <div className="relative">
                    <input
                      id="interviewTime"
                      type="time"
                      className={`w-full px-3 py-3 rounded-xl bg-gray-100 border border-transparent focus:border-zinc-500 focus:outline-none ${
                        errors.interviewTime ? "border-red-500 border" : ""
                      }`}
                      {...register("interviewTime", {
                        required: "Time is required",
                      })}
                    />
                    <Clock className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                  {errors.interviewTime && (
                    <p className="text-sm text-red-500">
                      {errors.interviewTime.message}
                    </p>
                  )}
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <div className="pt-6 border-t mt-8">
                <button
                  type="submit"
                  disabled={loading || (mode === "update" && !isDirty)}
                  className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition duration-150"
                >
                  <Save className="w-5 h-5 mr-2" />
                  {loading
                    ? mode === "update"
                      ? "Saving..."
                      : "Creating..."
                    : submitButtonText}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default InterviewForm;
