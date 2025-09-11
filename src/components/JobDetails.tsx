"use client";

import { IJob } from "@/models/Job";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "@radix-ui/react-separator";
import { useState } from "react";
import { Button } from "./ui/button";
import { Eye, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import toast from "react-hot-toast";
import { deleteJob } from "@/redux/features/jobSlice";
import JobForm from "./JobForm";
import { useRouter } from "next/navigation";

export default function JobDetails({ jobId }: { jobId: string }) {
  const [openView, setOpenView] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [deletingJob, setDeletingJob] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState(false);

  const { jobs } = useSelector((state: RootState) => state.job);
  if (!jobs) {
    return null;
  }
  const job = jobs.find((job: IJob) => job._id === jobId) as IJob;
  console.log("job: ", job);
  const dispatch = useDispatch<any>();
  const router = useRouter()

  // Format the date to "MM/DD/YYYY"
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  const handleDelete = (jobId: string) => {
    setDeletingJob(true);
    toast.loading("Deleting Job...", { id: "delete-job" });
    dispatch(deleteJob(jobId))
      .unwrap()
      .then(() => {
        toast.success("Job Deleted Successfully", { id: "delete-job" });
        router.push("/admin/job-posts")
      })
      .catch((err: any) => {
        toast.error("Error Deleting Job", { id: "delete-job" });
        console.log("err", err);
      })
      .finally(() => {
        setDeletingJob(false);
      });
  };

  if (!job) return null;

  return (
    <>
      <div className="flex-1 h-[calc(100vh-80px)] overflow-y-auto">
        <p className="text-sm text-secondary">{job._id}</p>
        <div className="flex justify-between items-center text-3xl font-bold text-gray-800">
          <div className="flex items-center gap-5">
            <span>{job.designation}</span>
            <Badge
              variant="secondary"
              className="text-sm font-normal bg-secondary/30 capitalize"
            >
              {job.employmentType}
            </Badge>
          </div>
          <div className="flex items-center gap-5">
            <Button
            className="text-card"
              onClick={() => {
                setUpdateId(job._id);
                setIsOpenForm(true);
              }}
            >
              Edit
            </Button>
            <Button className="text-card" onClick={()=>handleDelete(job._id)}>Delete</Button>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          <p>
            {job.companyDetails.name} • {job.companyDetails.locatedAt}
          </p>
          <p>
            Work Mode: <span className="capitalize">{job.workMode}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 mt-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                Job Description
              </h3>
              <p className="text-gray-600">
                {job.jobDescription} {job.jobDescription.length < 100 && "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat, perspiciatis nesciunt fugit aliquam beatae quam maiores eligendi eos at? Dicta magni doloribus illum corporis alias! Perspiciatis magnam officia ex, inventore eaque officiis error perferendis at. Laudantium nisi omnis, earum quam exercitationem minus, ex impedit in dolorum itaque necessitatibus? Illo vero aliquam repellat recusandae cum quasi perspiciatis adipisci itaque eveniet corporis! Accusamus ipsum mollitia, quae nostrum, soluta nesciunt molestias, saepe ipsa earum laboriosam eligendi expedita laborum voluptates ea dolorum ex nulla qui explicabo vel officia alias tempora in numquam maiores! Quas aspernatur voluptas corporis dicta placeat officiis minus eum sequi magni."}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                Requirements
              </h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600 capitalize">
                <li>Qualification: {job.educationQualification}</li>
                <li>
                  Experience: {job.workExperience.min}-{job.workExperience.max}{" "}
                  years
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
                {job.annualSalary.max.toLocaleString("en-IN")} INR (per annum)
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                Key Skills
              </h3>
              <div className="">
                <div className="flex flex-wrap gap-2 mt-2">
                  {job.keySkills.map((skill: string, index: number) => (
                    <Badge
                      key={index}
                      className="bg-blue-100 text-blue-800 hover:bg-blue-200"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {job.skills.map((skill: string, index: number) => (
                    <Badge key={index} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 ">Company</h3>
              <div className="capitalize">
                <p className="text-gray-600">Name: {job.companyDetails.name}</p>
                <p className="text-gray-600">
                  Location: {job.companyDetails.locatedAt}
                </p>
                <p className="text-gray-600">
                  Sector: {job.companyDetails.sector}
                </p>
                <p className="text-gray-600">
                  Established: {job.companyDetails.established}
                </p>
              </div>
            </div>
            <div className=" text-gray-500">
              <p>Vacancy: {job.vacancy}</p>
              <p>
                Hiring for:{" "}
                <span className="text-purple-600 font-medium">Women</span>
              </p>
            </div>
          </div>
        </div>
        <Separator className="my-6" />
      </div>
      {isOpenForm && updateId && (
        <JobForm
          mode="update"
          close={() => {
            setIsOpenForm(false);
            setUpdateId(null);
          }}
          jobId={updateId}
        />
      )}
    </>
  );
}
