"use client";

import React, { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  ArrowDownToLine,
  ChevronLeft,
  Download,
  FileText,
  MapPin,
  Star,
  Code,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  acceptApplication,
  rejectApplication,
  deleteApplication,
  fetchApplications,
} from "@/redux/features/applicationSlice";
import { useRouter } from "next/navigation";

const ApplicationDetails = ({ id }: { id: string }) => {
  const { applications } = useSelector(
    (state: RootState) => state.applications
  );
  const [application, setApplication] = useState<any>(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
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

  const renderRatingStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Star
              key={i}
              size={18}
              className={
                i < rating ? "text-primary fill-primary" : "text-gray-300"
              }
            />
          ))}
        <span className="ml-2 font-semibold text-gray-800">
          {rating.toFixed(1)} / 5
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="sticky top-0 pl-20 pr-10 pt-5 pb-2 bg-section z-20 flex items-center justify-between">
          <Button
            variant={"ghost"}
            onClick={() => router.back()}
            className="rounded-full cursor-pointer bg-background hover:bg-background/80 transition"
          >
            <ChevronLeft className="w-8 h-8 " />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 pl-20 pr-10 pb-10 pt-4 overflow-auto">
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <Card className="p-6 bg-white border-none shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <Avatar className="w-16 h-16 sm:w-20 sm:h-20 bg-[#FD5E00] text-white text-2xl sm:text-3xl font-semibold flex-shrink-0">
                  {application.userProfileImage ? (
                    <Image
                      layout="fill"
                      src={application.userProfileImage}
                      alt={application.appliedBy.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <AvatarFallback className="bg-[#FD5E00] text-white">
                      {initials}
                    </AvatarFallback>
                  )}
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
                      {application?.job?.designation || "Position not specified"}
                    </span>

                    <span className="hidden sm:inline text-gray-400">|</span>

                    <span className="text-gray-600">
                      {application?.job?.companyDetails?.name ||
                        "The RD Group of industries"}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Applicant Details */}
            <Card className="p-6 bg-white border-none shadow-sm">
              <div className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 border-b pb-3">
                  Applicant Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1 flex items-center">
                      <MapPin size={16} className="mr-2 text-primary" />
                      Location
                    </h3>
                    <p className="text-gray-600">{application.userLocation || "N/A"}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1 flex items-center">
                      <Star size={16} className="mr-2 text-primary" />
                      Rating
                    </h3>
                    {renderRatingStars(application.rating || 0)}
                  </div>
                </div>

                {application.skills && application.skills.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <Code size={16} className="mr-2 text-primary" /> Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {application.skills.map((skill: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-orange-100 text-primary rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
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
                    <h3 className="font-semibold text-gray-800 mb-1">Company</h3>
                    <p className="text-gray-600">
                      {application?.job?.companyDetails?.name || "The RD Group of industries"}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Position</h3>
                    <p className="text-gray-600">
                      {application?.job?.designation || application?.jobDesignation || "Not specified"}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Section */}
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
                </div>
                <div className="space-y-3">
                  <a
                    href={`${application?.resume}?fl_attachment:resume.pdf`}
                    download="Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg w-full block text-center"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Download size={18} />
                      Download
                    </div>
                  </a>
                </div>
              </div>
            </Card>

            {/* Application Status */}
            <Card className="p-6 bg-gray-100 border-none shadow-sm relative">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-gray-900 flex flex-wrap items-center justify-between">
                  <span className="whitespace-nowrap">Application Status</span>
                  <div className="flex items-center gap-2">
                    {/* Status Badge */}
                    {application.status !== "pending" && (
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          application.status === "accepted"
                            ? "bg-green-100 text-green-800"
                            : application.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : application.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {application.status === "accepted"
                          ? "Accepted"
                          : application.status === "pending"
                          ? "Pending"
                          : application.status === "rejected"
                          ? "Rejected"
                          : "N/A"}
                      </span>
                    )}

                    {/* Trash Icon */}
                    <Trash2
                      className="text-red-600 w-6 h-6 cursor-pointer hover:text-red-700 transition"
                      onClick={() => setShowDeletePopup(true)}
                    />
                  </div>
                </h3>

                {/* Approve/Reject Buttons */}
                {application.status === "pending" && (
                  <div className="flex gap-4 mt-4 border-t pt-4">
                    <Button
                      variant="outline"
                      className="flex-1 border-2 border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700 py-2.5 font-medium rounded-lg transition-colors cursor-pointer"
                      onClick={() => {
                        if (!application?._id) return;
                        dispatch(rejectApplication(application._id) as any)
                          .unwrap()
                          .then(() => router.back());
                      }}
                    >
                      Reject
                    </Button>

                    <Button
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 font-medium rounded-lg transition-colors cursor-pointer"
                      onClick={() => {
                        dispatch(acceptApplication(application._id) as any);
                      }}
                    >
                      Approve
                    </Button>
                  </div>
                )}
              </div>

              {/* Custom Delete Popup */}
              {showDeletePopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                  <div className="bg-white rounded-lg p-6 w-80 shadow-lg space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900">Delete Application</h2>
                    <p className="text-gray-600">
                      Are you sure you want to permanently delete this application? This action cannot be undone.
                    </p>
                    <div className="flex justify-end gap-3 mt-4">
                      <Button
                        variant="outline"
                        onClick={() => setShowDeletePopup(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-red-600 hover:bg-red-700 text-white"
                        onClick={() => {
                          if (!application._id) return;
                          dispatch(deleteApplication(application._id) as any)
                            .unwrap()
                            .then(() => {
                              setShowDeletePopup(false);
                              router.back();
                            });
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;
