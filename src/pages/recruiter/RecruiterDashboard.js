import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  BriefcaseIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

const RecruiterDashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      name: 'Active Jobs',
      value: '12',
      icon: BriefcaseIcon
    },
    {
      name: 'Total Applications',
      value: '45',
      icon: UserGroupIcon
    },
    {
      name: 'Pending Reviews',
      value: '8',
      icon: UserGroupIcon
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Recruiter Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.firstName}!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="card">
              <div className="card-body">
                <div className="flex items-center">
                  <Icon className="h-8 w-8 text-primary-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="btn-primary">
              <PlusIcon className="h-5 w-5 mr-2" />
              Post New Job
            </button>
            <button className="btn-secondary">
              <BriefcaseIcon className="h-5 w-5 mr-2" />
              Manage Jobs
            </button>
            <button className="btn-secondary">
              <UserGroupIcon className="h-5 w-5 mr-2" />
              View Applications
            </button>
            <button className="btn-secondary">
              <BuildingOfficeIcon className="h-5 w-5 mr-2" />
              Company Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard; 