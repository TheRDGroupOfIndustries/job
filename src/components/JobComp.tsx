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
import { Pencil, Plus, Trash } from "lucide-react";

export default function JobComp() {
  const { mails, selectedMail } = useSelector((state: RootState) => state.mail);
  const { jobs } = useSelector((state: RootState) => state.job); // Ensure jobs is typed as IJob[]

  const [isOpenForm, setIsOpenForm] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [deletingJob, setDeletingJob] = useState(false);

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

  const handleDelete = (jobId: string) => {
    setDeletingJob(true);
    dispatch(deleteJob(jobId))
      .unwrap()
      .then(() => {
        setDeletingJob(false);
      });
  };

  return (
    <>
      <div className="flex items-center gap-6 sticky top-0 left-0 right-0 justify-end p-2 px-10 ">
        {/* <JobForm /> */}
        <Button
          onClick={() => setIsOpenForm(true)}
          className="cursor-pointer text-card"
        >
          <Plus /> Post New Job
        </Button>
        {/* <h1 className="text-xl font-semibold">Job Posts</h1> */}
      </div>
      <div className="flex-1 h-[calc(100vh-80px)] overflow-y-auto  px-10">
        {jobs.map((job: any) => (
          <div key={job._id} className="mb-4">
            <Card className="w-full shadow-md rounded-lg border-none hover:bg-background transition-all duration-300 ">
              <CardHeader>
                <CardTitle className="flex gap-5 items-center text-xl font-bold text-gray-800">
                  {job.designation}
                  <Badge variant="outline" className="text-sm font-normal">
                    {job.employmentType}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex gap-4 justify-between">
                <div className="text-sm text-gray-500">
                  <p className="capitalize">
                    {job.companyDetails.name} • {job.companyDetails.locatedAt}
                  </p>
                  <p>
                    Work Mode:{" "}
                    <span className="capitalize">{job.workMode}</span>
                  </p>
                  <p>Posted on: {formatDate(job.createdAt)}</p>
                  <p>Vacancy: {job.vacancy}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <JobDetails job={job} />
                  <Button
                    className="text-card cursor-pointer"
                    onClick={() => {
                      setUpdateId(job._id);
                      setIsOpenForm(true);
                    }}
                  >
                    <Pencil /> Update
                  </Button>
                  <Button
                    className="text-card cursor-pointer"
                    onClick={() => handleDelete(job._id)}
                  >
                   <Trash /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {isOpenForm &&
        (updateId ? (
          <JobForm
            mode="edit"
            close={() => {
              setIsOpenForm(false);
              setUpdateId(null);
            }}
            jobId={updateId}
          />
        ) : (
          <JobForm mode="create" close={() => setIsOpenForm(false)} />
        ))}
    </>
  );
}
