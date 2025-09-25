import React from 'react';

const TestimonialCard = ({ review }) => {
  const { name, title, company, avatarUrl, stars, quote } = review;

  const renderStars = () => {
    return (
      <div className="flex space-x-0.5 text-[#FF7F3F] mb-3">
        {[...Array(stars)].map((_, i) => (
          <span key={i} className="text-xl">★</span> 
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl h-full flex flex-col transition-shadow duration-300 text-left">
      <div className="flex items-center mb-4">
        <img
          src={avatarUrl}
          alt={name}
          className="w-16 h-16 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="text-lg font-bold text-gray-900">{name}</h4>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-sm font-semibold text-[#FF7F3F]">{company}</p>
        </div>
      </div>
      
      {renderStars()}

      <p className="text-gray-700 leading-relaxed italic flex-grow">
        "{quote}"
      </p>
    </div>
  );
};

export default TestimonialCard;