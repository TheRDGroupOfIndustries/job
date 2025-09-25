// components/FeaturedJobs.jsx
"use client";

import React, { useState } from "react";
import JobCard from "./JobCard";
import { ArrowRight } from "lucide-react";

// Data Mockup - Including the filter type (Full-time, Contract, Remote, etc.)
const ALL_JOBS = [
  // First Row
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $150k",
    posted: "2 days ago",
    contractType: "Full-time", // Assuming 'white' means default
    color: "default",
    logoUrl: "/images/jobs/Senior-frontend-developer.jpg",
    tags: ["React", "TypeScript", "Node.js"],
    filterTags: ["Full-time"],
  },
  {
    id: 2,
    title: "Product Manager",
    company: "InnovateLab",
    location: "New York, NY",
    type: "Full-time",
    salary: "$130k - $160k",
    posted: "1 day ago",
    contractType: "Full-time",
    color: "orange",
    logoUrl: "/images/jobs/product-manager.jpg",
    tags: ["Strategy", "Analytics", "Leadership"],
    filterTags: ["Full-time"],
  },
  {
    id: 3,
    title: "UX/UI Designer",
    company: "DesignStudio",
    location: "Remote",
    type: "Full-time",
    salary: "$80k - $100k",
    posted: "3 days ago",
    contractType: "Contract",
    color: "orange",
    logoUrl: "/images/jobs/ui-ux-designer.jpg",
    tags: ["Figma", "Prototyping", "User Research"],
    filterTags: ["Remote", "Contract", "Full-time"],
  },
  // Second Row
  {
    id: 4,
    title: "Data Scientist",
    company: "DataFlow Analytics",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$110k - $140k",
    posted: "1 week ago",
    contractType: "Full-time",
    color: "orange",
    logoUrl: "/images/jobs/data-scientist.jpg",
    tags: ["Python", "Machine Learning", "SQL"],
    filterTags: ["Full-time"],
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "CloudTech Solutions",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$125k - $155k",
    posted: "4 days ago",
    contractType: "Full-time",
    color: "orange",
    logoUrl: "/images/jobs/devops-engg.jpg",
    tags: ["AWS", "Docker", "Kubernetes"],
    filterTags: ["Full-time"],
  },
  {
    id: 6,
    title: "Marketing Director",
    company: "Growthtrackers",
    location: "Los Angeles, CA",
    type: "Full-time",
    salary: "$140k - $170k",
    posted: "5 days ago",
    contractType: "Full-time",
    color: "orange",
    logoUrl: "/images/jobs/marketing-director.jpg",
    tags: ["Digital Marketing", "Growth", "Analytics"],
    filterTags: ["Full-time"],
  },
  // Additional Job for "Part-time" and "Contract" filtering demonstration
  {
    id: 7,
    title: "Junior Writer",
    company: "BlogCorp",
    location: "Remote",
    type: "Part-time",
    salary: "$25/hr - $35/hr",
    posted: "1 day ago",
    contractType: "Part-time",
    color: "orange",
    logoUrl: "/images/jobs/product-manager.jpg",
    tags: ["Writing", "Editing"],
    filterTags: ["Part-time", "Remote"],
  },
];

const FILTER_TABS = ["All", "Full-time", "Part-time", "Contract", "Remote"];

const FeaturedJobs = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredJobs = ALL_JOBS.filter((job) => {
    if (activeFilter === "All") {
      return true;
    }
    // Check if the job's filterTags array includes the active filter
    return job.filterTags.includes(activeFilter);
  });

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
          Featured Job Opportunities
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Discover hand-picked opportunities from top companies
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center space-x-2 sm:space-x-4 mb-16">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`text-sm md:text-base font-semibold py-2 px-5 rounded-full shadow-lg transition-all cursor-pointer duration-300 mb-2 ${
                activeFilter === tab
                  ? "bg-primary text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-300 hover:border-primary hover:text-primary "
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredJobs.slice(0, 6).map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        {/* View All Button */}
        <button className="inline-flex items-center text-primary border-2 border-primary font-semibold py-3 px-8 rounded-lg transition-colors hover:bg-primary hover:text-white cursor-pointer">
          View All Jobs
          <ArrowRight size={20} className="ml-3" />
        </button>
      </div>

      {/* Floating "Talk with Us" Button (Not explicitly in this image, but retaining it) */}
      {/* <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-primary text-white font-medium py-3 px-6 rounded-full shadow-lg hover:bg-orange-600 transition-colors flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          <span>Talk with Us</span>
        </button>
      </div> */}
    </section>
  );
};

export default FeaturedJobs;
