import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import PublicNavbar from '../components/layout/PublicNavbar';
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const mockKeywords = [
  'Frontend Developer', 'Backend Developer', 'React', 'Node.js', 'Remote', 'Full-time',
  'Part-time', 'Internship', 'HR', 'Marketing', 'Sales', 'Bangalore', 'Mumbai',
  'Python', 'Java', 'Designer', 'UI/UX', 'Project Manager', 'Startup', 'MNC',
  'Remote Work', 'Hybrid', 'Onsite', 'Fresher', 'Experienced', 'Contract', 'Permanent',
  'Finance', 'Healthcare', 'Education', 'Data Analyst', 'DevOps', 'Cloud', 'AWS', 'Azure',
  'Machine Learning', 'AI', 'Support', 'Customer Service', 'Business Analyst', 'QA', 'Testing'
];

const mockLocations = [
  'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Ahmedabad',
  'Jaipur', 'Lucknow', 'Noida', 'Gurgaon', 'Indore', 'Chandigarh', 'Coimbatore', 'Nagpur',
  'Bhopal', 'Patna', 'Vadodara', 'Ludhiana', 'Surat', 'Kanpur', 'Ranchi', 'Visakhapatnam',
  'Thane', 'Agra', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot', 'Varanasi', 'Srinagar',
  'Aurangabad', 'Dhanbad', 'Amritsar', 'Navi Mumbai', 'Allahabad', 'Howrah', 'Jabalpur',
  'Gwalior', 'Vijayawada', 'Madurai', 'Raipur', 'Kota', 'Guwahati', 'Chandrapur', 'Other'
];

const HomePage = () => {
  const { user, isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const inputRef = useRef(null);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [filteredLocationSuggestions, setFilteredLocationSuggestions] = useState([]);
  const locationInputRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) params.append('search', searchTerm);
    if (location) params.append('location', location);
    
    const queryString = params.toString();
    window.location.href = `/jobs${queryString ? `?${queryString}` : ''}`;
  };

  const handleSearchTermChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 0) {
      const filtered = mockKeywords.filter(k => k.toLowerCase().includes(value.toLowerCase()));
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
      setFilteredSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    inputRef.current && inputRef.current.focus();
  };

  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 100); // Delay to allow click
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    if (value.length > 0) {
      const filtered = mockLocations.filter(l => l.toLowerCase().includes(value.toLowerCase()));
      setFilteredLocationSuggestions(filtered);
      setShowLocationSuggestions(filtered.length > 0);
    } else {
      setShowLocationSuggestions(false);
      setFilteredLocationSuggestions([]);
    }
  };

  const handleLocationSuggestionClick = (suggestion) => {
    setLocation(suggestion);
    setShowLocationSuggestions(false);
    locationInputRef.current && locationInputRef.current.focus();
  };

  const handleLocationBlur = () => {
    setTimeout(() => setShowLocationSuggestions(false), 100);
  };

  const features = [
    {
      icon: BriefcaseIcon,
      title: 'Find Your Dream Job',
      description: 'Browse thousands of job opportunities and find the perfect match for your skills and career goals.'
    },
    {
      icon: BuildingOfficeIcon,
      title: 'Hire Top Talent',
      description: 'Post job openings and connect with qualified candidates to build your dream team.'
    },
    {
      icon: UserGroupIcon,
      title: 'Build Your Network',
      description: 'Connect with professionals, recruiters, and companies in your industry.'
    },
    {
      icon: CheckCircleIcon,
      title: 'Verified Companies',
      description: 'Work with trusted and verified companies that value their employees.'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Active Jobs' },
    { number: '5,000+', label: 'Companies' },
    { number: '50,000+', label: 'Job Seekers' },
    { number: '95%', label: 'Success Rate' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Public Navbar */}
      <PublicNavbar />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary-600 to-primary-800 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Find Your Dream Job
              <span className="block text-primary-200">or Hire Top Talent</span>
            </h1>
            <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Vishwas Job Portal connects talented professionals with amazing opportunities. 
              Whether you're looking for your next career move or building your dream team, 
              we've got you covered.
            </p>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 bg-white rounded-lg p-2 shadow-lg">
                <div className="flex-1 relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search any keyword..."
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                    onFocus={() => setShowSuggestions(filteredSuggestions.length > 0)}
                    onBlur={handleBlur}
                    ref={inputRef}
                    className="w-full pl-10 pr-4 py-3 border-0 focus:ring-0 text-gray-900 placeholder-gray-500"
                  />
                  {showSuggestions && (
                    <ul className="absolute z-10 left-0 right-0 bg-white border border-gray-200 rounded-b shadow max-h-48 overflow-y-auto">
                      {filteredSuggestions.map((suggestion, idx) => (
                        <li
                          key={idx}
                          className="px-4 py-2 cursor-pointer hover:bg-primary-100"
                          onMouseDown={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="flex-1 relative">
                  <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={handleLocationChange}
                    onFocus={() => setShowLocationSuggestions(filteredLocationSuggestions.length > 0)}
                    onBlur={handleLocationBlur}
                    ref={locationInputRef}
                    className="w-full pl-10 pr-4 py-3 border-0 focus:ring-0 text-gray-900 placeholder-gray-500"
                  />
                  {showLocationSuggestions && (
                    <ul className="absolute z-10 left-0 right-0 bg-white border border-gray-200 rounded-b shadow max-h-48 overflow-y-auto">
                      {filteredLocationSuggestions.map((suggestion, idx) => (
                        <li
                          key={idx}
                          className="px-4 py-2 cursor-pointer hover:bg-primary-100"
                          onMouseDown={() => handleLocationSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn-primary px-8 py-3 text-base font-medium"
                >
                  Search Jobs
                </button>
              </div>
            </form>

            {/* CTA Buttons */}
            {!isAuthenticated && (
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                {/* Removed 'Join as Job Seeker' and 'Post a Job' buttons */}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Vishwas Job Portal?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide the tools and platform you need to succeed in your career or business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of professionals and companies who trust Vishwas Job Portal.
          </p>
          {!isAuthenticated ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="btn-secondary px-8 py-3 text-base font-medium"
              >
                Create Account
              </Link>
              <Link
                to="/login"
                className="btn-primary px-8 py-3 text-base font-medium bg-white text-primary-600 hover:bg-gray-50"
              >
                Sign In
              </Link>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/jobs"
                className="btn-secondary px-8 py-3 text-base font-medium"
              >
                Browse Jobs
              </Link>
              <Link
                to="/dashboard"
                className="btn-primary px-8 py-3 text-base font-medium bg-white text-primary-600 hover:bg-gray-50"
              >
                Go to Dashboard
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage; 