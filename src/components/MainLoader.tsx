// components/MainLoader.js
import React from "react";

// Define theme-matching classes for a cleaner look (assuming Tailwind config has these)
// loader-skeleton-fill: A soft, theme-appropriate gray for the bars (e.g., #EEEEEE or #DCDCDC)
// loader-highlight: The theme's primary orange (e.g., #FF8A00)

// --- Helper Components ---

// Sub-component for the animated cards on the right
const TaskCardSkeleton = () => {
  // Key change: Added 'shimmer' animation class for the gradient sweep
  // The sweep now uses the theme's orange for a subtle, branded shimmer.
  return (
    <div className="relative p-6 bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
      {/* The Gradient Sweep Overlay (Shimmer Effect) */}
      {/* The 'shimmer' class will handle the translateX animation in CSS */}
      <div
        className="absolute inset-0 z-0 shimmer"
        style={{
          // Changed the middle color to use the theme's orange with high transparency.
          // This creates a subtle orange wash during the animation.
          background:
            "linear-gradient(to right, #FFFFFF 0%, #FF8A0020 50%, #FFFFFF 100%)",
          width: "100%",
          height: "100%",
          // Initial position for the shimmer animation to start off-screen left
          transform: "translateX(-100%)",
        }}
      ></div>

      {/* Skeleton Content (The actual gray bars) */}
      <div className="relative z-10 space-y-3">
        {/* Title */}
        <div className="h-5 bg-loader-skeleton-fill rounded w-3/4"></div>

        {/* Body/Description Lines - adjusted height for better proportion */}
        <div className="h-3 bg-loader-skeleton-fill rounded w-full opacity-80"></div>
        <div className="h-3 bg-loader-skeleton-fill rounded w-5/6 opacity-80"></div>

        {/* Assignment Details */}
        <div className="pt-3 space-y-2">
          {/* The assignment lines are slightly smaller and more distinct */}
          <div className="h-2.5 bg-loader-skeleton-fill rounded w-1/3 opacity-70"></div>
          <div className="h-2.5 bg-loader-skeleton-fill rounded w-2/5 opacity-70"></div>
        </div>

        {/* Footer Buttons (like Expand/Edit/Delete) */}
        <div className="flex justify-between pt-2">
          <div className="h-3 bg-loader-skeleton-fill rounded w-1/6"></div>{" "}
          {/* Expand */}
          <div className="flex space-x-2">
            <div className="h-5 w-5 bg-loader-skeleton-fill rounded-full"></div>{" "}
            {/* Edit icon */}
            <div className="h-5 w-5 bg-loader-skeleton-fill rounded-full"></div>{" "}
            {/* Delete icon */}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Loader Component ---

// Note: To make the 'shimmer' animation work, you would need to add this CSS:
// @keyframes shimmer {
//   0% { transform: translateX(-100%); }
//   100% { transform: translateX(100%); }
// }
// .shimmer {
//   animation: shimmer 1.5s infinite linear;
// }

const MainLoader = () => {
  return (
    // Use a softer background to match the screenshot better
     <div className="flex min-h-screen bg-gray-100 fixed inset-0 z-50">
      {/* 1. Left Sidebar Skeleton */}
      <aside className="w-64 bg-white p-4 shadow-xl border-r border-gray-200">
        <div className="space-y-6">
          {/* Profile Area */}
          <div className="flex flex-col items-center pt-2 pb-6 border-b border-gray-200">
            {/* Profile Image & Badges */}
            <div className="relative">
              <div className="h-20 w-20 bg-gray-300 rounded-full animate-pulse"></div>
              {/* Mimic the small badge circles */}
              <div className="absolute top-1 right-1 h-3 w-3 bg-orange-400 rounded-full border-2 border-white"></div>
              <div className="absolute bottom-1 right-1 h-4 w-4 bg-red-400 rounded-full border-2 border-white"></div>
            </div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mt-4 animate-pulse"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2 mt-2 opacity-70 animate-pulse"></div>
          </div>
          
          {/* Menu Options */}
          <div className="space-y-3 pt-2">
            {/* Title for Options */}
            <div className="h-4 bg-gray-300 rounded w-1/3 opacity-50 mb-4"></div>
            {[...Array(7)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3 h-8 bg-transparent p-2 rounded-lg">
                {/* Icon placeholder */}
                <div className="h-5 w-5 bg-gray-300 rounded-full opacity-70 animate-pulse" style={{ animationDelay: `${i * 0.15}s` }}></div>
                {/* Text placeholder */}
                <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse opacity-90" style={{ animationDelay: `${i * 0.15}s` }}></div>
              </div>
            ))}
          </div>

          {/* Settings & Logout */}
          <div className="pt-8">
            {/* Title for Settings */}
            <div className="h-4 bg-gray-300 rounded w-1/3 opacity-50 mb-4"></div>
            {/* Logout Button (Mimicking the orange background, or a fill) */}
            <div className="h-10 bg-orange-400 rounded-lg w-full animate-pulse"></div>
          </div>
        </div>
      </aside>

      {/* 2. Main Content Area Skeleton */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header/Logo Area */}
        <div className="flex justify-between items-center mb-10">
          <div className="h-8 bg-gray-300 rounded w-24 animate-pulse"></div>
          {/* Assign Work Button */}
          <div className="h-10 bg-orange-400 rounded-full w-32 animate-pulse"></div>
        </div>
        
        {/* Top Stats Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4 mb-3 lg:mb-4">
          <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 text-center shadow-sm">
            <div className="h-10 w-20 mx-auto bg-gray-300 rounded mb-2 animate-pulse"></div>
            <div className="h-4 w-28 mx-auto bg-gray-300 rounded animate-pulse"></div>
          </div>
          <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 text-center shadow-sm">
            <div className="h-10 w-20 mx-auto bg-gray-300 rounded mb-2 animate-pulse"></div>
            <div className="h-4 w-36 mx-auto bg-gray-300 rounded animate-pulse"></div>
          </div>
          <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 text-center shadow-sm">
            <div className="h-10 w-20 mx-auto bg-gray-300 rounded mb-2 animate-pulse"></div>
            <div className="h-4 w-32 mx-auto bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Middle Charts Skeleton */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-3 lg:gap-4 flex-grow mb-3 lg:mb-4">
          {/* Mails Sent Chart Skeleton */}
          <div className="bg-white rounded-xl lg:rounded-2xl p-2 lg:p-3 shadow-sm col-span-1 lg:col-span-2 flex flex-col">
            <div className="h-6 w-36 bg-gray-300 animate-pulse rounded mb-4 p-2 lg:p-3"></div>
            <div className="flex-1 flex justify-center items-center">
              <div className="w-40 h-40 bg-gray-300 animate-pulse rounded-full"></div>
            </div>
            <div className="h-4 w-40 mx-auto bg-gray-300 animate-pulse rounded mt-4 p-2"></div>
          </div>

          {/* Sheets Chart Skeleton */}
          <div className="bg-white rounded-xl lg:rounded-2xl p-2 lg:p-3 shadow-sm col-span-1 lg:col-span-3 flex flex-col">
            <div className="h-6 w-40 bg-gray-300 animate-pulse rounded mb-4 p-2 lg:p-3"></div>
            <div className="flex-1 flex justify-center items-center">
              <div className="w-56 h-56 bg-gray-300 animate-pulse rounded-full"></div>
            </div>
            <div className="h-4 w-48 mx-auto bg-gray-300 animate-pulse rounded mt-4 p-2"></div>
          </div>
        </div>

        {/* Bottom Action Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4">
          <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-5 flex items-center justify-center shadow-sm">
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gray-300 animate-pulse mr-3"></div>
            <div className="h-4 w-24 bg-gray-300 animate-pulse rounded"></div>
          </div>
          <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-5 flex items-center justify-center shadow-sm">
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gray-300 animate-pulse mr-3"></div>
            <div className="h-4 w-28 bg-gray-300 animate-pulse rounded"></div>
          </div>
          <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-5 flex flex-col items-center justify-center shadow-sm">
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border-2 border-gray-300 flex items-center justify-center mb-2">
              <div className="h-4 w-4 bg-gray-300 animate-pulse rounded-full"></div>
            </div>
            <div className="h-4 w-24 bg-gray-300 animate-pulse rounded"></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainLoader;
