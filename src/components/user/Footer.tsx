"use client";

import Link from "next/link";
import React from "react";

import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  MessageSquare,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#111827] text-gray-300 py-10 px-4 md:px-8 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 pb-8 border-b border-gray-700">
        {/* Company Info Section */}
        <div className="flex flex-col items-start text-center sm:text-left">
          <h3 className="text-primary text-2xl font-bold mb-4">
            Alpran HR Services
          </h3>
          <p className="text-gray-400 leading-relaxed max-w-sm mb-6">
            Connecting talented professionals with amazing opportunities. Your
            next career move starts here.
          </p>
          <div className="flex space-x-4 justify-center sm:justify-start">
            <Link
              href="/"
              aria-label="Facebook"
              className="w-10 h-10 flex items-center justify-center bg-primary text-white rounded-full hover:bg-orange-600 transition-colors"
            >
              <Facebook size={20} />
            </Link>
            <Link
              href="/"
              aria-label="Twitter"
              className="w-10 h-10 flex items-center justify-center bg-primary text-white rounded-full hover:bg-orange-600 transition-colors"
            >
              <Twitter size={20} />
            </Link>
            <Link
              href="/"
              aria-label="LinkedIn"
              className="w-10 h-10 flex items-center justify-center bg-primary text-white rounded-full hover:bg-orange-600 transition-colors"
            >
              <Linkedin size={20} />
            </Link>
            <Link
              href="/"
              aria-label="Instagram"
              className="w-10 h-10 flex items-center justify-center bg-primary text-white rounded-full hover:bg-orange-600 transition-colors"
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
                href="/"
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
      </div>

      {/* Copyright Section */}
      <div className="max-w-7xl mx-auto pt-6 text-center text-gray-500 text-sm">
        <p>&copy; 2024 Alpran HR Services. All rights reserved.</p>
      </div>

      {/* "Talk with Us" Button (Floating) */}
      <div className="fixed bottom-6 right-6 z-50">
  <button className="bg-primary text-white font-medium py-2 px-4 rounded-full shadow-lg hover:bg-orange-600 transition-colors flex items-center space-x-2 text-xs sm:text-sm min-w-[110px]">
    <MessageSquare size={16} />
    <span>Talk with Us</span>
  </button>
</div>
    </footer>
  );
};

export default Footer;
