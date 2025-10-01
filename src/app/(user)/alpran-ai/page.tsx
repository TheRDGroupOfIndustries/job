"use client";
import React from "react";

const ComingSoon = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-white text-[#222]  relative">
      {/* Signal Animation */}
      <div className="signal relative w-20 h-20 rounded-full bg-[#ff6600]"></div>

      {/* Heading */}
      <h1 className="text-4xl md:text-5xl text-[#ff6600] mt-6 mb-2">
        Alpran AI
      </h1>

      {/* Subtext */}
      <p className="text-lg text-[#555] mb-6">
        We’re building something intelligent and powerful.
        <br />
        Stay tuned for the launch!
      </p>

      {/* Button */}
      <button className="bg-[#ff6600] text-white px-6 py-3 rounded-full text-lg transition-all duration-300 hover:bg-[#e65c00] cursor-pointer">
        Notify Me
      </button>

      {/* Footer */}
      <div className="absolute bottom-4 text-sm text-[#999]">
        © 2025 Alpran AI. All rights reserved.
      </div>

      {/* Styles for Animation */}
      <style jsx>{`
        .signal {
          animation: pulse 2s infinite;
        }
        .signal::before,
        .signal::after {
          content: "";
          position: absolute;
          border: 2px solid #ff6600;
          border-radius: 50%;
          top: -20px;
          left: -20px;
          right: -20px;
          bottom: -20px;
          animation: ring 2s infinite;
        }
        .signal::after {
          animation-delay: 1s;
        }
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(1.1);
            opacity: 0.9;
          }
        }
        @keyframes ring {
          0% {
            transform: scale(0.5);
            opacity: 0.6;
          }
          80% {
            transform: scale(1.5);
            opacity: 0;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ComingSoon;
