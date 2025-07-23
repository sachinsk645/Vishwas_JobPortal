import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  UserIcon,
  BriefcaseIcon,
  CalendarIcon,
  CheckCircleIcon,
  XMarkIcon,
  ChevronRightIcon,
  DocumentTextIcon,
  PlusIcon,
  PencilIcon,
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  CloudArrowDownIcon
} from '@heroicons/react/24/outline';

// Mock data
const jobs = [
  { id: 1, title: 'Frontend Developer' },
  { id: 2, title: 'UX Designer' },
  { id: 3, title: 'QA Engineer' },
];
const applications = [
  {
    id: 1,
    candidate: 'John Doe',
    job: 'Frontend Developer',
    jobId: 1,
    applied: '30 minutes ago',
    resume: 'resume-john-doe.pdf',
    experience: '3',
    skill: 'React',
    status: 'New',
  },
  {
    id: 2,
    candidate: 'Lisa Chen',
    job: 'UX Designer',
    jobId: 2,
    applied: '2 hours ago',
    resume: 'resume-lisa-chen.pdf',
    experience: '5',
    skill: 'UX Research',
    status: 'New',
  },
  {
    id: 3,
    candidate: 'Mike Johnson',
    job: 'QA Engineer',
    jobId: 3,
    applied: 'Yesterday',
    resume: 'resume-mike-johnson.pdf',
    experience: '2',
    skill: 'Automation',
    status: 'New',
  },
];
const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'name-az', label: 'Candidate Name (A-Z)' },
  { value: 'name-za', label: 'Candidate Name (Z-A)' },
];

const ReviewNewApplicationsPage = () => {
  const navigate = useNavigate();
  const [jobFilter, setJobFilter] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [search, setSearch] = useState('');
  const [noteModal, setNoteModal] = useState(null);
  const [note, setNote] = useState('');

  // Filtering and sorting
  let filtered = applications.filter(app =>
    (!jobFilter || app.jobId === Number(jobFilter)) &&
    (app.candidate.toLowerCase().includes(search.toLowerCase()) || app.skill.toLowerCase().includes(search.toLowerCase()))
  );
  if (sortBy === 'newest') filtered = filtered;
  else if (sortBy === 'oldest') filtered = [...filtered].reverse();
  else if (sortBy === 'name-az') filtered = [...filtered].sort((a, b) => a.candidate.localeCompare(b.candidate));
  else if (sortBy === 'name-za') filtered = [...filtered].sort((a, b) => b.candidate.localeCompare(a.candidate));

  // Actions (mock)
  const handleShortlist = (id) => alert(`Shortlisted application ${id}`);
  const handleReject = (id) => alert(`Rejected application ${id}`);
  const handleSchedule = (id) => navigate('/recruiter-user/schedule-interview', { state: { candidateId: id } });
  const handleAddNote = (id) => setNoteModal(id);
  const handleSaveNote = () => { setNoteModal(null); setNote(''); alert('Note saved!'); };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header & Sidebar */}
      <div className="flex">
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
            <Link to="/recruiter-user" className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
              <UserIcon className="h-5 w-5 mr-3" /> My Overview
            </Link>
            <Link to="/recruiter-user/jobs" className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
              <BriefcaseIcon className="h-5 w-5 mr-3" /> My Job Postings
            </Link>
            <Link to="/recruiter-user/applications" className="flex items-center px-4 py-2 rounded-lg font-medium text-primary-700 bg-primary-100">
              <DocumentTextIcon className="h-5 w-5 mr-3" /> My Applications
            </Link>
            <Link to="/recruiter-user/interviews" className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
              <CalendarIcon className="h-5 w-5 mr-3" /> My Interviews
            </Link>
            <Link to="/recruiter-user/profile" className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
              <UserIcon className="h-5 w-5 mr-3" /> My Profile
            </Link>
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-1">
          {/* Top Bar */}
          <div className="flex items-center justify-between h-16 px-8 bg-white border-b border-gray-200">
            <div />
            <div className="flex items-center gap-4">
              <span className="font-medium text-gray-700">Recruiter User</span>
              <div className="w-10 h-10 rounded-full bg-primary-200 flex items-center justify-center font-bold text-primary-700">RU</div>
            </div>
          </div>
          {/* Page Title & Breadcrumbs */}
          <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Review New Applications</h1>
            <nav className="mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-4">
                <li>
                  <Link to="/recruiter-user" className="text-gray-500 hover:text-gray-700">My Overview</Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                    <span className="ml-4 text-gray-900">Review New Applications</span>
                  </div>
                </li>
              </ol>
            </nav>
            {/* Filter/Sort/Search Bar */}
            <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
              <div className="flex-1 flex items-center gap-2">
                <select
                  value={jobFilter}
                  onChange={e => setJobFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Filter by Job</option>
                  {jobs.map(job => (
                    <option key={job.id} value={job.id}>{job.title}</option>
                  ))}
                </select>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  {sortOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <div className="relative w-full">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search candidate name or keyword"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            </div>
            {/* Main Content: Application Cards */}
            <div className="grid gap-6">
              {filtered.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-lg text-gray-500 mb-4">No new applications to review at this moment.</p>
                  <Link to="/recruiter-user/applications" className="text-primary-600 hover:underline flex items-center gap-1 justify-center">
                    <DocumentTextIcon className="h-5 w-5" /> View All Applications
                  </Link>
                  <p className="text-xs text-gray-400 mt-2">You're all caught up! Check back later.</p>
                </div>
              ) : (
                filtered.map(app => (
                  <div key={app.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <button onClick={() => navigate(`/candidate/${app.id}`)} className="text-lg font-bold text-primary-700 hover:underline">{app.candidate}</button>
                        <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 ml-2">{app.status}</span>
                      </div>
                      <div className="text-sm text-gray-600 mb-1">{app.job}</div>
                      <div className="text-xs text-gray-400 mb-2">Applied {app.applied}</div>
                      <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                        <span>Years Experience: <span className="font-medium text-gray-700">{app.experience}</span></span>
                        <span>Primary Skill: <span className="font-medium text-gray-700">{app.skill}</span></span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-2 md:gap-4">
                      <a href={`/${app.resume}`} download className="flex items-center text-primary-600 hover:text-primary-800 text-sm" title="Download Resume">
                        <CloudArrowDownIcon className="h-5 w-5 mr-1" /> Resume
                      </a>
                      <div className="flex gap-2 mt-2 md:mt-0">
                        <button onClick={() => handleShortlist(app.id)} className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-semibold">Shortlist</button>
                        <button onClick={() => handleReject(app.id)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Reject</button>
                        <button onClick={() => handleSchedule(app.id)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Schedule Interview</button>
                        <button onClick={() => handleAddNote(app.id)} className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50" title="Add Note"><PencilIcon className="h-4 w-4" /></button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {/* Note Modal */}
            {noteModal && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Note</h3>
                  <textarea
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Add an internal note for this candidate..."
                  />
                  <div className="flex justify-end gap-2 mt-4">
                    <button onClick={() => setNoteModal(null)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Cancel</button>
                    <button onClick={handleSaveNote} className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">Save Note</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReviewNewApplicationsPage; 