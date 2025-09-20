"use client";

import React from "react";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { ArrowDownToLine, Download } from "lucide-react";
import Image from "next/image";

const ApplicationDetails = () => {
  const applicant = {
    name: "Ankush Singh",
    email: "ankushsingh1095@gmail.com",
    role: "Senior Developer",
    company: "The RD Group of industries",
    resume: "Resume.pdf",
  };

  const initials = applicant.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-4 sm:p-6 lg:p-10">
      {/* Left Section */}
      <div className="flex-1">
        <div className="flex flex-col items-start gap-4">
          <Avatar className="w-20 h-20 bg-[#FD5E00] text-white text-3xl font-semibold shrink-0">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <div>
            <h2 className="text-2xl sm:text-4xl font-semibold">
              {applicant.name}
            </h2>
            <p className="text-gray-500 text-sm sm:text-base break-words mt-1">
              {applicant.email}
            </p>
            <p className="text-gray-800 text-sm sm:text-base mt-1">
              {applicant.role} | {applicant.company}
            </p>
          </div>
        </div>

        {/* Job Overview */}
        <div className="mt-6">
          <h3 className="font-semibold text-lg sm:text-xl">Job Overview</h3>
          <p className="text-gray-800 text-sm sm:text-base mt-1">
            Company Name: {applicant.company}
          </p>
          <p className="text-base mt-1">other details...</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col gap-6 w-full lg:w-1/4">
        {/* Resume Card */}
        <Card className="p-4 flex flex-col bg-[#FFE9D9] border-none gap-3">
          <div className="w-full h-36 sm:h-40 md:h-48 lg:h-56 rounded-lg overflow-hidden">
            <Image
              src="/images/Demo_resume.jpg"
              width={400}
              height={300}
              alt="Resume Preview"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <p className="font-medium text-left w-full text-base sm:text-lg truncate">
            {applicant.resume}
          </p>

          <Button className="bg-orange-500 hover:bg-orange-600 text-white w-full flex items-center gap-2 rounded-xl text-sm sm:text-base">
            Download <ArrowDownToLine size={18} />
          </Button>
        </Card>

        {/* Application Status */}
        <Card className="p-4 flex flex-col gap-3 bg-[#EFEFEF] border-none">
          <h4 className="font-medium text-lg sm:text-xl">Application Status</h4>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full flex-wrap">
            <Button
              variant="outline"
              className="flex-1 border-2 border-red-500 text-red-500 hover:bg-red-50 text-sm sm:text-lg"
            >
              Reject
            </Button>
            <Button className="flex-1 bg-green-500 hover:bg-green-600 text-white text-sm sm:text-lg">
              Approve
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ApplicationDetails;
