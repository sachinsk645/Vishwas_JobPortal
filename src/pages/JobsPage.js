import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  StarIcon,
  ArrowLeftIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import BackButton from '../components/common/BackButton';

const industries = ['All Industries', 'IT', 'Finance', 'Healthcare', 'Education', 'Marketing'];
const jobTypes = ['All Job Types', 'Full-time', 'Part-time', 'Contract', 'Internship'];
const experienceLevels = ['All Experience Levels', 'Fresher', '1-3 years', '3-5 years', '5+ years'];
const salaryRanges = ['All Salary Ranges', '0-5 LPA', '5-10 LPA', '10-20 LPA', '20+ LPA'];

// Mock job data (25 jobs)
const allJobs = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  title: [
    'Frontend Developer', 'Backend Developer', 'UX Designer', 'Product Manager', 'Data Analyst',
    'DevOps Engineer', 'QA Tester', 'Mobile App Developer', 'Cloud Architect', 'Business Analyst',
    'HR Executive', 'Content Writer', 'Digital Marketer', 'Sales Manager', 'Support Engineer',
    'Network Admin', 'AI Engineer', 'ML Engineer', 'Full Stack Developer', 'UI Developer',
    'Finance Analyst', 'Operations Manager', 'Recruiter', 'SEO Specialist', 'Graphic Designer'
  ][i],
  company: [
    'TechCorp India', 'InnoSoft', 'DesignStudio', 'InnovateTech', 'DataMinds',
    'OpsGenie', 'TestRight', 'AppCrafters', 'Cloudify', 'BizInsights',
    'PeopleFirst', 'WriteWise', 'MarketGurus', 'SalesPro', 'Supportly',
    'NetSecure', 'AIBridge', 'MLWorks', 'WebGen', 'UIDevs',
    'FinEdge', 'OpsHub', 'TalentFind', 'RankBoost', 'PixelWorks'
  ][i],
  location: ['Bangalore', 'Hyderabad', 'Mumbai', 'Delhi', 'Pune'][i % 5],
  description: 'Join our team to work on exciting projects and grow your career. Collaborate with talented professionals and make an impact.',
  salary: ['8-12 LPA', '10-15 LPA', '6-10 LPA', '12-18 LPA', '6-9 LPA'][i % 5],
  type: ['Full-time', 'Part-time', 'Contract', 'Internship'][i % 4],
  datePosted: `2024-01-${(i % 28 + 1).toString().padStart(2, '0')}`
}));

const JobsPage = () => {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [industry, setIndustry] = useState('All Industries');
  const [jobType, setJobType] = useState('All Job Types');
  const [experience, setExperience] = useState('All Experience Levels');
  const [salary, setSalary] = useState('All Salary Ranges');
  const [page, setPage] = useState(1);
  const [saved, setSaved] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchParam = params.get('search') || '';
    const locationParam = params.get('location') || '';
    setSearch(searchParam);
    setLocation(locationParam);
  }, []);

  // Filter jobs
  let filteredJobs = allJobs.filter(job =>
    (!search ||
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase()) ||
      job.description.toLowerCase().includes(search.toLowerCase()) ||
      job.salary.toLowerCase().includes(search.toLowerCase()) ||
      job.type.toLowerCase().includes(search.toLowerCase()) ||
      job.datePosted.toLowerCase().includes(search.toLowerCase())
    ) &&
    (!location || job.location.toLowerCase().includes(location.toLowerCase())) &&
    (industry === 'All Industries' || job.company.toLowerCase().includes(industry.toLowerCase())) &&
    (jobType === 'All Job Types' || job.type === jobType) &&
    (experience === 'All Experience Levels' || true) && // No experience in mock data
    (salary === 'All Salary Ranges' || true) // No salary filter in mock data
  );
  const jobsPerPage = 10;
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const paginatedJobs = filteredJobs.slice((page - 1) * jobsPerPage, page * jobsPerPage);

  // Handlers
  const handleSearch = e => { e.preventDefault(); setPage(1); };
  const handleSave = id => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center">
          <BackButton className="mr-4" />
          <div className="bg-primary-600 rounded-full p-2 mr-2">
            <span className="text-white font-bold text-lg">V</span>
          </div>
          <span className="font-bold text-lg text-primary-700">VishwasJobPortal</span>
        </div>
        <div className="flex gap-4">
          <Link to="/login" className="px-5 py-2 border border-primary-600 text-primary-700 rounded-lg font-medium hover:bg-primary-50">Sign In</Link>
          <Link to="/register" className="px-5 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700">Create Account</Link>
        </div>
      </header>
      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Browse Jobs</h1>
        <p className="text-gray-600 mb-8">Find your next career opportunity</p>
        {/* Search & Filter Bar */}
        <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Job title, keywords, company"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="relative flex-1">
              <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="Location (e.g., Bengaluru, Mumbai)"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <button type="submit" className="px-6 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 w-full md:w-auto">Search Jobs</button>
          </div>
        </form>
        {/* Job Results */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Results ({filteredJobs.length} jobs found)</h2>
          {filteredJobs.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center text-gray-500">No jobs found matching your criteria.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {paginatedJobs.map(job => (
                <div key={job.id} className="bg-white border border-gray-200 rounded-xl shadow p-6 flex flex-col justify-between transition-shadow hover:shadow-md">
                  <div>
                    <h3 className="text-lg font-bold text-primary-700 mb-1 cursor-pointer hover:underline" onClick={() => navigate(`/jobs/${job.id}`)}>{job.title}</h3>
                    <p className="text-gray-700 mb-1">{job.company} • {job.location}</p>
                    <p className="text-gray-500 text-sm mb-3 truncate">{job.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1"><CurrencyDollarIcon className="h-4 w-4" />{job.salary}</span>
                      <span className="flex items-center gap-1"><BriefcaseIcon className="h-4 w-4" />{job.type}</span>
                      <span className="flex items-center gap-1"><CalendarIcon className="h-4 w-4" />Posted {job.datePosted}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2 justify-end">
                    <button className="px-4 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700" onClick={() => navigate('/register')}>Apply Now</button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg flex items-center gap-1 hover:bg-gray-50" onClick={() => handleSave(job.id)}>
                      <StarIcon className="h-5 w-5" /> Save Job
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Pagination */}
        {filteredJobs.length > 0 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              className="px-3 py-1 border rounded-lg text-gray-600 hover:bg-gray-100 flex items-center gap-1"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              <ArrowLeftIcon className="h-4 w-4" /> Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`px-3 py-1 border rounded-lg font-semibold ${page === i + 1 ? 'bg-primary-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="px-3 py-1 border rounded-lg text-gray-600 hover:bg-gray-100 flex items-center gap-1"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              Next <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default JobsPage; 