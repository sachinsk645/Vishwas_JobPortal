import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (value) => {
    if (!value) return 'Email is required.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) return 'Invalid email format.';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const err = validateEmail(email);
    if (err) {
      setError(err);
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      if (email === 'notfound@email.com') {
        setError('Email address not found. Please try again or create a new account.');
      } else {
        setSuccess('Password reset link sent to your email address! Please check your inbox (and spam folder).');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 relative">
      {/* Logo */}
      <div className="flex flex-col items-center mb-8">
        <div className="bg-primary-600 rounded-full p-3 mb-2">
          <span className="text-white font-bold text-2xl">V</span>
        </div>
        <span className="font-bold text-xl text-primary-700">VishwasJobPortal</span>
      </div>
      {/* Success/Error Banner */}
      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between max-w-md w-full">
          <span className="text-green-700 font-medium">{success}</span>
          <button onClick={() => setSuccess('')} className="text-green-700 hover:text-green-900 ml-4">✕</button>
        </div>
      )}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between max-w-md w-full">
          <span className="text-red-700 font-medium">{error}</span>
          <button onClick={() => setError('')} className="text-red-700 hover:text-red-900 ml-4">✕</button>
        </div>
      )}
      {/* Card Container */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 w-full max-w-md flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Forgot your password?</h1>
        <p className="text-gray-600 mb-6 text-center">Enter your registered email address below to receive a password reset link.</p>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="flex flex-col w-full">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">
              Email address <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your registered email"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${error ? 'border-red-300' : 'border-gray-300'}`}
              disabled={loading}
            />
            {error && <span className="mt-1 text-sm text-red-600">{error}</span>}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <span className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span> : null}
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        <button
          type="button"
          className="mt-6 text-primary-600 hover:underline text-sm"
          onClick={() => navigate('/login')}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordPage; 