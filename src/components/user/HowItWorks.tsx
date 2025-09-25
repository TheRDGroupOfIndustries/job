// components/HowItWorks.jsx
"use client";

import React from 'react';
// Import icons from Lucide React
import { User, Search, Trophy, ArrowRight } from 'lucide-react';

// Data for the steps
const STEPS = [
  {
    number: "01",
    title: "Create Your Profile",
    description: "Build a comprehensive profile showcasing your skills, experience, and career aspirations.",
    icon: User,
    iconBgClass: "bg-amber-100", // Light background for the icon container
    iconColorClass: "text-primary", // Icon color
    ringColorClass: "border-primary", // Ring color
  },
  {
    number: "02",
    title: "Get Matched",
    description: "Our AI algorithm analyzes your profile and matches you with relevant job opportunities.",
    icon: Search,
    iconBgClass: "bg-blue-100",
    iconColorClass: "text-blue-500", // Using a light blue for contrast, similar to the image
    ringColorClass: "border-blue-500",
  },
  {
    number: "03",
    title: "Land Your Dream Job",
    description: "Apply to positions, connect with employers, and secure your next career opportunity.",
    icon: Trophy,
    iconBgClass: "bg-green-100",
    iconColorClass: "text-green-500", // Using a light green for contrast, similar to the image
    ringColorClass: "border-green-500",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center ">
        
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
          How It Works
        </h2>
        <p className="text-lg text-gray-600 mb-16 max-w-2xl mx-auto">
          Get started with JobConnect in three simple steps
        </p>

        {/* Steps Container */}
        <div className="relative flex justify-between items-start mb-16 ">
          
          {/* Timeline Line (for desktop view) */}
          {/* This line is hidden on smaller screens for better stacking */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gray-300 transform -translate-y-1/2  z-0"></div>

          {STEPS.map((step, index) => {
            // Determine if the line connector is needed (not for the first step on desktop)
            const showConnector = index > 0;
            
            return (
              <div 
                key={step.number} 
                className="flex flex-col items-center w-full lg:w-1/3 relative z-10"
              >
                
                {/* Connector Line for Mobile/Tablet (Vertical) */}
                {/* This line is only shown between steps on small screens */}
                {showConnector && (
                    <div className="lg:hidden absolute top-0 left-1/2 w-px h-16 bg-gray-300 transform -translate-x-1/2 z-0"></div>
                )}


                {/* Step Number Ring */}
                <div 
                  className={`w-20 h-20 flex items-center justify-center rounded-full border-4 font-bold text-2xl mb-4 bg-white text-primary`}
                >
                  {step.number}
                </div>

                {/* Icon Circle */}
                <div 
                  className={`w-16 h-16 flex items-center justify-center rounded-2xl shadow-lg ${step.iconBgClass} mb-8`}
                >
                  <step.icon size={24} className={step.iconColorClass} />
                </div>

                {/* Content */}
                <div className="max-w-md px-2 ">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mx-auto w-[90%]">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* CTA Button */}
        <button className="inline-flex items-center bg-primary text-white font-semibold py-4 px-10 rounded-lg shadow-lg transition-all hover:bg-orange-600 mt-8 hover:scale-[1.05] transform mx-auto duration-200 cursor-pointer text-lg">
          Get Started Today
          <ArrowRight size={20} className="ml-3" />
        </button>
      </div>

      {/* Floating "Talk with Us" Button (Reused) */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-primary text-white font-medium py-3 px-6 rounded-full shadow-lg hover:bg-orange-600 transition-colors flex items-center space-x-2">
          {/* Using a placeholder for a chat icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          <span>Talk with Us</span>
        </button>
      </div>
    </section>
  );
};

export default HowItWorks;