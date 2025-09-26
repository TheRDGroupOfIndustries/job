// components/JobCard.jsx
import React from "react";
import { Heart, MapPin, Briefcase, DollarSign, Clock, Building, IndianRupee } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Job {
  _id: string;
  designation: string;
  companyDetails: {
    name: string;
    established: number;
    sector: string;
    locatedAt: string;
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
  roleCategory: string;
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

  

  // Format salary display
  const formatSalary = () => {
    if (annualSalary.hideFromCandidates) {
      return "Salary not disclosed";
    }
    const currency = annualSalary.currency === 'INR' ? '₹' : annualSalary.currency;
    return `${currency}${annualSalary.min} - ${currency}${annualSalary.max} per year`;
  };

  // Format posted time
  const formatPostedTime = (dateString: string) => {
    const now = new Date();
    const posted = new Date(dateString);
    const diffInDays = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return "Posted today";
    if (diffInDays === 1) return "Posted 1 day ago";
    if (diffInDays < 7) return `Posted ${diffInDays} days ago`;
    if (diffInDays < 30) return `Posted ${Math.floor(diffInDays / 7)} weeks ago`;
    return `Posted ${Math.floor(diffInDays / 30)} months ago`;
  };

  // Format work mode and employment type
  const formatJobType = () => {
    let type = employmentType?.replace('-', ' ') || '';
    if (workMode && workMode.toLowerCase() === 'remote') {
      type += ' • Remote';
    } else if (workMode) {
      type += ` • ${workMode.replace('-', ' ')}`;
    }
    return type;
  };

  // Get company logo (placeholder for now)
  const getCompanyLogo = () => {
    // Generate a placeholder image based on company name
    const companyName = companyDetails?.name || 'Company';
    // return `https://ui-avatars.com/api/?name=${encodeURIComponent(companyName)}&size=48&background=FF7F3F&color=ffffff&bold=true`;
    return "/images/jobs/devops-engg.jpg"
  };

  // Function to determine tag styling based on its type
  const getTagStyle = (tag: string) => {
    const baseClasses = "text-xs font-medium px-2.5 py-0.5 rounded-full transition-colors";

    // Customize colors for specific skills
    const lowerTag = tag.toLowerCase();
    
    if (lowerTag.includes('react') || lowerTag.includes('javascript') || lowerTag.includes('js')) {
      return `${baseClasses} bg-blue-100 text-blue-800`;
    }
    if (lowerTag.includes('python') || lowerTag.includes('django') || lowerTag.includes('flask')) {
      return `${baseClasses} bg-green-100 text-green-800`;
    }
    if (lowerTag.includes('java') || lowerTag.includes('spring')) {
      return `${baseClasses} bg-red-100 text-red-800`;
    }
    if (lowerTag.includes('node') || lowerTag.includes('express')) {
      return `${baseClasses} bg-emerald-100 text-emerald-800`;
    }
    if (lowerTag.includes('sql') || lowerTag.includes('database')) {
      return `${baseClasses} bg-purple-100 text-purple-800`;
    }
    
    // Default style
    return `${baseClasses} bg-gray-100 text-gray-700`;
  };

  // Combine and deduplicate skills
  const allSkills = [...new Set([...keySkills, ...skills])];
  const displaySkills = allSkills.slice(0, 3); // Show max 3 skills

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg flex flex-col h-full relative hover:-translate-y-2 duration-200 transition-all group">
      {/* Company Info & Save Icon */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start">
          <Image
            width={48}
            height={48}
            src={getCompanyLogo()}
            alt={`${companyDetails?.name || 'Company'} logo`}
            className="w-12 h-12 rounded-lg object-cover mr-3 flex-shrink-0"
          />
          <div className="flex flex-col items-start max-w-[80%]">
            <h3 className="text-xl text-start font-bold text-gray-900 group-hover:text-orange-500 transition-all duration-200 mb-1 line-clamp-2">
              {designation}
            </h3>
            <h4 className="text-base font-medium text-gray-600">
              {companyDetails?.name || 'Company Name'}
            </h4>
          </div>
        </div>
        {/* <button
          aria-label="Save Job"
          className="text-gray-400 hover:text-orange-500 transition-colors flex-shrink-0"
        >
          <Heart size={20} />
        </button> */}
      </div>

      {/* Details Grid */}
      <div className="space-y-3 text-sm text-gray-600 pb-4 mb-4 flex-grow">
        <div className="flex items-center">
          <MapPin size={16} className="mr-2 flex-shrink-0 text-gray-400" />
          <span>{location?.[0] || 'Location not specified'}</span>
        </div>
        
        <div className="flex items-center">
          <Briefcase size={16} className="mr-2 flex-shrink-0 text-gray-400" />
          <span className="capitalize">{formatJobType()}</span>
        </div>
        
        <div className="flex items-center">
          <IndianRupee size={16} className="mr-2 flex-shrink-0 text-gray-400" />
          <span>{formatSalary()}</span>
        </div>
        
        <div className="flex items-center">
          <Clock size={16} className="mr-2 flex-shrink-0 text-gray-400" />
          <span>{formatPostedTime(createdAt)}</span>
        </div>

        {department && (
          <div className="flex items-center">
            <Building size={16} className="mr-2 flex-shrink-0 text-gray-400" />
            <span>{department} • {vacancy} opening{vacancy > 1 ? 's' : ''}</span>
          </div>
        )}
      </div>

      {/* Skills Tags */}
      {displaySkills.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {displaySkills.map((skill, index) => (
            <span
              key={index}
              className={getTagStyle(skill)}
            >
              {skill}
            </span>
          ))}
          {allSkills.length > 3 && (
            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-500">
              +{allSkills.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Apply Button */}
      <Link href={`/browse-jobs/${_id}`} className="w-full font-semibold py-3 rounded-lg transition-all bg-[#FF7F3F] text-white hover:bg-orange-600 cursor-pointer hover:scale-[1.02] transform duration-200 flex justify-center items-center">
        Apply Now
      </Link>
    </div>
  );
};

export default JobCard;