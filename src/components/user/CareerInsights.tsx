"use client";

import React from "react";
import ArticleCard from "./ArticleCard";
import { ArrowRight } from "lucide-react";

const ARTICLES = [
  {
    id: 1,
    imageUrl: "/images/6febcdd1c0fdfabb77b7d5b9fe762e65.jpg", // Replace with your image path
    category: "Career Tips",
    title: "10 Essential Skills for Remote Work Success",
    summary:
      "Discover the key skills that will help you thrive in a remote work environment and advance your career.",
    author: "Sarah Mitchell",
    date: "Dec 15, 2024",
    readTime: "5 min read",
  },
  {
    id: 2,
    imageUrl: "/images/b9981238d4661951cc12d0f467b91dcd.jpg", // Replace with your image path
    category: "Industry Trends",
    title: "The Future of Tech Hiring: AI and Beyond",
    summary:
      "Explore how artificial intelligence is transforming the recruitment process and what it means for job seekers.",
    author: "Michael Chen",
    date: "Dec 12, 2024",
    readTime: "7 min read",
  },
  {
    id: 3,
    imageUrl: "/images/cecbff907c67fb809bb74473d1249a2a.jpg", // Replace with your image path
    category: "Career Growth",
    title: "Salary Negotiation Strategies That Actually Work",
    summary:
      "Learn proven techniques to negotiate better compensation packages and advance your career.",
    author: "Emily Rodriguez",
    date: "Dec 10, 2024",
    readTime: "6 min read",
  },
];

const CareerInsights = () => {
  return (
    <section className="py-16 md:py-24 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3  text-center">
          Career Insights & Tips
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto  text-center">
          Stay ahead with the latest career advice and industry insights
        </p>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {ARTICLES.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {/* View All Articles Button */}
        <div className="w-full flex justify-center items-center">
          <button className="inline-flex items-center text-primary border-2 border-primary font-semibold py-3 px-8 rounded-lg transition-colors hover:bg-primary hover:text-white mx-auto">
            View All Articles
            <ArrowRight size={20} className="ml-3" />
          </button>
        </div>
      </div>

      {/* Floating "Talk with Us" Button (Reused from Footer design) */}
      {/* You would typically place this in your main layout file, but including it here for completeness */}
      {/* <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-primary text-white font-medium py-3 px-6 rounded-full shadow-lg hover:bg-orange-600 transition-colors flex items-center space-x-2">
          <MessageSquare size={20} />
          <span>Talk with Us</span>
        </button>
      </div> */}
    </section>
  );
};

export default CareerInsights;
