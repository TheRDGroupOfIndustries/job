"use client";

import React from "react";
import { Search, MapPin } from "lucide-react";

const JobSearchBar = () => {
  return (
    <div className="bg-[#F5F5F5] rounded-2xl p-6 shadow-lg flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 max-w-4xl mx-auto">
      {/* Job Title Input */}
      <div className="flex-1 w-full relative bg-[#FFFFFF] border border-[#9CA3B2] rounded-xl overflow-hidden text-[#9CA3B2]">
        <input
          type="text"
          placeholder="Job Title or Keyword"
          className="w-full pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-sm "
        />
        {/* Search Icon */}
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 "
          size={20}
        />
      </div>

      {/* Location Input */}
      <div className="flex-1 w-full relative bg-[#FFFFFF] border border-[#9CA3B2] rounded-xl overflow-hidden text-[#9CA3B2]">
        <input
          type="text"
          placeholder="Location"
          className="w-full pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {/* Map Pin Icon */}
        <MapPin
          className="absolute left-3 top-1/2 transform -translate-y-1/2"
          size={20}
        />
      </div>

      {/* Job Type Dropdown */}
      <div className="flex-1 w-full relative bg-[#FFFFFF] border border-[#9CA3B2] rounded-xl overflow-hidden text-[#9CA3B2]">
        <select className="w-full pl-4 pr-10 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer">
          <option value="">Job Type</option>
          <option value="full-time">Full-Time</option>
          <option value="part-time">Part-Time</option>
          <option value="contract">Contract</option>
        </select>
        {/* Chevron Down Icon  */}
        <svg
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-900 pointer-events-none"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6"></path>
        </svg>
      </div>

      {/* Search Button */}
      <button className="w-full md:w-auto px-8 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-orange-600 cursor-pointer flex items-center justify-center space-x-2 hover:scale-105 transform transition-all duration-200">
        {/* Search Icon */}
        <Search size={20} />
        <span>Search Jobs</span>
      </button>
    </div>
  );
};

export default JobSearchBar;
