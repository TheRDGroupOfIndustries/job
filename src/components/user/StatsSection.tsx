"use client";

import React from 'react';

const StatsSection = () => {
  const stats = [
    { number: '15,000+', label: 'Active Jobs' },
    { number: '50,000+', label: 'Job Seekers' },
    { number: '2,500+', label: 'Companies' },
    { number: '98%', label: 'Success Rate' },
  ];

  return (
    <section className="py-16 md:py-24 bg-white text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Thousands</h2>
        <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
          Join the growing community of professionals and employers who trust Alpran HR Services.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <h3 className="text-[#cb4b0a] text-5xl md:text-6xl font-extrabold mb-2">
                {stat.number}
              </h3>
              <p className="text-gray-500 text-lg font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
