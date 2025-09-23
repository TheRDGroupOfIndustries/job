"use client";

import React, { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { ArrowDownToLine, ChevronLeft, Download, FileText } from "lucide-react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  acceptApplication,
  rejectApplication,
} from "@/redux/features/applicationSlice";
import { useRouter } from "next/navigation";
import { fetchApplications } from "@/redux/features/applicationSlice";


const ApplicationDetails = ({ id }: { id: string }) => {
  const { applications, loading, error } = useSelector(
    (state: RootState) => state.applications
  );
  const [application, setApplication] = useState<any>(null);
  const dispatch = useDispatch();
  const router = useRouter();

    useEffect(() => {
      dispatch(fetchApplications() as any)
        .unwrap()
        .catch((err: any) => {
          console.error("Failed to fetch applications: ", err);
        });
    }, []);

  useEffect(() => {
    const app = applications?.find((app) => app._id === id);
    if (app) {
      setApplication(app);
      console.log(app);
    }
  }, [id, applications]);

  if (!application) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading application details...</p>
      </div>
    );
  }

  const initials =
    application?.appliedBy?.name
      ?.split(" ")
      ?.map((n: string) => n[0])
      ?.join("") || "NA";

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto ">
        <div className="sticky top-0  pl-20 pr-10 pt-5 pb-2 bg-section z-20 flex items-center justify-between">
          <Button
            variant={"ghost"}
            onClick={() => router.back()}
            className="rounded-full cursor-pointer bg-background hover:bg-background/80 transition"
          >
            <ChevronLeft className="w-8 h-8 " />
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8  pl-20 pr-10 pb-10 pt-4  overflow-auto">
          {/* Left Section - Takes 2 columns on large screens */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <Card className="p-6 bg-white border-none shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <Avatar className="w-16 h-16 sm:w-20 sm:h-20 bg-[#FD5E00] text-white text-2xl sm:text-3xl font-semibold flex-shrink-0">
                  <AvatarFallback className="bg-[#FD5E00] text-white">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                    {application?.appliedBy?.name || "Unknown Applicant"}
                  </h1>
                  <p className="text-gray-600 text-sm sm:text-base mb-1">
                    {application?.appliedBy?.email || "No email provided"}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm sm:text-base">
                    <span className="font-medium text-gray-800">
                      {application?.jobId?.designation ||
                        "Position not specified"}
                    </span>
                    <span className="hidden sm:inline text-gray-400">|</span>
                    <span className="text-gray-600">
                      {application?.jobId?.companyDetails?.name ||
                        "The RD Group of industries"}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Job Overview */}
            <Card className="p-6 bg-white border-none shadow-sm">
              <div className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 border-b pb-3">
                  Job Overview
                </h2>

                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      Company
                    </h3>
                    <p className="text-gray-600">
                      {application?.jobId?.companyDetails?.name ||
                        "The RD Group of industries"}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      Position
                    </h3>
                    <p className="text-gray-600">
                      {application?.jobId?.designation ||
                        application?.jobDesignation ||
                        "Not specified"}
                    </p>
                  </div>

                  {application?.jobId?.jobDescription && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">
                        Job Description
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {application.jobId.jobDescription}
                      </p>
                    </div>
                  )}

                  {application?.jobId?.keySkills &&
                    application.jobId.keySkills.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">
                          Key Skills Required
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {application.jobId.keySkills.map(
                            (skill: string, index: number) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                              >
                                {skill}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    )}

                  {application?.jobId?.workExperience && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">
                        Experience Required
                      </h3>
                      <p className="text-gray-600">
                        {application.jobId.workExperience.min} -{" "}
                        {application.jobId.workExperience.max} years
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Right Section - Takes 1 column on large screens */}
          <div className="space-y-6">
            {/* Resume Card */}
            <Card className="p-6 bg-[#FFE9D9] border-none shadow-sm">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-gray-900">Resume</h3>

                <div className="w-full aspect-[3/4] rounded-lg overflow-hidden bg-white shadow-sm">
                  <Image
                    src="/images/resume-placeholder.webp"
                    width={400}
                    height={533}
                    alt="Resume Preview"
                    className="w-full h-full object-cover"
                  />
                  {/* <iframe
                    src={application?.resume}
                    width="100%"
                    height="500px"
                    style={{ border: "1px solid #ccc", borderRadius: "8px" }}
                  ></iframe> */}
                  {/* <embed
                    src={application?.resume}
                    type="application/pdf"
                    width="100%"
                    height="500px"
                  /> */}
                  {/* <FileText size={100} /> */}
                </div>

                <div className="space-y-3 ">
                  <p className="font-medium text-gray-800 truncate">
                    {/* {application?.resume || "resume.pdf"} */}
                  </p>

                  {/* <Button
                    className="bg-orange-500 hover:bg-orange-600 text-white w-full flex items-center justify-center gap-2 rounded-lg py-2.5 font-medium transition-colors"
                    onClick={() => {
                      // Add download functionality here
                      console.log("Downloading resume...");
                    }}
                  >
                    <Download size={18} />
                    Download Resume
                  </Button> */}
                  <a
                    href={`${application?.resume}?fl_attachment:resume.pdf`}
                    download="Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg w-full block text-center"
                  >
                    Download
                  </a>
                </div>
              </div>
            </Card>

            {/* Application Status */}
            <Card className="p-6 bg-gray-100 border-none shadow-sm">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-gray-900 flex items-center justify-between">
                  Application Status{" "}
                  {application.status !== "peending" && (
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        application.status === "accepted"
                          ? "bg-green-100 text-green-800"
                          : application.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : application.status === "rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {application.status === "accepted"
                        ? "Accepted"
                        : application.status === "pending"
                          ? "Pending"
                          : application.status === "rejected"
                            ? "Rejected"
                            : ""}
                    </span>
                  )}{" "}
                </h3>

               {application.status === "pending" && (
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    className="flex-1 border-2 border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700 py-2.5 font-medium rounded-lg transition-colors cursor-pointer"
                    onClick={() => {
                      // Add reject functionality here
                      console.log("Rejecting application...");
                      dispatch(rejectApplication(id) as any);
                    }}
                  >
                    Reject
                  </Button>
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 font-medium rounded-lg transition-colors cursor-pointer"
                    onClick={() => {
                      // Add approve functionality here
                      console.log("Approving application...");
                      dispatch(acceptApplication(id) as any);
                    }}
                  >
                    Approve
                  </Button>
                </div>)}
              </div>
            </Card>

            {/* Additional Application Info */}
            {application?.appliedAt && (
              <Card className="p-6 bg-white border-none shadow-sm">
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg text-gray-900">
                    Application Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Applied on:</span>
                      <span className="font-medium text-gray-800">
                        {new Date(application.appliedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="font-medium text-gray-800 capitalize">
                        {application?.status || "Pending"}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;
