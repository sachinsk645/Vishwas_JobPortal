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
  XMarkIcon,
  PlusIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import BackButton from '../../components/common/BackButton';

const userProfile = {
  name: 'Rahul Sharma',
  email: 'rahul.sharma@email.com',
  phone: '9876543210',
  location: 'Bangalore',
  avatar: 'RS',
};

const resumeFormats = [
  { key: 'standard', label: 'Standard Professional', preview: '/standard.png' },
  { key: 'modern', label: 'Modern', preview: '/modern.png' },
  { key: 'creative', label: 'Creative', preview: '/creative.png' },
];

const ResumeBuilderPage = () => {
  const [form, setForm] = useState({
    name: userProfile.name,
    email: userProfile.email,
    phone: userProfile.phone,
    location: userProfile.location,
    linkedin: '',
    summary: '',
    experience: [],
    education: [],
    skills: [],
    softSkills: [],
    languages: [],
    projects: [],
    certifications: [],
    format: 'standard',
    agree: false,
  });
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const navigate = useNavigate();

  // Handlers for repeatable sections
  const addExperience = () => setForm(prev => ({ ...prev, experience: [...prev.experience, { jobTitle: '', company: '', location: '', start: '', end: '', present: false, responsibilities: '' }] }));
  const removeExperience = idx => setForm(prev => ({ ...prev, experience: prev.experience.filter((_, i) => i !== idx) }));
  const updateExperience = (idx, field, value) => setForm(prev => ({ ...prev, experience: prev.experience.map((exp, i) => i === idx ? { ...exp, [field]: value } : exp) }));

  const addEducation = () => setForm(prev => ({ ...prev, education: [...prev.education, { degree: '', institution: '', location: '', year: '', gpa: '' }] }));
  const removeEducation = idx => setForm(prev => ({ ...prev, education: prev.education.filter((_, i) => i !== idx) }));
  const updateEducation = (idx, field, value) => setForm(prev => ({ ...prev, education: prev.education.map((edu, i) => i === idx ? { ...edu, [field]: value } : edu) }));

  const addProject = () => setForm(prev => ({ ...prev, projects: [...prev.projects, { title: '', role: '', duration: '', url: '', description: '', technologies: [] }] }));
  const removeProject = idx => setForm(prev => ({ ...prev, projects: prev.projects.filter((_, i) => i !== idx) }));
  const updateProject = (idx, field, value) => setForm(prev => ({ ...prev, projects: prev.projects.map((proj, i) => i === idx ? { ...proj, [field]: value } : proj) }));

  const addCertification = () => setForm(prev => ({ ...prev, certifications: [...prev.certifications, { name: '', org: '', date: '' }] }));
  const removeCertification = idx => setForm(prev => ({ ...prev, certifications: prev.certifications.filter((_, i) => i !== idx) }));
  const updateCertification = (idx, field, value) => setForm(prev => ({ ...prev, certifications: prev.certifications.map((cert, i) => i === idx ? { ...cert, [field]: value } : cert) }));

  // Tag input handlers
  const addTag = (field, value) => {
    if (value && !form[field].includes(value)) setForm(prev => ({ ...prev, [field]: [...prev[field], value] }));
  };
  const removeTag = (field, value) => setForm(prev => ({ ...prev, [field]: prev[field].filter(tag => tag !== value) }));

  // Validation
  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Full name is required.';
    if (!form.email.trim()) newErrors.email = 'Email is required.';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) newErrors.email = 'Invalid email format.';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required.';
    if (!form.location.trim()) newErrors.location = 'Current location is required.';
    if (!form.agree) newErrors.agree = 'You must agree to the terms.';
    return newErrors;
  };

  // Submission
  const handleSubmit = e => {
    e.preventDefault();
    setGeneralError('');
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    // Go to payment page (mock)
    navigate('/applicant/resume/payment');
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
          <Link to="/applicant/applications" className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
            <DocumentTextIcon className="h-5 w-5 mr-3" /> My Applications
          </Link>
          <Link to="/applicant/saved" className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
            <StarIcon className="h-5 w-5 mr-3" /> Saved Jobs
          </Link>
          <Link to="/applicant/interviews" className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
            <CalendarIcon className="h-5 w-5 mr-3" /> My Interviews
          </Link>
          <Link to="/applicant/profile" className="flex items-center px-4 py-2 rounded-lg font-medium text-primary-700 bg-primary-100">
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
            <div className="w-10 h-10 rounded-full bg-primary-200 flex items-center justify-center font-bold text-primary-700">{userProfile.avatar}</div>
          </div>
        </div>
        {/* Page Title & Pricing */}
        <div className="max-w-3xl mx-auto px-4 py-8 w-full flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Resume with AI</h1>
            <nav className="mb-2" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-4">
                <li>
                  <Link to="/applicant/profile" className="text-gray-500 hover:text-gray-700">My Profile</Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <span className="ml-4 text-gray-900">Create Resume with AI</span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-6 py-3 font-bold text-lg text-primary-700 shadow-sm">
            <CurrencyDollarIcon className="h-6 w-6 text-primary-500 mr-1" /> ₹50 per resume
          </div>
        </div>
        {/* General Error Banner */}
        {generalError && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between max-w-3xl mx-auto">
            <div className="flex items-center">
              <XMarkIcon className="h-5 w-5 text-red-400" />
              <span className="ml-3 text-red-700 font-medium">{generalError}</span>
            </div>
            <button onClick={() => setGeneralError('')} className="text-red-700 hover:text-red-900"><XMarkIcon className="h-5 w-5" /></button>
          </div>
        )}
        {/* Resume Builder Form */}
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-10 mb-24">
          {/* Section 1: Personal Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Rahul Sharma"
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile URL <span className="text-gray-400">(Optional)</span></label>
                <input
                  type="url"
                  value={form.linkedin}
                  onChange={e => setForm(prev => ({ ...prev, linkedin: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary/Objective <span className="text-gray-400">(Optional)</span></label>
                <textarea
                  value={form.summary}
                  onChange={e => setForm(prev => ({ ...prev, summary: e.target.value }))}
                  rows={3}
                  placeholder="A brief overview of your career goals and key achievements."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
          {/* Section 2: Work Experience */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Work Experience</h3>
              <button type="button" onClick={addExperience} className="flex items-center gap-1 px-3 py-1 border border-primary-300 text-primary-700 bg-primary-50 rounded hover:bg-primary-100"><PlusIcon className="h-4 w-4" /> Add Experience</button>
            </div>
            <div className="space-y-6">
              {form.experience.map((exp, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4 relative bg-gray-50">
                  <button type="button" onClick={() => removeExperience(idx)} className="absolute top-2 right-2 text-red-500 hover:text-red-700"><XMarkIcon className="h-5 w-5" /></button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                      <input type="text" value={exp.jobTitle} onChange={e => updateExperience(idx, 'jobTitle', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                      <input type="text" value={exp.company} onChange={e => updateExperience(idx, 'company', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location (City/Country)</label>
                      <input type="text" value={exp.location} onChange={e => updateExperience(idx, 'location', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div className="flex gap-2 items-end">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                        <input type="month" value={exp.start} onChange={e => updateExperience(idx, 'start', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                        <input type="month" value={exp.end} onChange={e => updateExperience(idx, 'end', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" disabled={exp.present} />
                      </div>
                      <label className="flex items-center gap-1 mb-1">
                        <input type="checkbox" checked={exp.present} onChange={e => updateExperience(idx, 'present', e.target.checked)} /> Present
                      </label>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Key Responsibilities/Achievements</label>
                      <textarea value={exp.responsibilities} onChange={e => updateExperience(idx, 'responsibilities', e.target.value)} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Use bullet points for clarity." />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Section 3: Education */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Education</h3>
              <button type="button" onClick={addEducation} className="flex items-center gap-1 px-3 py-1 border border-primary-300 text-primary-700 bg-primary-50 rounded hover:bg-primary-100"><PlusIcon className="h-4 w-4" /> Add Education</button>
            </div>
            <div className="space-y-6">
              {form.education.map((edu, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4 relative bg-gray-50">
                  <button type="button" onClick={() => removeEducation(idx)} className="absolute top-2 right-2 text-red-500 hover:text-red-700"><XMarkIcon className="h-5 w-5" /></button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Degree/Qualification</label>
                      <input type="text" value={edu.degree} onChange={e => updateEducation(idx, 'degree', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="e.g., B.Tech in Computer Science" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">University/Institution</label>
                      <input type="text" value={edu.institution} onChange={e => updateEducation(idx, 'institution', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input type="text" value={edu.location} onChange={e => updateEducation(idx, 'location', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Year</label>
                      <input type="number" value={edu.year} onChange={e => updateEducation(idx, 'year', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="e.g., 2023" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">GPA/Percentage <span className="text-gray-400">(Optional)</span></label>
                      <input type="text" value={edu.gpa} onChange={e => updateEducation(idx, 'gpa', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Section 4: Skills */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Technical Skills */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Technical Skills</label>
                <TagInput
                  value={form.skills}
                  onAdd={val => addTag('skills', val)}
                  onRemove={val => removeTag('skills', val)}
                  placeholder="e.g., Python, SQL, React, AWS"
                />
              </div>
              {/* Soft Skills */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Soft Skills</label>
                <TagInput
                  value={form.softSkills}
                  onAdd={val => addTag('softSkills', val)}
                  onRemove={val => removeTag('softSkills', val)}
                  placeholder="e.g., Communication, Leadership, Teamwork"
                />
              </div>
              {/* Languages */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Languages</label>
                <TagInput
                  value={form.languages}
                  onAdd={val => addTag('languages', val)}
                  onRemove={val => removeTag('languages', val)}
                  placeholder="e.g., Hindi, English, Kannada"
                />
              </div>
            </div>
          </div>
          {/* Section 5: Projects / Portfolio */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Projects / Portfolio <span className="text-gray-400">(Optional)</span></h3>
              <button type="button" onClick={addProject} className="flex items-center gap-1 px-3 py-1 border border-primary-300 text-primary-700 bg-primary-50 rounded hover:bg-primary-100"><PlusIcon className="h-4 w-4" /> Add Project</button>
            </div>
            <div className="space-y-6">
              {form.projects.map((proj, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4 relative bg-gray-50">
                  <button type="button" onClick={() => removeProject(idx)} className="absolute top-2 right-2 text-red-500 hover:text-red-700"><XMarkIcon className="h-5 w-5" /></button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                      <input type="text" value={proj.title} onChange={e => updateProject(idx, 'title', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                      <input type="text" value={proj.role} onChange={e => updateProject(idx, 'role', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                      <input type="text" value={proj.duration} onChange={e => updateProject(idx, 'duration', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="e.g., Jan 2023 - Mar 2023" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Project URL <span className="text-gray-400">(Optional)</span></label>
                      <input type="url" value={proj.url} onChange={e => updateProject(idx, 'url', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea value={proj.description} onChange={e => updateProject(idx, 'description', e.target.value)} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Use bullet points for key contributions." />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Technologies Used <span className="text-gray-400">(Optional)</span></label>
                      <TagInput
                        value={proj.technologies || []}
                        onAdd={val => updateProject(idx, 'technologies', [...(proj.technologies || []), val])}
                        onRemove={val => updateProject(idx, 'technologies', (proj.technologies || []).filter(t => t !== val))}
                        placeholder="e.g., React, Node.js, AWS"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Section 6: Certifications / Awards */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Certifications / Awards <span className="text-gray-400">(Optional)</span></h3>
              <button type="button" onClick={addCertification} className="flex items-center gap-1 px-3 py-1 border border-primary-300 text-primary-700 bg-primary-50 rounded hover:bg-primary-100"><PlusIcon className="h-4 w-4" /> Add Certification/Award</button>
            </div>
            <div className="space-y-6">
              {form.certifications.map((cert, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4 relative bg-gray-50">
                  <button type="button" onClick={() => removeCertification(idx)} className="absolute top-2 right-2 text-red-500 hover:text-red-700"><XMarkIcon className="h-5 w-5" /></button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input type="text" value={cert.name} onChange={e => updateCertification(idx, 'name', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Issuing Organization</label>
                      <input type="text" value={cert.org} onChange={e => updateCertification(idx, 'org', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date Issued/Received</label>
                      <input type="month" value={cert.date} onChange={e => updateCertification(idx, 'date', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Section 7: Resume Format & Generation */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Resume Format</h3>
            <div className="flex flex-wrap gap-6 mb-4">
              {resumeFormats.map(fmt => (
                <label key={fmt.key} className={`flex flex-col items-center border-2 rounded-lg px-6 py-4 cursor-pointer transition-all ${form.format === fmt.key ? 'border-primary-600 bg-primary-50' : 'border-gray-200 bg-white'}`}>
                  <input
                    type="radio"
                    name="resumeFormat"
                    value={fmt.key}
                    checked={form.format === fmt.key}
                    onChange={() => setForm(prev => ({ ...prev, format: fmt.key }))}
                    className="mb-2"
                  />
                  <span className="font-medium text-gray-800 mb-2">{fmt.label}</span>
                  <div className="w-24 h-16 bg-gray-100 border border-gray-300 rounded flex items-center justify-center text-xs text-gray-400">Preview</div>
                </label>
              ))}
            </div>
            <label className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={form.agree}
                onChange={e => setForm(prev => ({ ...prev, agree: e.target.checked }))}
              />
              <span>I agree to the <Link to="/terms" className="underline text-primary-600">terms and conditions</Link> for AI resume generation.</span>
            </label>
            {errors.agree && <p className="mt-1 text-sm text-red-600">{errors.agree}</p>}
          </div>
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
              Create Resume
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

// Simple TagInput component for skills/languages
function TagInput({ value, onAdd, onRemove, placeholder }) {
  const [input, setInput] = useState('');
  return (
    <div className="flex flex-wrap gap-2 items-center border border-gray-300 rounded-lg px-2 py-1 bg-white">
      {value.map(tag => (
        <span key={tag} className="flex items-center bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-sm">
          {tag}
          <button type="button" className="ml-1 text-primary-700 hover:text-red-600" onClick={() => onRemove(tag)}><XMarkIcon className="h-4 w-4" /></button>
        </span>
      ))}
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => {
          if ((e.key === 'Enter' || e.key === ',') && input.trim()) {
            e.preventDefault();
            onAdd(input.trim());
            setInput('');
          }
        }}
        placeholder={placeholder}
        className="flex-1 min-w-[120px] border-none focus:ring-0 bg-transparent py-1 px-2 text-sm"
      />
    </div>
  );
}

export default ResumeBuilderPage; 