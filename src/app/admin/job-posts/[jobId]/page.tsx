import JobDetails from "@/components/JobDetails";

export default function Page ({params}: {params: {jobId: string}}) {
    const {jobId} = params;
    console.log("params", params);
    console.log("jobId", jobId);
    
  return (
    <JobDetails jobId={jobId} />
  );
};
