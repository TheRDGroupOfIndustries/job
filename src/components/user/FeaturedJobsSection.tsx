"use client";

import Image from "next/image";
import React, { useState } from "react";

// Define a type for the job data to improve type safety
interface Job {
  title: string;
  company: string;
  logo: string;
  location: string;
  jobType: string;
  salary: string;
  posted: string;
  skills: string[];
  description: string;
}

const jobData: Job[] = [
  {
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    logo: "https://placehold.co/40x40/FF7F3F/FFFFFF?text=TC",
    location: "San Francisco, CA",
    jobType: "Full-time",
    salary: "$120k - $150k",
    posted: "2 days ago",
    skills: ["React", "TypeScript", "Node.js"],
    description: `We are looking for a highly skilled Senior Frontend Developer to join our team. You will be responsible for leading the development of user-facing features using modern frameworks and tools. The ideal candidate has extensive experience with React, TypeScript, and a strong understanding of Node.js for backend integration.`,
  },
  {
    title: "Product Manager",
    company: "InnovateLab",
    logo: "https://placehold.co/40x40/FF7F3F/FFFFFF?text=IL",
    location: "New York, NY",
    jobType: "Full-time",
    salary: "$130k - $160k",
    posted: "1 day ago",
    skills: ["Strategy", "Analytics", "Leadership"],
    description: `As a Product Manager, you will be the bridge between our customers and the development team. You will be responsible for defining product roadmaps, gathering requirements, and ensuring successful product launches. You must have a strong background in strategy, data analytics, and team leadership.`,
  },
  {
    title: "UX/UI Designer",
    company: "DesignStudio",
    logo: "https://placehold.co/40x40/FF7F3F/FFFFFF?text=DS",
    location: "Remote",
    jobType: "Contract",
    salary: "$80k - $100k",
    posted: "3 days ago",
    skills: ["Figma", "Prototyping", "User Research"],
    description: `We are seeking a creative UX/UI Designer to join our remote team on a contract basis. You will be responsible for designing intuitive and beautiful user interfaces, creating prototypes, and conducting user research to validate design choices. Proficiency in Figma is essential.`,
  },
  {
    title: "Data Scientist",
    company: "DataFlow Analytics",
    logo: "https://placehold.co/40x40/FF7F3F/FFFFFF?text=DA",
    location: "Austin, TX",
    jobType: "Full-time",
    salary: "$110k - $140k",
    posted: "1 week ago",
    skills: ["Python", "Machine Learning", "SQL"],
    description: `Join our team as a Data Scientist and help us turn raw data into actionable insights. You will be responsible for building and deploying machine learning models, analyzing large datasets, and presenting your findings to stakeholders. Strong skills in Python, machine learning, and SQL are required.`,
  },
  {
    title: "DevOps Engineer",
    company: "CloudTech Solutions",
    logo: "https://placehold.co/40x40/FF7F3F/FFFFFF?text=CS",
    location: "Seattle, WA",
    jobType: "Full-time",
    salary: "$125k - $155k",
    posted: "4 days ago",
    skills: ["AWS", "Docker", "Kubernetes"],
    description: `We are looking for an experienced DevOps Engineer to help us build and maintain our cloud infrastructure. You will work with our development and operations teams to automate our deployment pipelines and ensure the reliability of our systems. Proficiency with AWS, Docker, and Kubernetes is a must.`,
  },
  {
    title: "Marketing Director",
    company: "GrowthHackers",
    logo: "https://placehold.co/40x40/FF7F3F/FFFFFF?text=GH",
    location: "Los Angeles, CA",
    jobType: "Contract",
    salary: "$140k - $170k",
    posted: "5 days ago",
    skills: ["Digital Marketing", "Growth", "Analytics"],
    description: `As the Marketing Director, you will lead our marketing efforts and drive growth for our products. You will be responsible for developing marketing strategies, managing campaigns, and analyzing performance data. We are looking for a leader with a strong background in digital marketing and analytics.`,
  },
];

const FeaturedJobsSection = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  // Explicitly set the type of the state to Job | null
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showApplyConfirmation, setShowApplyConfirmation] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const filteredJobs =
    activeFilter === "All"
      ? jobData
      : jobData.filter((job) => job.jobType === activeFilter);

  const handleApplyClick = (job: Job) => {
    if (isLoggedIn) {
      console.log(
        `User is applying for the job: "${job.title}" at "${job.company}"`
      );
      setShowApplyConfirmation(true);
    } else {
      setShowLoginPopup(true);
    }
  };

  const handleBackClick = () => {
    setSelectedJob(null);
  };

  const handlePopupClose = () => {
    setShowLoginPopup(false);
    setShowApplyConfirmation(false);
  };

  const LoginPopup = () => (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-8 shadow-2xl max-w-sm w-full text-center">
        <h3 className="text-2xl font-bold mb-4">Please Log In</h3>
        <p className="text-gray-600 mb-6">
          You need to be logged in to apply for this job. Please log in to
          continue.
        </p>
        <button
          onClick={handlePopupClose}
          className="w-full px-6 py-3 rounded-lg bg-[#FF7F3F] text-white font-medium hover:bg-[#FF6F2F] transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );

  const ApplyConfirmationPopup = () => (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-8 shadow-2xl max-w-sm w-full text-center">
        <h3 className="text-2xl font-bold mb-4">Application Submitted!</h3>
        <p className="text-gray-600 mb-6">
          Your application for this job has been successfully submitted. Good
          luck!
        </p>
        <button
          onClick={handlePopupClose}
          className="w-full px-6 py-3 rounded-lg bg-[#FF7F3F] text-white font-medium hover:bg-[#FF6F2F] transition-colors"
        >
          Awesome!
        </button>
      </div>
    </div>
  );

  if (selectedJob) {
    return (
      <section className="py-16 md:py-24 bg-gray-50 text-gray-800">
        {showLoginPopup && <LoginPopup />}
        {showApplyConfirmation && <ApplyConfirmationPopup />}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={handleBackClick}
            className="flex items-center text-gray-600 hover:text-[#FF7F3F] transition-colors mb-8"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 mr-2"
            >
              <path d="M19 12H5"></path>
              <path d="M12 19l-7-7 7-7"></path>
            </svg>
            Back to Job List
          </button>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="flex items-center space-x-4 mb-6">
              <Image
                src={selectedJob.logo}
                layout="fill"
                alt={`${selectedJob.company} logo`}
                className="rounded-lg w-16 h-16"
              />
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {selectedJob.title}
                </h3>
                <p className="text-gray-500 text-lg">{selectedJob.company}</p>
              </div>
            </div>

            <p className="text-gray-600 mb-6">{selectedJob.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 mr-2 text-[#FF7F3F]"
                >
                  <circle cx="12" cy="10" r="3"></circle>
                  <path d="M12 2a8 8 0 0 0-8 8c0 5 8 12 8 12s8-7 8-12a8 8 0 0 0-8-8z"></path>
                </svg>
                {selectedJob.location}
              </div>
              <div className="flex items-center text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 mr-2 text-[#FF7F3F]"
                >
                  <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
                  <path d="M17 2v5"></path>
                  <path d="M7 2v5"></path>
                  <path d="M2 12h20"></path>
                </svg>
                {selectedJob.jobType}
              </div>
              <div className="flex items-center text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 mr-2 text-[#FF7F3F]"
                >
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
                {selectedJob.salary}
              </div>
              <div className="flex items-center text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 mr-2 text-[#FF7F3F]"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 6v6l4 2"></path>
                </svg>
                {selectedJob.posted}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {selectedJob.skills.map((skill, skillIndex) => (
                <span
                  key={skillIndex}
                  className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>

            <button
              onClick={() => handleApplyClick(selectedJob)}
              className="w-full px-6 py-3 rounded-lg bg-[#FF7F3F] text-white font-medium hover:bg-[#FF6F2F] transition-colors"
            >
              Apply Now
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50 text-gray-800">
      {showLoginPopup && <LoginPopup />}
      {showApplyConfirmation && <ApplyConfirmationPopup />}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          Featured Job Opportunities
        </h2>
        <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
          Discover hand-picked opportunities from top companies
        </p>

        <div className="flex justify-center space-x-4 mb-12">
          {["All", "Full-time", "Part-time", "Contract", "Remote"].map(
            (filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  activeFilter === filter
                    ? "bg-[#FF7F3F] text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {filter}
              </button>
            )
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {filteredJobs.map((job, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg text-left transform transition-transform duration-300 hover:scale-[1.02]"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-4">
                  <Image
                    src={job.logo}
                    alt={`${job.company} logo`}
                    width={40}
                    height={40}
                    className="rounded-lg"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {job.title}
                    </h3>
                    <p className="text-gray-500">{job.company}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-[#FF7F3F]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                  >
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                  </svg>
                </button>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 mr-2 text-[#FF7F3F]"
                  >
                    <circle cx="12" cy="10" r="3"></circle>
                    <path d="M12 2a8 8 0 0 0-8 8c0 5 8 12 8 12s8-7 8-12a8 8 0 0 0-8-8z"></path>
                  </svg>
                  {job.location}
                </div>
                <div className="flex items-center text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 mr-2 text-[#FF7F3F]"
                  >
                    <rect
                      x="2"
                      y="7"
                      width="20"
                      height="15"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M17 2v5"></path>
                    <path d="M7 2v5"></path>
                    <path d="M2 12h20"></path>
                  </svg>
                  {job.jobType}
                </div>
                <div className="flex items-center text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 mr-2 text-[#FF7F3F]"
                  >
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                  {job.salary}
                </div>
                <div className="flex items-center text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 mr-2 text-[#FF7F3F]"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 6v6l4 2"></path>
                  </svg>
                  {job.posted}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {job.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setSelectedJob(job)}
                className="w-full px-6 py-3 rounded-lg bg-[#FF7F3F] text-white font-medium hover:bg-[#FF6F2F] transition-colors"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>

        <a
          href="#"
          className="inline-flex items-center text-[#FF7F3F] font-bold text-lg hover:underline"
        >
          View All Jobs
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 ml-2"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
    </section>
  );
};

export default FeaturedJobsSection;
