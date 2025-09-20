"use client";

import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import JobForm from "./JobForm";

import { useEffect, useState } from "react";
import { deleteJob, fetchJobs } from "@/redux/features/jobSlice";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import BtnLoader from "./BtnLoader";
import JobDetails from "./JobDetails";
import { ArrowUpRight, Pencil, Plus, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function JobComp() {
  const { mails, selectedMail } = useSelector((state: RootState) => state.mail);
  const { jobs } = useSelector((state: RootState) => state.job); // Ensure jobs is typed as IJob[]
  const { userData } = useSelector((state: RootState) => state.auth)

  const [isOpenForm, setIsOpenForm] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fetchJobs());
  }, []);

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  if(jobs.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center h-[calc(100vh-80px)] pl-20 pr-10 my-10">
        <p className="text-xl text-gray-500">
          No job posts available. {userData?.role === 'admin' && "Click 'New' to create one."}
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="flex-1 h-[calc(100vh-80px)] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto custom-scrollbar pl-20 pr-10 my-10">
        {userData?.role === 'admin' && <Card
          onClick={() => setIsOpenForm(true)}
          className="max-w-xs  w-full max-h-[350px] rounded-2xl p-4 bg-card hover:bg-background duration-200 transition-all shadow-none border-none flex flex-col justify-center items-center cursor-pointer "
        >
          <Plus size={100} className="text-primary" />
          <span className="text-primary text-3xl">New</span>
        </Card>}
        {jobs.map((job: any) => {
          const initials = job.roleCategory
            .split(" ")
            .map((word: string) => word[0])
            .join("");

          return (
            <Card key={job._id} className="max-w-xs max-h-[350px] w-full rounded-2xl p-4 bg-card hover:bg-background duration-200 transition-all shadow-none border-none flex flex-col ">
              <CardHeader className="flex items-center justify-center p-0 mt-6">
                <Avatar className="w-20 h-20 bg-transparent text-orange-500 font-bold text-6xl">
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </CardHeader>
              <CardContent className="p-0 m-0 relative flex-1 flex flex-col justify-between">
                <div className="text-gray-500 text-sm">
                  <h2 className="text-xl font-semibold">{job?.roleCategory}</h2>
                  <p className="flex flex-wrap gap-1 capitalize">
                    <span>{job?.designation}</span>
                    {job?.location && job?.workMode && <span>|</span>}
                    {job?.location && <span>{job?.location[0]}</span>}
                    {job?.workMode && <span>|</span>}
                    {job?.workMode && <span>{job?.workMode}</span>}
                  </p>
                  <p className="mt-1 text-xs">{formatDate(job?.createdAt)}</p>
                </div>
                <div className="flex justify-end mt-6">
                  <Link
                    href={`/admin/job-posts/${job?._id}`}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 text-white shadow-lg group hover:scale-110 transition-all duration-300 cursor-pointer"
                  >
                    <ArrowUpRight size={20} />
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {isOpenForm && (
        <JobForm mode="create" close={() => setIsOpenForm(false)} />
      )}
    </>
  );
}
