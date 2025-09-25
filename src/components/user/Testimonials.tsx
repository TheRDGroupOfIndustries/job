"use client";

import React, { useState } from 'react';
import TestimonialCard from './TestimonialCard';

const REVIEWS = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Software Engineer",
    company: "TechCorp",
    avatarUrl: "/images/t1.jpg",
    stars: 5,
    quote: "JobConnect helped me find my dream job in just 2 weeks! The platform's matching algorithm is incredibly accurate, and the application process was seamless.",
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Product Manager",
    company: "InnovateLab",
    avatarUrl: "/images/t2.jpg",
    stars: 5,
    quote: "As an employer, JobConnect has been invaluable for finding top talent. The quality of candidates is exceptional, and the hiring process is streamlined.",
  },
  {
    id: 3,
    name: "Emily Rodríguez",
    title: "UX Designer",
    company: "DesignStudio",
    avatarUrl: "/images/t3.jpg",
    stars: 5,
    quote: "The career guidance and resources on JobConnect are outstanding. I not only found a great job but also developed new skills along the way.",
  },
  {
    id: 4,
    name: "David Lee",
    title: "Marketing Specialist",
    company: "GlobalReach",
    avatarUrl: "/images/t1.jpg", 
    stars: 4,
    quote: "A vast array of opportunities and a user-friendly interface. My experience was very positive, though job filtering could be slightly improved.",
  },
  {
    id: 5,
    name: "Aisha Khan",
    title: "Data Scientist",
    company: "DataMetrics",
    avatarUrl: "/images/t2.jpg",
    stars: 5,
    quote: "I highly recommend this service. It connected me with a niche role that perfectly matched my skills and career goals.",
  },
  {
    id: 6,
    name: "Robert Green",
    title: "HR Director",
    company: "HiringSolutions",
    avatarUrl: "/images/t3.jpg",
    stars: 4,
    quote: "Finding high-quality, pre-vetted candidates has never been easier. A fantastic platform for serious recruiters.",
  },
];

const ITEMS_PER_PAGE = 3;
const TOTAL_PAGES = Math.ceil(REVIEWS.length / ITEMS_PER_PAGE);

const Testimonials = () => {
  const [currentPage, setCurrentPage] = useState(0); 

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentReviews = REVIEWS.slice(startIndex, endIndex);

  return (
    <section className="py-16 md:py-24 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide text-gray-900 mb-3">
          What Our Users Say
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Join thousands of satisfied job seekers and employers
        </p>

        {/* Testimonials Grid (Responsive display) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {currentReviews.map((review) => (
            <TestimonialCard key={review.id} review={review} />
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center space-x-2">
          {[...Array(TOTAL_PAGES)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              aria-label={`Go to testimonial page ${index + 1}`}
              className={`w-3 h-3 rounded-full transition-colors duration-300 cursor-pointer ${
                index === currentPage ? 'bg-[#FF7F3F] w-4 h-4' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Floating "Talk with Us" Button (Reused for the bottom right of the page) */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-[#FF7F3F] text-white font-medium py-3 px-6 rounded-full shadow-lg hover:bg-orange-600 transition-colors flex items-center space-x-2">
          {/* Using a placeholder for a chat icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          <span>Talk with Us</span>
        </button>
      </div>
    </section>
  );
};

export default Testimonials;