import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  BriefcaseIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  DocumentTextIcon,
  EyeIcon,
  CheckIcon,
  XMarkIcon,
  PlusIcon,
  TrashIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  ClockIcon,
  GlobeAltIcon,
  HomeIcon,
  ComputerDesktopIcon
} from '@heroicons/react/24/outline';

const PostNewJobPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Job Basics & Overview
    jobTitle: '',
    department: '',
    jobCategory: '',
    jobType: 'Full-time',
    experienceLevel: '',
    numberOfOpenings: 1,
    jobLocation: '',
    workArrangement: 'On-site',
    specificAddress: '',
    applicationDeadline: '',
    
    // Salary & Compensation
    salaryType: 'Annual Salary (INR)',
    minSalary: '',
    maxSalary: '',
    isNegotiable: false,
    benefits: [],
    
    // Job Description & Requirements
    jobDescription: '',
    requiredSkills: [],
    educationalQualifications: '',
    
    // Application Settings
    applicationMethod: 'Apply via VishwasJobPortal',
    externalUrl: '',
    screeningQuestions: [],
    receiveApplicationsTo: [],
    
    // Review & Publish
    jobStatus: 'Draft',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [skillInput, setSkillInput] = useState('');

  // Predefined options
  const departments = ['Engineering', 'Marketing', 'Sales', 'Human Resources', 'Finance', 'Design', 'Product', 'Operations', 'Customer Support', 'Legal', 'Other'];
  const jobCategories = ['IT & Software', 'Marketing & Communications', 'Healthcare', 'Finance', 'Education', 'Manufacturing', 'Retail', 'Consulting', 'Media & Entertainment', 'Real Estate', 'Transportation', 'Other'];
  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'];
  const experienceLevels = ['Entry Level', 'Junior', 'Mid-Level', 'Senior', 'Lead', 'Manager', 'Director', 'Executive'];
  const workArrangements = ['On-site', 'Remote (Work from Home)', 'Hybrid'];
  const salaryTypes = ['Annual Salary (INR)', 'Hourly Rate (INR)', 'Not Disclosed'];
  const commonBenefits = ['PF', 'Gratuity', 'Health Insurance', 'Paid Time Off', 'Flexible Hours', 'Performance Bonus', 'Relocation Assistance', 'Transport Allowance', 'Meal Vouchers', 'Stock Options', 'Learning & Development', 'Gym Membership'];
  const commonSkills = ['Java', 'Python', 'JavaScript', 'React', 'Node.js', 'Angular', 'Vue.js', 'SQL', 'MongoDB', 'AWS', 'Azure', 'Docker', 'Kubernetes', 'Git', 'Agile', 'Scrum', 'Data Analysis', 'Machine Learning', 'UI/UX Design', 'Project Management'];
  const educationalOptions = ['Any Graduate', 'B.E./B.Tech', 'B.Sc', 'B.Com', 'BBA', 'MBA', 'M.Tech', 'MCA', 'M.Sc', 'Ph.D', 'Diploma', 'Other'];

  // Mock recruiter users for the company
  const recruiterUsers = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah@company.com' },
    { id: 2, name: 'Mike Chen', email: 'mike@company.com' },
    { id: 3, name: 'Lisa Wilson', email: 'lisa@company.com' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSkillAdd = () => {
    if (skillInput.trim() && !formData.requiredSkills.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        requiredSkills: [...prev.requiredSkills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      requiredSkills: prev.requiredSkills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleBenefitToggle = (benefit) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.includes(benefit)
        ? prev.benefits.filter(b => b !== benefit)
        : [...prev.benefits, benefit]
    }));
  };

  const addScreeningQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      type: 'Text Answer',
      question: '',
      required: false,
      options: []
    };
    setFormData(prev => ({
      ...prev,
      screeningQuestions: [...prev.screeningQuestions, newQuestion]
    }));
  };

  const updateScreeningQuestion = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      screeningQuestions: prev.screeningQuestions.map(q =>
        q.id === id ? { ...q, [field]: value } : q
      )
    }));
  };

  const removeScreeningQuestion = (id) => {
    setFormData(prev => ({
      ...prev,
      screeningQuestions: prev.screeningQuestions.filter(q => q.id !== id)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Job title is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.jobCategory) newErrors.jobCategory = 'Job category is required';
    if (!formData.experienceLevel) newErrors.experienceLevel = 'Experience level is required';
    if (!formData.jobLocation.trim()) newErrors.jobLocation = 'Job location is required';
    if (!formData.jobDescription.trim()) newErrors.jobDescription = 'Job description is required';
    if (formData.requiredSkills.length < 3) newErrors.requiredSkills = 'At least 3 skills are required';
    if (!formData.educationalQualifications) newErrors.educationalQualifications = 'Educational qualifications are required';

    // Salary validation
    if (formData.salaryType !== 'Not Disclosed') {
      if (!formData.minSalary) newErrors.minSalary = 'Minimum salary is required';
      if (!formData.maxSalary) newErrors.maxSalary = 'Maximum salary is required';
      if (formData.minSalary && formData.maxSalary && parseFloat(formData.minSalary) > parseFloat(formData.maxSalary)) {
        newErrors.maxSalary = 'Maximum salary must be greater than minimum salary';
      }
    }

    // External URL validation
    if (formData.applicationMethod === 'Redirect to External Website' && !formData.externalUrl.trim()) {
      newErrors.externalUrl = 'External URL is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success - redirect to job postings
      navigate('/recruiter-admin', { 
        state: { 
          message: `Job "${formData.jobTitle}" ${formData.jobStatus === 'Published' ? 'published' : 'saved'} successfully!` 
        } 
      });
    } catch (error) {
      setErrors({ submit: 'Failed to save job posting. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    setFormData(prev => ({ ...prev, jobStatus: 'Draft' }));
    await handleSubmit({ preventDefault: () => {} });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/recruiter-admin" className="flex items-center text-gray-500 hover:text-gray-700">
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Back to Dashboard
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">Post New Job</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
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
                  <Link to="/recruiter-admin" className="ml-4 text-gray-500 hover:text-gray-700">
                    Job Postings
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                  <span className="ml-4 text-gray-900">Post New Job</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* 1. Job Basics & Overview */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <BriefcaseIcon className="h-5 w-5 mr-2 text-primary-600" />
              Job Basics & Overview
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Job Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  placeholder="e.g., Senior Software Engineer, Marketing Manager"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.jobTitle ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.jobTitle && <p className="mt-1 text-sm text-red-600">{errors.jobTitle}</p>}
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department/Team *
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.department ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department}</p>}
              </div>

              {/* Job Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Category/Industry *
                </label>
                <select
                  name="jobCategory"
                  value={formData.jobCategory}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.jobCategory ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Category</option>
                  {jobCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {errors.jobCategory && <p className="mt-1 text-sm text-red-600">{errors.jobCategory}</p>}
              </div>

              {/* Job Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Type *
                </label>
                <div className="space-y-2">
                  {jobTypes.map(type => (
                    <label key={type} className="flex items-center">
                      <input
                        type="radio"
                        name="jobType"
                        value={type}
                        checked={formData.jobType === type}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Experience Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Level *
                </label>
                <select
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.experienceLevel ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Experience Level</option>
                  {experienceLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
                {errors.experienceLevel && <p className="mt-1 text-sm text-red-600">{errors.experienceLevel}</p>}
              </div>

              {/* Number of Openings */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Openings *
                </label>
                <input
                  type="number"
                  name="numberOfOpenings"
                  value={formData.numberOfOpenings}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {/* Job Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Location *
                </label>
                <input
                  type="text"
                  name="jobLocation"
                  value={formData.jobLocation}
                  onChange={handleInputChange}
                  placeholder="e.g., Bengaluru, Mumbai, Delhi-NCR"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.jobLocation ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.jobLocation && <p className="mt-1 text-sm text-red-600">{errors.jobLocation}</p>}
              </div>

              {/* Work Arrangement */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Work Arrangement *
                </label>
                <div className="space-y-2">
                  {workArrangements.map(arrangement => (
                    <label key={arrangement} className="flex items-center">
                      <input
                        type="radio"
                        name="workArrangement"
                        value={arrangement}
                        checked={formData.workArrangement === arrangement}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">{arrangement}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Specific Address */}
              {formData.workArrangement === 'On-site' && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specific Address (Optional)
                  </label>
                  <input
                    type="text"
                    name="specificAddress"
                    value={formData.specificAddress}
                    onChange={handleInputChange}
                    placeholder="Enter office address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              )}

              {/* Application Deadline */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Application Deadline (Optional)
                </label>
                <input
                  type="date"
                  name="applicationDeadline"
                  value={formData.applicationDeadline}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>

          {/* 2. Salary & Compensation */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <CurrencyDollarIcon className="h-5 w-5 mr-2 text-primary-600" />
              Salary & Compensation
            </h2>
            
            <div className="space-y-6">
              {/* Salary Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salary Type *
                </label>
                <div className="space-y-2">
                  {salaryTypes.map(type => (
                    <label key={type} className="flex items-center">
                      <input
                        type="radio"
                        name="salaryType"
                        value={type}
                        checked={formData.salaryType === type}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Salary Range */}
              {formData.salaryType !== 'Not Disclosed' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum {formData.salaryType.includes('Annual') ? 'Salary' : 'Rate'} (INR) *
                    </label>
                    <input
                      type="number"
                      name="minSalary"
                      value={formData.minSalary}
                      onChange={handleInputChange}
                      placeholder="e.g., 500000"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        errors.minSalary ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.minSalary && <p className="mt-1 text-sm text-red-600">{errors.minSalary}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Maximum {formData.salaryType.includes('Annual') ? 'Salary' : 'Rate'} (INR) *
                    </label>
                    <input
                      type="number"
                      name="maxSalary"
                      value={formData.maxSalary}
                      onChange={handleInputChange}
                      placeholder="e.g., 800000"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        errors.maxSalary ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.maxSalary && <p className="mt-1 text-sm text-red-600">{errors.maxSalary}</p>}
                  </div>
                </div>
              )}

              {/* Negotiable */}
              {formData.salaryType !== 'Not Disclosed' && (
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="isNegotiable"
                      checked={formData.isNegotiable}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Salary is negotiable</span>
                  </label>
                </div>
              )}

              {/* Benefits & Perks */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Benefits & Perks
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {commonBenefits.map(benefit => (
                    <label key={benefit} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.benefits.includes(benefit)}
                        onChange={() => handleBenefitToggle(benefit)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{benefit}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 3. Job Description & Requirements */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <DocumentTextIcon className="h-5 w-5 mr-2 text-primary-600" />
              Job Description & Requirements
            </h2>
            
            <div className="space-y-6">
              {/* Job Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Description *
                </label>
                <textarea
                  name="jobDescription"
                  value={formData.jobDescription}
                  onChange={handleInputChange}
                  rows="8"
                  placeholder="Describe the role, responsibilities, and what you're looking for..."
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.jobDescription ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.jobDescription && <p className="mt-1 text-sm text-red-600">{errors.jobDescription}</p>}
                <p className="mt-1 text-sm text-gray-500">
                  Include: About the Role, Key Responsibilities, What We're Looking For
                </p>
              </div>

              {/* Required Skills */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Required Skills *
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleSkillAdd())}
                    placeholder="Type a skill and press Enter"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <button
                    type="button"
                    onClick={handleSkillAdd}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                  >
                    Add
                  </button>
                </div>
                
                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.requiredSkills.map(skill => (
                    <span key={skill} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800">
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleSkillRemove(skill)}
                        className="ml-2 text-primary-600 hover:text-primary-800"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    </span>
                  ))}
                </div>
                
                {/* Skill Suggestions */}
                <div className="text-sm text-gray-500">
                  <p>Suggestions: {commonSkills.slice(0, 8).join(', ')}...</p>
                </div>
                {errors.requiredSkills && <p className="mt-1 text-sm text-red-600">{errors.requiredSkills}</p>}
              </div>

              {/* Educational Qualifications */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Educational Qualifications *
                </label>
                <select
                  name="educationalQualifications"
                  value={formData.educationalQualifications}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.educationalQualifications ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Qualification</option>
                  {educationalOptions.map(qual => (
                    <option key={qual} value={qual}>{qual}</option>
                  ))}
                </select>
                {errors.educationalQualifications && <p className="mt-1 text-sm text-red-600">{errors.educationalQualifications}</p>}
              </div>
            </div>
          </div>

          {/* 4. Application Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <UserGroupIcon className="h-5 w-5 mr-2 text-primary-600" />
              Application Settings
            </h2>
            
            <div className="space-y-6">
              {/* Application Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Application Method
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="applicationMethod"
                      value="Apply via VishwasJobPortal"
                      checked={formData.applicationMethod === 'Apply via VishwasJobPortal'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Apply via VishwasJobPortal (Default)</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="applicationMethod"
                      value="Redirect to External Website"
                      checked={formData.applicationMethod === 'Redirect to External Website'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Redirect to External Website</span>
                  </label>
                </div>
              </div>

              {/* External URL */}
              {formData.applicationMethod === 'Redirect to External Website' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    External Website URL *
                  </label>
                  <input
                    type="url"
                    name="externalUrl"
                    value={formData.externalUrl}
                    onChange={handleInputChange}
                    placeholder="https://your-company.com/careers"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      errors.externalUrl ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.externalUrl && <p className="mt-1 text-sm text-red-600">{errors.externalUrl}</p>}
                </div>
              )}

              {/* Screening Questions */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Screening Questions (Optional)
                  </label>
                  <button
                    type="button"
                    onClick={addScreeningQuestion}
                    className="flex items-center px-3 py-1 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                  >
                    <PlusIcon className="h-4 w-4 mr-1" />
                    Add Question
                  </button>
                </div>
                
                <div className="space-y-4">
                  {formData.screeningQuestions.map((question, index) => (
                    <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-700">Question {index + 1}</span>
                        <button
                          type="button"
                          onClick={() => removeScreeningQuestion(question.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">Question Type</label>
                          <select
                            value={question.type}
                            onChange={(e) => updateScreeningQuestion(question.id, 'type', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          >
                            <option value="Text Answer">Text Answer</option>
                            <option value="Yes/No">Yes/No</option>
                            <option value="Multiple Choice">Multiple Choice</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">Required</label>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={question.required}
                              onChange={(e) => updateScreeningQuestion(question.id, 'required', e.target.checked)}
                              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-700">Make this question mandatory</span>
                          </label>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <label className="block text-sm text-gray-700 mb-1">Question Text</label>
                        <input
                          type="text"
                          value={question.question}
                          onChange={(e) => updateScreeningQuestion(question.id, 'question', e.target.value)}
                          placeholder="Enter your question here..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Receive Applications To */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Receive Applications to
                </label>
                <div className="space-y-2">
                  {recruiterUsers.map(user => (
                    <label key={user.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.receiveApplicationsTo.includes(user.id)}
                        onChange={(e) => {
                          const userId = user.id;
                          setFormData(prev => ({
                            ...prev,
                            receiveApplicationsTo: e.target.checked
                              ? [...prev.receiveApplicationsTo, userId]
                              : prev.receiveApplicationsTo.filter(id => id !== userId)
                          }));
                        }}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{user.name} ({user.email})</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 5. Review & Publish */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <EyeIcon className="h-5 w-5 mr-2 text-primary-600" />
              Review & Publish
            </h2>
            
            <div className="space-y-6">
              {/* Job Post Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Post Status *
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="jobStatus"
                      value="Draft"
                      checked={formData.jobStatus === 'Draft'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Draft - Save without publishing</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="jobStatus"
                      value="Pending Review"
                      checked={formData.jobStatus === 'Pending Review'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Pending Review - Submit for approval</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="jobStatus"
                      value="Published"
                      checked={formData.jobStatus === 'Published'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Published - Make immediately visible</span>
                  </label>
                </div>
              </div>

              {/* Preview Button */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowPreview(true)}
                  className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  <EyeIcon className="h-5 w-5 mr-2" />
                  Preview Job Posting
                </button>
              </div>

              {/* Terms Agreement */}
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    I agree to VishwasJobPortal's Terms of Service and Posting Guidelines
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex">
                <XMarkIcon className="h-5 w-5 text-red-400" />
                <p className="ml-3 text-sm text-red-600">{errors.submit}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/recruiter-admin')}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleSaveDraft}
                disabled={isSubmitting}
                className="px-6 py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors disabled:opacity-50"
              >
                Save as Draft
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting || !formData.agreeToTerms}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {formData.jobStatus === 'Published' ? 'Publishing...' : 'Saving...'}
                  </>
                ) : (
                  <>
                    <CheckIcon className="h-4 w-4 mr-2" />
                    {formData.jobStatus === 'Published' ? 'Post Job' : 'Save Job'}
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Job Preview</h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{formData.jobTitle || 'Job Title'}</h1>
                  <p className="text-gray-600 mt-2">{formData.department} • {formData.jobLocation}</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Job Type</p>
                    <p className="font-medium">{formData.jobType}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Experience</p>
                    <p className="font-medium">{formData.experienceLevel}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Work Mode</p>
                    <p className="font-medium">{formData.workArrangement}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Openings</p>
                    <p className="font-medium">{formData.numberOfOpenings}</p>
                  </div>
                </div>
                
                {formData.salaryType !== 'Not Disclosed' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Salary</h3>
                    <p className="text-gray-700">
                      ₹{formData.minSalary} - ₹{formData.maxSalary} {formData.salaryType}
                      {formData.isNegotiable && ' (Negotiable)'}
                    </p>
                  </div>
                )}
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Job Description</h3>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 whitespace-pre-wrap">{formData.jobDescription || 'Job description will appear here...'}</p>
                  </div>
                </div>
                
                {formData.requiredSkills.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {formData.requiredSkills.map(skill => (
                        <span key={skill} className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostNewJobPage; 