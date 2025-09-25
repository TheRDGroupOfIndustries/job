"use client";

import React from 'react';
import { Search, MapPin } from 'lucide-react';

const JobSearchBar = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 max-w-4xl mx-auto">
      {/* Job Title Input */}
      <div className="flex-1 w-full relative">
        <input
          type="text"
          placeholder="Job Title or Keyword"
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7F3F]"
        />
        {/* Search Icon */}
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>

      {/* Location Input */}
      <div className="flex-1 w-full relative">
        <input
          type="text"
          placeholder="Location"
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7F3F]"
        />
        {/* Map Pin Icon */}
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>

      {/* Job Type Dropdown */}
      <div className="flex-1 w-full relative">
        <select
          className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-xl appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-[#FF7F3F]"
        >
          <option value="">Job Type</option>
          <option value="full-time">Full-Time</option>
          <option value="part-time">Part-Time</option>
          <option value="contract">Contract</option>
        </select>
        {/* Chevron Down Icon  */}
        <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6 6 6-6"></path>
        </svg>
      </div>

      {/* Search Button */}
      <button className="w-full md:w-auto px-8 py-3 bg-[#FF7F3F] text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center space-x-2">
        {/* Search Icon */}
        <Search size={20} />
        <span>Search Jobs</span>
      </button>
    </div>
  );
};

export default JobSearchBar;
