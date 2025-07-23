import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  CalendarIcon,
  UserIcon,
  BriefcaseIcon,
  ClockIcon,
  VideoCameraIcon,
  PhoneIcon,
  HomeIcon,
  CheckIcon,
  XMarkIcon,
  ChevronRightIcon,
  EnvelopeIcon,
  PencilIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

// Mock data
const candidates = [
  { id: 1, name: 'John Doe', job: 'Senior Software Engineer', jobId: 1 },
  { id: 2, name: 'Jane Smith', job: 'Marketing Manager', jobId: 2 },
  { id: 3, name: 'Mike Johnson', job: 'UI/UX Designer', jobId: 3 },
];
const jobs = [
  { id: 1, title: 'Senior Software Engineer' },
  { id: 2, title: 'Marketing Manager' },
  { id: 3, title: 'UI/UX Designer' },
];
const interviewers = [
  { id: 1, name: 'Sarah Johnson' },
  { id: 2, name: 'Mike Chen' },
  { id: 3, name: 'Lisa Wilson' },
];
const durations = ['30 mins', '45 mins', '1 hour', '1.5 hours'];
const interviewTypes = [
  { value: 'Video Call', icon: <VideoCameraIcon className="h-5 w-5 mr-1" /> },
  { value: 'On-site', icon: <HomeIcon className="h-5 w-5 mr-1" /> },
  { value: 'Phone Call', icon: <PhoneIcon className="h-5 w-5 mr-1" /> },
];

const ScheduleInterviewPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Pre-fill candidate/job if passed via state
  const prefill = location.state || {};

  const [formData, setFormData] = useState({
    candidateId: prefill.candidateId || '',
    jobId: prefill.jobId || '',
    interviewers: [],
    date: '',
    time: '',
    duration: '',
    type: '',
    locationOrLink: '',
    notes: '',
    candidateInstructions: '',
    sendToCandidate: true,
    sendToInterviewers: true,
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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(`Interview with ${selectedCandidate?.name || 'candidate'} scheduled for ${formData.date} at ${formData.time}!`);
      setTimeout(() => navigate('/recruiter-admin/interviews'), 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header & Breadcrumbs */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/recruiter-admin" className="flex items-center text-gray-500 hover:text-gray-700">
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Back to Dashboard
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">Schedule Interview</h1>
            </div>
          </div>
        </div>
      </div>
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
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
                  <Link to="/recruiter-admin/interviews" className="ml-4 text-gray-500 hover:text-gray-700">
                    Interviews
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                  <span className="ml-4 text-gray-900">Schedule Interview</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Candidate & Job Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <UserIcon className="h-5 w-5 mr-2 text-primary-600" />
              Candidate & Job Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Candidate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Candidate *</label>
                {prefill.candidateId ? (
                  <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                    {selectedCandidate?.name || 'N/A'}
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Job *</label>
                {prefill.jobId ? (
                  <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                    {selectedJob?.title || 'N/A'}
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
          {/* Interview Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2 text-primary-600" />
              Interview Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Interviewers */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Interviewer(s) *</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Interview Date *</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.date ? 'border-red-300' : 'border-gray-300'}`}
                />
                {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
              </div>
              {/* Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Interview Time *</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration *</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Interview Type *</label>
                <div className="space-y-2">
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {formData.type === 'On-site' && 'Location (Address/Room) *'}
                    {formData.type === 'Video Call' && 'Video Conference Link *'}
                    {formData.type === 'Phone Call' && 'Phone Call Instructions/Notes *'}
                  </label>
                  <input
                    type="text"
                    name="locationOrLink"
                    value={formData.locationOrLink}
                    onChange={handleInputChange}
                    placeholder={
                      formData.type === 'On-site' ? 'Enter address or meeting room' :
                      formData.type === 'Video Call' ? 'Paste Zoom/Google Meet link or generate' :
                      'Enter instructions for the call'
                    }
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.locationOrLink ? 'border-red-300' : 'border-gray-300'}`}
                  />
                  {errors.locationOrLink && <p className="mt-1 text-sm text-red-600">{errors.locationOrLink}</p>}
                </div>
              )}
            </div>
          </div>
          {/* Additional Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <PencilIcon className="h-5 w-5 mr-2 text-primary-600" />
              Additional Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Notes/Agenda */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Interview Notes/Agenda (Optional)</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Add notes or agenda for interviewers..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              {/* Candidate Instructions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Candidate Instructions (Optional)</label>
                <textarea
                  name="candidateInstructions"
                  value={formData.candidateInstructions}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Instructions for the candidate (e.g., bring portfolio, prepare for coding round)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
          {/* Confirmation & Notifications */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <EnvelopeIcon className="h-5 w-5 mr-2 text-primary-600" />
              Confirmation & Notifications
            </h2>
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="sendToCandidate"
                  checked={formData.sendToCandidate}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Send email confirmation to candidate</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="sendToInterviewers"
                  checked={formData.sendToInterviewers}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Send email invitation to interviewer(s)</span>
              </label>
            </div>
          </div>
          {/* Error Message */}
          {Object.keys(errors).length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex">
                <XMarkIcon className="h-5 w-5 text-red-400" />
                <div className="ml-3 text-sm text-red-600">
                  {Object.values(errors).map((err, i) => <div key={i}>{err}</div>)}
                </div>
              </div>
            </div>
          )}
          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex">
                <CheckIcon className="h-5 w-5 text-green-400" />
                <p className="ml-3 text-sm text-green-700">{success}</p>
              </div>
            </div>
          )}
          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Scheduling...
                </>
              ) : (
                <>
                  <CheckIcon className="h-4 w-4 mr-2" />
                  Schedule Interview
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleInterviewPage; 