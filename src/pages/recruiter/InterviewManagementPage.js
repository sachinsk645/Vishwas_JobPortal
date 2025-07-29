import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const mockInterviews = [
  {
    id: 1,
    candidate: 'Jane Smith',
    job: 'Marketing Manager',
    interviewers: ['HR Manager', 'Panelist 1'],
    date: '2024-01-20',
    time: '10:00 AM',
    type: 'Panel',
    status: 'Scheduled',
    location: 'Zoom: https://zoom.us/j/123456789',
    notes: 'Bring portfolio. Panel interview.'
  },
  {
    id: 2,
    candidate: 'John Doe',
    job: 'Senior Software Developer',
    interviewers: ['Tech Lead'],
    date: '2024-01-21',
    time: '2:00 PM',
    type: 'Technical',
    status: 'Completed',
    location: 'On-site: Room 301',
    notes: 'Technical round. Bring laptop.'
  },
  {
    id: 3,
    candidate: 'Mike Johnson',
    job: 'UI/UX Designer',
    interviewers: ['Design Lead', 'HR'],
    date: '2024-01-19',
    time: '11:00 AM',
    type: 'HR',
    status: 'Canceled',
    location: 'Google Meet: https://meet.google.com/xyz-abc',
    notes: 'Rescheduled due to candidate request.'
  },
  {
    id: 4,
    candidate: 'Emily Brown',
    job: 'QA Engineer',
    interviewers: ['QA Manager'],
    date: '2024-01-22',
    time: '9:30 AM',
    type: 'Technical',
    status: 'Scheduled',
    location: 'On-site: Room 204',
    notes: ''
  }
];

const statusColors = {
  Scheduled: 'bg-blue-100 text-blue-700',
  Completed: 'bg-green-100 text-green-700',
  Canceled: 'bg-red-100 text-red-700',
  Rescheduled: 'bg-yellow-100 text-yellow-700'
};

const InterviewManagementPage = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [sortBy, setSortBy] = useState('date');
  const [sortDir, setSortDir] = useState('asc');
  const navigate = useNavigate();

  // Filtering
  let filtered = mockInterviews.filter(i => {
    const matchesSearch =
      i.candidate.toLowerCase().includes(search.toLowerCase()) ||
      i.job.toLowerCase().includes(search.toLowerCase()) ||
      i.interviewers.join(', ').toLowerCase().includes(search.toLowerCase()) ||
      i.type.toLowerCase().includes(search.toLowerCase()) ||
      i.status.toLowerCase().includes(search.toLowerCase()) ||
      i.location.toLowerCase().includes(search.toLowerCase()) ||
      i.notes.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || i.status === statusFilter;
    const matchesType = typeFilter === 'All' || i.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Sorting
  filtered = filtered.sort((a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];
    if (sortBy === 'date') {
      valA = new Date(a.date + ' ' + a.time);
      valB = new Date(b.date + ' ' + b.time);
    }
    if (valA < valB) return sortDir === 'asc' ? -1 : 1;
    if (valA > valB) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  const allTypes = Array.from(new Set(mockInterviews.map(i => i.type)));
  const allStatuses = Array.from(new Set(mockInterviews.map(i => i.status)));

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
            <h1 className="text-2xl font-bold text-gray-900">Interview Management</h1>
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
                  <span className="ml-4 text-gray-900">Interview Management</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

              <div className="flex items-center justify-between mb-6">
          <div></div> {/* Empty div for spacing */}
          <button
            className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2 rounded-lg font-semibold flex items-center"
            onClick={() => navigate('/recruiter-admin/schedule-interview')}
          >
            + Schedule Interview
          </button>
        </div>
      <div className="flex flex-wrap gap-2 mb-4 items-center">
        <input
          type="text"
          placeholder="Search interviews..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="All">All Statuses</option>
          {allStatuses.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="All">All Types</option>
          {allTypes.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <div className="ml-auto flex gap-2">
          <label className="text-sm text-gray-600 flex items-center gap-1">
            Sort by:
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="px-2 py-1 border border-gray-300 rounded"
            >
              <option value="date">Date</option>
              <option value="candidate">Candidate</option>
              <option value="job">Job</option>
              <option value="type">Type</option>
              <option value="status">Status</option>
            </select>
          </label>
          <button
            className="px-2 py-1 border border-gray-300 rounded"
            onClick={() => setSortDir(d => (d === 'asc' ? 'desc' : 'asc'))}
            title="Toggle sort direction"
            type="button"
          >
            {sortDir === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <table className="w-full table-fixed divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="w-1/8 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Candidate</th>
              <th className="w-1/8 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Job Title</th>
              <th className="w-1/8 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Interviewer(s)</th>
              <th className="w-1/8 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
              <th className="w-1/12 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="w-1/12 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="w-1/6 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Meeting Link/Location</th>
              <th className="w-1/6 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Notes/Comments</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map(interview => (
              <tr key={interview.id}>
                <td className="px-3 py-2 break-words font-semibold text-gray-900">{interview.candidate}</td>
                <td className="px-3 py-2 break-words">{interview.job}</td>
                <td className="px-3 py-2 break-words">{interview.interviewers.join(', ')}</td>
                <td className="px-3 py-2 break-words">{interview.date} at {interview.time}</td>
                <td className="px-3 py-2 break-words">{interview.type}</td>
                <td className="px-3 py-2 break-words">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[interview.status]}`}>{interview.status}</span>
                </td>
                <td className="px-3 py-2 break-words">
                  {interview.location.startsWith('http') ? (
                    <a href={interview.location} className="text-primary-600 underline hover:text-primary-800" target="_blank" rel="noopener noreferrer">Meeting Link</a>
                  ) : interview.location}
                </td>
                <td className="px-3 py-2 break-words text-gray-700 text-sm">{interview.notes || '-'}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-8 text-gray-400">No interviews found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InterviewManagementPage; 