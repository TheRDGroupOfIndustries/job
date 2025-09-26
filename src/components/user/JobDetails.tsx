// components/JobDetailPage.jsx
"use client";

import React, { useEffect, useState } from "react";
import {
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Heart,
  Share2,
  Users,
  Building,
  Calendar,
  LocateFixed,
  Code,
  GraduationCap,
  Scale,
  Zap,
  UserCheck,
  Accessibility,
  IndianRupee,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { fetchJobs } from "@/redux/features/jobSlice";
import JobApplicationForm from "./JobApplicationForm";
import Image from "next/image";

interface Job {
  _id: string;
  designation: string;
  companyDetails: { name: string };
  annualSalary: { min: number; max: number; currency: string };
  workExperience: { min: number; max: number };
  location: string[];
  createdAt: string;
  workMode: string;
  employmentType: string;
  logoUrl?: string;
  jobDescription: string;
  keySkills: string[];
  skills: string[];
  diversityHiring?: { women?: boolean; womenReturning?: boolean; exDefence?: boolean; differentlyAbled?: boolean };
  vacancy?: number;
  department?: string;
  educationQualification?: string;
  roleCategory?: string;
  companyIndustry?: string;
}

// Function to format salary
const formatSalary = (salary: Job['annualSalary'] | undefined) => {
  if (!salary || salary.min === undefined || salary.max === undefined) return "Competitive";
  const currencySymbol = salary.currency === 'INR' ? '₹' : salary.currency;
  return `${currencySymbol}${salary.min} - ${currencySymbol}${salary.max} Annually`;
};

const formatExperience = (exp: Job['workExperience'] | undefined) => {
  if (!exp || (!exp.min && !exp.max)) return "Not Specified";
  if (exp.min === exp.max) return `${exp.min} Years`;
  return `${exp.min} - ${exp.max} Years`;
};

const JobDetails: React.FC<{ id: string }> = ({ id }) => {
  const dispatch: any = useDispatch();
  const { jobs } = useSelector((state: RootState) => state.job);
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    const selectedJob = jobs.find((job) => job._id === id);
    if (selectedJob) {
      setJob(selectedJob as any);
    } else if (jobs.length === 0) {
      // If jobs are not loaded yet, dispatch fetchJobs
      dispatch(fetchJobs());
    }
  }, [id, jobs, dispatch]);

  // Early return if job is not found
  if (!job) {
    return (
      <div className="bg-gray-50 min-h-screen pt-32 pb-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  // Safe data preparation with null checks
  const jobTitle = job?.designation || "Job Title Not Available";
  const companyName = job.companyDetails?.name || "Company Name Not Available";
  const salaryRange = formatSalary(job?.annualSalary);
  const experienceRange = formatExperience(job?.workExperience);
  const locationDisplay = job?.location?.length > 0 ? job.location.join(", ") : "Location Not Specified";
  const postedDate = job?.createdAt 
    ? new Date(job.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Date Not Available";

  const workModeIcon = job?.workMode === "in-office" ? LocateFixed : Briefcase;
  const diversityFlags = job?.diversityHiring || {};

  // Helper data for the side panel (can be customized)
  const jobFacts = [
    { 
      icon: Users, 
      label: "Vacancy", 
      value: job?.vacancy ? `${job.vacancy} Openings` : "Not Specified"
    },
    { 
      icon: Code, 
      label: "Department", 
      value: job?.department || "Not Specified"
    },
    {
      icon: GraduationCap,
      label: "Education",
      value: job?.educationQualification || "Not Specified",
    },
    { 
      icon: Scale, 
      label: "Role Category", 
      value: job?.roleCategory || "Not Specified"
    },
    { 
      icon: Zap, 
      label: "Work Mode", 
      value: job?.workMode ? job.workMode.toUpperCase() : "Not Specified"
    },
    { 
      icon: Building, 
      label: "Industry", 
      value: job?.companyIndustry || "Not Specified"
    },
  ];

  const getTagStyle = (tag: string) => {
    const baseClasses =
      "text-xs font-medium px-2.5 py-0.5 rounded-full transition-colors";
    // Simple consistent colors for key skills
    if (tag === "react") return `${baseClasses} bg-blue-100 text-blue-800`;
    if (tag === "analytics")
      return `${baseClasses} bg-indigo-100 text-indigo-800`;
    if (tag === "sql") return `${baseClasses} bg-green-100 text-green-800`;
    if (tag === "communication") return `${baseClasses} bg-purple-100 text-purple-800`;
    if (tag === "jira") return `${baseClasses} bg-yellow-100 text-yellow-800`;
    return `${baseClasses} bg-gray-100 text-gray-700`;
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* 1. Sticky Apply Section */}
        <div className="bg-white shadow-md p-4 z-40 rounded-xl">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-bold text-gray-900 leading-tight">
                {jobTitle}
              </h3> 
              <p className="text-sm text-gray-600">
                {companyName} &bull; {salaryRange}
              </p>
            </div>
            {/* <button className="bg-[#FF7F3F] text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2 w-full sm:w-auto">
              <Users size={20} />
              <span>Apply Now</span>
            </button> */}
            <JobApplicationForm jobTitle={jobTitle} jobId={id} />
          </div>
        </div>

        {/* 2. Job Details Header */}
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-200 flex flex-col lg:flex-row items-start justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center md:items-start text-center lg:text-left gap-4 md:gap-6 flex-grow">
            {/* Company Logo */}
            <Image
              height={50}
              width={50}
              src={job?.logoUrl || "/images/jobs/devops-engg.jpg"}
              alt={`${companyName} logo`}
              className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border border-gray-100 p-1 bg-white flex-shrink-0"
            />

            {/* Job Title & Quick Info */}
            <div className="flex flex-col items-center md:items-start">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
                {jobTitle}
              </h1>
              <div className="flex items-center space-x-2 mb-3">
                <h2 className="text-xl font-semibold text-gray-700">
                  {companyName}
                </h2>
                <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-orange-100 text-[#FF7F3F]">
                  {job?.employmentType ? job.employmentType.toUpperCase() : "FULL-TIME"}
                </span>
              </div>

              {/* Key Summary Details */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-2 text-gray-600 text-sm md:text-base mt-2">
                <div className="flex items-center">
                  <MapPin
                    size={18}
                    className="text-[#FF7F3F] mr-2 flex-shrink-0"
                  />
                  <span>{locationDisplay}</span>
                </div>
                <div className="flex items-center">
                  <Briefcase
                    size={18}
                    className="text-[#FF7F3F] mr-2 flex-shrink-0"
                  />
                  <span>{experienceRange}</span>
                </div>
                <div className="flex items-center">
                  <IndianRupee
                    size={18}
                    className="text-[#FF7F3F] mr-2 flex-shrink-0"
                  />
                  <span>{salaryRange}</span>
                </div>
                <div className="flex items-center">
                  <Clock
                    size={18}
                    className="text-[#FF7F3F] mr-2 flex-shrink-0"
                  />
                  <span>Posted: {postedDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons (Save/Share) */}
          <div className="flex space-x-3 mt-4 lg:mt-0 self-center">
            {/* <button
              aria-label="Save Job"
              className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-[#FF7F3F] transition-colors"
            >
              <Heart size={20} />
            </button> */}
            {/* <button
              aria-label="Share Job"
              className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-blue-500 transition-colors"
            >
              <Share2 size={20} />
            </button> */}
          </div>
        </div>

        {/* 3. Main Content (Description & Side Panel) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Job Description and Skills (2/3 width) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Job Description
              </h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-8">
                {job?.jobDescription || "Job description not available."}
              </p>

              {/* Key Skills Section */}
              {job?.keySkills && job.keySkills.length > 0 && (
                <>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Key Skills
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {job.keySkills.map((tag, index) => (
                      <span key={index} className={getTagStyle(tag)}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </>
              )}

              {/* Mandatory Technologies Section */}
              {job?.skills && job.skills.length > 0 && (
                <>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Mandatory Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((tag, index) => (
                      <span key={index} className={getTagStyle(tag)}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Diversity Hiring Section */}
            {diversityFlags && (
              diversityFlags.women ||
              diversityFlags.womenReturning ||
              diversityFlags.exDefence ||
              diversityFlags.differentlyAbled
            ) && (
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-200">
                <h3 className="text-2xl font-bold text-[#FF7F3F] mb-4">
                  Diversity Focus
                </h3>
                <div className="grid grid-cols-2 gap-4 text-gray-700">
                  {diversityFlags.women && (
                    <div className="flex items-center space-x-2">
                      <UserCheck size={20} className="text-green-500" />
                      <span>Women Candidates</span>
                    </div>
                  )}
                  {diversityFlags.womenReturning && (
                    <div className="flex items-center space-x-2">
                      <UserCheck size={20} className="text-green-500" />
                      <span>Women Returnees</span>
                    </div>
                  )}
                  {diversityFlags.exDefence && (
                    <div className="flex items-center space-x-2">
                      <UserCheck size={20} className="text-green-500" />
                      <span>Ex-Defence Personnel</span>
                    </div>
                  )}
                  {diversityFlags.differentlyAbled && (
                    <div className="flex items-center space-x-2">
                      <Accessibility size={20} className="text-green-500" />
                      <span>Differently Abled</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Job Facts (1/3 width) */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-200 sticky top-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Job Summary
              </h3>
              <ul className="space-y-4">
                {jobFacts.map((fact, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between border-b pb-2 last:border-b-0 last:pb-0"
                  >
                    <div className="flex items-center text-gray-600">
                      <fact.icon size={20} className="text-[#FF7F3F] mr-3" />
                      <span>{fact.label}</span>
                    </div>
                    <span className="font-semibold text-gray-800 text-right">
                      {fact.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;