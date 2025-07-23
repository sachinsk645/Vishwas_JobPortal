import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  UserIcon,
  BriefcaseIcon,
  CalendarIcon,
  ClockIcon,
  VideoCameraIcon,
  PhoneIcon,
  HomeIcon,
  CheckIcon,
  XMarkIcon,
  ChevronRightIcon,
  EnvelopeIcon,
  PencilIcon,
  ArrowLeftIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

// Mock data
const candidates = [
  { id: 1, name: 'John Doe', job: 'Frontend Developer', jobId: 1 },
  { id: 2, name: 'Lisa Chen', job: 'UX Designer', jobId: 2 },
  { id: 3, name: 'Mike Johnson', job: 'QA Engineer', jobId: 3 },
];
const jobs = [
  { id: 1, title: 'Frontend Developer' },
  { id: 2, title: 'UX Designer' },
  { id: 3, title: 'QA Engineer' },
];
const interviewers = [
  { id: 1, name: 'Sarah Johnson' },
  { id: 2, name: 'Mike Chen' },
  { id: 3, name: 'Lisa Wilson' },
];
const durations = ['30 mins', '45 mins', '1 hour', '1.5 hours', '2 hours'];
const interviewTypes = [
  { value: 'Video Call', icon: <VideoCameraIcon className="h-5 w-5 mr-1" /> },
  { value: 'On-site', icon: <HomeIcon className="h-5 w-5 mr-1" /> },
  { value: 'Phone Call', icon: <PhoneIcon className="h-5 w-5 mr-1" /> },
];
const timeZones = ['IST (Indian Standard Time)', 'UTC', 'CST', 'EST', 'PST'];

const ScheduleNewInterviewPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Pre-fill candidate/job if passed via state
  const prefill = location.state || {};
  const currentRecruiter = interviewers[0]; // Assume first is logged-in

  const [formData, setFormData] = useState({
    candidateId: prefill.candidateId || '',
    jobId: prefill.jobId || '',
    interviewers: [currentRecruiter.id],
    date: '',
    time: '',
    duration: '',
    type: '',
    locationOrLink: '',
    timeZone: 'IST (Indian Standard Time)',
    notes: '',
    candidateInstructions: '',
    sendToCandidate: true,
    sendToInterviewers: true,
    addToCalendar: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState('');

  // Helper functions
  const selectedCandidate = candidates.find(c => c.id === Number(formData.candidateId));
  const availableJobs = selectedCandidate ? jobs.filter(j => j.id === selectedCandidate.jobId) : jobs;
  const selectedJob = jobs.find(j => j.id === Number(formData.jobId));

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleInterviewerChange = (id) => {
    setFormData(prev => ({
      ...prev,
      interviewers: prev.interviewers.includes(id)
        ? prev.interviewers.filter(i => i !== id)
        : [...prev.interviewers, id]
    }));
    if (errors.interviewers) setErrors(prev => ({ ...prev, interviewers: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.candidateId) newErrors.candidateId = 'Candidate is required';
    if (!formData.jobId) newErrors.jobId = 'Job is required';
    if (!formData.interviewers.length) newErrors.interviewers = 'At least one interviewer is required';
    if (!formData.date) newErrors.date = 'Interview date is required';
    if (!formData.time) newErrors.time = 'Interview time is required';
    if (!formData.duration) newErrors.duration = 'Duration is required';
    if (!formData.type) newErrors.type = 'Interview type is required';
    if (formData.type === 'On-site' && !formData.locationOrLink) newErrors.locationOrLink = 'Location is required';
    if (formData.type === 'Video Call' && !formData.locationOrLink) newErrors.locationOrLink = 'Video link is required';
    if (formData.type === 'Phone Call' && !formData.locationOrLink) newErrors.locationOrLink = 'Instructions/notes are required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    const newErrors = validateForm();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(`Interview with ${selectedCandidate?.name || 'candidate'} scheduled for ${formData.date} at ${formData.time}!`);
      setTimeout(() => navigate('/recruiter-user/interviews'), 2000);
    }, 1500);
  };

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
            <Link to="/recruiter-user/applications" className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
              <DocumentTextIcon className="h-5 w-5 mr-3" /> My Applications
            </Link>
            <Link to="/recruiter-user/interviews" className="flex items-center px-4 py-2 rounded-lg font-medium text-primary-700 bg-primary-100">
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Schedule New Interview</h1>
            <nav className="mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-4">
                <li>
                  <Link to="/recruiter-user" className="text-gray-500 hover:text-gray-700">My Overview</Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                    <span className="ml-4 text-gray-900">Schedule New Interview</span>
                  </div>
                </li>
              </ol>
            </nav>
            {/* Success/Error Banner */}
            {success && (
              <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-400" />
                  <span className="ml-3 text-green-700 font-medium">{success}</span>
                </div>
                <button onClick={() => setSuccess('')} className="text-green-700 hover:text-green-900"><XMarkIcon className="h-5 w-5" /></button>
              </div>
            )}
            {Object.keys(errors).length > 0 && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <XMarkIcon className="h-5 w-5 text-red-400" />
                  <span className="ml-3 text-red-700 font-medium">{Object.values(errors)[0]}</span>
                </div>
                <button onClick={() => setErrors({})} className="text-red-700 hover:text-red-900"><XMarkIcon className="h-5 w-5" /></button>
              </div>
            )}
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Section 1: Candidate & Job Selection */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Candidate & Job Selection</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Candidate */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Candidate <span className="text-red-500">*</span></label>
                    {prefill.candidateId ? (
                      <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                        {selectedCandidate?.name} - {selectedCandidate?.job}
                      </div>
                    ) : (
                      <select
                        name="candidateId"
                        value={formData.candidateId}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.candidateId ? 'border-red-300' : 'border-gray-300'}`}
                      >
                        <option value="">Select Candidate</option>
                        {candidates.map(c => (
                          <option key={c.id} value={c.id}>{c.name} - {c.job}</option>
                        ))}
                      </select>
                    )}
                    {errors.candidateId && <p className="mt-1 text-sm text-red-600">{errors.candidateId}</p>}
                  </div>
                  {/* Job */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Job Applied For <span className="text-red-500">*</span></label>
                    {prefill.jobId ? (
                      <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                        {selectedJob?.title}
                      </div>
                    ) : (
                      <select
                        name="jobId"
                        value={formData.jobId}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.jobId ? 'border-red-300' : 'border-gray-300'}`}
                      >
                        <option value="">Select Job</option>
                        {availableJobs.map(j => (
                          <option key={j.id} value={j.id}>{j.title}</option>
                        ))}
                      </select>
                    )}
                    {errors.jobId && <p className="mt-1 text-sm text-red-600">{errors.jobId}</p>}
                  </div>
                </div>
              </div>
              {/* Section 2: Interview Details */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Interview Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Interviewers */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Interviewer(s) <span className="text-red-500">*</span></label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {interviewers.map(i => (
                        <label key={i.id} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.interviewers.includes(i.id)}
                            onChange={() => handleInterviewerChange(i.id)}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-700">{i.name}</span>
                        </label>
                      ))}
                    </div>
                    {errors.interviewers && <p className="mt-1 text-sm text-red-600">{errors.interviewers}</p>}
                  </div>
                  {/* Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Interview Date <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.date ? 'border-red-300' : 'border-gray-300'}`}
                      />
                      <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                    </div>
                    {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
                  </div>
                  {/* Time */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Interview Time <span className="text-red-500">*</span></label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      step="900"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.time ? 'border-red-300' : 'border-gray-300'}`}
                    />
                    {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time}</p>}
                  </div>
                  {/* Duration */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration <span className="text-red-500">*</span></label>
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.duration ? 'border-red-300' : 'border-gray-300'}`}
                    >
                      <option value="">Select Duration</option>
                      {durations.map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                    {errors.duration && <p className="mt-1 text-sm text-red-600">{errors.duration}</p>}
                  </div>
                  {/* Interview Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Interview Type <span className="text-red-500">*</span></label>
                    <div className="flex gap-4">
                      {interviewTypes.map(type => (
                        <label key={type.value} className="flex items-center">
                          <input
                            type="radio"
                            name="type"
                            value={type.value}
                            checked={formData.type === type.value}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                          />
                          <span className="ml-2 text-sm text-gray-700 flex items-center">{type.icon}{type.value}</span>
                        </label>
                      ))}
                    </div>
                    {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
                  </div>
                  {/* Location/Link/Instructions */}
                  {formData.type && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {formData.type === 'On-site' && 'Physical Address / Meeting Room *'}
                        {formData.type === 'Video Call' && 'Video Conference Link *'}
                        {formData.type === 'Phone Call' && 'Phone Call Instructions *'}
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          name="locationOrLink"
                          value={formData.locationOrLink}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.locationOrLink ? 'border-red-300' : 'border-gray-300'}`}
                          placeholder={
                            formData.type === 'On-site' ? 'Enter address or meeting room' :
                            formData.type === 'Video Call' ? 'Paste Zoom/Google Meet link or generate' :
                            'Enter instructions for the call'
                          }
                        />
                        {formData.type === 'Video Call' && (
                          <button type="button" className="px-3 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200">Generate VishwasJobPortal Video Link</button>
                        )}
                      </div>
                      {errors.locationOrLink && <p className="mt-1 text-sm text-red-600">{errors.locationOrLink}</p>}
                    </div>
                  )}
                  {/* Time Zone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time Zone <span className="text-gray-400">(Optional)</span></label>
                    <select
                      name="timeZone"
                      value={formData.timeZone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      {timeZones.map(tz => (
                        <option key={tz} value={tz}>{tz}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              {/* Section 3: Additional Information */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Notes/Agenda */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Interview Notes/Agenda (Internal Only) <span className="text-gray-400">(Optional)</span></label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="e.g., Focus on technical skills, Key areas to cover, Interviewer expectations."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  {/* Candidate Instructions */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Instructions for Candidate (Sent with Invite) <span className="text-gray-400">(Optional)</span></label>
                    <textarea
                      name="candidateInstructions"
                      value={formData.candidateInstructions}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="e.g., Please bring your portfolio, Prepare for a technical coding round."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
              </div>
              {/* Section 4: Notifications & Confirmation */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Notifications & Confirmation</h2>
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="sendToCandidate"
                      checked={formData.sendToCandidate}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Send Email Confirmation to Candidate</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="sendToInterviewers"
                      checked={formData.sendToInterviewers}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Send Email Invitation to Interviewer(s)</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="addToCalendar"
                      checked={formData.addToCalendar}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Add to Calendar (Send .ics file) <span className="text-gray-400">(Optional)</span></span>
                  </label>
                </div>
              </div>
              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => navigate('/recruiter-user')}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  {isSubmitting ? (
                    <span className="flex items-center"><span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>Scheduling...</span>
                  ) : (
                    'Schedule Interview'
                  )}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ScheduleNewInterviewPage; 