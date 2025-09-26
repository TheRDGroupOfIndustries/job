import JobDetails from "@/components/user/JobDetails";

export default function Page ({ params }: { params: { jobId: string } }) {

  return (
    <JobDetails id={params.jobId} />
  );
};
