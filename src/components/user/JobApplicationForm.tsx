// components/JobApplicationForm.jsx
"use client";

import React, { useState } from "react";
import { UploadCloud, User, FileText, Send, Users } from "lucide-react";
import { Button } from "../ui/button";
import { X } from "lucide-react";



const JobApplicationForm = ({
  jobTitle = "Senior Frontend Developer",
  jobId,
}) => {
  const [fullName, setFullName] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const handleFileChange = (e) => {
    // Handles both drag-and-drop and file input selection
    const file = e.target.files ? e.target.files[0] : e;
    setResumeFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDraggedOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDraggedOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggedOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange({ files: e.dataTransfer.files });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would implement your form submission logic:
    // 1. Validate fields (Name must be present, file must be present)
    // 2. Create FormData object and append fullName and resumeFile
    // 3. Use an API (like Axios/Fetch) to submit the data to your backend

    if (!fullName || !resumeFile) {
      alert("Please enter your full name and upload your resume.");
      return;
    }

    setIsSubmitting(true);
    console.log("Submitting Application for:", jobTitle);
    console.log("Full Name:", fullName);
    console.log("Resume File:", resumeFile.name);

    // Simulate API call delay
    setTimeout(() => {
      setIsSubmitting(false);
      alert(
        `Application for ${jobTitle} submitted successfully! (Mock Submission)`
      );
      setFullName("");
      setResumeFile(null);
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

      <div
        className={`${openForm ? "block" : "hidden"}  fixed inset-0 bg-secondary/50 z-50 flex items-center justify-center backdrop-blur-[6px]`}
      >
        <div
          className={`max-w-xl mx-auto p-6 md:p-8 bg-white rounded-xl shadow-2xl border border-gray-100 relative `}
        >
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            Apply for {jobTitle}
          </h2>
          <p className="text-gray-600 mb-8">
            Please complete the fields below to submit your application.
          </p>

          <Button
            className="text-black hover:bg-orange-600 rounded-full p-2 cursor-pointer absolute top-2 right-2"
            onClick={()=> setOpenForm(false)}
          >
            <X />
          </Button>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Field */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <User
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7F3F] focus:border-[#FF7F3F] transition-colors"
                  placeholder="Enter your full legal name"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Resume Upload Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resume / CV (PDF or DOCX)
              </label>
              <div
                className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg transition-colors cursor-pointer 
                        ${isDraggedOver ? "border-[#FF7F3F] bg-orange-50" : "border-gray-300 hover:border-[#FF7F3F]"}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById("resumeUpload").click()}
              >
                <input
                  type="file"
                  id="resumeUpload"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
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
                      Click to upload or drag & drop
                    </p>
                    <p className="text-xs mt-1">
                      (Max 5MB file, PDF or DOCX only)
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full flex items-center justify-center space-x-2 font-semibold py-3 px-4 rounded-lg shadow-md transition-colors 
                      ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-[#FF7F3F] text-white hover:bg-orange-600"}`}
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
