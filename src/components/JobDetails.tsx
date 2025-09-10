"use client";

import { IJob } from "@/models/Job";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "@radix-ui/react-separator";
import { useState } from "react";
import { Button } from "./ui/button";
import { Eye, X } from "lucide-react";

export default function JobDetails({ job }: { job: IJob }) {
  const [openView, setOpenView] = useState(false);

  // Format the date to "MM/DD/YYYY"
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  return (
    <>
      <Button
        onClick={() => setOpenView(true)}
        className="text-card cursor-pointer"
      >
        <Eye /> View
      </Button>
      {openView && (
        <div className="fixed inset-0 bg-secondary/50 z-50 flex items-center justify-center backdrop-blur-[6px]">
          <Card className="w-full max-w-4xl mx-auto my-8 shadow-lg rounded-xl border-none">
            <CardHeader>
              <CardTitle className="flex justify-between items-center text-3xl font-bold text-gray-800">
                <div className="flex items-center gap-2">
                  {job.designation}
                  <Badge variant="secondary" className="text-sm font-normal bg-secondary/30">
                    {job.employmentType}
                  </Badge>
                </div>

                <Button onClick={() => setOpenView(false)} variant={"ghost"} className="text-foreground rounded-full bg-secondary/40 hover:bg-secondary/50 cursor-pointer">
                  <X />{" "}
                </Button>
              </CardTitle>
              <div className="text-sm text-gray-500">
                <p>
                  {job.companyDetails.name} • {job.companyDetails.locatedAt}
                </p>
                <p>
                  Work Mode: <span className="capitalize">{job.workMode}</span>
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">
                      Job Description
                    </h3>
                    <p className="text-gray-600">{job.jobDescription}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">
                      Requirements
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      <li>
                        Experience: {job.workExperience.min}-
                        {job.workExperience.max} years
                      </li>
                      <li>Locations: {job.location.join(", ")}</li>
                      <li>Openings: {job.vacancy}</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">
                      Salary Range
                    </h3>
                    <p className="text-gray-600">
                      {job.annualSalary.min.toLocaleString("en-IN")} -{" "}
                      {job.annualSalary.max.toLocaleString("en-IN")} INR (per
                      annum)
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">
                      Key Skills
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {job.keySkills.map((skill: string, index: number) => (
                        <Badge
                          key={index}
                          className="bg-blue-100 text-blue-800 hover:bg-blue-200"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {job.skills.map((skill: string, index: number) => (
                        <Badge key={index} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <Separator className="my-6" />
              <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                <p>Company Sector: {job.companyDetails.sector}</p>
                <p>
                  Hiring for:{" "}
                  <span className="text-purple-600 font-medium">Women</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
