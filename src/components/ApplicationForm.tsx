// components/ApplicationForm.tsx
"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "./ui/button";
import { X, MapPin, Code, Star } from "lucide-react";
import { useState } from "react";

// 1. Define the TypeScript interface for form data
interface IFormInput {
  appliedBy: string;
  jobDesignation: string;
  location: string;
  skills: string; // Stored as a comma-separated string in the form
  ratings: number;
  image: string; // Using string for URL input
  resume: FileList; // FileList type for file input
}

const ApplicationForm = ({ close }: { close: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<IFormInput>(); // Watch the rating field to display stars dynamically

  const ratingWatch = watch("ratings", 3);
  const [isSubmitting, setIsSubmitting] = useState(false); // 2. Define the submit handler with the TypeScript interface

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setIsSubmitting(true);
    // console.log("Form Data Submitted:", data); 
    const formData = new FormData();
    formData.append("appliedBy", data.appliedBy);
    formData.append("jobDesignation", data.jobDesignation);
    formData.append("location", data.location);
    formData.append("skills", data.skills);
    formData.append("ratings", data.ratings.toString());
    formData.append("image", data.image); // Append file if present
    if (data.resume && data.resume[0]) {
      formData.append("resume", data.resume[0]);
    } // Simulate API call

    setTimeout(() => {
      alert("Application submitted successfully!");
      setIsSubmitting(false);
      reset(); // Reset the form after successful submission
      close();
    }, 1500);
  }; // Helper to render star rating

  const renderRatingStars = (currentRating: number) => {
    const ratingValue = Math.round(currentRating || 0); // Ensure it's an integer for visual
    return (
      <div className="flex space-x-1 items-center">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <Star
              key={index}
              size={20}
              className={
                index < ratingValue
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-gray-300"
              }
            />
          ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-secondary/50 z-50 flex items-center justify-center backdrop-blur-[6px]">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Apply for Job</h2>

          <Button
            className="text-black hover:bg-orange-600 rounded-full p-2 cursor-pointer"
            onClick={close}
          >
            <X />
          </Button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Existing Field: Applied By */}
          <div className="mb-4">
            <label
              htmlFor="appliedBy"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Applicant ID (For Backend Use)
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
                {errors.appliedBy.message}
              </p>
            )}
          </div>
          {/* Existing Field: Job Designation */}
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
                {errors.jobDesignation.message}
              </p>
            )}
          </div>
          {/* NEW FIELD: Location */}
          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-gray-700 text-sm font-bold mb-2  items-center"
            >
              <MapPin size={16} className="mr-1 text-orange-500" /> Current
              Location
            </label>

            <input
              type="text"
              id="location"
              {...register("location", {
                required: "Location is required",
              })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.location ? "border-red-500" : "focus:border-orange-500"}`}
              placeholder="e.g., Nashik, Maharashtra, India"
            />

            {errors.location && (
              <p className="text-red-500 text-xs italic mt-2">
                {errors.location.message}
              </p>
            )}
          </div>

          {/* NEW FIELD: Skills (Using a text area for comma-separated) */}

          <div className="mb-4">
            <label
              htmlFor="skills"
              className=" text-gray-700 text-sm font-bold mb-2 flex items-center"
            >
              <Code size={16} className="mr-1 text-blue-500" />
              Key Skills (Comma Separated)
            </label>

            <textarea
              id="skills"
              {...register("skills", {
                required: "Skills are required",
              })}
              rows={2}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.skills ? "border-red-500" : "focus:border-orange-500"}`}
              placeholder="e.g., JavaScript, React, Node.js, MongoDB"
            />

            {errors.skills && (
              <p className="text-red-500 text-xs italic mt-2">
                {errors.skills.message}
              </p>
            )}
          </div>
          {/* NEW FIELD: Ratings */}
          <div className="mb-4">
            <label
              htmlFor="ratings"
              className=" text-gray-700 text-sm font-bold mb-2 flex items-center"
            >
              <Star size={16} className="mr-1 text-yellow-500" />
              Self-Rating (1-5)
            </label>

            <div className="flex items-center space-x-4">
              <input
                type="number"
                id="ratings"
                {...register("ratings", {
                  required: "Rating is required",
                  valueAsNumber: true,
                  min: { value: 1, message: "Min rating is 1" },
                  max: { value: 5, message: "Max rating is 5" },
                })}
                className={`shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.ratings ? "border-red-500" : "focus:border-orange-500"}`}
              />
              {renderRatingStars(ratingWatch)}
            </div>

            {errors.ratings && (
              <p className="text-red-500 text-xs italic mt-2">
                {errors.ratings.message}
              </p>
            )}
          </div>
          {/* Optional Field: Image URL */}
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Profile Image URL (Optional)
            </label>

            <input
              type="url"
              id="image"
              {...register("image")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-orange-500`}
              placeholder="e.g., https://example.com/profile.jpg"
            />
          </div>
          {/* Existing Field: Resume File */}
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
              {...register("resume", {
                validate: (value) => value.length > 0 || "Resume is required",
              })}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-orange-50 file:text-orange-700
                hover:file:bg-orange-100 cursor-pointer"
            />

            {errors.resume && (
              <p className="text-red-500 text-xs italic mt-2">
                {errors.resume.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-end pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline flex items-center transition-colors
                ${isSubmitting ? "bg-gray-400 text-gray-700 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600 text-white"}
              `}
            >
              {isSubmitting ? (
                "Submitting..."
              ) : (
                <>
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
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
