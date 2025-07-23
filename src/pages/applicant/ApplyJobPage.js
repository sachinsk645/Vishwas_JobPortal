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
  DocumentTextIcon,
  PlusIcon,
  CloudArrowUpIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import BackButton from '../../components/common/BackButton';

// Mock job, user, and screening questions
const job = {
  id: 1,
  title: 'Frontend Developer',
  company: 'TechCorp India',
  location: 'Bangalore',
  screeningQuestions: [
    { id: 1, type: 'Text Answer', question: 'How many years of experience do you have with React?', required: true },
    { id: 2, type: 'Yes/No', question: 'Are you authorized to work in India?', required: true },
    { id: 3, type: 'Multiple Choice', question: 'Which of the following frameworks are you proficient in?', required: false, options: ['React', 'Angular', 'Vue', 'Svelte'] }
  ]
};
const userProfile = {
  name: 'Rahul Sharma',
  email: 'rahul.sharma@email.com',
  phone: '9876543210',
  location: 'Bangalore',
  resume: 'My_Resume.pdf'
};

const ApplyJobPage = () => {
  const [form, setForm] = useState({
    name: userProfile.name,
    email: userProfile.email,
    phone: userProfile.phone,
    location: userProfile.location,
    resume: null,
    useCurrentResume: true,
    coverLetter: '',
    screening: {},
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [aiModal, setAiModal] = useState(false);
  const navigate = useNavigate();

  // File upload
  const handleResumeChange = (e) => {
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
      setForm(prev => ({ ...prev, resume: file, useCurrentResume: false }));
      setErrors(prev => ({ ...prev, resume: '' }));
    }
  };
  const removeFile = () => setForm(prev => ({ ...prev, resume: null }));

  // Validation
  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Full name is required.';
    if (!form.email.trim()) newErrors.email = 'Email is required.';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) newErrors.email = 'Invalid email format.';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required.';
    if (!form.location.trim()) newErrors.location = 'Current location is required.';
    if (!form.useCurrentResume && !form.resume) newErrors.resume = 'Resume is required.';
    // Screening questions
    job.screeningQuestions.forEach(q => {
      if (q.required && !form.screening[q.id]) newErrors[`screening_${q.id}`] = 'This field is required.';
    });
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
    setTimeout(() => {
      setSuccess(`Your application for ${job.title} has been submitted successfully!`);
      setTimeout(() => navigate('/applicant/applications'), 2000);
    }, 1500);
  };

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
          <Link to="/applicant/jobs" className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
            <BriefcaseIcon className="h-5 w-5 mr-3" /> Search Jobs
          </Link>
          <Link to="/applicant/applications" className="flex items-center px-4 py-2 rounded-lg font-medium text-primary-700 bg-primary-100">
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
        {/* Page Title & AI Resume Button */}
        <div className="max-w-2xl mx-auto px-4 py-8 w-full flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Apply for {job.title}</h1>
            <nav className="mb-2" aria-label="Breadcrumb">
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
                <li>
                  <div className="flex items-center">
                    <ArrowLeftIcon className="h-4 w-4 text-gray-400" />
                    <span className="ml-4 text-gray-900">Apply</span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2 border border-green-400 text-green-700 bg-green-50 rounded-lg font-medium hover:bg-green-100 mt-4 sm:mt-0"
            onClick={() => navigate('/applicant/resume/builder')}
          >
            <PlusIcon className="h-5 w-5" /> Create Resume with AI
          </button>
        </div>
        {/* Success/Error Banner */}
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between max-w-2xl mx-auto">
            <div className="flex items-center">
              <CheckCircleIcon className="h-5 w-5 text-green-400" />
              <span className="ml-3 text-green-700 font-medium">{success}</span>
            </div>
            <button onClick={() => setSuccess('')} className="text-green-700 hover:text-green-900"><XMarkIcon className="h-5 w-5" /></button>
          </div>
        )}
        {generalError && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between max-w-2xl mx-auto">
            <div className="flex items-center">
              <XMarkIcon className="h-5 w-5 text-red-400" />
              <span className="ml-3 text-red-700 font-medium">{generalError}</span>
            </div>
            <button onClick={() => setGeneralError('')} className="text-red-700 hover:text-red-900"><XMarkIcon className="h-5 w-5" /></button>
          </div>
        )}
        {/* Application Form */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-8 mb-24">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title Applied For</label>
                <div className="font-semibold text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{job.title}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <div className="font-semibold text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{job.company}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.name ? 'border-red-300' : 'border-gray-300'}`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.email ? 'border-red-300' : 'border-gray-300'}`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">+91</span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Location <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={form.location}
                  onChange={e => setForm(prev => ({ ...prev, location: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.location ? 'border-red-300' : 'border-gray-300'}`}
                />
                {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
              </div>
            </div>
          </div>
          {/* Resume & Cover Letter */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume & Cover Letter</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload Resume/CV <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-4 mb-2">
                {userProfile.resume && (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={form.useCurrentResume}
                      onChange={() => setForm(prev => ({ ...prev, useCurrentResume: true, resume: null }))}
                    />
                    <span className="text-sm text-gray-700">Use Current: <span className="font-medium">{userProfile.resume}</span></span>
                  </label>
                )}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={!form.useCurrentResume}
                    onChange={() => setForm(prev => ({ ...prev, useCurrentResume: false }))}
                  />
                  <span className="text-sm text-gray-700">Upload New</span>
                </label>
              </div>
              {!form.useCurrentResume && (
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
                  {!form.resume ? (
                    <>
                      <CloudArrowUpIcon className="h-10 w-10 text-primary-400 mb-2" />
                      <p className="text-gray-700 mb-2">Drag & drop your resume here or</p>
                      <label className="px-4 py-2 bg-primary-600 text-white rounded-lg cursor-pointer hover:bg-primary-700">
                        Browse Files
                        <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleResumeChange} />
                      </label>
                      <p className="text-xs text-gray-500 mt-2">Accepted formats: PDF, DOC, DOCX. Max file size: 5MB.</p>
                      {errors.resume && <p className="mt-1 text-sm text-red-600">{errors.resume}</p>}
                    </>
                  ) : (
                    <div className="flex items-center gap-3">
                      <DocumentTextIcon className="h-8 w-8 text-primary-600" />
                      <span className="text-gray-800 font-medium">{form.resume.name}</span>
                      <button type="button" onClick={removeFile} className="text-red-600 hover:text-red-800"><XMarkIcon className="h-5 w-5" /></button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cover Letter (Optional)</label>
              <textarea
                value={form.coverLetter}
                onChange={e => setForm(prev => ({ ...prev, coverLetter: e.target.value }))}
                rows={4}
                placeholder="Introduce yourself and explain why you're a great fit for this role."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          {/* Additional Information / Screening Questions */}
          {job.screeningQuestions.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
              <div className="space-y-6">
                {job.screeningQuestions.map(q => (
                  <div key={q.id}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {q.question} {q.required && <span className="text-red-500">*</span>}
                    </label>
                    {q.type === 'Text Answer' && (
                      <input
                        type="text"
                        value={form.screening[q.id] || ''}
                        onChange={e => setForm(prev => ({ ...prev, screening: { ...prev.screening, [q.id]: e.target.value } }))}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors[`screening_${q.id}`] ? 'border-red-300' : 'border-gray-300'}`}
                      />
                    )}
                    {q.type === 'Yes/No' && (
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            checked={form.screening[q.id] === 'Yes'}
                            onChange={() => setForm(prev => ({ ...prev, screening: { ...prev.screening, [q.id]: 'Yes' } }))}
                          /> Yes
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            checked={form.screening[q.id] === 'No'}
                            onChange={() => setForm(prev => ({ ...prev, screening: { ...prev.screening, [q.id]: 'No' } }))}
                          /> No
                        </label>
                      </div>
                    )}
                    {q.type === 'Multiple Choice' && (
                      <div className="flex flex-wrap gap-4">
                        {q.options.map(opt => (
                          <label key={opt} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={Array.isArray(form.screening[q.id]) && form.screening[q.id].includes(opt)}
                              onChange={e => {
                                setForm(prev => ({
                                  ...prev,
                                  screening: {
                                    ...prev.screening,
                                    [q.id]: e.target.checked
                                      ? [...(prev.screening[q.id] || []), opt]
                                      : (prev.screening[q.id] || []).filter(o => o !== opt)
                                  }
                                }));
                              }}
                            /> {opt}
                          </label>
                        ))}
                      </div>
                    )}
                    {errors[`screening_${q.id}`] && <p className="mt-1 text-sm text-red-600">{errors[`screening_${q.id}`]}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
            >
              Submit Application
            </button>
          </div>
        </form>
        {/* AI Resume Modal (placeholder) */}
        {aiModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-lg">
              <h3 className="text-lg font-bold mb-4">AI Resume Builder (Coming Soon)</h3>
              <p className="mb-6">This feature will help you generate a professional resume using AI. Stay tuned!</p>
              <button onClick={() => setAiModal(false)} className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">Close</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ApplyJobPage; 