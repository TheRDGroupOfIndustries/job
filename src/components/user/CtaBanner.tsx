"use client";

import React from "react";
import { Briefcase, UserPlus } from "lucide-react";

const CtaBanner = () => {
  return (
    <div
      className=""
      style={{
        backgroundImage:
          "url('/images/bgImage-HeroSection.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-primary/80  text-white overflow-hidden py-16  relative">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
            Ready to Take the Next Step?
          </h1>

          {/* Subheading */}
          <p className="text-2xl font-light mb-10 max-w-2xl mx-auto">
            Join thousands of professionals who have found their dream careers
            through Alpran HR Services
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            {/* First Button (White/Outline) - Assuming "Find a Job" or similar */}
            <button className="bg-white text-primary font-semibold py-3 px-8 rounded-lg shadow-xl hover:bg-gray-100 transition duration-300 transform hover:scale-[1.05] flex items-center justify-center cursor-pointer">
                <UserPlus size={20} className="mr-2" />
              Create Your Profile
            </button>

            {/* Second Button (Orange/Filled) - "Post a Job" */}
            <button className="bg-transparent text-white border border-white font-semibold py-3 px-8 rounded-lg shadow-xl hover:bg-white hover:text-primary transition duration-300 flex items-center justify-center space-x-2 transform hover:scale-[1.05] cursor-pointer">
              <Briefcase size={20} className="mr-2" />
              <span>Post a Job</span>
            </button>
          </div>

          {/* Stats Section */}
          <div className="flex items-center justify-between gap-6 max-w-4xl mx-auto text-center ">
            {/* Stat 1: 100% Free to Join */}
            <div className="flex flex-col items-center">
              <p className="text-2xl md:text-3xl font-extrabold mb-1">100%</p>
              <p className="text-base font-medium">Free to Join</p>
            </div>

            {/* Stat 2: 24/7 Support Available */}
            <div className="flex flex-col items-center">
              <p className="text-2xl md:text-3xl font-extrabold mb-1">24/7</p>
              <p className="text-base font-medium">Support Available</p>
            </div>

            {/* Stat 3: 2M+ Success Stories */}
            <div className="flex flex-col items-center">
              <p className="text-2xl md:text-3xl font-extrabold mb-1">2M+</p>
              <p className="text-base font-medium">Success Stories</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtaBanner;
