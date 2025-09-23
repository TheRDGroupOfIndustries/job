// components/ApplicationForm.js
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { X } from "lucide-react";

const ApplicationForm = ({ close }: { close: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  

  const onSubmit = (data: any) => {
    // In a real application, you would send this data to your backend API
    console.log("Form Data Submitted:", data);

    const formData = new FormData();
    for (const key in data) {
      if (key === "resume" && data.resume[0]) {
        formData.append(key, data.resume[0]);
      } else {
        formData.append(key, data[key]);
      }
    }

    // Example of sending data to an API
    // fetch(`/api/user/applications/apply-for-job/${}`, {
    //   method: 'POST',
    //   body: json.stringify(formData),
    // }).then(response => {
    //   // Handle response
    // });

    alert("Application submitted successfully!");
    reset(); // Reset the form after successful submission
    close();
  };

  return (
    <div className="fixed inset-0 bg-secondary/50 z-50 flex items-center justify-center backdrop-blur-[6px]">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        {/* <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Apply for Job
        </h2> */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold"> Apply for Job</h2>
          <Button
            className="text-black hover:bg-orange-600 rounded-full p-2 cursor-pointer"
            onClick={close}
          >
            <X />
          </Button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="appliedBy"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Applicant ID
            </label>
            <input
              type="text"
              id="appliedBy"
              {...register("appliedBy", {
                required: "Applicant ID is required",
              })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.appliedBy ? "border-red-500" : "focus:border-orange-500"}`}
              placeholder="e.g., 68d18ff183a7110140280d78"
            />
            {errors.appliedBy && (
              <p className="text-red-500 text-xs italic mt-2">
                {errors.appliedBy.message as any}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="jobDesignation"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Job Designation
            </label>
            <input
              type="text"
              id="jobDesignation"
              {...register("jobDesignation", {
                required: "Job Designation is required",
              })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.jobDesignation ? "border-red-500" : "focus:border-orange-500"}`}
              placeholder="e.g., Senior Software Engineer"
            />
            {errors.jobDesignation && (
              <p className="text-red-500 text-xs italic mt-2">
                {errors.jobDesignation.message as any}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="resume"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Resume (PDF)
            </label>
            <input
              type="file"
              id="resume"
              accept=".pdf"
              {...register("resume", { required: "Resume is required" })}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-orange-50 file:text-orange-700
                hover:file:bg-orange-100 cursor-pointer"
            />
            {errors.resume && (
              <p className="text-red-500 text-xs italic mt-2">
                {errors.resume.message as any}
              </p>
            )}
          </div>
          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline flex items-center"
            >
              Apply
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
