// components/JobCard.jsx
import React from "react";
import { Heart, MapPin, Briefcase, DollarSign, Clock } from "lucide-react";

interface Job {
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  logoUrl: string;
  tags: string[];
  contractType?: string;
//   color?: "orange" | "default";
}

const JobCard = ({ job }: { job: Job }) => {
  const {
    title,
    company,
    location,
    type,
    salary,
    posted,
    logoUrl,
    tags,
    contractType,
    // color,
  } = job;

  // Function to determine tag styling based on its type
  const getTagStyle = (tag: string) => {
    // Customize colors for specific tags if needed, or use a default
    const baseClasses =
      "text-xs font-medium px-2.5 py-0.5 rounded-full transition-colors";

    if (tag === "React" || tag === "Figma" || tag === "Python") {
      return `${baseClasses} bg-blue-100 text-blue-800`;
    }
    if (
      tag === "TypeScript" ||
      tag === "Prototyping" ||
      tag === "Machine Learning"
    ) {
      return `${baseClasses} bg-indigo-100 text-indigo-800`;
    }
    if (tag === "Node.js" || tag === "User Research" || tag === "SQL") {
      return `${baseClasses} bg-green-100 text-green-800`;
    }
    // Default style
    return `${baseClasses} bg-gray-100 text-gray-700`;
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg flex flex-col h-full relative hover:-translate-y-2 duration-200 transition-all group">
      {/* Company Info & Save Icon */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start">
          <img
            src={logoUrl}
            alt={`${company} logo`}
            className="w-12 h-12 rounded-lg object-cover mr-3"
          />
          <div className="flex flex-col items-start max-w-[80%]">
            <h3 className="text-xl text-start font-bold text-gray-900 group-hover:text-primary transition-all duration-200 mb-1 line-clamp-2">
              {title}
            </h3>
            <h4 className="text-base font-medium text-gray-600">{company}</h4>
            {/* {contractType && (
              <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${color === 'orange' ? 'bg-orange-100 text-primary' : 'bg-gray-100 text-gray-600'}`}>
                {contractType}
              </span>
            )} */}
          </div>
        </div>
        <button
          aria-label="Save Job"
          className="text-gray-400 hover:text-primary transition-colors"
        >
          <Heart size={20} />
        </button>
      </div>

      {/* Job Title */}

      {/* Details Grid */}
      <div className="space-y-3 text-base text-gray-600 pb-4 mb-4 flex-grow">
        <div className="flex items-center">
          <MapPin size={16} className="mr-2 flex-shrink-0" />
          <span>{location}</span>
        </div>
        <div className="flex items-center">
          <Briefcase size={16} className="mr-2 flex-shrink-0" />
          <span>{type}</span>
        </div>
        <div className="flex items-center">
          <DollarSign size={16} className="mr-2 flex-shrink-0" />
          <span>{salary}</span>
        </div>
        <div className="flex items-center">
          <Clock size={16} className="mr-2 flex-shrink-0" />
          <span>{posted}</span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="text-xs font-semibold px-4 py-1.5 rounded-full transition-colors text-primary bg-primary/20"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Apply Button */}
      <button
        className="w-full font-semibold py-3 rounded-lg transition-all bg-primary text-white hover:bg-orange-600 cursor-pointer hover:scale-[1.02] transform duration-200 flex justify-center items-center"
            
      >
        Apply Now
      </button>
    </div>
  );
};

export default JobCard;
