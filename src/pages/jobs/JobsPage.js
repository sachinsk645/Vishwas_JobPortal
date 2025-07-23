import React from 'react';
import PublicNavbar from '../../components/layout/PublicNavbar';

const JobsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Browse Jobs</h1>
            <p className="text-gray-600">Find your next career opportunity</p>
          </div>

          <div className="card">
            <div className="card-body">
              <p className="text-gray-600">Jobs listing will be implemented here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage; 