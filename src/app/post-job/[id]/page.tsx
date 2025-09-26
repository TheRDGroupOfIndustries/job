'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/user/NavBar';
import Footer from '@/components/user/Footer';

type Job = {
  id: string;
  company: string;
  logoUrl: string;      // company logo url added
  location: string;
  type: string;
  role: string;
  description: string;
  salaryRange: string;
  experience: string;
  postedAgo: string;
  skills: string[];
};

// Sample logos are example paths, replace with real URLs or assets
const jobsData: Job[] = [
  {
    id: '1',
    company: 'TechVision Pvt Ltd',
    logoUrl: 'https://ui-avatars.com/api/?name=TechVision+Pvt+Ltd&background=random',
    location: 'Varanasi, UP',
    type: 'Full-time',
    role: 'Senior Software Engineer',
    description:
      'We are looking for a skilled Senior Software Engineer to join our dynamic team, focusing on developing robust and scalable web applications...',
    salaryRange: '₹8-12 LPA',
    experience: '3-5 years',
    postedAgo: '1 year ago',
    skills: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'AWS'],
  },
  {
    id: '2',
    company: 'Global Industries',
    logoUrl: 'https://ui-avatars.com/api/?name=global+industries&background=random',
    location: 'Lucknow, UP',
    type: 'Full-time',
    role: 'HR Manager',
    description:
      'Seeking an experienced HR Manager to lead our human resources department...',
    salaryRange: '₹6-10 LPA',
    experience: '5-8 years',
    postedAgo: '1 year ago',
    skills: ['HR Management', 'Recruitment'],
  },
  {
    id: '3',
    company: 'Creative Solutions',
    logoUrl: 'https://ui-avatars.com/api/?name=creative+solutions&background=random',
    location: 'Remote',
    type: 'Remote',
    role: 'Digital Marketing Specialist',
    description:
      'Join our marketing team to drive digital growth and brand awareness...',
    salaryRange: '₹4-7 LPA',
    experience: '2-4 years',
    postedAgo: '1 year ago',
    skills: ['SEO', 'SEM', 'Social Media', 'Content Marketing', 'Google Analytics'],
  },
  {
    id: '4',
    company: 'Innovatech Systems',
    logoUrl: 'https://ui-avatars.com/api/?name=innovatech+systems&background=random',
    location: 'Bengaluru, KA',
    type: 'Full-time',
    role: 'Data Scientist',
    description:
      'We are seeking a highly analytical Data Scientist to join our advanced analytics team...',
    salaryRange: '₹10-18 LPA',
    experience: '4-7 years',
    postedAgo: '6 months ago',
    skills: ['Python', 'R', 'Machine Learning', 'SQL', 'Data Visualization'],
  },
  {
    id: '5',
    company: 'E-commerce Giants',
    logoUrl: 'https://ui-avatars.com/api/?name=e-commerce+giants&background=random',
    location: 'Mumbai, MH',
    type: 'Full-time',
    role: 'UI/UX Designer',
    description:
      'Craft intuitive and visually appealing user interfaces for our next-generation e-commerce platform...',
    salaryRange: '₹7-13 LPA',
    experience: '3-6 years',
    postedAgo: '8 months ago',
    skills: ['Figma', 'Sketch', 'User Research', 'Prototyping', 'Usability Testing'],
  },
  {
    id: '6',
    company: 'Health Solutions Inc.',
    logoUrl: 'https://ui-avatars.com/api/?name=health+solutions+inc&background=random',
    location: 'Hyderabad, TS',
    type: 'Full-time',
    role: 'DevOps Engineer',
    description:
      'Accelerate our software development and deployment processes as a DevOps Engineer...',
    salaryRange: '₹9-16 LPA',
    experience: '4-6 years',
    postedAgo: '3 months ago',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
  },
  {
    id: '7',
    company: 'FinTech Innovations',
    logoUrl: 'https://ui-avatars.com/api/?name=fintech+innovations&background=random',
    location: 'Pune, MH',
    type: 'Full-time',
    role: 'Full Stack Developer',
    description:
      'Build and maintain robust web applications for the financial industry...',
    salaryRange: '₹8-14 LPA',
    experience: '3-5 years',
    postedAgo: '2 months ago',
    skills: ['React', 'Node.js', 'PostgreSQL', 'TypeScript', 'API Development'],
  },
  {
    id: '8',
    company: 'EduTech Future',
    logoUrl: 'https://ui-avatars.com/api/?name=edutech+future&background=random',
    location: 'Chennai, TN',
    type: 'Remote',
    role: 'Content Writer',
    description:
      'Create engaging and informative content for our educational platform...',
    salaryRange: '₹3-6 LPA',
    experience: '1-3 years',
    postedAgo: '5 months ago',
    skills: ['Content Creation', 'SEO Writing', 'Copywriting', 'Editing', 'Blog Management'],
  },
];

type ApplyPopupProps = {
  job: Job | null;
  onClose: () => void;
};

function ApplyPopup({ job, onClose }: ApplyPopupProps) {
  if (!job) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-5"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-3xl text-orange-600"
          aria-label="Close popup"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4">Application Submitted!</h2>
        <p className="text-gray-700 mb-6">
          Thank you for applying to <strong>{job.role}</strong> at{' '}
          <strong>{job.company}</strong>. Our team will review your application and
          get back to you soon.
        </p>
        <button
          onClick={onClose}
          className="bg-orange-600 text-white rounded-lg py-2 px-6 font-semibold hover:bg-orange-500 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default function PostJobPage() {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [modalJob, setModalJob] = useState<Job | null>(null);
  const [showApplyPopup, setShowApplyPopup] = useState<Job | null>(null);

  const filteredJobs = useMemo(() => {
    return jobsData.filter(
      (job) =>
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some((skill) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
  }, [searchTerm]);

  useEffect(() => {
    if (id) {
      const foundJob = jobsData.find((job) => job.id === id);
      setModalJob(foundJob || null);
    }
  }, [id]);

  function closeModal() {
    setModalJob(null);
    history.pushState(null, '', '/post-job');
  }

  function handleViewDetailsClick(job: Job) {
    setModalJob(job);
    history.pushState(null, '', `/post-job/${job.id}`);
  }

  return (
    <>
      <Navbar />
      {/* Spacer below navbar */}
      <div className="h-20"></div>

      <div className="px-5 max-w-4xl mx-auto">
        <input
          type="text"
          placeholder="Search by company, location, role, type, or skills"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full mb-8 p-3 border border-gray-300 rounded-md text-base outline-none focus:ring-2 focus:ring-orange-400"
        />

        <div className="flex flex-col gap-5">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="flex justify-between items-center flex-wrap bg-white rounded-lg border border-gray-200 shadow-md p-6"
            >
              <div className="flex-grow min-w-[250px]">
                <div className="flex items-center mb-2">
                  <img
                    src={job.logoUrl}
                    alt={`${job.company} logo`}
                    className="w-8 h-8 rounded-full mr-2 object-cover"
                  />
                  <h3 className="text-gray-800 text-lg font-semibold">{job.role}</h3>
                </div>
                <div className="flex items-center text-gray-600 text-sm mb-1">
                  <i className="fas fa-building mr-1"></i>
                  <span>{job.company}</span>
                  <span className="mx-2">•</span>
                  <i className="fas fa-map-marker-alt mr-1"></i>
                  <span>{job.location}</span>
                  <span className="mx-2">•</span>
                  <i className="fas fa-clock mr-1"></i>
                  <span>{job.postedAgo}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded text-xs">
                    {job.type}
                  </span>
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded text-xs">
                    {job.salaryRange}
                  </span>
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded text-xs">
                    {job.experience}
                  </span>
                  {job.skills.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-600 px-3 py-1 rounded text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                  {job.skills.length > 3 && (
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded text-xs">
                      +{job.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>
              <div className="min-w-[150px] text-right mt-4 md:mt-0">
                <span className="block text-orange-600 font-bold text-lg mb-2">
                  {job.salaryRange}
                </span>
                <button
                  className="px-5 py-2 bg-orange-600 text-white rounded-lg font-semibold text-sm shadow-md transition hover:bg-orange-500"
                  onClick={() => handleViewDetailsClick(job)}
                >
                  View Details <i className="fas fa-arrow-right ml-1"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalJob && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-5"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl max-w-2xl w-full p-8 shadow-xl relative max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-3xl text-orange-600"
              aria-label="Close modal"
            >
              &times;
            </button>
            <div className="flex items-center mb-4">
              <img
                src={modalJob.logoUrl}
                alt={`${modalJob.company} logo`}
                className="w-10 h-10 rounded-full mr-3 object-cover"
              />
              <h2 className="text-2xl text-gray-800 font-bold">{modalJob.role}</h2>
            </div>
            <p className="text-gray-600 text-base mb-5">
              <strong>{modalJob.company}</strong> • {modalJob.location} • {modalJob.type}
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              <span className="bg-gray-100 text-gray-600 px-4 py-2 rounded-md text-sm flex items-center gap-2">
                <i className="fas fa-money-bill-wave"></i> {modalJob.salaryRange}
              </span>
              <span className="bg-gray-100 text-gray-600 px-4 py-2 rounded-md text-sm flex items-center gap-2">
                <i className="fas fa-hourglass-half"></i> {modalJob.experience}
              </span>
              <span className="bg-gray-100 text-gray-600 px-4 py-2 rounded-md text-sm flex items-center gap-2">
                <i className="fas fa-calendar-alt"></i> Posted {modalJob.postedAgo}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">Job Description</h3>
            <p className="text-gray-700 leading-relaxed text-base">{modalJob.description}</p>

            <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-2">Skills Required</h3>
            <div className="flex flex-wrap gap-2">
              {modalJob.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-orange-600 text-white px-4 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>

            <button
              className="mt-8 w-full py-3 bg-orange-600 text-white rounded-lg font-semibold text-lg shadow-lg transition hover:bg-orange-500"
              onClick={() => setShowApplyPopup(modalJob)}
            >
              Apply Now <i className="fas fa-external-link-alt ml-2"></i>
            </button>
          </div>
        </div>
      )}

      {showApplyPopup && <ApplyPopup job={showApplyPopup} onClose={() => setShowApplyPopup(null)} />}

      <Footer />
    </>
  );
}
