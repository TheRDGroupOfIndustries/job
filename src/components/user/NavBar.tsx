"use client";

import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 bg-white shadow-sm py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="text-2xl font-bold text-orange-600">
            Alpran HR Services
          </Link>
        </div>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link href="#" className="text-gray-600 hover:text-[#FF7F3F] transition-colors duration-200">
            Browse Jobs
          </Link>
          <Link href="#" className="text-gray-600 hover:text-[#FF7F3F] transition-colors duration-200">
            For Employers
          </Link>
          <Link href="#" className="text-gray-600 hover:text-[#FF7F3F] transition-colors duration-200">
            About
          </Link>
          <Link href="#" className="text-gray-600 hover:text-[#FF7F3F] transition-colors duration-200">
            Contact
          </Link>
          <button className="px-5 py-2 border-2 border-[#eb6827] rounded-md text-[#FF7F3F] bg-white hover:bg-orange-50 transition-colors duration-200 font-medium">
            Sign In
          </button>
          {/* Post a Job filled button */}
          <button className="px-5 py-2 bg-[#e66d31] text-white rounded-md hover:bg-orange-600 transition-colors duration-200 font-medium shadow-sm">
            Post a Job
          </button>

        </div>

        {/* Mobile menu button (you might want to add a hamburger icon and dropdown) */}
        <div className="md:hidden">
          {/* Add your mobile menu toggle here */}
          <button className="text-gray-600 focus:outline-none">
            {/* Example: Hamburger icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;