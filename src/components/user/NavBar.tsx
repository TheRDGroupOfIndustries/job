"use client"
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handlePostJobClick = () => {
    router.push('/post-job'); // Change as needed
  };

  return (
    <nav className="fixed w-full z-50 bg-white shadow-sm py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center space-x-2">
          <Link href="/" className="flex items-center">
            <Image src="/images/alplogo.webp" alt="logo" width={40} height={40} />
            <span className="text-2xl font-bold text-orange-600 ml-2">
              Alpran HR Services
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link href="/browse-jobs" className="text-gray-600 hover:text-[#FF7F3F] transition-colors duration-200">
            Browse Jobs
          </Link>
          <Link href="/candidates" className="text-gray-600 hover:text-[#FF7F3F] transition-colors duration-200">
            Candidates
          </Link>
          <Link href="#" className="text-gray-600 hover:text-[#FF7F3F] transition-colors duration-200">
            Blogs
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-[#FF7F3F] transition-colors duration-200">
            About
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-[#FF7F3F] transition-colors duration-200">
            Contact
          </Link>
          <button
            onClick={() => router.push('/auth/login')}
            className="px-5 py-2 border-2 border-[#eb6827] rounded-md text-[#FF7F3F] bg-white hover:bg-orange-50 transition-colors duration-200 font-medium cursor-pointer"
          >
            Sign In
          </button>
          <button
            onClick={handlePostJobClick}
            className="px-5 py-2 bg-[#e66d31] text-white rounded-md hover:bg-orange-600 transition-colors duration-200 font-medium shadow-sm cursor-pointer"
          >
            Job Posts
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-600 focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md py-4 px-6 space-y-3">
          <Link href="/browse-jobs" className="block text-gray-600 hover:text-[#FF7F3F] transition-colors duration-200">
            Browse Jobs
          </Link>
          <Link href="/candidates" className="block text-gray-600 hover:text-[#FF7F3F] transition-colors duration-200">
            Candidates
          </Link>
          <Link href="#" className="block text-gray-600 hover:text-[#FF7F3F] transition-colors duration-200">
            Blogs
          </Link>
          <Link href="/about" className="block text-gray-600 hover:text-[#FF7F3F] transition-colors duration-200">
            About
          </Link>
          <Link href="/contact" className="block text-gray-600 hover:text-[#FF7F3F] transition-colors duration-200">
            Contact
          </Link>
          <button
            onClick={() => router.push('/auth/login')}
            className="w-full text-left px-5 py-2 border-2 border-[#eb6827] rounded-md text-[#FF7F3F] bg-white hover:bg-orange-50 transition-colors duration-200 font-medium"
          >
            Sign In
          </button>
          <button
            onClick={handlePostJobClick}
            className="w-full px-5 py-2 bg-[#e66d31] text-white rounded-md hover:bg-orange-600 transition-colors duration-200 font-medium shadow-sm"
          >
            Job Posts
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
