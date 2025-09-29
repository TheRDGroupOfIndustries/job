// components/HowItWorks.jsx
"use client";

import React from "react";
import Link from "next/link"; 
import { User, Search, Trophy, ArrowRight } from "lucide-react";

const STEPS = [
  {
    number: "01",
    title: "Create Your Profile",
    description:
      "Build a comprehensive profile showcasing your skills, experience, and career aspirations.",
    icon: User,
    iconBgClass: "bg-amber-100",
    iconColorClass: "text-primary",
  },
  {
    number: "02",
    title: "Get Matched",
    description:
      "Our AI algorithm analyzes your profile and matches you with relevant job opportunities.",
    icon: Search,
    iconBgClass: "bg-blue-100",
    iconColorClass: "text-blue-500",
  },
  {
    number: "03",
    title: "Land Your Dream Job",
    description:
      "Apply to positions, connect with employers, and secure your next career opportunity.",
    icon: Trophy,
    iconBgClass: "bg-green-100",
    iconColorClass: "text-green-500",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
          How It Works
        </h2>
        <p className="text-base sm:text-lg text-gray-600 mb-12 sm:mb-16 max-w-2xl mx-auto">
          Get started with JobConnect in three simple steps
        </p>

        {/* Steps Container */}
        <div className="relative flex flex-col lg:flex-row lg:justify-between items-stretch gap-12 sm:gap-16 mb-12 sm:mb-16">
          {/* Timeline line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gray-300 transform -translate-y-1/2 z-0"></div>

          {STEPS.map((step, index) => (
            <div
              key={step.number}
              className="relative flex flex-col items-center lg:w-1/3 z-10"
            >
              {/* Vertical connector line for mobile */}
              {index > 0 && (
                <div className="lg:hidden absolute -top-8 left-1/2 w-px h-8 bg-gray-300 transform -translate-x-1/2 z-0"></div>
              )}

              {/* Step Number */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full border-4 border-primary font-bold text-xl sm:text-2xl mb-4 bg-white text-primary shadow-sm">
                {step.number}
              </div>

              {/* Icon */}
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-2xl shadow-md ${step.iconBgClass} mb-6 sm:mb-8`}
              >
                <step.icon size={24} className={step.iconColorClass} />
              </div>

              {/* Content */}
              <div className="max-w-xs sm:max-w-md px-2 text-center">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Link 
          href="/auth/login" 
          className="inline-flex items-center bg-primary text-white font-semibold py-3 sm:py-4 px-6 sm:px-10 rounded-lg shadow-lg transition-all hover:bg-orange-600 mt-6 sm:mt-8 hover:scale-[1.05] transform mx-auto duration-200 text-base sm:text-lg"
        >
          Get Started Today
          <ArrowRight size={20} className="ml-3" />
        </Link>
      </div>
    </section>
  );
};

export default HowItWorks;