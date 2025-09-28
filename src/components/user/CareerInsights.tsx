"use client";

import React, { useState } from "react";
import ArticleCard from "./ArticleCard";
import { X } from "lucide-react";
import Image from "next/image";

const ARTICLES = [
  {
    id: 1,
    imageUrl: "/images/6febcdd1c0fdfabb77b7d5b9fe762e65.jpg",
    category: "Career Tips",
    title: "10 Essential Skills for Remote Work Success",
    summary:
      "Discover the key skills that will help you thrive in a remote work environment and advance your career.",
    content: `Remote work requires discipline, communication skills, and adaptability. Learn essential skills like time management, virtual collaboration, and proactive problem solving to excel in a remote environment and advance your career.`,
    author: "Sarah Mitchell",
    date: "Dec 15, 2024",
    readTime: "5 min read",
  },
  {
    id: 2,
    imageUrl: "/images/b9981238d4661951cc12d0f467b91dcd.jpg",
    category: "Industry Trends",
    title: "The Future of Tech Hiring: AI and Beyond",
    summary:
      "Explore how artificial intelligence is transforming the recruitment process and what it means for job seekers.",
    content: `AI is automating screening, interview scheduling, and candidate assessment. Tech hiring is becoming faster, more data-driven, and more personalized. Candidates must adapt by improving their digital skills and understanding AI-driven recruitment tools.`,
    author: "Michael Chen",
    date: "Dec 12, 2024",
    readTime: "7 min read",
  },
  {
    id: 3,
    imageUrl: "/images/cecbff907c67fb809bb74473d1249a2a.jpg",
    category: "Career Growth",
    title: "Salary Negotiation Strategies That Actually Work",
    summary:
      "Learn proven techniques to negotiate better compensation packages and advance your career.",
    content: `Effective salary negotiation involves research, timing, and confidence. Understand your market value, prepare a clear case for your raise, and practice negotiation conversations. Remember to focus on value you bring rather than personal needs.`,
    author: "Emily Rodriguez",
    date: "Dec 10, 2024",
    readTime: "6 min read",
  },
];

const CareerInsights = () => {
  const [activeArticle, setActiveArticle] = useState<number | null>(null);
  const selectedArticle = ARTICLES.find((a) => a.id === activeArticle);

  const openModal = (id: number) => setActiveArticle(id);
  const closeModal = () => setActiveArticle(null);

  return (
    <section className="py-16 md:py-24 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 text-center">
          Career Insights & Tips
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto text-center">
          Stay ahead with the latest career advice and industry insights
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {ARTICLES.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onReadMore={() => openModal(article.id)} // Pass function to card
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full overflow-y-auto max-h-[90vh] relative shadow-lg">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <X size={24} />
            </button>
            <Image
              height={256}
              layout="fill"
              src={selectedArticle.imageUrl}
              alt={selectedArticle.title}
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="p-6">
              <p className="text-sm text-gray-500 mb-2">{selectedArticle.category}</p>
              <h2 className="text-2xl font-bold mb-4">{selectedArticle.title}</h2>
              <p className="text-gray-700 mb-4">{selectedArticle.content}</p>
              <div className="flex justify-between text-gray-500 text-sm mt-4">
                <span>By {selectedArticle.author}</span>
                <span>
                  {selectedArticle.date} • {selectedArticle.readTime}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CareerInsights;
