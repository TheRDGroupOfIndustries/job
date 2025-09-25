import React from 'react';
import Image from 'next/image';
import { Search, Briefcase } from 'lucide-react'; 
import JobSearchBar from './JobSearchBar'; 
import BgImage from "./images/bgImage-HeroSection.jpg"

const HeroSection = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center text-center text-gray-100 overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={BgImage} 
          alt="People working in an office"
          layout="fill"
          objectFit="cover"
          quality={90}
          className="filter brightness-[0.6]" 
        />
        <div className="absolute inset-0 bg-black opacity-30"></div> {/* Dark overlay */}
      </div>

      {/* Content */}
<div className="relative z-10 flex flex-col items-center justify-center p-4 max-w-5xl mx-auto">
  <h1 className="text-4xl md:text-7xl font-extrabold leading-tight mb-4 drop-shadow-lg">
    <span className="block text-white">Find Your Dream</span>
    <span className="block text-[#ff7f3f] md:text-7xl mt-2">Career Today</span>
  </h1>
  <p className="text-lg md:text-xl mb-8 max-w-2xl drop-shadow-md">
    Connect with top employers and discover opportunities that match your skills, passion, and career goals.
  </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-10">
          <button className="px-8 py-4 bg-[#e86828] text-black font-semibold rounded-full shadow-lg hover:bg-orange-600 transition-colors duration-200 flex items-center space-x-2">
            <Search size={20} />
            <span>Browse Jobs</span>
          </button>
          <button className="px-8 py-4 bg-white text-black font-semibold rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-2">
            <Briefcase size={20} />
            <span>Post a Job</span>
          </button>
        </div>

        {/* Job Search Bar */}
        <JobSearchBar />
      </div>
    </section>
  );
};

export default HeroSection;