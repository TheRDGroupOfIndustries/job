// components/JobSearchBar.jsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, MapPin, ChevronDown, Briefcase } from "lucide-react";

const JobSearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from URL params
  const [title, setTitle] = useState(searchParams.get("title") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [type, setType] = useState(searchParams.get("type") || "");

  const [isOpen, setIsOpen] = useState(false);

  // Example job types for the select dropdown
  const jobTypes = [
    "All",
    "Full-time",
    "Part-time",
    "Contract",
    "Remote",
    "Internship",
  ];

  // Helper to find the current label for display
  const selectedLabel =
    jobTypes.find((opt) => opt === type) ||
    searchParams.get("type") ||
    "Job Type";

  const handleSelect = (value: string) => {
    if (value === "All") {
      setType("");
    } else {
      setType(value);
    }
    setIsOpen(false); // Close dropdown after selection
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // router.push('/browse-jobs');
    const newParams = new URLSearchParams(searchParams.toString());

    // Update params based on state
    if (title) {
      newParams.set("title", title.trim().toLowerCase());
    } else {
      newParams.delete("title");
    }
    if (location) {
      newParams.set("location", location.trim().toLowerCase());
    } else {
      newParams.delete("location");
    }
    if (type) {
      newParams.set("type", type.trim().toLowerCase());
    } else {
      newParams.delete("type");
    }

    // Navigate to the new URL
    router.push(`/browse-jobs?${newParams.toString()}`);
  };

  return (
    <div className="relative z-20 w-full max-w-5xl mx-auto px-4">
      <form
        onSubmit={handleSearch}
        className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 border border-gray-100"
      >
        {/* Job Title / Keyword Input */}
        <div className="flex-1">
          <div className="flex items-center min-w-[250px] bg-white border border-gray-300 rounded-lg p-3">
            <Search size={20} className="text-gray-400 mr-2 flex-shrink-0" />
            <input
              type="text"
              placeholder="Job Title or Keyword"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-gray-700 focus:outline-none placeholder-gray-400"
            />
          </div>
        </div>

        {/* Location Input */}
        <div className="flex-1">
          <div className="flex items-center min-w-[250px] bg-white border border-gray-300 rounded-lg p-3">
            <MapPin size={20} className="text-gray-400 mr-2 flex-shrink-0" />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full text-gray-700 focus:outline-none placeholder-gray-400"
            />
          </div>
        </div>

        {/* Job Type Select */}
        <div className="flex-1 relative">
          {/* --- 1. The Custom Input/Trigger --- */}
          <div
            className="flex items-center min-w-[200px] bg-white border border-gray-300 rounded-lg p-3 cursor-pointer transition duration-150 hover:border-blue-500"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Briefcase size={20} className="text-gray-400 mr-2 flex-shrink-0" />
            <span className={type === "" ? "text-gray-400" : "text-gray-700"}>
              {selectedLabel}
            </span>
            <ChevronDown
              size={18}
              className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
            />
          </div>

          {/* --- 2. The Custom Dropdown List --- */}
          {isOpen && (
            <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-xl max-h-60 overflow-y-auto">
              {jobTypes
                // .filter((opt) => !opt.disabled) // Filter out the disabled placeholder
                .map((option) => (
                  <li
                    key={option}
                    className={`p-3 cursor-pointer text-gray-700 transition duration-150 
                            ${option === type ? "bg-blue-100 font-semibold" : "hover:bg-gray-100"} 
                            ${option === "All" ? "border-b border-gray-200" : ""}
                          `}
                    onClick={() => handleSelect(option)}
                  >
                    {option}
                  </li>
                ))}
            </ul>
          )}
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="lg:w-auto bg-primary text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2 whitespace-nowrap cursor-pointer"
        >
          <Search size={20} />
          <span className="hidden sm:inline">Search Jobs</span>
        </button>
      </form>
    </div>
  );
};

export default JobSearchBar;
