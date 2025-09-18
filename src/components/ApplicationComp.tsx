"use client";

import React from "react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const applications = [
  {
    id: 1,
    name: "Ankush Singh",
    email: "ankushsingh1029@gmail.com",
    role: "Senior Developer",
    company: "The RD Group of industries",
  },
  {
    id: 2,
    name: "Ankush Singh",
    email: "ankushsingh1029@gmail.com",
    role: "Senior Developer",
    company: "The RD Group of industries",
  },
  {
    id: 3,
    name: "Ankush Singh",
    email: "ankushsingh1029@gmail.com",
    role: "Senior Developer",
    company: "The RD Group of industries",
  },
  {
    id: 4,
    name: "Ankush Singh",
    email: "ankushsingh1029@gmail.com",
    role: "Senior Developer",
    company: "The RD Group of industries",
  },
];

const ApplicationComp = () => {
  return (
    <div className="h-[calc(100vh-80px)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-y-auto custom-scrollbar p-4 sm:p-6 md:p-10">
      {applications.map((app) => {
        const initials = app.name
          .split(" ")
          .map((n) => n[0])
          .join("");

        return (
          <Card
            key={app.id}
            className="w-full rounded-2xl p-4 sm:p-6 bg-[#F4F4F4] shadow hover:shadow-lg transition-all flex flex-col items-start h-fit border-none"
          >
            {/* Avatar */}
            <Avatar className="w-20 h-20 sm:w-24 sm:h-24 bg-[#8C8C8C] text-white text-3xl sm:text-5xl font-semibold mb-4">
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>

            {/* Info */}
            <CardContent className="p-0 text-start w-full">
              <h2 className="text-lg sm:text-2xl font-medium">{app.name}</h2>
              <p className="text-gray-500 text-xs sm:text-sm break-words">
                ({app.email})
              </p>
              <p className="text-gray-500 text-sm sm:text-base mt-2 sm:mt-3">
                {app.role} | {app.company}
              </p>
            </CardContent>

            {/* Button */}
            <div className="mt-4 flex justify-start w-full">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white text-sm sm:text-base rounded-full px-8 sm:px-12 flex items-center gap-2">
                View <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default ApplicationComp;
