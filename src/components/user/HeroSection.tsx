import React from "react";
import Image from "next/image";
import { Search, Briefcase } from "lucide-react";
import JobSearchBar from "./JobSearchBar";
import BgImage from "./images/bgImage-HeroSection.jpg";

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center text-gray-100 overflow-visible px-4 sm:px-6 md:px-8 lg:px-12">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={BgImage}
          alt="People working in an office"
          layout="fill"
          objectFit="cover"
          quality={90}
          className="filter brightness-[0.6]"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-5xl w-full py-20 sm:py-24">
        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight mb-4 drop-shadow-lg px-2 sm:px-0">
          <span className="block text-white">Find Your Dream</span>
          <span className="block text-[#ff7f3f] mt-2">Career Today</span>
        </h1>
        <p className="text-sm xs:text-base sm:text-lg md:text-xl mb-8 max-w-3xl px-2 sm:px-0 drop-shadow-md">
          Connect with top employers and discover opportunities that match your skills, passion, and career goals.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:justify-center sm:space-x-6 space-y-4 sm:space-y-0 mb-10 w-full max-w-md sm:max-w-none px-2 sm:px-0">
          <button className="w-full sm:w-auto px-6 py-4 bg-[#e86828] text-white font-semibold rounded-xl shadow-lg hover:bg-orange-600 flex items-center justify-center space-x-2 cursor-pointer hover:scale-105 transform transition-all duration-200">
            <Search size={20} />
            <span>Browse Jobs</span>
          </button>
          <button className="w-full sm:w-auto px-6 py-4 bg-white text-black font-semibold rounded-xl shadow-lg hover:bg-gray-100 flex items-center justify-center space-x-2 cursor-pointer hover:scale-105 transform transition-all duration-200">
            <Briefcase size={20} />
            <span>Post a Job</span>
          </button>
        </div>

        {/* Job Search Bar */}
        <div className="w-full px-2 sm:px-0">
          <JobSearchBar />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
