"use client";

import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import { ArrowRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { fetchJobs } from "@/redux/features/jobSlice";
import Link from "next/link";

const FILTER_TABS = ["All", "Full-time", "Part-time", "Contract", "Remote"];

const FeaturedJobs: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const dispatch = useDispatch();
  const { jobs } = useSelector((state: RootState) => state.job);
  const [loading, setLoading] = useState(false);

  const fetchAllJobs = async () => {
    setLoading(true);
    dispatch(fetchJobs() as any)
      .unwrap()
      .then((data: any) => console.log("JOBS DATA:", data))
      .catch((err: any) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAllJobs();
  }, []);

  // Filter jobs based on active filter
  const filteredJobs = jobs.filter((job) => {
    if (activeFilter === "All") return true;

    const employmentMatch =
      job.employmentType?.toLowerCase() === activeFilter.toLowerCase();
    const workModeMatch =
      job.workMode?.toLowerCase() === activeFilter.toLowerCase();

    return employmentMatch || workModeMatch;
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
        <div className="flex flex-wrap justify-center space-x-2 sm:space-x-4">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`text-sm md:text-base font-semibold py-2 px-5 rounded-full shadow-lg transition-all cursor-pointer duration-300 mb-2 ${
                activeFilter === tab
                  ? "bg-primary text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-300 hover:border-primary hover:text-primary"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-16">
          {loading ? (
            <p className="text-center col-span-full">Loading jobs...</p>
          ) : filteredJobs.length > 0 ? (
            filteredJobs.slice(0, 6).map((job) => (
              <JobCard key={job._id} job={job as any} />
            ))
          ) : (
            <p className="text-center col-span-full">No jobs found.</p>
          )}
        </div>

        {/* View All Button */}
        <Link href="/browse-jobs" className="inline-flex items-center text-primary border-2 border-primary font-semibold py-3 px-8 rounded-lg transition-colors hover:bg-primary hover:text-white cursor-pointer">
          View All Jobs
          <ArrowRight size={20} className="ml-3" />
        </Link>
      </div>
    </section>
  );
};

export default FeaturedJobs;
