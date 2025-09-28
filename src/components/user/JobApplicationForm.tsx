// components/JobApplicationForm.tsx
"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { UploadCloud, User, FileText, Send, Users, X, MapPin, Code, Star } from "lucide-react";
import { Button } from "@/components/ui/button"; 

// 1. Define the TypeScript interface for form data (Schema)
interface IFormInput {
  appliedBy: string; 
  jobDesignation: string; 
  location: string;
  skills: string; 
  ratings: number;
  image: string; 
  resume: FileList; 
}

const JobApplicationForm = ({
  jobTitle = "Senior Frontend Developer",
  jobId,
}: {
  jobTitle?: string;
  jobId: string;
}) => {
  const [openForm, setOpenForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<IFormInput>({
    defaultValues: {
      jobDesignation: jobTitle, // Set default job title from props
      ratings: 3, // Default rating
    },
  });

  // Watch fields for dynamic display
  const ratingWatch = watch("ratings", 3);
  const resumeWatch = watch("resume");
  const resumeFile = resumeWatch && resumeWatch.length > 0 ? resumeWatch[0] : null;

  // Helper to render star rating
  const renderRatingStars = (currentRating: number) => {
    const ratingValue = Math.round(currentRating || 0);
    return (
      <div className="flex space-x-1 items-center">
        {Array(5).fill(0).map((_, index) => (
          <Star
            key={index}
            size={20}
            className={index < ratingValue ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  // 2. Define the submit handler
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setIsSubmitting(true);
    
    
    console.log("Submitting Application Data:", {
        ...data,
        jobDesignation: jobTitle, // Ensure the title from prop is sent
        resume: data.resume[0] ? data.resume[0].name : 'No file',
        jobId: jobId
    });

    
    setTimeout(() => {
      alert(`Application for ${jobTitle} submitted successfully! (Mock Submission)`);
      setIsSubmitting(false);
      reset(); // Reset the form fields
      setOpenForm(false);
    }, 1500);
  };


  return (
    <>
      <button
        onClick={() => setOpenForm(true)}
        className="bg-[#FF7F3F] text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2 w-full sm:w-auto"
      >
        <Users size={20} />
        <span>Apply Now</span>
      </button>

      {/* Modal / Dialog */}
      <div
        className={`${openForm ? "block" : "hidden"} fixed inset-0 bg-secondary/50 z-50 flex items-center justify-center backdrop-blur-[6px]`}
      >
        <div className="max-w-xl w-full mx-auto p-6 md:p-8 bg-white rounded-xl shadow-2xl border border-gray-100 relative max-h-[90vh] overflow-y-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            Apply for {jobTitle}
          </h2>
          <p className="text-gray-600 mb-6">
            Please provide your details and upload your resume.
          </p>

          <Button
            className="text-black hover:bg-orange-600 rounded-full p-2 cursor-pointer absolute top-2 right-2"
            onClick={() => setOpenForm(false)}
          >
            <X />
          </Button>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* Field: appliedBy (User ID) */}
            <div>
              <label htmlFor="appliedBy" className="block text-sm font-medium text-gray-700 mb-2">
                Your Applicant ID (Internal)
              </label>
              <div className="relative">
                <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="appliedBy"
                  {...register("appliedBy", { required: "Applicant ID is required" })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7F3F] focus:border-[#FF7F3F] transition-colors"
                  placeholder="e.g., 68d18ff183a7110140280d78"
                  disabled={isSubmitting}
                />
              </div>
              {errors.appliedBy && <p className="text-red-500 text-xs mt-1">{errors.appliedBy.message}</p>}
            </div>

            {/* NEW FIELD: location */}
            <div>
              <label htmlFor="location" className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
                <MapPin size={16} className="mr-1 text-orange-500" /> Current Location
              </label>
              <input
                type="text"
                id="location"
                {...register("location", { required: "Location is required" })}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7F3F] focus:border-[#FF7F3F] transition-colors"
                placeholder="e.g., Nashik, Maharashtra, India"
                disabled={isSubmitting}
              />
              {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
            </div>

            {/* NEW FIELD: skills (Textarea) */}
            <div>
              <label htmlFor="skills" className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Code size={16} className="mr-1 text-blue-500" /> Key Skills (Comma Separated)
              </label>
              <textarea
                id="skills"
                {...register("skills", { required: "Skills are required" })}
                rows={2}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7F3F] focus:border-[#FF7F3F] transition-colors"
                placeholder="e.g., JavaScript, React, Node.js, MongoDB"
                disabled={isSubmitting}
              />
              {errors.skills && <p className="text-red-500 text-xs mt-1">{errors.skills.message}</p>}
            </div>
            
            {/* NEW FIELD: ratings */}
            <div>
              <label htmlFor="ratings" className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Star size={16} className="mr-1 text-yellow-500" /> Self-Rating (1-5)
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
                  className="w-1/4 py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7F3F] focus:border-[#FF7F3F] transition-colors text-center"
                  disabled={isSubmitting}
                />
                {renderRatingStars(ratingWatch)}
              </div>
              {errors.ratings && <p className="text-red-500 text-xs mt-1">{errors.ratings.message}</p>}
            </div>

            {/* Optional Field: image URL */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                Profile Image URL (Optional)
              </label>
              <input
                type="url"
                id="image"
                {...register("image")}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7F3F] focus:border-[#FF7F3F] transition-colors"
                placeholder="e.g., https://example.com/profile.jpg"
                disabled={isSubmitting}
              />
            </div>


            {/* Field: resume Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resume / CV (PDF or DOCX)
              </label>
              <div
                className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg transition-colors cursor-pointer border-gray-300 hover:border-[#FF7F3F]`}
                // Trigger file input click when the container is clicked
                onClick={() => document.getElementById("resumeUpload")?.click()}
              >
                <input
                  type="file"
                  id="resumeUpload"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  {...register("resume", { 
                    required: "Resume file is required",
                    validate: (value) => value.length > 0 || "Resume file is required"
                  })}
                  disabled={isSubmitting}
                />
                {resumeFile ? (
                  <div className="flex items-center space-x-3 text-green-600">
                    <FileText size={24} />
                    <span className="font-medium">{resumeFile.name}</span>
                    <span className="text-sm text-gray-500">
                      ({(resumeFile.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    <UploadCloud size={32} className="mx-auto mb-2 text-[#FF7F3F]" />
                    <p className="font-semibold">
                      Click to upload (PDF or DOCX)
                    </p>
                    <p className="text-xs mt-1">
                      (Max 5MB file, PDF or DOCX only)
                    </p>
                  </div>
                )}
              </div>
              {errors.resume && <p className="text-red-500 text-xs mt-1">{errors.resume.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full flex items-center justify-center space-x-2 font-semibold py-3 px-4 rounded-lg shadow-md transition-colors 
                ${isSubmitting ? "bg-gray-400 text-gray-600 cursor-not-allowed" : "bg-[#FF7F3F] text-white hover:bg-orange-600"}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send size={20} />
                  <span>Submit Application</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default JobApplicationForm;