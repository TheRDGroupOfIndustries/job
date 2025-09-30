"use client";

import { useEffect, useState } from "react";
import {
  Download,
  Star,
  StarHalf,
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  IndianRupee,
} from "lucide-react";

// 1. Define detailed TypeScript Interface based on the API response
interface JobDetails {
  designation: string;
  employmentType: string;
  keySkills: string[];
  skills: string[];
  workMode: string;
  location: string[];
  workExperience: { min: number; max: number };
  companyDetails: { name: string };
  // Add other fields from the job object if needed elsewhere
  annualSalary: { min: number; max: number; currency: string };
}

interface Application {
  _id: string;
  job: JobDetails;
  skills: string[]; // User's matched skills (from the application)
  resume: string; // URL to the resume PDF
  yearOfExperience: number;
  rating: number; // 0 to 5
  status: "pending" | "accepted" | "rejected" | "reviewed"; // Added possible statuses
  createdAt: string; // The application date
}


/**
 * Helper component to render star ratings using Lucide icons
 */
const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const isHalf = rating > i - 1 && rating < i;
    const isFull = rating >= i;

    if (isFull) {
      stars.push(
        <Star key={i} className="text-yellow-400 fill-yellow-400" size={16} />
      );
    } else if (isHalf) {
      stars.push(
        <StarHalf
          key={i}
          className="text-yellow-400 fill-yellow-400"
          size={16}
        />
      );
    } else {
      stars.push(<Star key={i} className="text-gray-300" size={16} />);
    }
  }
  return <div className="flex space-x-0.5">{stars}</div>;
};

/**
 * Helper to format the application date
 */
const formatDate = (isoDate: string) => {
  // Assuming the date format from the image is DD/MM/YYYY
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const formatSalary = (salary: Application["job"]["annualSalary"]) => {
  // Simple conversion for INR to lakhs for cleaner display
  const formatValue = (value: number) => {
    if (salary.currency === "INR" && value >= 100000) {
      return `${(value / 100000).toFixed(1)} Lac`;
    }
    return `${value.toLocaleString()}`;
  };

  return `${formatValue(salary.min)} - ${formatValue(salary.max)} ${salary.currency}`;
};

/**
 * Helper to style the status chip
 */
const getStatusClasses = (status: Application["status"]) => {
  switch (status) {
    case "accepted":
      return "bg-green-100 text-green-700";
    case "rejected":
      return "bg-red-100 text-red-700";
    case "reviewed":
      return "bg-blue-100 text-blue-700";
    case "pending":
    default:
      return "bg-yellow-100 text-yellow-700";
  }
};

// Component for a single Application Card
const ApplicationCard: React.FC<{ application: Application }> = ({
  application,
}) => {
  const job = application.job;
  const displayLocation =
    job.location.find((loc) => loc.toLowerCase() !== job.workMode) ||
    job.location[0];

  return (
    <div className="border border-gray-200 p-6 rounded-lg shadow-sm mb-6">
      <div className="flex justify-between items-start mb-3">
        {/* Job Title and Company */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {job.designation}
          </h2>
          <p className="text-red-500 font-medium">{job.companyDetails.name}</p>
        </div>

        {/* Status Chip */}
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${getStatusClasses(application.status)}`}
        >
          {application.status}
        </span>
      </div>

      {/* Primary Details Row (Location, Experience, Salary) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600 mb-4 border-b pb-4">
        {/* Location & Work Mode */}
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-2 text-red-500" />
          <span className="capitalize">
            {job.workMode} / {displayLocation}
          </span>
        </div>

        {/* Employment Type */}
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-2 text-gray-500" />
          <span className="capitalize">{job.employmentType}</span>
        </div>

        {/* Annual Salary */}
        <div className="flex items-center">
          <IndianRupee className="w-4 h-4 mr-2 text-green-600" />
          <span className="font-medium text-gray-700">
            {formatSalary(job.annualSalary)}
          </span>
        </div>
      </div>

      {/* Secondary Details Row (Experience, Rating, Applied Date) */}
      <div className="flex flex-wrap items-center text-sm text-gray-600 space-x-6 mb-4">
        {/* Experience Match */}
        <div className="flex items-center">
          <Briefcase className="w-4 h-4 mr-2 text-gray-500" />
          <span>
            <span className="font-semibold">Your Exp:</span>{" "}
            {application.yearOfExperience} Yrs (Req: {job.workExperience.min}-
            {job.workExperience.max} Yrs)
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Rating:</span>
          <StarRating rating={application.rating} />
        </div>

        {/* Applied Date */}
        <div>
          <span className="font-semibold">Applied on:</span>{" "}
          {formatDate(application.createdAt)}
        </div>
      </div>

      {/* Skills and Resume Button */}
      <div className="flex justify-between items-end flex-wrap gap-4 pt-4 border-t">
        {/* Skills */}
        <div className="flex items-center text-sm text-gray-600 min-w-0">
          <span className="mr-2 text-red-500 font-bold text-lg leading-none">
            {"<>"}
          </span>
          <span className="font-semibold mr-2 shrink-0">Skills:</span>
          <div className="flex flex-wrap gap-2 min-w-0">
            {/* Displaying the skills the user provided in the application (application.skills) */}
            {application.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium whitespace-nowrap"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Resume Button */}
        <a
          href={application.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 shadow-md shrink-0"
        >
          <span className="mr-2">Resume</span>
          <Download className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};

// Main Page Component
export default function MyApplicationsPage() {
  const [applications, setApplications] = useState<Application[] | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      // ** Replace this with your actual API call **
      const res = await fetch("/api/user/applications/my", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log(data);
      setApplications(data.applications);

      // Using mock data for immediate display
      //   await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      //   setApplications(mockApplications);
    } catch (error) {
      console.error("Error fetching applications:", error);
      // You should set an error state here
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // --- RENDERING LOGIC ---

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (!applications || applications.length === 0) {
    return (
      <div className="container mx-auto p-4 sm:p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Your Resume Applications
        </h1>
        <div className="p-8 text-center text-gray-500 border border-gray-200 rounded-lg">
          <p>You haven't applied for any jobs yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
    <div className="container mx-auto p-4 sm:p-8">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Your Resume Applications
      </h1>

      {/* Search Bar (Matching the Image) */}
      {/* <div className="mb-8">
        <input
          type="text"
          placeholder="Search by job title, company, status, location"
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 shadow-sm"
        />
      </div> */}

      {/* List of Application Cards */}
      <div className="space-y-6">
        {applications.map((app) => (
          <ApplicationCard key={app._id} application={app} />
        ))}
      </div>
    </div>
    </div>
  );
}
