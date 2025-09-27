import React, { Suspense, ReactElement } from "react";
import Image from "next/image";
import { Search, Briefcase } from "lucide-react";
import JobSearchBar from "./JobSearchBar";
import BgImage from "./images/bgImage-HeroSection.jpg";
import Link from "next/link";

const ORANGE = "#f97316";

const HeroSection = (): ReactElement => {
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
          className="!brightness-100" // no extra darkening
          priority
        />
        <div className="absolute inset-0 bg-black opacity-15"></div>{" "}
        {/* lighter overlay */}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-5xl w-full py-20 sm:py-24">
        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight mb-4 drop-shadow-lg px-2 sm:px-0">
          <span className="block text-white">Find Your Dream</span>
          <span className="block md:text-7xl mt-2" style={{ color: ORANGE }}>
            Career Today
          </span>
        </h1>
        <p className="text-sm xs:text-base sm:text-lg md:text-xl mb-8 max-w-3xl px-2 sm:px-0 drop-shadow-md">
          Connect with top employers and discover opportunities that match your
          skills, passion, and career goals.
        </p>

        {/* Action Buttons - 🟢 FIX APPLIED HERE */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-10 w-full max-w-sm px-4 sm:max-w-none sm:px-0">
          <Link
            href={"/browse-jobs"}
            // Buttons now take full width of the padded wrapper on small screens,
            // and auto-width on medium/large screens.
            className="w-full sm:w-auto px-8 py-4 font-semibold rounded-xl shadow-lg hover:bg-orange-600 flex items-center justify-center space-x-2 cursor-pointer hover:scale-105 transform transition-all duration-200"
            style={{ background: ORANGE, color: "#fff" }}
          >
            <Search size={20} />
            <span>Browse Jobs</span>
          </Link>
          <Link
            href={"/candidates"} 
            className="w-full sm:w-auto relative z-10 px-8 py-4 bg-white/30 backdrop-blur-md text-white font-semibold rounded-xl shadow-lg hover:bg-white/40 flex items-center justify-center space-x-2 cursor-pointer 
                        hover:scale-105 transform transition-all duration-200
                        border border-white/50 "
          >
            <Briefcase size={20} />
            <span>Candidates</span>
          </Link>
        </div>
      </div>

      <Suspense fallback={<div>Loading jobs...</div>}>
        <JobSearchBar />
      </Suspense>
    </section>
  );
};

export default HeroSection;