import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BriefcaseIcon,
  UserIcon,
  BookmarkIcon,
  CalendarIcon,
  ChartBarIcon,
  CogIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  CheckCircleIcon,
  XCircleIcon,
  BellIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  ClockIcon,
  StarIcon,
  DocumentTextIcon,
  PhoneIcon,
  VideoCameraIcon,
  TrashIcon,
  HeartIcon,
  ShareIcon,
  FilterIcon,
  CurrencyDollarIcon,
  ArrowLeftIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const ApplicantDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const navigate = useNavigate();

  // Mock data for demonstration
  const applicantName = "Rahul Sharma";
  const dashboardStats = {
    applicationsSubmitted: 12,
    shortlisted: 4,
    interviewsScheduled: 2,
    offersReceived: 1
  };

  const recommendedJobs = [
    { id: 1, title: 'Frontend Developer', company: 'TechCorp India', location: 'Bangalore', datePosted: '2024-01-15', salary: '8-12 LPA', type: 'Full-time' },
    { id: 2, title: 'UX Designer', company: 'DesignStudio', location: 'Mumbai', datePosted: '2024-01-14', salary: '6-10 LPA', type: 'Full-time' },
    { id: 3, title: 'Product Manager', company: 'InnovateTech', location: 'Delhi', datePosted: '2024-01-13', salary: '12-18 LPA', type: 'Full-time' }
  ];

  const recentActivity = [
    { id: 1, action: 'Status for "Software Engineer" updated to Shortlisted', time: '2 hours ago', type: 'status' },
    { id: 2, action: 'Interview scheduled for "Marketing Manager"', time: '1 day ago', type: 'interview' },
    { id: 3, action: 'Application submitted for "Data Analyst"', time: '2 days ago', type: 'application' }
  ];

  const myApplications = [
    { id: 1, jobTitle: 'Frontend Developer', company: 'TechCorp India', date: '2024-01-15', status: 'Shortlisted' },
    { id: 2, jobTitle: 'UX Designer', company: 'DesignStudio', date: '2024-01-14', status: 'Under Review' },
    { id: 3, jobTitle: 'Product Manager', company: 'InnovateTech', date: '2024-01-13', status: 'Interview Scheduled' },
    { id: 4, jobTitle: 'Data Analyst', company: 'AnalyticsPro', date: '2024-01-12', status: 'Applied' }
  ];

  const savedJobs = [
    { id: 1, title: 'Backend Developer', company: 'CloudTech', location: 'Pune', salary: '10-15 LPA', savedDate: '2024-01-10' },
    { id: 2, title: 'DevOps Engineer', company: 'InfraSolutions', location: 'Hyderabad', salary: '12-18 LPA', savedDate: '2024-01-09' }
  ];

  const upcomingInterviews = [
    { id: 1, jobTitle: 'Product Manager', company: 'InnovateTech', date: '2024-01-20', time: '10:00 AM', type: 'Video', interviewer: 'Sarah Johnson' },
    { id: 2, jobTitle: 'Frontend Developer', company: 'TechCorp India', date: '2024-01-22', time: '2:00 PM', type: 'On-site', interviewer: 'Mike Chen' }
  ];

  // Replace jobs array with real-world example jobs
  const jobs = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'TechCorp India',
      location: 'Bangalore',
      description: 'Join our dynamic team to build modern web applications using React.js and TypeScript. Collaborate with designers and backend engineers to deliver seamless user experiences.',
      salary: '8-12 LPA',
      type: 'Full-time',
      datePosted: '2024-01-10',
    },
    {
      id: 2,
      title: 'Backend Developer',
      company: 'InnoSoft Solutions',
      location: 'Hyderabad',
      description: 'Work on scalable backend systems using Node.js and MongoDB. Experience with REST APIs and microservices architecture preferred.',
      salary: '10-15 LPA',
      type: 'Full-time',
      datePosted: '2024-01-12',
    },
    {
      id: 3,
      title: 'UI/UX Designer',
      company: 'PixelWorks',
      location: 'Mumbai',
      description: 'Design intuitive interfaces and user flows for mobile and web apps. Proficiency in Figma/Sketch and a strong portfolio required.',
      salary: '7-10 LPA',
      type: 'Full-time',
      datePosted: '2024-01-13',
    },
    {
      id: 4,
      title: 'Data Analyst',
      company: 'DataMinds',
      location: 'Delhi',
      description: 'Analyze large datasets to extract actionable insights. Must be proficient in SQL, Excel, and data visualization tools like Power BI or Tableau.',
      salary: '6-9 LPA',
      type: 'Full-time',
      datePosted: '2024-01-14',
    },
    {
      id: 5,
      title: 'Digital Marketing Specialist',
      company: 'MarketGurus',
      location: 'Pune',
      description: 'Plan and execute digital campaigns across Google, Facebook, and LinkedIn. SEO/SEM experience is a plus.',
      salary: '5-8 LPA',
      type: 'Full-time',
      datePosted: '2024-01-15',
    },
    {
      id: 6,
      title: 'HR Executive',
      company: 'PeopleFirst',
      location: 'Bangalore',
      description: 'Manage end-to-end recruitment, onboarding, and employee engagement activities. Good communication and organizational skills required.',
      salary: '4-7 LPA',
      type: 'Full-time',
      datePosted: '2024-01-16',
    },
    {
      id: 7,
      title: 'Cloud Engineer',
      company: 'Cloudify',
      location: 'Hyderabad',
      description: 'Deploy and manage cloud infrastructure on AWS/Azure. Experience with Docker, Kubernetes, and CI/CD pipelines is essential.',
      salary: '12-18 LPA',
      type: 'Full-time',
      datePosted: '2024-01-17',
    },
    {
      id: 8,
      title: 'QA Automation Engineer',
      company: 'TestRight',
      location: 'Chennai',
      description: 'Develop and maintain automated test scripts using Selenium and Python. Experience with CI tools is a plus.',
      salary: '8-12 LPA',
      type: 'Full-time',
      datePosted: '2024-01-18',
    },
    {
      id: 9,
      title: 'Business Analyst',
      company: 'BizInsights',
      location: 'Delhi',
      description: 'Gather requirements, create BRDs, and liaise between business and tech teams. Strong analytical and documentation skills required.',
      salary: '9-13 LPA',
      type: 'Full-time',
      datePosted: '2024-01-19',
    },
    {
      id: 10,
      title: 'Mobile App Developer',
      company: 'AppCrafters',
      location: 'Pune',
      description: 'Build and maintain Android/iOS apps using Flutter or React Native. Published apps on Play Store/App Store preferred.',
      salary: '10-14 LPA',
      type: 'Full-time',
      datePosted: '2024-01-20',
    },
    {
      id: 11,
      title: 'DevOps Engineer',
      company: 'OpsGenie',
      location: 'Bangalore',
      description: 'Automate deployments, monitor systems, and manage CI/CD pipelines. Experience with Jenkins, Ansible, and cloud platforms required.',
      salary: '12-16 LPA',
      type: 'Full-time',
      datePosted: '2024-01-21',
    },
    {
      id: 12,
      title: 'Content Writer',
      company: 'WriteWise',
      location: 'Mumbai',
      description: 'Create engaging content for blogs, websites, and social media. Excellent English writing skills and creativity required.',
      salary: '4-6 LPA',
      type: 'Full-time',
      datePosted: '2024-01-22',
    },
    {
      id: 13,
      title: 'Sales Manager',
      company: 'SalesForceX',
      location: 'Delhi',
      description: 'Lead a team of sales executives, drive revenue growth, and manage key accounts. Prior B2B sales experience required.',
      salary: '15-22 LPA',
      type: 'Full-time',
      datePosted: '2024-01-23',
    },
    {
      id: 14,
      title: 'Graphic Designer',
      company: 'DesignHub',
      location: 'Pune',
      description: 'Design marketing collateral, social media creatives, and branding assets. Proficiency in Adobe Suite required.',
      salary: '5-8 LPA',
      type: 'Full-time',
      datePosted: '2024-01-24',
    },
    {
      id: 15,
      title: 'Network Engineer',
      company: 'NetSecure',
      location: 'Hyderabad',
      description: 'Configure and troubleshoot LAN/WAN, firewalls, and VPNs. CCNA/CCNP certification preferred.',
      salary: '8-12 LPA',
      type: 'Full-time',
      datePosted: '2024-01-25',
    },
    {
      id: 16,
      title: 'Product Manager',
      company: 'Prodigy',
      location: 'Bangalore',
      description: 'Define product roadmap, gather requirements, and work with cross-functional teams. Prior product management experience required.',
      salary: '18-25 LPA',
      type: 'Full-time',
      datePosted: '2024-01-26',
    },
    {
      id: 17,
      title: 'Recruiter',
      company: 'TalentBridge',
      location: 'Chennai',
      description: 'Source, screen, and interview candidates for various roles. Experience with ATS and social recruiting preferred.',
      salary: '5-8 LPA',
      type: 'Full-time',
      datePosted: '2024-01-27',
    },
    {
      id: 18,
      title: 'Operations Executive',
      company: 'LogiPro',
      location: 'Mumbai',
      description: 'Oversee daily operations, coordinate with vendors, and ensure timely deliveries. Strong organizational skills required.',
      salary: '6-9 LPA',
      type: 'Full-time',
      datePosted: '2024-01-28',
    },
    {
      id: 19,
      title: 'Customer Support Associate',
      company: 'HelpDesk',
      location: 'Delhi',
      description: 'Handle customer queries via phone, email, and chat. Good communication and problem-solving skills required.',
      salary: '3-5 LPA',
      type: 'Full-time',
      datePosted: '2024-01-29',
    },
    {
      id: 20,
      title: 'SEO Specialist',
      company: 'RankUp',
      location: 'Pune',
      description: 'Optimize website content, conduct keyword research, and improve search rankings. Google Analytics/AdWords certification preferred.',
      salary: '6-10 LPA',
      type: 'Full-time',
      datePosted: '2024-01-30',
    },
    {
      id: 21,
      title: 'Finance Analyst',
      company: 'FinEdge',
      location: 'Bangalore',
      description: 'Analyze financial data, prepare reports, and assist in budgeting. CA/MBA (Finance) preferred.',
      salary: '10-14 LPA',
      type: 'Full-time',
      datePosted: '2024-01-31',
    },
    {
      id: 22,
      title: 'Machine Learning Engineer',
      company: 'AIMinds',
      location: 'Hyderabad',
      description: 'Develop and deploy ML models for real-world applications. Proficiency in Python, TensorFlow/PyTorch required.',
      salary: '15-22 LPA',
      type: 'Full-time',
      datePosted: '2024-02-01',
    },
    {
      id: 23,
      title: 'Legal Associate',
      company: 'LawDesk',
      location: 'Delhi',
      description: 'Draft legal documents, conduct research, and assist in litigation. LLB/LLM required.',
      salary: '7-11 LPA',
      type: 'Full-time',
      datePosted: '2024-02-02',
    },
    {
      id: 24,
      title: 'Supply Chain Manager',
      company: 'SupplyPro',
      location: 'Pune',
      description: 'Manage end-to-end supply chain operations, vendor management, and logistics. Prior experience in manufacturing preferred.',
      salary: '14-20 LPA',
      type: 'Full-time',
      datePosted: '2024-02-03',
    },
    {
      id: 25,
      title: 'Full Stack Developer',
      company: 'WebGen',
      location: 'Bangalore',
      description: 'Work on both frontend and backend development using React, Node.js, and MongoDB. Experience with REST APIs and cloud deployment preferred.',
      salary: '12-18 LPA',
      type: 'Full-time',
      datePosted: '2024-02-04',
    },
  ];

  const [page, setPage] = useState(1);
  const jobsPerPage = 10;
  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const paginatedJobs = jobs.slice((page - 1) * jobsPerPage, page * jobsPerPage);
  const [savedJobsState, setSavedJobsState] = useState([]);
  const handleSaveJob = (id) => {
    setSavedJobsState((prev) => prev.includes(id) ? prev.filter(jid => jid !== id) : [...prev, id]);
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Hello, {applicantName}! 👋</h1>
        <p className="text-gray-600">Ready to find your next opportunity? Here's your job search overview.</p>
      </div>

      {/* Quick Actions (moved up) */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => setActiveTab('search')}
            className="flex items-center justify-center px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
            Search Jobs
          </button>
          <button 
            onClick={() => setActiveTab('applications')}
            className="flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <BriefcaseIcon className="h-5 w-5 mr-2" />
            View My Applications
          </button>
          <button 
            onClick={() => setActiveTab('profile')}
            className="flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <UserIcon className="h-5 w-5 mr-2" />
            Update Profile
          </button>
        </div>
      </div>

      {/* Application Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BriefcaseIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Applications Submitted</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardStats.applicationsSubmitted}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Shortlisted</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardStats.shortlisted}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <CalendarIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Interviews Scheduled</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardStats.interviewsScheduled}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <StarIcon className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Offers Received</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardStats.offersReceived}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Jobs */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended for You</h3>
        <div className="space-y-4">
          {recommendedJobs.map((job) => (
            <div key={job.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{job.title}</h4>
                <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
                <div className="flex items-center mt-2 space-x-4 text-xs text-gray-500">
                  <span>{job.salary}</span>
                  <span>{job.type}</span>
                  <span>Posted {job.datePosted}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-primary-600 text-white rounded hover:bg-primary-700">
                  Apply
                </button>
                <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                  Save
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-3 ${
                  activity.type === 'status' ? 'bg-blue-500' :
                  activity.type === 'interview' ? 'bg-purple-500' :
                  'bg-green-500'
                }`} />
                <span className="text-sm text-gray-700">{activity.action}</span>
              </div>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderJobSearch = () => (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Find Your Dream Job</h2>
        
        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Job title, keywords, company"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="relative">
              <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Location (e.g., Bengaluru, Mumbai)"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          <button className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            Search Jobs
          </button>
        </div>

        {/* Filters */}
        <div className="mt-4 flex flex-wrap gap-2">
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
            <option>All Industries</option>
            <option>IT</option>
            <option>Finance</option>
            <option>Healthcare</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
            <option>All Job Types</option>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
            <option>All Experience Levels</option>
            <option>Entry Level</option>
            <option>Mid-Senior Level</option>
            <option>Director</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
            <option>All Salary Ranges</option>
            <option>5-10 LPA</option>
            <option>10-20 LPA</option>
            <option>20+ LPA</option>
          </select>
        </div>
      </div>

      {/* Job Results Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Job Results ({jobs.length} jobs found)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {paginatedJobs.map(job => (
            <div key={job.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col justify-between">
              <div>
                <button onClick={() => navigate(`/applicant/jobs/${job.id}`)} className="text-lg font-bold text-primary-700 hover:underline text-left mb-1">{job.title}</button>
                <div className="text-sm text-gray-600 mb-1">{job.company} • {job.location}</div>
                <div className="text-sm text-gray-500 mb-2 truncate">{job.description}</div>
                <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-4">
                  <span className="flex items-center"><CurrencyDollarIcon className="h-4 w-4 mr-1" /> {job.salary}</span>
                  <span className="flex items-center"><BriefcaseIcon className="h-4 w-4 mr-1" /> {job.type}</span>
                  <span className="flex items-center"><CalendarIcon className="h-4 w-4 mr-1" /> Posted {job.datePosted}</span>
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 mt-4">
                <button 
                  onClick={() => navigate(`/applicant/jobs/${job.id}`)}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-semibold"
                >
                  Apply Now
                </button>
                <button
                  onClick={() => handleSaveJob(job.id)}
                  className={`px-4 py-2 border rounded-lg flex items-center gap-1 ${savedJobsState.includes(job.id) ? 'bg-primary-100 text-primary-700 border-primary-200' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                >
                  <StarIcon className={`h-4 w-4 ${savedJobsState.includes(job.id) ? 'fill-primary-600 text-primary-600' : 'text-gray-400'}`} />
                  {savedJobsState.includes(job.id) ? 'Saved' : 'Save Job'}
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm disabled:opacity-50 flex items-center"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" /> Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(pn => (
            <button
              key={pn}
              onClick={() => setPage(pn)}
              className={`px-3 py-1 border rounded-lg text-sm ${pn === page ? 'bg-primary-600 text-white border-primary-600 font-bold' : 'border-gray-300 text-gray-700'}`}
            >
              {pn}
            </button>
          ))}
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm disabled:opacity-50 flex items-center"
          >
            Next <ArrowRightIcon className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderApplications = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">My Applications</h2>
      
      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search applications..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
            <option>All Status</option>
            <option>Applied</option>
            <option>Under Review</option>
            <option>Shortlisted</option>
            <option>Interview Scheduled</option>
            <option>Rejected</option>
          </select>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {myApplications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{app.jobTitle}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{app.company}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{app.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      app.status === 'Shortlisted' ? 'bg-green-100 text-green-800' :
                      app.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' :
                      app.status === 'Interview Scheduled' ? 'bg-purple-100 text-purple-800' :
                      app.status === 'Applied' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-primary-600 hover:text-primary-900">
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <XCircleIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSavedJobs = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Saved Jobs</h2>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-200">
          {savedJobs.map((job) => (
            <div key={job.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-lg font-medium text-gray-900 mb-2">{job.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{job.company} • {job.location}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>{job.salary}</span>
                    <span>Saved on {job.savedDate}</span>
                  </div>
                </div>
                <div className="flex flex-col space-y-2 ml-4">
                  <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                    Apply Now
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderInterviews = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">My Interviews</h2>
      
      {/* Upcoming Interviews */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Interviews</h3>
        <div className="space-y-4">
          {upcomingInterviews.map((interview) => (
            <div key={interview.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{interview.jobTitle}</h4>
                <p className="text-sm text-gray-600">{interview.company}</p>
                <div className="flex items-center mt-2 space-x-4 text-xs text-gray-500">
                  <span>{interview.date} at {interview.time}</span>
                  <span>{interview.type} Interview</span>
                  <span>with {interview.interviewer}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                {interview.type === 'Video' && (
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Join Call
                  </button>
                )}
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">My Profile & Resume</h2>
      
      {/* Personal Information */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              defaultValue={applicantName}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              defaultValue="rahul.sharma@email.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              defaultValue="+91 98765 43210"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input
              type="text"
              defaultValue="Bangalore, Karnataka"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
      </div>

      {/* Resume Management */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume/CV Management</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <DocumentTextIcon className="h-8 w-8 text-primary-600 mr-3" />
              <div>
                <p className="font-medium text-gray-900">Rahul_Sharma_Resume.pdf</p>
                <p className="text-sm text-gray-600">Uploaded on Jan 10, 2024</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-primary-600 text-white rounded hover:bg-primary-700">
                Download
              </button>
              <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                Replace
              </button>
            </div>
          </div>
          <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary-500 hover:text-primary-500 transition-colors">
            <PlusIcon className="h-6 w-6 mx-auto mb-2" />
            Upload New Resume
          </button>
        </div>
      </div>

      {/* Professional Summary */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Summary</h3>
        <textarea
          rows={4}
          defaultValue="Experienced software developer with 3+ years of expertise in frontend development, React, and modern web technologies. Passionate about creating user-friendly applications and solving complex problems."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>

      {/* Skills */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {['React', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Node.js', 'Git', 'Agile'].map((skill) => (
            <span key={skill} className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
        <button className="mt-4 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          Add Skill
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 lg:hidden"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center ml-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">VishwasJobPortal</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-md">
              <BellIcon className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-medium text-sm">RS</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{applicantName}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
          <nav className="mt-8 px-4">
            <div className="space-y-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'dashboard'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <ChartBarIcon className="h-5 w-5 mr-3" />
                My Overview
              </button>
              <button
                onClick={() => setActiveTab('search')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'search'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <MagnifyingGlassIcon className="h-5 w-5 mr-3" />
                Search Jobs
              </button>
              <button
                onClick={() => setActiveTab('applications')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'applications'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <BriefcaseIcon className="h-5 w-5 mr-3" />
                My Applications
              </button>
              <button
                onClick={() => setActiveTab('saved')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'saved'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <BookmarkIcon className="h-5 w-5 mr-3" />
                Saved Jobs
              </button>
              <button
                onClick={() => setActiveTab('interviews')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'interviews'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <CalendarIcon className="h-5 w-5 mr-3" />
                My Interviews
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'profile'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <UserIcon className="h-5 w-5 mr-3" />
                My Profile
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64">
          <div className="px-6 py-8">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'search' && renderJobSearch()}
            {activeTab === 'applications' && renderApplications()}
            {activeTab === 'saved' && renderSavedJobs()}
            {activeTab === 'interviews' && renderInterviews()}
            {activeTab === 'profile' && renderProfile()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ApplicantDashboard; 