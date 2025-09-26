// components/JobSearchBar.jsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, MapPin, ChevronDown, Briefcase } from 'lucide-react';

const JobSearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from URL params
  const [title, setTitle] = useState(searchParams.get('title') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [type, setType] = useState(searchParams.get('type') || '');
  
  // Example job types for the select dropdown
  const jobTypes = ["Full-time", "Part-time", "Contract", "Remote", "Internship"];

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // router.push('/browse-jobs');
    const newParams = new URLSearchParams(searchParams.toString());

    // Update params based on state
    if (title) {
      newParams.set('title', title.trim().toLowerCase());
    } else {
      newParams.delete('title');
    }
    if (location) {
      newParams.set('location', location.trim().toLowerCase());
    } else {
      newParams.delete('location');
    }
    if (type) {
      newParams.set('type', type.trim().toLowerCase());
    } else {
      newParams.delete('type');
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
          <div className="flex items-center  min-w-[200px] bg-white border border-gray-300 rounded-lg p-3 relative">
            <Briefcase size={20} className="text-gray-400 mr-2 flex-shrink-0" />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="appearance-none w-full text-gray-700 focus:outline-none bg-transparent cursor-pointer pr-8"
            >
              <option value="" disabled hidden>Job Type</option>
              <option value="All">All Types</option>
              {jobTypes.map(jobType => (
                <option key={jobType} value={jobType}>{jobType}</option>
              ))}
            </select>
            <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
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