import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const BackButton = ({ to, className = '' }) => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    if (to) navigate(to);
    else navigate(-1);
  };
  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 text-primary-700 hover:text-primary-900 font-medium px-2 py-1 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-primary-300 ${className}`}
      aria-label="Go back"
    >
      <ArrowLeftIcon className="h-5 w-5" />
      <span>Back</span>
    </button>
  );
};

export default BackButton; 