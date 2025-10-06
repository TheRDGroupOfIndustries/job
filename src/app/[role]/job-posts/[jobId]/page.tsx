import JobDetails from "@/components/JobDetails";

export default async function Page ({params}: {params: {jobId: string}}) {
    const {jobId} = await params;
    // console.log("params", params);
    // console.log("jobId", jobId);
    
  return (
    <JobDetails jobId={jobId} />
  );
};
