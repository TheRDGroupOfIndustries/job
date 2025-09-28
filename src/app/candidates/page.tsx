'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/user/NavBar';
import Footer from '@/components/user/Footer';
import { MapPin, Code, Star } from 'lucide-react'; // Import new icons


type ResumeApplication = {
  id: string;
  jobTitle: string;
  company: string;
  appliedDate: string;
  status: 'Submitted' | 'Under Review' | 'Interview Scheduled' | 'Rejected' | 'Offer Extended';
  skills: string[];
  location: string; 
  experience: string; 
  ratings: number; 
  jobId: string;
  resumeFileName: string;
};

const statusStyles = {
  Submitted: 'bg-orange-100 text-orange-800',
  'Under Review': 'bg-yellow-100 text-yellow-800',
  'Interview Scheduled': 'bg-green-100 text-green-800',
  Rejected: 'bg-red-100 text-red-800',
  'Offer Extended': 'bg-blue-100 text-blue-800',
};


function mapStatus(status: string): ResumeApplication['status'] {
  switch (status.toLowerCase()) {
    case 'submitted':
      return 'Submitted';
    case 'under_review':
      return 'Under Review';
    case 'interview':
      return 'Interview Scheduled';
    case 'rejected':
      return 'Rejected';
    case 'accepted':
      return 'Offer Extended';
    default:
      return 'Submitted';
  }
}

export default function CandidateApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [applications, setApplications] = useState<ResumeApplication[]>([]);
  const [loading, setLoading] = useState(true);

  
  const parseSkills = (skillsString: string): string[] => {
    if (!skillsString) return [];
    return skillsString.split(',').map(s => s.trim()).filter(s => s.length > 0);
  };
  
 
  const renderRatingStars = (rating: number) => {
    const roundedRating = Math.round(rating || 0);
    return (
      <div className="flex space-x-0.5 items-center">
        {Array(5).fill(0).map((_, index) => (
          <Star
            key={index}
            size={14}
            className={index < roundedRating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };


  useEffect(() => {
    async function fetchApplications() {
      try {
        
        const res = await fetch('http://localhost:3000/api/user/applications/get-all');
        if (!res.ok) throw new Error('Failed to fetch applications');
        const data = await res.json();
        console.log('API Data:', data);

        
        const mappedApps: ResumeApplication[] = data.applications.map((app: any) => ({
          id: app._id,
          jobTitle: app.jobId?.designation || app.jobDesignation || 'Not specified',
          company: app.appliedBy?.name || 'Unknown Company',
          appliedDate: new Date(app.createdAt).toLocaleDateString(),
          status: mapStatus(app.status),
         
          skills: parseSkills(app.skills || ''), 
          location: app.location || 'Remote / On-site', 
          experience: app.experience || 'N/A',
          ratings: app.ratings || 0, 
         
          jobId: app.jobId?._id || '',
          resumeFileName: app.resume,
        }));

        setApplications(mappedApps);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchApplications();
  }, []);

  const filteredApps = useMemo(() => {
    return applications?.filter(
      (app) =>
        app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, applications]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 pt-20 pb-20 max-w-6xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Resume Applications</h1>

        <input
          type="text"
          placeholder="Search by job title, company, status, location"
          className="w-full px-4 py-3 mb-8 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800 shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search applications"
        />

        {loading ? (
          <p className="text-center text-gray-500">Loading applications...</p>
        ) : filteredApps.length === 0 ? (
          <p className="text-center text-gray-500">No applications found.</p>
        ) : (
          <div className="space-y-6">
            {filteredApps.map((app) => (
              <div
                key={app.id}
                className="flex flex-col md:flex-row border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow bg-white"
              >
                <div className="flex-grow mb-4 md:mb-0">
                  <h2 className="text-xl font-semibold text-gray-900">{app.jobTitle}</h2>
                  <p className="text-orange-600 font-medium">{app.company}</p>
                  
                    {/* Display Location and Experience */}
                  <div className="flex items-center text-gray-600 mt-1 space-x-4">
                        <span className="flex items-center text-sm">
                            <MapPin size={14} className="mr-1 text-gray-400" />
                            {app.location}
                        </span>
                        <span className="text-sm">
                            Experience: {app.experience}
                        </span>
                    </div>

                    {/* Display Rating */}
                    <div className="flex items-center text-gray-700 mt-2 space-x-2">
                        <span className='font-medium text-sm'>Self-Rating:</span>
                        {renderRatingStars(app.ratings)}
                    </div>

                  <p className="text-gray-500 mt-2 text-sm">
                    Applied on: <time dateTime={app.appliedDate}>{app.appliedDate}</time>
                  </p>
                  
                    {/* Display Skills */}
                  <div className="flex flex-wrap gap-2 mt-3">
                        <span className='flex items-center text-sm font-semibold text-gray-700 mr-1'>
                            <Code size={14} className="mr-1 text-blue-500" />
                            Skills:
                        </span>
                    {app.skills.length > 0 ? app.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-semibold bg-orange-50 text-orange-700 rounded-full px-3 py-1"
                      >
                        {skill}
                      </span>
                    )) : (
                        <span className="text-xs text-gray-500 italic mt-1">No skills provided.</span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col justify-between items-start md:items-end md:ml-6 min-w-[160px] space-y-2">
                  <span
                    className={`inline-block rounded-full font-semibold px-4 py-1 text-sm whitespace-nowrap ${
                      statusStyles[app.status as keyof typeof statusStyles]
                    }`}
                  >
                    {app.status}
                  </span>

                  <Link
                    href={`/browse-jobs/${app.jobId}`}
                    className="w-full px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium shadow-sm text-center"
                    aria-label={`View details for ${app.jobTitle} application`}
                  >
                    View Job
                  </Link>

                  {/* 📄 Download Resume */}
                  {app.resumeFileName && (
                    <a
                      href={app.resumeFileName}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium shadow-sm text-center"
                    >
                      Download Resume
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}