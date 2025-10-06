// components/JobApplicationForm.tsx
"use client";

import { useState, useCallback, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  UploadCloud,
  User,
  FileText,
  Send,
  Users,
  X,
  MapPin,
  Code,
  Star,
  Zap,
  Image as ImageIcon,
  CirclePlus, // Renamed to avoid conflict with Image component
} from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { fetchApplications } from "@/redux/features/applicationSlice";
import Image from "next/image";

// 1. Define the TypeScript interface for form data (Schema-aligned)
interface IFormInput {
  appliedBy: string; // Corresponds to appliedBy (Mongoose ObjectId, using string for form input)
  // job is passed via prop (jobId)
  userLocation: string; // Corresponds to userLocation
  userProfileImage: FileList | null; // Changed to FileList for upload, allow null if optional
  skills: string; // Corresponds to skills (comma-separated string in form, converted to string[] on submit)
  resume: FileList; // Corresponds to resume (URL/path after upload, using FileList for form input)
  yearOfExperience: number; // Corresponds to yearOfExperience (NEW FIELD)
  rating: number; // Corresponds to rating
}

const JobApplicationForm = ({
  jobTitle = "Senior Frontend Developer",
  jobId,
}: {
  jobTitle?: string;
  jobId?: string;
}) => {
  const [job_Id, setJob_Id] = useState(jobId || null);
  const { userData, isAutheticated } = useSelector(
    (state: RootState) => state.auth
  );
  const [openForm, setOpenForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<IFormInput>({
    defaultValues: {
      yearOfExperience: 0, // Default year of experience
      rating: 3, // Default rating
      userProfileImage: null, // Initialize as null
    },
  });

  // Watch fields for dynamic display
  const ratingWatch = watch("rating", 3);
  const resumeWatch = watch("resume");
  const userProfileImageWatch = watch("userProfileImage"); // Watch for changes in the profile image file input

  const dispatch = useDispatch();

  const resumeFile =
    resumeWatch && resumeWatch.length > 0 ? resumeWatch[0] : null;

  // Effect to handle profile image preview
  useEffect(() => {
    if (userProfileImageWatch && userProfileImageWatch.length > 0) {
      const file = userProfileImageWatch[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setProfileImagePreview(null);
    }
    // Cleanup object URL when component unmounts or file changes
    return () => {
      if (profileImagePreview) {
        URL.revokeObjectURL(profileImagePreview);
      }
    };
  }, [userProfileImageWatch]);

  // Handler for star click
  const handleRatingClick = useCallback(
    (newRating: number) => {
      setValue("rating", newRating, { shouldValidate: true });
    },
    [setValue]
  );

  // Helper to render star rating
  const renderRatingStars = (currentRating: number) => {
    const ratingValue = Math.round(currentRating || 0);
    return (
      <div className="flex space-x-1 items-center">
        {Array(5)
          .fill(0)
          .map((_, index) => {
            const starValue = index + 1;
            return (
              <Star
                key={`star-${starValue}`}
                size={24}
                onClick={() => handleRatingClick(starValue)}
                className={`cursor-pointer transition-colors ${
                  starValue <= ratingValue
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-300 hover:text-yellow-300 hover:fill-yellow-300"
                }`}
                aria-label={`Rate ${starValue} stars`}
              />
            );
          })}
      </div>
    );
  };

  // 2. Define the submit handler
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsSubmitting(true);

    // const applicationData = {
    //   appliedBy: data.appliedBy,
    //   job: jobId, // from prop
    //   userLocation: data.userLocation,
    //   userProfileImage:
    //     data.userProfileImage && data.userProfileImage.length > 0
    //       ? `[FILE_UPLOAD_PATH]/${data.userProfileImage[0].name}` // Mock file upload path
    //       : undefined, // Or a default image URL
    //   skills: data.skills
    //     .split(",")
    //     .map((s) => s.trim())
    //     .filter(Boolean), // Convert comma-separated string to array
    //   resume: data.resume[0]
    //     ? `[FILE_UPLOAD_PATH]/${data.resume[0].name}`
    //     : "No file uploaded", // Mock file upload path
    //   yearOfExperience: data.yearOfExperience,
    //   rating: data.rating,
    //   status: "pending", // Default status is "pending"
    // };    // For demonstration, you might want to log the FormData content

    const formData = new FormData();
    // formData.append("appliedBy", userData?._id as string);
    formData.append("job", job_Id as string);
    formData.append("userLocation", data.userLocation);
    formData.append("yearOfExperience", data.yearOfExperience.toString());
    formData.append("skills", data.skills);
    formData.append("rating", data.rating.toString());

    if (data.userProfileImage && data.userProfileImage.length > 0) {
      formData.append("userProfileImage", data.userProfileImage[0]);
    }
    if (data.resume && data.resume.length > 0) {
      formData.append("resume", data.resume[0]);
    }

    // Log FormData contents (for debugging, won't show file content directly)
    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}:`, value);
    // }

    // Example of how you might send this to an API:
    try {
      toast.loading("Submitting Application...", { id: "apply" });
      const response = await fetch(
        `/api/user/applications/apply-for-job/${job_Id}`,
        {
          method: "POST",
          credentials: "include",
          body: formData, // FormData is automatically set with 'multipart/form-data' header
        }
      );
      if (!response.ok) {
        // console.log(response.status);
        if (response.status === 409) {
          toast.error("You have already applied for this job.", {
            id: "apply",
          });
          return
        }
        throw new Error("Failed to submit application");
      }
      const result = await response.json();
      // console.log("Application submitted successfully:", result);
      toast.success("Application submitted successfully!", { id: "apply" });
      reset();
      setOpenForm(false);
      setProfileImagePreview(null);
      if (userData?.role === "admin" || userData?.role === "employee") {
        dispatch(fetchApplications() as any);
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.", {
        id: "apply",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenForm = () => {
    if (!isAutheticated) {
      toast.error("Please login to apply for this job");
      return;
    }
    setOpenForm(true);
  };

  return (
    <>
      <button
        onClick={handleOpenForm}
        className="bg-[#FF7F3F] text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2 w-full sm:w-auto"
      >
        {userData?.role === "admin" || userData?.role === "employee" ? (
          <CirclePlus size={20} />
        ) : (
          <Users size={20} />
        )}
        <span>
          {userData?.role === "admin" || userData?.role === "employee"
            ? "Add Application"
            : "Apply Now"}
        </span>
      </button>

      {/* Modal / Dialog */}
      <div
        className={`${
          openForm ? "block" : "hidden"
        } fixed inset-0 bg-secondary/50 z-50 flex items-center justify-center backdrop-blur-[6px]`}
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
            onClick={() => {
              setOpenForm(false);
              setProfileImagePreview(null);
              reset();
            }}
          >
            <X />
          </Button>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Field: appliedBy (User ID) */}
            {/* Remove this block after User Login is implemented to get the ID from auth context */}
            {/* <div>
              <label
                htmlFor="appliedBy"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Your Applicant ID
              </label>
              <div className="relative">
                <User
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  id="appliedBy"
                  {...register("appliedBy", {
                    required: "Applicant ID is required",
                  })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7F3F] focus:border-[#FF7F3F] transition-colors"
                  placeholder="e.g., 68d18ff183a7110140280d78"
                  disabled={isSubmitting}
                />
              </div>
              {errors.appliedBy && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.appliedBy.message}
                </p>
              )}
            </div> */}

            {userData?.role === "admin" ||
              (userData?.role === "employee" && (
                <div>
                  <label
                    htmlFor="appliedBy"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Job Application ID
                  </label>
                  <div className="relative">
                    <User
                      size={20}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      id="appliedBy"
                      onChange={(e) => setJob_Id(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7F3F] focus:border-[#FF7F3F] transition-colors"
                      placeholder="e.g., 68d18ff183a7110140280d78"
                      disabled={isSubmitting}
                    />
                  </div>
                  {errors.appliedBy && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.appliedBy.message}
                    </p>
                  )}
                </div>
              ))}
            {/* --- */}

            {/* Field: userLocation (Schema field: userLocation) */}
            <div>
              <label
                htmlFor="userLocation"
                className=" text-sm font-medium text-gray-700 mb-2 flex items-center"
              >
                <MapPin size={16} className="mr-1 text-orange-500" /> Current
                Location
              </label>
              <input
                type="text"
                id="userLocation"
                {...register("userLocation", {
                  required: "Location is required",
                })}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7F3F] focus:border-[#FF7F3F] transition-colors"
                placeholder="e.g., Nashik, Maharashtra, India"
                disabled={isSubmitting}
              />
              {errors.userLocation && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.userLocation.message}
                </p>
              )}
            </div>

            {/* Field: yearOfExperience */}
            <div>
              <label
                htmlFor="yearOfExperience"
                className=" text-sm font-medium text-gray-700 mb-2 flex items-center"
              >
                <Zap size={16} className="mr-1 text-purple-500" /> Years of
                Professional Experience
              </label>
              <input
                type="number"
                id="yearOfExperience"
                {...register("yearOfExperience", {
                  required: "Years of experience is required",
                  valueAsNumber: true,
                  min: { value: 0, message: "Minimum experience is 0" },
                  max: { value: 50, message: "Maximum experience is 50" }, // Sensible max value
                })}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7F3F] focus:border-[#FF7F3F] transition-colors"
                placeholder="e.g., 5"
                min="0"
                step="1"
                disabled={isSubmitting}
              />
              {errors.yearOfExperience && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.yearOfExperience.message}
                </p>
              )}
            </div>

            {/* Field: skills (Textarea) */}
            <div>
              <label
                htmlFor="skills"
                className=" text-sm font-medium text-gray-700 mb-2 flex items-center"
              >
                <Code size={16} className="mr-1 text-blue-500" /> Key Skills
                (Comma Separated)
              </label>
              <textarea
                id="skills"
                {...register("skills", { required: "Skills are required" })}
                rows={2}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7F3F] focus:border-[#FF7F3F] transition-colors"
                placeholder="e.g., JavaScript, React, Node.js, MongoDB"
                disabled={isSubmitting}
              />
              {errors.skills && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.skills.message}
                </p>
              )}
            </div>

            {/* Field: rating (Clickable Stars) */}
            <div>
              <label
                htmlFor="rating"
                className=" text-sm font-medium text-gray-700 mb-2 flex items-center"
              >
                <Star size={16} className="mr-1 text-yellow-500" /> Rating (1-5)
              </label>
              <div className="flex items-center space-x-4">
                <div className="text-lg font-bold text-gray-700 w-1/4">
                  {ratingWatch} / 5
                </div>
                {renderRatingStars(ratingWatch)}
                <input
                  type="hidden"
                  id="rating"
                  {...register("rating", {
                    required: "Rating is required",
                    valueAsNumber: true,
                    min: { value: 1, message: "Min rating is 1" },
                    max: { value: 5, message: "Max rating is 5" },
                  })}
                />
              </div>
              {errors.rating && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.rating.message}
                </p>
              )}
            </div>

            {/* Field: userProfileImage (Uploadable with preview) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Image
              </label>
              <div
                className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg transition-colors cursor-pointer 
                            ${errors.userProfileImage ? "border-red-500" : "border-gray-300 hover:border-[#FF7F3F]"}`}
                onClick={() =>
                  document.getElementById("userProfileImageUpload")?.click()
                }
              >
                <input
                  type="file"
                  id="userProfileImageUpload"
                  className="hidden"
                  accept="image/*"
                  {...register("userProfileImage")} // Not required by schema but good UX
                  disabled={isSubmitting}
                />
                {profileImagePreview ? (
                  <div className="flex flex-col items-center">
                    <Image
                      height={100}
                      width={100}
                      src={profileImagePreview}
                      alt="Profile Preview"
                      className="w-24 h-24 object-cover rounded-full mb-2 border-2 border-[#FF7F3F]"
                    />
                    <span className="font-medium text-gray-700">
                      {userProfileImageWatch && userProfileImageWatch.length > 0
                        ? userProfileImageWatch[0].name
                        : "Image selected"}
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      Click to change
                    </span>
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    <ImageIcon
                      size={32}
                      className="mx-auto mb-2 text-[#FF7F3F]"
                    />
                    <p className="font-semibold">
                      Click to upload profile image
                    </p>
                    <p className="text-xs mt-1">
                      (JPG, PNG, GIF - Max 2MB recommended)
                    </p>
                  </div>
                )}
              </div>
              {errors.userProfileImage && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.userProfileImage.message as string}
                </p>
              )}
            </div>

            {/* Field: resume Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resume / CV
              </label>
              <div
                className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg transition-colors cursor-pointer 
                            ${errors.resume ? "border-red-500" : "border-gray-300 hover:border-[#FF7F3F]"}`}
                onClick={() => document.getElementById("resumeUpload")?.click()}
              >
                <input
                  type="file"
                  id="resumeUpload"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  {...register("resume", {
                    required: "Resume file is required",
                    validate: (value) =>
                      value.length > 0 || "Resume file is required",
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
                    <UploadCloud
                      size={32}
                      className="mx-auto mb-2 text-[#FF7F3F]"
                    />
                    <p className="font-semibold">
                      Click to upload (PDF or DOCX)
                    </p>
                    <p className="text-xs mt-1">
                      (Max 5MB file, PDF or DOCX only)
                    </p>
                  </div>
                )}
              </div>
              {errors.resume && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.resume.message}
                </p>
              )}
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
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
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
