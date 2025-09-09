"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { toggleMailSelection } from "@/redux/features/mailSlice";
import { RootState } from "@/redux/store";
import { Mail } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import JobForm from "./JobForm";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { MapPin } from "lucide-react";
import { useEffect } from "react";
import { fetchJobs } from "@/redux/features/jobSlice";
export default function JobComp() {
  const { mails, selectedMail } = useSelector((state: RootState) => state.mail);
  const { jobs } = useSelector((state: RootState) => state.job);
  const dispatch = useDispatch<any>();

  // Format the date to "MM/DD/YYYY"
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  useEffect(() => {
    dispatch(fetchJobs());
  }, []);
  return (
    <>
      <div className="flex items-center gap-6 sticky top-0 left-0 right-0 justify-end p-2 px-10 ">
        <JobForm />
        {/* <h1 className="text-xl font-semibold">Job Posts</h1> */}
      </div>
      <div className="flex-1 h-[calc(100vh-80px)] overflow-y-auto  px-10">
        {jobs.map((job: any) => (
          <Card
            key={job.id}
            // onClick={() => setSelectedJob(job)}
            className="rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          >
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl font-bold text-blue-600">
                {job.designation}
              </CardTitle>
              <div className="flex flex-wrap items-center gap-2 mt-2 text-gray-500">
                <span className="text-md font-medium text-gray-700">
                  {job.companyName}
                </span>
                <Separator orientation="vertical" className="h-4" />
                <Badge variant="outline" className="text-xs">
                  {job.employmentType}
                </Badge>
                <div className="flex items-center space-x-1 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span className="capitalize">{job.workMode}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-2">
                {job.location.map((loc: any) => (
                  <Badge
                    key={loc}
                    variant="secondary"
                    className="text-xs px-2 py-1"
                  >
                    {loc}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
