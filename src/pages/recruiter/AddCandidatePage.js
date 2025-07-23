import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  UserIcon,
  BriefcaseIcon,
  EnvelopeIcon,
  PhoneIcon,
  CloudArrowUpIcon,
  XMarkIcon,
  CheckIcon,
  ChevronRightIcon,
  DocumentTextIcon,
  BuildingOfficeIcon,
  PencilIcon,
  ArrowLeftIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

// Mock data
const jobs = [
  { id: 1, title: 'Frontend Developer' },
  { id: 2, title: 'Backend Developer' },
  { id: 3, title: 'Marketing Specialist' },
];
const citySuggestions = [
  'Bengaluru', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Noida', 'Gurgaon', 'Indore', 'Chandigarh', 'Coimbatore', 'Nagpur', 'Bhopal', 'Patna', 'Vadodara', 'Ludhiana'
];
const noticePeriods = ['Immediate', '15 days', '30 days', '60 days', '90 days'];
const experienceOptions = ['0-1', '1-3', '3-5', '5-10', '10+'];

const AddCandidatePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    linkedin: '',
    location: '',
    primarySkill: '',
    experience: '',
    currentCompany: '',
    currentDesignation: '',
    expectedSalary: '',
    noticePeriod: '',
    resume: null,
    associatedJob: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [cityDropdown, setCityDropdown] = useState([]);

  // City autocomplete
  const handleLocationChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, location: value }));
    if (value.length > 0) {
      setCityDropdown(citySuggestions.filter(city => city.toLowerCase().startsWith(value.toLowerCase())));
    } else {
      setCityDropdown([]);
    }
  };

  // File upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
        setErrors(prev => ({ ...prev, resume: 'Invalid file type. Only PDF, DOC, DOCX allowed.' }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, resume: 'File too large. Max 5MB.' }));
        return;
      }
      setFormData(prev => ({ ...prev, resume: file }));
      setErrors(prev => ({ ...prev, resume: '' }));
    }
  };
  const removeFile = () => setFormData(prev => ({ ...prev, resume: null }));

  // Validation
  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required.';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required.';
    if (!formData.email.trim()) newErrors.email = 'Email is required.';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) newErrors.email = 'Invalid email format.';
    if (!formData.primarySkill.trim()) newErrors.primarySkill = 'Primary skill/role is required.';
    if (!formData.experience) newErrors.experience = 'Experience is required.';
    return newErrors;
  };

  // Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setGeneralError('');
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    setIsSubmitting(true);
    setTimeout(() => {
      if (formData.email === 'exists@email.com') {
        setGeneralError('An error occurred. Please check your inputs or try again.');
        setIsSubmitting(false);
        return;
      }
      setSuccess(`Candidate ${formData.firstName} ${formData.lastName} added successfully!`);
      setIsSubmitting(false);
      setFormData({
        firstName: '', lastName: '', email: '', phone: '', linkedin: '', location: '', primarySkill: '', experience: '', currentCompany: '', currentDesignation: '', expectedSalary: '', noticePeriod: '', resume: null, associatedJob: '', notes: ''
      });
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
            <Link to="/recruiter-user" className="flex items-center px-4 py-2 rounded-lg font-medium text-primary-700 bg-primary-100">
              <UserIcon className="h-5 w-5 mr-3" /> My Overview
            </Link>
            <Link to="/recruiter-user/jobs" className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
              <BriefcaseIcon className="h-5 w-5 mr-3" /> My Job Postings
            </Link>
            <Link to="/recruiter-user/applications" className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
              <DocumentTextIcon className="h-5 w-5 mr-3" /> My Applications
            </Link>
            <Link to="/recruiter-user/interviews" className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
              <CalendarIcon className="h-5 w-5 mr-3" /> My Interviews
            </Link>
            <Link to="/recruiter-user/profile" className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
              <BuildingOfficeIcon className="h-5 w-5 mr-3" /> My Profile
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Add New Candidate</h1>
            <nav className="mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-4">
                <li>
                  <Link to="/recruiter-user" className="text-gray-500 hover:text-gray-700">My Overview</Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                    <span className="ml-4 text-gray-900">Add New Candidate</span>
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
            {generalError && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <XMarkIcon className="h-5 w-5 text-red-400" />
                  <span className="ml-3 text-red-700 font-medium">{generalError}</span>
                </div>
                <button onClick={() => setGeneralError('')} className="text-red-700 hover:text-red-900"><XMarkIcon className="h-5 w-5" /></button>
              </div>
            )}
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Section 1: Personal Details */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Candidate Personal Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={e => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.firstName ? 'border-red-300' : 'border-gray-300'}`}
                    />
                    {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                  </div>
                  {/* Last Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={e => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.lastName ? 'border-red-300' : 'border-gray-300'}`}
                    />
                    {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                  </div>
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address <span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.email ? 'border-red-300' : 'border-gray-300'}`}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>
                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-gray-400">(Optional)</span></label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">+91</span>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder=""
                      />
                    </div>
                  </div>
                  {/* LinkedIn */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile URL <span className="text-gray-400">(Optional)</span></label>
                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={e => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                  {/* Location */}
                  <div className="md:col-span-2 relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Location <span className="text-gray-400">(Optional)</span></label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleLocationChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Start typing city name..."
                      autoComplete="off"
                    />
                    {cityDropdown.length > 0 && (
                      <ul className="absolute z-10 bg-white border border-gray-200 rounded-lg mt-1 w-full max-h-40 overflow-y-auto shadow-lg">
                        {cityDropdown.map(city => (
                          <li key={city} className="px-4 py-2 hover:bg-primary-100 cursor-pointer" onClick={() => { setFormData(prev => ({ ...prev, location: city })); setCityDropdown([]); }}>{city}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
              {/* Section 2: Professional Details */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Candidate Professional Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Primary Skill/Role */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Primary Skill/Role <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="primarySkill"
                      value={formData.primarySkill}
                      onChange={e => setFormData(prev => ({ ...prev, primarySkill: e.target.value }))}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.primarySkill ? 'border-red-300' : 'border-gray-300'}`}
                      placeholder="e.g., Software Developer, Marketing Specialist, HR Executive"
                    />
                    {errors.primarySkill && <p className="mt-1 text-sm text-red-600">{errors.primarySkill}</p>}
                  </div>
                  {/* Experience */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience <span className="text-red-500">*</span></label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={e => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.experience ? 'border-red-300' : 'border-gray-300'}`}
                    >
                      <option value="">Select</option>
                      {experienceOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    {errors.experience && <p className="mt-1 text-sm text-red-600">{errors.experience}</p>}
                  </div>
                  {/* Current Company */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Company <span className="text-gray-400">(Optional)</span></label>
                    <input
                      type="text"
                      name="currentCompany"
                      value={formData.currentCompany}
                      onChange={e => setFormData(prev => ({ ...prev, currentCompany: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  {/* Current Designation */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Designation <span className="text-gray-400">(Optional)</span></label>
                    <input
                      type="text"
                      name="currentDesignation"
                      value={formData.currentDesignation}
                      onChange={e => setFormData(prev => ({ ...prev, currentDesignation: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  {/* Expected Salary */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expected Salary (INR) <span className="text-gray-400">(Optional)</span></label>
                    <div className="flex items-center">
                      <input
                        type="number"
                        name="expectedSalary"
                        value={formData.expectedSalary}
                        onChange={e => setFormData(prev => ({ ...prev, expectedSalary: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder=""
                        min="0"
                      />
                      <span className="inline-flex items-center px-3 rounded-r-lg border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">LPA</span>
                    </div>
                  </div>
                  {/* Notice Period */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notice Period <span className="text-gray-400">(Optional)</span></label>
                    <select
                      name="noticePeriod"
                      value={formData.noticePeriod}
                      onChange={e => setFormData(prev => ({ ...prev, noticePeriod: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Select</option>
                      {noticePeriods.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              {/* Section 3: Resume Upload */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Resume/CV Upload</h2>
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4 bg-gray-50">
                  {!formData.resume ? (
                    <>
                      <CloudArrowUpIcon className="h-10 w-10 text-primary-400 mb-2" />
                      <p className="text-gray-700 mb-2">Drag & drop your resume here or</p>
                      <label className="px-4 py-2 bg-primary-600 text-white rounded-lg cursor-pointer hover:bg-primary-700">
                        Browse Files
                        <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileChange} />
                      </label>
                      <p className="text-xs text-gray-500 mt-2">Acceptable formats: PDF, DOC, DOCX. Max file size: 5MB.</p>
                      {errors.resume && <p className="mt-1 text-sm text-red-600">{errors.resume}</p>}
                    </>
                  ) : (
                    <div className="flex items-center gap-3">
                      <DocumentTextIcon className="h-8 w-8 text-primary-600" />
                      <span className="text-gray-800 font-medium">{formData.resume.name}</span>
                      <button type="button" onClick={removeFile} className="text-red-600 hover:text-red-800"><XMarkIcon className="h-5 w-5" /></button>
                    </div>
                  )}
                </div>
              </div>
              {/* Section 4: Association & Notes */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Association & Notes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Associated Job */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Link to Job Posting <span className="text-gray-400">(Optional)</span></label>
                    <select
                      name="associatedJob"
                      value={formData.associatedJob}
                      onChange={e => setFormData(prev => ({ ...prev, associatedJob: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Select an existing job opening</option>
                      {jobs.map(job => (
                        <option key={job.id} value={job.id}>{job.title}</option>
                      ))}
                    </select>
                  </div>
                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Recruiter Notes (Internal Only) <span className="text-gray-400">(Optional)</span></label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                      rows={4}
                      placeholder="e.g., Sourced from LinkedIn, Follow-up required next week, Strengths/Weaknesses from initial screen."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
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
                    <span className="flex items-center"><span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>Adding...</span>
                  ) : (
                    'Add Candidate'
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

export default AddCandidatePage; 