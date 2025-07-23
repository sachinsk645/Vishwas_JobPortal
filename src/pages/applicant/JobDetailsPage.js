import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BriefcaseIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  StarIcon,
  UserIcon,
  BuildingOfficeIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import BackButton from '../../components/common/BackButton';

const job = {
  id: 1,
  title: 'Frontend Developer',
  company: 'TechCorp India',
  companyLogo: '', // Add a logo URL if available
  location: 'Bangalore',
  salary: '8-12 LPA',
  type: 'Full-time',
  experience: 'Mid-Senior Level',
  datePosted: '2024-01-15',
  deadline: '2024-01-31',
  saved: false,
  applied: false,
  description: `**About the Role**\n\nWe are looking for a talented Frontend Developer to join our growing team.\n\n**Key Responsibilities:**\n- Build modern web applications using React.js and TypeScript\n- Collaborate with designers and backend engineers\n- Write clean, maintainable code\n- Optimize applications for speed and scalability\n\n**What We're Looking For (Requirements):**\n- 3+ years experience in frontend development\n- Strong knowledge of JavaScript, React, HTML, CSS\n- Experience with REST APIs\n- Familiarity with Git and Agile methodologies`,
  requiredSkills: ['React.js', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'REST APIs'],
  qualifications: 'B.E./B.Tech in Computer Science or related field',
  benefits: [
    'Health Insurance',
    'Paid Time Off',
    'Flexible Hours',
    'Performance Bonus',
    'Learning & Development',
    'Meal Vouchers'
  ]
};

const JobDetailsPage = () => {
  const [saved, setSaved] = useState(job.saved);
  const [applied, setApplied] = useState(job.applied);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
        <div className="flex items-center h-16 px-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="bg-primary-600 rounded-full p-2 mr-2">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <span className="font-bold text-lg text-primary-700">VishwasJobPortal</span>
          </div>
        </div>
        <nav className="flex-1 py-6 px-4 space-y-2">
          <Link to="/applicant" className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
            <UserIcon className="h-5 w-5 mr-3" /> My Overview
          </Link>
          <Link to="/applicant/jobs" className="flex items-center px-4 py-2 rounded-lg font-medium text-primary-700 bg-primary-100">
            <BriefcaseIcon className="h-5 w-5 mr-3" /> Search Jobs
          </Link>
          <Link to="/applicant/applications" className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
            <DocumentTextIcon className="h-5 w-5 mr-3" /> My Applications
          </Link>
          <Link to="/applicant/saved" className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
            <StarIcon className="h-5 w-5 mr-3" /> Saved Jobs
          </Link>
          <Link to="/applicant/interviews" className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
            <CalendarIcon className="h-5 w-5 mr-3" /> My Interviews
          </Link>
          <Link to="/applicant/profile" className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
            <BuildingOfficeIcon className="h-5 w-5 mr-3" /> My Profile
          </Link>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-16 px-8 bg-white border-b border-gray-200">
          <div className="flex items-center">
            <BackButton className="mr-4" />
          </div>
          <div className="flex items-center gap-4">
            <span className="font-medium text-gray-700">Applicant</span>
            <div className="w-10 h-10 rounded-full bg-primary-200 flex items-center justify-center font-bold text-primary-700">RS</div>
          </div>
        </div>
        {/* Page Title & Breadcrumbs */}
        <div className="max-w-2xl mx-auto px-4 py-8 w-full">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h1>
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link to="/applicant/jobs" className="text-gray-500 hover:text-gray-700">Search Jobs</Link>
              </li>
              <li>
                <div className="flex items-center">
                  <ArrowLeftIcon className="h-4 w-4 text-gray-400" />
                  <span className="ml-4 text-gray-900">{job.title}</span>
                </div>
              </li>
            </ol>
          </nav>
          {/* Job Header/Overview */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div className="flex items-center gap-4 mb-4 sm:mb-0">
              {job.companyLogo ? (
                <img src={job.companyLogo} alt={job.company} className="w-12 h-12 rounded-full object-cover border" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-lg">
                  {job.company[0]}
                </div>
              )}
              <div>
                <div className="text-lg font-semibold text-gray-800">{job.company}</div>
                <div className="text-sm text-gray-500">{job.location}</div>
              </div>
            </div>
            <button
              onClick={() => setSaved(s => !s)}
              className={`flex items-center gap-1 px-4 py-2 border rounded-lg text-sm font-medium ${saved ? 'bg-primary-100 text-primary-700 border-primary-200' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
            >
              <StarIcon className={`h-5 w-5 ${saved ? 'fill-primary-600 text-primary-600' : 'text-gray-400'}`} />
              {saved ? 'Saved' : 'Save Job'}
            </button>
          </div>
          {/* Key Facts Bar */}
          <div className="flex flex-wrap gap-4 mb-8">
            <span className="flex items-center text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-full"><CurrencyDollarIcon className="h-4 w-4 mr-1" /> {job.salary}</span>
            <span className="flex items-center text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-full"><BriefcaseIcon className="h-4 w-4 mr-1" /> {job.type}</span>
            <span className="flex items-center text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-full"><UserIcon className="h-4 w-4 mr-1" /> {job.experience}</span>
            <span className="flex items-center text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-full"><CalendarIcon className="h-4 w-4 mr-1" /> Posted {job.datePosted}</span>
            <span className="flex items-center text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-full"><CalendarIcon className="h-4 w-4 mr-1" /> Apply by: {job.deadline}</span>
          </div>
          {/* Job Description */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Job Description</h3>
            <div className="prose max-w-none text-gray-800">
              {job.description.split('\n').map((line, idx) => {
                if (line.startsWith('**') && line.endsWith('**')) {
                  return <h4 key={idx} className="font-bold text-gray-900 mt-4 mb-2">{line.replace(/\*\*/g, '')}</h4>;
                } else if (line.startsWith('- ')) {
                  return <li key={idx} className="ml-6 list-disc">{line.replace('- ', '')}</li>;
                } else if (line.trim() === '') {
                  return null;
                } else {
                  return <p key={idx}>{line}</p>;
                }
              })}
            </div>
          </div>
          {/* Required Skills */}
          <div className="mb-8">
            <h4 className="text-md font-semibold text-gray-900 mb-2">Required Skills</h4>
            <div className="flex flex-wrap gap-2">
              {job.requiredSkills.map(skill => (
                <span key={skill} className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">{skill}</span>
              ))}
            </div>
          </div>
          {/* Educational Qualifications */}
          <div className="mb-8">
            <h4 className="text-md font-semibold text-gray-900 mb-2">Educational Qualifications</h4>
            <div className="text-gray-800 text-sm">{job.qualifications}</div>
          </div>
          {/* Benefits & Perks */}
          <div className="mb-24">
            <h4 className="text-md font-semibold text-gray-900 mb-2">Benefits & Perks</h4>
            <ul className="list-disc ml-6 text-gray-800 text-sm">
              {job.benefits.map(benefit => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </div>
        </div>
        {/* Sticky Apply Now Button */}
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50 flex justify-center py-4">
          <button
            className={`px-8 py-3 text-lg font-bold rounded-lg transition-colors ${applied ? 'bg-green-500 text-white cursor-not-allowed' : 'bg-primary-600 text-white hover:bg-primary-700'}`}
            disabled={applied}
            onClick={() => navigate(`/applicant/jobs/${job.id}/apply`)}
          >
            {applied ? 'Applied' : 'Apply Now'}
          </button>
        </div>
      </main>
    </div>
  );
};

export default JobDetailsPage; 