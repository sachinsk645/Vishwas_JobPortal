import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600">Manage your account settings</p>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
              <p className="text-sm text-gray-600">Name: {user?.firstName} {user?.lastName}</p>
              <p className="text-sm text-gray-600">Email: {user?.email}</p>
              <p className="text-sm text-gray-600">Role: {user?.role}</p>
            </div>
            <p className="text-gray-600">Profile management will be implemented here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 