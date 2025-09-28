import React from "react";
import { MapPin, Briefcase, Clock, Building, IndianRupee } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface Job {
  _id: string;
  designation: string;
  companyDetails: {
    name: string;
    established: number;
    sector: string;
    locatedAt: string;
    logo?: string;
  };
  location: string[];
  employmentType: string;
  workMode: string;
  annualSalary: {
    min: number;
    max: number;
    currency: string;
    hideFromCandidates: boolean;
  };
  createdAt: string;
  skills: string[];
  keySkills: string[];
  department: string;
  roleCategory?: string;
  vacancy: number;
  jobDescription: string;
}

const JobCard = ({ job }: { job: Job }) => {
  const {
    _id,
    designation,
    companyDetails,
    location,
    employmentType,
    workMode,
    annualSalary,
    createdAt,
    skills,
    keySkills,
    department,
    vacancy,
  } = job;

  const formatSalary = () => {
    if (annualSalary.hideFromCandidates) return "Salary not disclosed";
    const currency = annualSalary.currency === "INR" ? "₹" : annualSalary.currency;
    const format = (num: number) => num.toLocaleString("en-IN");
    return `${currency}${format(annualSalary.min)} - ${currency}${format(annualSalary.max)}`;
  };

  const formatPostedTime = (dateString: string) => {
    const now = new Date();
    const posted = new Date(dateString);
    const diffInDays = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60 * 24));
    if (diffInDays === 0) return "Posted today";
    if (diffInDays === 1) return "1 day ago";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  };

  const formatJobType = () => {
    let type = employmentType?.replace("-", " ") || "";
    if (workMode?.toLowerCase() === "remote") {
      type += " • Remote";
    } else if (workMode) {
      type += ` • ${workMode.replace("-", " ")}`;
    }
    return type;
  };

  const getCompanyLogo = () => {
    // Generate a placeholder image based on company name
    const companyName = companyDetails?.name || 'Company';
    // return `https://ui-avatars.com/api/?name=${encodeURIComponent(companyName)}&size=48&background=FF7F3F&color=ffffff&bold=true`;
    return "/images/jobs/devops-engg.jpg"
  };

  const getTagStyle = (tag: string) => {
    const base = "text-xs font-medium px-2.5 py-0.5 rounded-full transition-colors";
    const lower = tag.toLowerCase();
    if (lower.includes("react") || lower.includes("javascript") || lower.includes("js"))
      return `${base} bg-blue-100 text-blue-800`;
    if (lower.includes("python") || lower.includes("django") || lower.includes("flask"))
      return `${base} bg-green-100 text-green-800`;
    if (lower.includes("java") || lower.includes("spring"))
      return `${base} bg-red-100 text-red-800`;
    if (lower.includes("node") || lower.includes("express"))
      return `${base} bg-emerald-100 text-emerald-800`;
    if (lower.includes("sql") || lower.includes("database"))
      return `${base} bg-purple-100 text-purple-800`;
    return `${base} bg-gray-100 text-gray-700`;
  };

  const allSkills = [...new Set([...keySkills, ...skills])];
  const displaySkills = allSkills.slice(0, 3);

  return (
    <div
      className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md flex flex-col 
      min-h-[250px] w-full sm:w-[280px] lg:w-auto relative hover:-translate-y-1 transition-all group"
    >
      {/* Company Info */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-start">
          <Image
            width={40}
            height={40}
            src={getCompanyLogo()}
            alt={`${companyDetails?.name || "Company"} logo`}
            className="w-10 h-10 rounded-lg object-cover mr-3 flex-shrink-0"
          />
          <div className="flex flex-col items-start max-w-[85%]">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-500 transition-all mb-0.5 line-clamp-1">
              {designation}
            </h3>
            <h4 className="text-sm font-medium text-gray-500">
              {companyDetails?.name || "Company Name"}
            </h4>
          </div>
        </div>
      </div>

      {/* Job Details */}
      <div className="space-y-1.5 text-sm text-gray-600 mb-2 flex-grow">
        <div className="flex items-center">
          <MapPin size={15} className="mr-1 text-gray-400" />
          <span>{location?.[0] || "Location n/a"}</span>
        </div>
        <div className="flex items-center">
          <Briefcase size={15} className="mr-1 text-gray-400" />
          <span className="capitalize">{formatJobType()}</span>
        </div>
        <div className="flex items-center">
          <IndianRupee size={15} className="mr-1 text-gray-400" />
          <span>{formatSalary()}</span>
        </div>
        <div className="flex items-center">
          <Clock size={15} className="mr-1 text-gray-400" />
          <span>{formatPostedTime(createdAt)}</span>
        </div>
        {department && (
          <div className="flex items-center">
            <Building size={15} className="mr-1 text-gray-400" />
            <span>
              {department} • {vacancy} opening{vacancy > 1 ? "s" : ""}
            </span>
          </div>
        )}
      </div>

      {/* Skills */}
      {displaySkills.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {displaySkills.map((skill, i) => (
            <span key={i} className={getTagStyle(skill)}>
              {skill}
            </span>
          ))}
          {allSkills.length > 3 && (
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
              +{allSkills.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Apply */}
      <Link
        href={`/browse-jobs/${_id}`}
        aria-label={`Apply for ${designation}`}
        className="w-full text-sm font-semibold py-2 rounded-md transition-all bg-[#FF7F3F] 
        text-white hover:bg-orange-600 cursor-pointer hover:scale-[1.02] duration-200 
        flex justify-center items-center mt-auto"
      >
        Apply
      </Link>
    </div>
  );
};

export default JobCard;
