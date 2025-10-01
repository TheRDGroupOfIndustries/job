// app/browse-jobs/page.jsx (or components/BrowseJobsPage.jsx)
"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, X } from "lucide-react";
import JobSearchBar from "./JobSearchBar";
import JobCard from "./JobCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { fetchJobs } from "@/redux/features/jobSlice";

const FILTER_TABS = ["All", "Full-time", "Part-time", "Contract", "Remote"];

const BrowseJobsPage = () => {
  const { jobs } = useSelector((state: RootState) => state.job);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const [activeFilter, setActiveFilter] = useState("All");
  const dispatch = useDispatch();

  // Get filter values from URL
  const searchTitle = searchParams.get("title")?.toLowerCase() || "";
  const searchLocation = searchParams.get("location")?.toLowerCase() || "";
  const searchType = searchParams.get("type")?.toLowerCase() || "";

  const fetchAllJobs = async () => {
    setLoading(true);
    // fetch jobs from backend
    dispatch(fetchJobs() as any)
      .unwrap()
      .then((data: any) => {
        console.log("JOBS DATA: ", data);
      })
      .catch((err: any) => console.log(err))
      .finally(() => setLoading(false));
  };

  // fetching jobs from backend
  useEffect(() => {
    fetchAllJobs();
  }, []);

  // Helper function to map employment type to filter tags
  const mapEmploymentTypeToFilter = (
    employmentType: string,
    workMode: string
  ) => {
    const filters = [];

    // Map employment type
    switch (employmentType?.toLowerCase()) {
      case "full-time":
        filters.push("Full-time");
        break;
      case "part-time":
        filters.push("Part-time");
        break;
      case "contract":
        filters.push("Contract");
        break;
    }

    // Add remote if work mode is remote
    if (workMode?.toLowerCase() === "remote") {
      filters.push("Remote");
    }

    return filters;
  };

  // 1. Filter by tabs (All, Full-time, etc.)
  const tabFilteredJobs = jobs.filter((job) => {
    if (activeFilter === "All") return true;

    const jobFilters = mapEmploymentTypeToFilter(
      job.employmentType,
      job.workMode
    );
    return jobFilters.includes(activeFilter);
  });

  // 2. Further filter by URL search parameters
  const finalFilteredJobs = tabFilteredJobs.filter((job) => {
    const jobTitleLower = job.designation?.toLowerCase() || "";
    const jobLocationLower = job.location?.[0]?.toLowerCase() || "";
    const jobTypeLower = job.employmentType?.toLowerCase() || "";

    // Filter by title/keyword (search in designation)
    const matchesTitle = !searchTitle || jobTitleLower.includes(searchTitle);

    // Filter by location (search in first location)
    const matchesLocation =
      !searchLocation || jobLocationLower.includes(searchLocation);

    // Filter by type (employment type)
    const matchesType =
      !searchType || searchType === "all" || jobTypeLower === searchType;

    return matchesTitle && matchesLocation && matchesType;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-16">
      {/* 1. Hero Section with Background */}
      <div
        className=""
        style={{
          backgroundImage: "url('/images/bgImage-HeroSection.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="bg-primary/80 text-white py-28 relative ">
          <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
              Find Your Dream Job Today
            </h1>
            <p className="text-xl font-light mb-10 max-w-3xl mx-auto">
              Explore thousands of hand-picked opportunities from leading
              companies worldwide.
            </p>
          </div>
          {/* 2. Job Search Form (Floating over the hero section) */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 ">
            <Suspense fallback={<div>Loading jobs...</div>}>
              <JobSearchBar />
            </Suspense>
          </div>
        </div>
      </div>

      {/* 3. Job Listings Section */}
      <section className="py-16 md:py-24 md:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
            Featured Job Opportunities
          </h2>
          <div className="flex items-center justify-center mb-12  max-w-2xl mx-auto">
            <p className="text-lg text-gray-600 ">
              {finalFilteredJobs.length} jobs found
            </p>

            {/* <button className="flex items-center gap-1 ml-4 cursor-pointer text-gray-400 hover:text-primary transition-colors duration-150">
              Clear Filters <X size={18} />
            </button> */}
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center space-x-2 sm:space-x-4 mb-16">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`text-sm md:text-base font-semibold py-2 px-5 rounded-lg transition-all duration-300 mb-2 ${
                  activeFilter === tab
                    ? "bg-[#FF7F3F] text-white shadow-md"
                    : "bg-white text-gray-600 border border-gray-300 hover:border-[#FF7F3F] hover:text-[#FF7F3F]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Job Cards Grid */}
          {finalFilteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {finalFilteredJobs.map((job) => (
                <JobCard key={job._id} job={job as any} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No jobs found matching your criteria.
              </p>
            </div>
          )}

          {/* View All Button */}
          {/* {finalFilteredJobs.length > 0 && (
            <button className="inline-flex items-center text-[#FF7F3F] border-2 border-[#FF7F3F] font-semibold py-3 px-8 rounded-lg transition-colors hover:bg-[#FF7F3F] hover:text-white">
              View More Results
              <ArrowRight size={20} className="ml-3" />
            </button>
          )} */}
        </div>
      </section>
    </div>
  );
};

export default BrowseJobsPage;
