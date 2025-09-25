import React from 'react';
import { Clock } from 'lucide-react';

interface Article {
  imageUrl: string;
  category: string;
  title: string;
  summary: string;
  author: string;
  date: string;
  readTime: string;
}

const ArticleCard = ({ article }: { article: Article }) => {
  const { imageUrl, category, title, summary, author, date, readTime } = article;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full hover:-translate-y-2 hover:scale-[1.02] group">
      {/* Image Container with Category Badge */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-primary text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
          {category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-all duration-200 mb-3 line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
          {summary}
        </p>

        {/* Metadata */}
        <div className="flex items-center text-sm text-gray-500 mb-5 pt-4">
          <span className="font-medium text-gray-700 mr-4">{author}</span>
          <span className="mx-2">•</span>
          <span>{date}</span>
          <span className="mx-2">•</span>
          <Clock size={16} className=" mr-1" />
          <span>{readTime}</span>
        </div>

        {/* Read More Button */}
        <div className="w-full group-hover:bg-primary py-2 px-4 rounded-lg text-center  flex justify-center items-center border-2 border-primary transition-all duration-300">
          <a
            href="#" 
            className="inline-flex items-center text-primary font-semibold transition-colors group-hover:text-white"
          >
            Read More
            <svg
              className="ml-2 w-4 h-4 transform transition-transform duration-200"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;