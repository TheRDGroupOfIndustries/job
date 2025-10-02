"use client";

import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  MessageSquare,
  Award,

  MapPin, // Added for address icon
  Phone,    // Added for phone icon
  Mail ,  // Added for email icon
  Headset,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Footer = () => {
  const pathname = usePathname();
  const [currentYear, setCurrentYear] = useState(2025);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  // Conditional rendering to hide footer on specific paths
  if (
    pathname.includes("sanity-studio") ||
    pathname.includes("auth") ||
    pathname.includes("admin") ||
    pathname.includes("employee")
  ) {
    return null;
  }

  return (
    <footer className="bg-[#111827] text-gray-300 py-10 px-4 md:px-8 relative">

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 pb-8 border-b border-gray-700"> {/* Changed to lg:grid-cols-4 */}
        

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 pb-8 border-b border-gray-700">
        {/* Company Info Section */}
        <div className="flex flex-col items-start text-center sm:text-left">
          <h3 className="text-orange-500 text-2xl font-bold mb-4">
            Alpran HR Services
          </h3>
          <p className="text-gray-400 leading-relaxed max-w-sm mb-6">
            Connecting talented professionals with amazing opportunities. Your
            next career move starts here.
          </p>
          <div className="flex space-x-4 justify-center sm:justify-start">
            <Link
              href="https://www.facebook.com/AlpranHRServices"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
            >
              <Facebook size={20} />
            </Link>
            <Link
              href="https://twitter.com/AlpranHR"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
            >
              <Twitter size={20} />
            </Link>
            <Link
              href="https://www.linkedin.com/company/alpran-hr-services"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
            >
              <Linkedin size={20} />
            </Link>
            <Link
              href="https://www.instagram.com/alpranhrservices"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
            >
              <Instagram size={20} />
            </Link>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="flex flex-col items-center sm:items-start">
          <h4 className="text-white text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-3 text-center sm:text-left">
            <li>
              <Link
                href="/browse-jobs"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Browse Jobs
              </Link>
            </li>
            <li>
              <Link
                href="/candidates"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Candidates
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-gray-400 hover:text-white transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Support Section */}
        <div className="flex flex-col items-center sm:items-start">
          <h4 className="text-white text-lg font-semibold mb-4">Support</h4>
          <ul className="space-y-3 text-center sm:text-left">
            <li>
              <Link
                href="/contact"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Help Center
              </Link>
            </li>
            <li>
              <Link
                href="/privacy-policy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/t&c"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                href="/cookie-policy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info Section */}
        <div className="flex flex-col items-center sm:items-start">
          <h4 className="text-white text-lg font-semibold mb-4">Contact Info</h4>
          <ul className="space-y-4 text-center sm:text-left"> {/* Increased space-y for better separation */}
            <li className="flex items-start justify-center sm:justify-start">
              <MapPin size={20} className="text-orange-500 mr-3 mt-1 flex-shrink-0" />
              <p className="text-gray-400">
                Alpran Software Pvt Ltd, Mahmoorganj, Varanasi - 221010
              </p>
            </li>
            <li className="flex items-center justify-center sm:justify-start">
              <Phone size={20} className="text-orange-500 mr-3 flex-shrink-0" />
              <p className="text-gray-400">+91 98399 55309</p>
            </li>
            <li className="flex items-center justify-center sm:justify-start">
              <Phone size={20} className="text-orange-500 mr-3 flex-shrink-0" />
              <p className="text-gray-400">+91 73797 15444</p>
            </li>
            <li className="flex items-center justify-center sm:justify-start">
              <Phone size={20} className="text-orange-500 mr-3 flex-shrink-0" />
              <p className="text-gray-400">+91 88107 18650</p>
            </li>
            <li className="flex items-center justify-center sm:justify-start">
              <Mail size={20} className="text-orange-500 mr-3 flex-shrink-0" />
              <Link href="mailto:hr@alpranhrservices.com" className="text-gray-400 hover:text-white transition-colors">
                hr@alpranhrservices.com
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="max-w-7xl mx-auto pt-6 text-center text-gray-500 text-sm">
        <p>&copy; {currentYear} Alpran HR Services. All rights reserved.</p>
      </div>

      {/* =====================================================
        Floating Buttons
        ===================================================== */}

      {/* 1. "Proud Member of BNI" Button (Custom Design) */}
      <div className="fixed bottom-20 left-6 z-50 sm:bottom-6">
        <div className="relative bg-gradient-to-r w-fit bg-[linear-gradient(to_right,#dc2626,#ef4444,#b91c1c)] text-white px-4 py-2 rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer">
          <div className="flex items-center space-x-2">
            {/* *** REVISED LOGO IMPLEMENTATION *** */}
            <div className="w-10 h-6 px-1 bg-white flex items-center justify-center overflow-hidden">
              <Image
                height={24}
                width={24}
                src={"/BNI_logo.png"}
                alt="BNI Logo"
                // Use Tailwind classes to ensure the image scales to fit the container
                className="object-contain h-full w-full"
              />
            </div>
            {/* ********************************* */}
            <span className="text-sm font-semibold whitespace-nowrap">
              Proud Member of BNI
            </span>
          </div>
          {/* Gradient overlay for subtle shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-lg"></div>
        </div>
      </div>

      {/* 2. "Talk with Us" Button (Floating) */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link
          href="/contact"
          className="bg-orange-500 text-white font-medium py-2 px-4 rounded-md shadow-lg hover:bg-orange-600 transition-colors flex items-center space-x-2 text-xs sm:text-sm min-w-[110px]"
        >
          <Headset  size={20} className="" />
          <span>Talk with Us</span>
        </Link>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
