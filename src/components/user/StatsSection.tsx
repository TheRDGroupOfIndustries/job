"use client"
import React from "react";

const StatsSection = () => {
  const stats = [
    {
      number: "15,000+",
      label: "Active Jobs",
    },
    {
      number: "50,000+",
      label: "Job Seekers",
    },
    {
      number: "2,500+",
      label: "Companies",
    },
    {
      number: "98%",
      label: "Success Rate",
    },
  ];

  return (
    <section className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-6 text-center">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Trusted by Thousands
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join the growing community of professionals and employers who trust
            JobConnect
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-6xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-lg md:text-xl text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Why Choose Section Header */}
        <div className="mt-24 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Why Choose JobConnect?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We provide comprehensive solutions for both job seekers and employers
          </p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;