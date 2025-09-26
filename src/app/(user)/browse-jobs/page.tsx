import BrowseJobsPage from "@/components/user/BrowseJobsPage";
import { Suspense } from "react";

export default function Page () {
  return (
    <Suspense fallback={<div>Loading jobs...</div>}>
      <BrowseJobsPage />
    </Suspense>
      
  );
};
