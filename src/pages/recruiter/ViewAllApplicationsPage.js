import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  UserIcon,
  BriefcaseIcon,
  CalendarIcon,
  DocumentArrowDownIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  XCircleIcon,
  PencilIcon,
  EyeIcon,
  PlusIcon,
  TrashIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

// Mock data
const jobs = [
  { id: 1, title: 'Senior Software Engineer' },
  { id: 2, title: 'Marketing Manager' },
  { id: 3, title: 'UI/UX Designer' },
];
const recruiters = [
  { id: 1, name: 'Sarah Johnson' },
  { id: 2, name: 'Mike Chen' },
  { id: 3, name: 'Lisa Wilson' },
];
const statuses = [
  'New',
  'Reviewed',
  'Shortlisted',
  'Interview Scheduled',
  'Offer Extended',
  'Rejected',
];
const sources = [
  'VishwasJobPortal Direct',
  'Referral',
  'Indeed',
  'LinkedIn',
];
const mockApplications = [
  {
    id: 1,
    candidate: 'John Doe',
    job: 'Senior Software Developer',
    jobId: 'J-2024-1001',
    recruiter: 'Sarah Johnson',
    recruiterId: 1,
    date: '2024-06-01T10:30:00',
    status: 'New',
    resume: 'resume-john-doe.pdf',
    source: 'VishwasJobPortal Direct',
  },
  {
    id: 2,
    candidate: 'Jane Smith',
    job: 'Marketing Manager',
    jobId: 'J-2024-1002',
    recruiter: 'Mike Chen',
    recruiterId: 2,
    date: '2024-06-02T14:15:00',
    status: 'Shortlisted',
    resume: 'resume-jane-smith.pdf',
    source: 'LinkedIn',
  },
  {
    id: 3,
    candidate: 'Mike Johnson',
    job: 'UI/UX Designer',
    jobId: 'J-2024-1003',
    recruiter: 'Lisa Wilson',
    recruiterId: 3,
    date: '2024-06-03T09:00:00',
    status: 'Interview Scheduled',
    resume: 'resume-mike-johnson.pdf',
    source: 'Referral',
  },
  // ...more mock applications
];

const statusColors = {
  'New': 'bg-blue-100 text-blue-800',
  'Reviewed': 'bg-gray-100 text-gray-800',
  'Shortlisted': 'bg-green-100 text-green-800',
  'Interview Scheduled': 'bg-purple-100 text-purple-800',
  'Offer Extended': 'bg-yellow-100 text-yellow-800',
  'Rejected': 'bg-red-100 text-red-800',
};

const ITEMS_PER_PAGE_OPTIONS = [10, 25, 50];

const ViewAllApplicationsPage = () => {
  const navigate = useNavigate();
  // Filters
  const [search, setSearch] = useState('');
  const [jobFilter, setJobFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [recruiterFilter, setRecruiterFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  // Table state
  const [selected, setSelected] = useState([]);
  const [sortBy, setSortBy] = useState('date');
  const [sortDir, setSortDir] = useState('desc');
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filtering logic
  let filtered = mockApplications.filter(app => {
    const matchesSearch =
      app.candidate.toLowerCase().includes(search.toLowerCase()) ||
      app.job.toLowerCase().includes(search.toLowerCase());
    const matchesJob = !jobFilter || app.jobId.toLowerCase().includes(jobFilter.toLowerCase());
    const matchesStatus = !statusFilter || app.status === statusFilter;
    const matchesRecruiter = !recruiterFilter || app.recruiterId === Number(recruiterFilter);
    const matchesDate = (!dateFrom || new Date(app.date) >= new Date(dateFrom)) &&
      (!dateTo || new Date(app.date) <= new Date(dateTo));
    return matchesSearch && matchesJob && matchesStatus && matchesRecruiter && matchesDate;
  });

  // Sorting logic
  filtered.sort((a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];
    if (sortBy === 'date') {
      valA = new Date(valA);
      valB = new Date(valB);
    }
    if (valA < valB) return sortDir === 'asc' ? -1 : 1;
    if (valA > valB) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // Bulk selection
  const allSelected = paginated.length > 0 && paginated.every(app => selected.includes(app.id));
  const toggleSelectAll = () => {
    if (allSelected) {
      setSelected(selected.filter(id => !paginated.some(app => app.id === id)));
    } else {
      setSelected([...new Set([...selected, ...paginated.map(app => app.id)])]);
    }
  };
  const toggleSelect = (id) => {
    setSelected(selected.includes(id) ? selected.filter(sid => sid !== id) : [...selected, id]);
  };

  // Bulk actions (mock)
  const handleBulkAction = (action) => {
    // Implement logic for bulk actions
    alert(`Bulk action: ${action} on ${selected.length} applications`);
    setSelected([]);
  };

  // Table sorting
  const handleSort = (col) => {
    if (sortBy === col) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else {
      setSortBy(col);
      setSortDir('asc');
    }
  };

  // Clear filters
  const clearFilters = () => {
    setSearch('');
    setJobFilter('');
    setStatusFilter('');
    setRecruiterFilter('');
    setDateFrom('');
    setDateTo('');
  };

  // Empty state
  const isEmpty = paginated.length === 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logo and Portal Name */}
            <div className="flex items-center">
              <div className="flex items-center mr-8">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">V</span>
                </div>
                <span className="text-xl font-bold text-gray-900">VishwasJobPortal</span>
              </div>
            </div>
            
            {/* Right side - Back to Dashboard */}
            <div className="flex items-center">
              <Link to="/recruiter-admin" className="flex items-center text-gray-500 hover:text-gray-700 transition-colors">
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Page Title and Breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-2xl font-bold text-gray-900">All Applications</h1>
          </div>
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link to="/recruiter-admin" className="text-gray-500 hover:text-gray-700">
                  Dashboard
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                  <span className="ml-4 text-gray-900">All Applications</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
          <div className="flex-1 flex items-center gap-2">
            <div className="relative w-full">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by candidate name, job title, or keyword"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <button
              onClick={clearFilters}
              className="ml-2 px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              Clear Filters
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            <select
              value={jobFilter}
              onChange={e => setJobFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">All Jobs</option>
              {jobs.map(job => (
                <option key={job.id} value={job.title}>{job.title}</option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">All Statuses</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <select
              value={recruiterFilter}
              onChange={e => setRecruiterFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">All Recruiters</option>
              {recruiters.map(r => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
            <input
              type="date"
              value={dateFrom}
              onChange={e => setDateFrom(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="From"
            />
            <input
              type="date"
              value={dateTo}
              onChange={e => setDateTo(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="To"
            />
          </div>
        </div>
        {/* Bulk Actions */}
        <div className="flex items-center justify-between mb-2">
          <div>
            {selected.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">{selected.length} selected</span>
                <select
                  onChange={e => e.target.value && handleBulkAction(e.target.value)}
                  className="px-2 py-1 border border-gray-300 rounded-lg text-sm"
                  defaultValue=""
                >
                  <option value="">Bulk Actions</option>
                  <option value="Mark as Reviewed">Mark as Reviewed</option>
                  <option value="Shortlist Selected">Shortlist Selected</option>
                  <option value="Reject Selected">Reject Selected</option>
                </select>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 mr-2">Items per page:</label>
            <select
              value={itemsPerPage}
              onChange={e => { setItemsPerPage(Number(e.target.value)); setPage(1); }}
              className="px-2 py-1 border border-gray-300 rounded-lg text-sm"
            >
              {ITEMS_PER_PAGE_OPTIONS.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>
        {/* Applications Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job ID</th>
                <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort('job')}>
                  <div className="flex items-center gap-1">Job Applied For {sortBy === 'job' && (sortDir === 'asc' ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />)}</div>
                </th>
                <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort('date')}>
                  <div className="flex items-center gap-1">Application Date {sortBy === 'date' && (sortDir === 'asc' ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />)}</div>
                </th>
                <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort('status')}>
                  <div className="flex items-center gap-1">Current Status {sortBy === 'status' && (sortDir === 'asc' ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />)}</div>
                </th>
                <th className="px-4 py-3">Resume/CV</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {isEmpty ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <span>No applications found.</span>
                      <Link to="/recruiter-admin/post-job" className="text-primary-600 hover:underline flex items-center gap-1">
                        <PlusIcon className="h-4 w-4" /> Post a New Job
                      </Link>
                      <span className="text-xs text-gray-400">Or try adjusting your filters.</span>
                    </div>
                  </td>
                </tr>
              ) : (
                paginated.map(app => (
                  <tr key={app.id} className={selected.includes(app.id) ? 'bg-primary-50' : ''}>
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selected.includes(app.id)}
                        onChange={() => toggleSelect(app.id)}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-primary-600 hover:underline" onClick={() => navigate(`/candidate/${app.id}`)}>{app.candidate}</button>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">{app.jobId}</td>
                    <td className="px-4 py-3">
                      <button className="text-primary-600 hover:underline" onClick={() => navigate(`/jobs/${app.jobId}`)}>{app.job}</button>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                      {new Date(app.date).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${statusColors[app.status]}`}>{app.status}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <a href={`/${app.resume}`} download className="text-primary-600 hover:text-primary-800" title="Download Resume">
                        <DocumentArrowDownIcon className="h-5 w-5 mx-auto" />
                      </a>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">{app.source}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button title="View Profile" onClick={() => navigate(`/candidate/${app.id}`)} className="text-primary-600 hover:text-primary-800"><EyeIcon className="h-4 w-4" /></button>
                        <button title="Change Status" onClick={() => alert('Change Status')} className="text-gray-600 hover:text-primary-600"><PencilIcon className="h-4 w-4" /></button>
                        <button title="Schedule Interview" onClick={() => alert('Schedule Interview')} className="text-purple-600 hover:text-purple-800"><CalendarIcon className="h-4 w-4" /></button>
                        <button title="Add Note" onClick={() => alert('Add Note')} className="text-yellow-600 hover:text-yellow-800"><PencilIcon className="h-4 w-4" /></button>
                        <button title="Reject" onClick={() => window.confirm('Are you sure you want to reject this application?') && alert('Rejected')} className="text-red-600 hover:text-red-800"><XCircleIcon className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        {!isEmpty && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-600">
              Showing {(page - 1) * itemsPerPage + 1} - {Math.min(page * itemsPerPage, filtered.length)} of {filtered.length} applications
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pn => (
                <button
                  key={pn}
                  onClick={() => setPage(pn)}
                  className={`px-3 py-1 border rounded-lg text-sm ${pn === page ? 'bg-primary-600 text-white border-primary-600' : 'border-gray-300 text-gray-700'}`}
                >
                  {pn}
                </button>
              ))}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAllApplicationsPage; 