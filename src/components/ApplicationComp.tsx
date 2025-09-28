"use client";

import React, { useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { ArrowRight, Star, MapPin } from "lucide-react"; 
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { fetchApplications } from "@/redux/features/applicationSlice";

const ApplicationComp = () => {
  const { applications, loading, error } = useSelector(
    (state: RootState) => state.applications
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchApplications() as any)
      .unwrap()
      .catch((err: any) => {
        console.error("Failed to fetch applications: ", err);
      });
  }, []);

  const { userData } = useSelector((state: RootState) => state.auth);

  if (loading) return <div className="p-10 text-center">Loading applications...</div>;
  if (error) return <div className="p-10 text-center text-red-500">Error loading applications.</div>;
  if (applications.length === 0) return <div className="p-10 text-center text-gray-500">No applications found.</div>;

  return (
    <div className="h-[calc(100vh-80px)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-y-auto custom-scrollbar p-4 sm:p-6 md:p-10">
      {applications.map((app: any) => {
        const initials = app.appliedBy.name
          .split(" ")
          .map((n: string) => n[0])
          .join("");

        return (
          <Card
            key={app._id}
            className="w-full rounded-2xl p-4 sm:p-6 bg-[#F4F4F4] shadow hover:shadow-lg transition-all flex flex-col items-start h-fit border-none"
          >
            <Avatar className="w-20 h-20 sm:w-24 sm:h-24 bg-[#8C8C8C] text-white text-3xl sm:text-5xl font-semibold mb-4">
              {/* Use image field if available, otherwise fallback */}
              {app.image ? (
                <img src={app.image} alt={app.appliedBy.name} className="w-full h-full object-cover rounded-full" />
              ) : (
                <AvatarFallback>{initials}</AvatarFallback>
              )}
            </Avatar>

            <CardContent className="p-0 text-start w-full space-y-2">
              <h2 className="text-lg sm:text-2xl font-medium">{app.appliedBy.name}</h2>
              <p className="text-gray-500 text-xs sm:text-sm break-words">
                ({app.appliedBy.email})
              </p>
              <p className="text-gray-700 text-sm sm:text-base font-medium">
                {app.jobId.designation} 
              </p>

              {/* NEW FIELD: Location */}
              {app.location && (
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin size={14} className="mr-1 text-orange-500" />
                  {app.location}
                </div>
              )}

              {/* NEW FIELD: Ratings */}
              {app.ratings && (
                <div className="flex items-center text-sm text-yellow-600">
                  <Star size={14} fill="currentColor" className="mr-1" />
                  <span className="font-semibold">{app.ratings.toFixed(1)} / 5</span>
                </div>
              )}

              {/* NEW FIELD: Skills (Displaying first 3) */}
              {app.skills && app.skills.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {app.skills.slice(0, 3).map((skill: string) => (
                    <span 
                      key={skill} 
                      className="text-xs bg-gray-300 text-gray-800 px-2 py-0.5 rounded-full font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                  {app.skills.length > 3 && (
                    <span className="text-xs text-gray-600 px-2 py-0.5">+{app.skills.length - 3} more</span>
                  )}
                </div>
              )}
            </CardContent>

            <div className=" mt-4 flex justify-start w-full">
              <Link
                href={`/${userData?.role}/applications/${app._id}`}
                className="bg-orange-500 hover:bg-orange-600 text-white text-sm sm:text-base rounded-full px-4 py-2 flex items-center gap-2 w-fit"
              >
                View{" "}
                <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
              </Link>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default ApplicationComp;