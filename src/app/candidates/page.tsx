'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '@/components/user/NavBar';
import Footer from '@/components/user/Footer';

type ResumeApplication = {
  id: string;
  jobTitle: string;
  company: string;
  appliedDate: string;
  status: 'Submitted' | 'Under Review' | 'Interview Scheduled' | 'Rejected' | 'Offer Extended';
  skills: string[];
  location: string;
  experience: string;
  resumeFileName: string;
};

const statusStyles = {
  Submitted: 'bg-orange-100 text-orange-800',
  'Under Review': 'bg-yellow-100 text-yellow-800',
  'Interview Scheduled': 'bg-green-100 text-green-800',
  Rejected: 'bg-red-100 text-red-800',
  'Offer Extended': 'bg-blue-100 text-blue-800',
};

export default function CandidateApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [applications, setApplications] = useState<ResumeApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchApplications() {
      try {
        const res = await fetch('http://localhost:3000/api/user/applications/get-all');
        if (!res.ok) throw new Error('Failed to fetch applications');
        const data: ResumeApplication[] = await res.json();
        setApplications(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchApplications();
  }, []);

  const filteredApps = useMemo(() => {
    return applications.filter(
      (app) =>
        app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, applications]);

  const handleViewClick = (id: string) => {
    // Replace with real navigation or modal display logic
    alert(`View details for application ID: ${id}`);
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white pt-20 pb-20 max-w-6xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Resume Applications</h1>

        <input
          type="text"
          placeholder="Search by job title, company, status, location"
          className="w-full px-4 py-3 mb-8 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800"
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
                className="flex flex-col md:flex-row border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow bg-white"
              >
                <div className="flex-grow mb-4 md:mb-0">
                  <h2 className="text-xl font-semibold text-gray-900">{app.jobTitle}</h2>
                  <p className="text-orange-600 font-medium">{app.company}</p>
                  <p className="text-gray-600 mt-1">
                    {app.location} • {app.experience} experience
                  </p>
                  <p className="text-gray-500 mt-2 text-sm">
                    Applied on: <time dateTime={app.appliedDate}>{app.appliedDate}</time>
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {app.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-semibold bg-orange-50 text-orange-700 rounded-full px-3 py-1"
                      >
                        {skill}
                      </span>
                    ))}
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

                  <button
                    onClick={() => handleViewClick(app.id)}
                    className="w-full px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium shadow-sm"
                    aria-label={`View details for ${app.jobTitle} application`}
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
