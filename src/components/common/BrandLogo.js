import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const sizeMap = {
  sm: {
    logo: 'w-6 h-6 text-base',
    text: 'text-lg',
    gap: 'ml-2',
  },
  md: {
    logo: 'w-8 h-8 text-lg',
    text: 'text-xl',
    gap: 'ml-2',
  },
  lg: {
    logo: 'w-12 h-12 text-2xl',
    text: 'text-2xl',
    gap: 'ml-3',
  },
};

const BrandLogo = ({ size = 'md', dashboardPath, to = '/' }) => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    if (dashboardPath) {
      navigate(dashboardPath);
    } else {
      navigate('/');
    }
  };
  return (
    <a href={dashboardPath || '/'} onClick={handleClick} className={`flex items-center group cursor-pointer`}>
      <div className={`bg-primary-600 rounded-lg flex items-center justify-center ${sizeMap[size]?.logo || sizeMap.md.logo}`}> 
        <span className="text-white font-bold">V</span>
      </div>
      <span className={`${sizeMap[size]?.gap || sizeMap.md.gap} font-bold ${sizeMap[size]?.text || sizeMap.md.text} text-primary-700 group-hover:text-primary-800 transition-colors`}>VishwasJobPortal</span>
    </a>
  );
};

export default BrandLogo; 