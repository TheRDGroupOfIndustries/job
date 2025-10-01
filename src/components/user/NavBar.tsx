"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Button } from "../ui/button";
import { DoorOpen, FileMinus } from "lucide-react";
import toast from "react-hot-toast";
import { logout } from "@/redux/features/authSlice";

const Navbar = () => {
  const { userData, isAutheticated } = useSelector(
    (state: RootState) => state.auth
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  // console.log(pathname)
  const dispatch = useDispatch();

  if (
    pathname.includes("sanity-studio") ||
    pathname.includes("auth") ||
    pathname.includes("admin") ||
    pathname.includes("employee")
  ) {
    return null;
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handlePostJobClick = () => {
    router.push("/post-job");
  };

  const handleLogout = async () => {
    toast.loading("Logging Out...", { id: "logout" });
    await fetch("/api/auth/logout", { method: "POST" });
    dispatch(logout());
    toast.success("Logged out", { id: "logout" });
    router.push("/");
  };

  return (
    <nav className="fixed w-full z-50 bg-white shadow-sm py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center space-x-2">
          <Link href="/" className="flex items-center">
            <Image
              src={"/images/alplogo.webp"}
              alt="logo"
              width={40}
              height={40}
            />
            <span className="text-2xl font-bold text-orange-600 ml-2">
              Alpran HR Services
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link
            href="/alpran-ai"
            className="text-gray-600 hover:text-[#FF7F3F] transition-colors duration-200 whitespace-nowrap"
          >
            Alpran Ai
          </Link>

          <Link
            href="/browse-jobs"
            className="text-gray-600 hover:text-[#FF7F3F] transition-colors duration-200"
          >
            Jobs
          </Link>

          {isAutheticated && (
            <Link
              href="/candidates"
              className="text-gray-600 hover:text-[#FF7F3F] transition-colors duration-200"
            >
              Candidates
            </Link>
          )}
          <Link
            href="/blogs"
            className="text-gray-600 hover:text-[#FF7F3F] transition-colors duration-200"
          >
            Blogs
          </Link>
          <Link
            href="/about"
            className="text-gray-600 hover:text-[#FF7F3F] transition-colors duration-200"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-gray-600 hover:text-[#FF7F3F] transition-colors duration-200"
          >
            Contact
          </Link>
          {isAutheticated ? (
            <div className="relative group">
              {/* 1. Profile Image/Icon (The Click/Hover Target) */}
              <Image
                src={
                  userData?.profileImage || "/images/profile-placeholder.webp"
                }
                alt="Profile Picture"
                priority={true}
                width={40}
                height={40}
                className="rounded-full cursor-pointer transition duration-150 ease-in-out hover:ring-2 hover:ring-primary hover:ring-offset-2"
              />

              {/* 2. Dropdown Menu (Appears on Hover) */}
              <div className="absolute right-0 top-5 mt-3 hidden group-hover:flex transition-all duration-300 ease-out z-50 min-w-[200px] pt-5 ">
                <div className="bg-white border border-gray-100 rounded-xl shadow-xl p-4 space-y-3 w-full">
                  {/* User Information */}
                  <div className="pb-3 border-b border-gray-200">
                    <p className="font-semibold text-gray-800 truncate">
                      {userData?.name || "User Name"}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {userData?.email || "user@example.com"}
                    </p>
                  </div>

                  <Button
                    type="button"
                    onClick={() => router.push("/my-applications")}
                    variant={"ghost"}
                    className="text-base  hover:bg-background cursor-pointer w-full justify-start px-2 py-1.5 transition duration-150"
                  >
                    <FileMinus size={20} className="mr-2" /> My Applications
                  </Button>

                  {/* Logout Button */}
                  <Button
                    type="button"
                    onClick={handleLogout}
                    variant={"ghost"}
                    className="text-base text-red-600 hover:bg-red-50 cursor-pointer w-full justify-start px-2 py-1.5 transition duration-150"
                  >
                    <DoorOpen size={20} className="mr-2" /> Logout
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => router.push("/auth/login")}
              className="w-full text-left px-5 py-2 border-2 border-[#eb6827] rounded-md text-[#FF7F3F] bg-white hover:bg-orange-50 transition-colors duration-200 font-medium"
            >
              Get Started
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-600 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md py-4 px-6 space-y-3">
          <Link
            href="/alpran-ai"
            className="text-gray-600 hover:text-[#FF7F3F] transition-colors duration-200 whitespace-nowrap"
          >
            Alpran Ai
          </Link>

          <Link
            href="/browse-jobs"
            className="block text-gray-600 hover:text-[#FF7F3F] transition-colors duration-200"
          >
            Browse Jobs
          </Link>
          <Link
            href="/candidates"
            className="block text-gray-600 hover:text-[#FF7F3F] transition-colors duration-200"
          >
            Candidates
          </Link>
          <Link
            href="#"
            className="block text-gray-600 hover:text-[#FF7F3F] transition-colors duration-200"
          >
            Blogs
          </Link>
          <Link
            href="/about"
            className="block text-gray-600 hover:text-[#FF7F3F] transition-colors duration-200"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="block text-gray-600 hover:text-[#FF7F3F] transition-colors duration-200"
          >
            Contact
          </Link>
          {isAutheticated ? (
            <div className=" rounded-full mb-2">
              <Image
                src={userData?.profileImage || "/images/profile_picture.jpg"}
                alt="Profile Picture"
                priority={true}
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
          ) : (
            <button
              onClick={() => router.push("/auth/login")}
              className="w-full text-left px-5 py-2 border-2 border-[#eb6827] rounded-md text-[#FF7F3F] bg-white hover:bg-orange-50 transition-colors duration-200 font-medium"
            >
              Register
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
