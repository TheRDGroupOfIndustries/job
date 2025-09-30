"use client";
import React from "react";
import { Search, Users, TrendingUp, Shield, Clock, Globe } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Search,
      title: "Smart Job Matching",
      description:
        "Our AI-powered algorithm matches you with jobs that perfectly fit your skills, experience, and career goals.",
      color: "feature-orange",
      bgColor: "bg-orange-50",
    },
    {
      icon: Users,
      title: "Talent Acquisition",
      description:
        "Connect with top-tier talent through our comprehensive recruitment platform designed for modern employers.",
      color: "feature-blue",
      bgColor: "bg-blue-50",
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description:
        "Access career development resources, skill assessments, and personalized guidance to advance your career.",
      color: "feature-green",
      bgColor: "bg-green-50",
    },
    {
      icon: Shield,
      title: "Verified Companies",
      description:
        "All our partner companies are thoroughly vetted to ensure legitimate opportunities and safe work environments.",
      color: "feature-purple",
      bgColor: "bg-purple-50",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description:
        "Get round-the-clock assistance from our dedicated support team whenever you need help with your job search.",
      color: "feature-red",
      bgColor: "bg-red-50",
    },
    {
      icon: Globe,
      title: "Global Opportunities",
      description:
        "Explore job opportunities from around the world, including remote positions and international placements.",
      color: "feature-blue",
      bgColor: "bg-blue-50",
    },
  ];

  const getIconColor = (color: string) => {
    switch (color) {
      case "feature-orange":
        return "text-[#FF7F3F]";
      case "feature-blue":
        return "text-[#14B8A6]";
      case "feature-green":
        return "text-[#84cc16]";
      case "feature-purple":
        return "text-[#8b5cf6]";
      case "feature-red":
        return "text-[#ef4444]";
      default:
        return "text-[#14B8A6]";
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        {/* Why Choose Section Header */}
        <div className=" text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Why Choose Alpran HR Services?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We provide comprehensive solutions for both job seekers and
            employers
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-8 transition-all duration-300 transform hover:-translate-y-2 group shadow-md hover:shadow-xl"
              >
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-xl ${feature.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <IconComponent
                    className={`w-8 h-8 ${getIconColor(feature.color)}`}
                  />
                </div>
                {/* Content */}
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default FeaturesSection;
