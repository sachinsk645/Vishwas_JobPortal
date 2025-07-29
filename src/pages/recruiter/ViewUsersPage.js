import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  UserGroupIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  PencilIcon,
  KeyIcon,
  XCircleIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import BackButton from '../../components/common/BackButton';

const ViewUsersPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [statusFilter, setStatusFilter] = useState('All Status');

  // Mock data for demonstration
  const users = [
    {
      id: 1,
      userId: 'U-2024-1001',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      role: 'Recruiter Admin',
      status: 'Active',
      lastLoginDate: '2024-01-15',
      lastLoginTime: '10:30 AM',
      department: 'Engineering',
      registrationDate: '2024-01-01'
    },
    {
      id: 2,
      userId: 'U-2024-1002',
      name: 'Mike Chen',
      email: 'mike.chen@company.com',
      role: 'Recruiter User',
      status: 'Active',
      lastLoginDate: '2024-01-14',
      lastLoginTime: '2:15 PM',
      department: 'Marketing',
      registrationDate: '2024-01-05'
    },
    {
      id: 3,
      userId: 'U-2024-1003',
      name: 'Lisa Wilson',
      email: 'lisa.wilson@company.com',
      role: 'Recruiter User',
      status: 'Inactive',
      lastLoginDate: '2024-01-10',
      lastLoginTime: '9:45 AM',
      department: 'Design',
      registrationDate: '2024-01-08'
    },
    {
      id: 4,
      userId: 'U-2024-1004',
      name: 'David Brown',
      email: 'david.brown@company.com',
      role: 'Recruiter User',
      status: 'Pending Invitation',
      lastLoginDate: '',
      lastLoginTime: '',
      department: 'Analytics',
      registrationDate: '2024-01-12'
    }
  ];

  const filteredUsers = users.filter(user => {
    const keyword = searchQuery.toLowerCase();
    const actions = ['edit', 'reset', 'activate', 'deactivate', 'delete'];
    const matchesSearch =
      user.userId.toLowerCase().includes(keyword) ||
      user.name.toLowerCase().includes(keyword) ||
      user.email.toLowerCase().includes(keyword) ||
      user.role.toLowerCase().includes(keyword) ||
      user.status.toLowerCase().includes(keyword) ||
      user.department.toLowerCase().includes(keyword) ||
      (user.lastLoginDate && user.lastLoginTime && `${user.lastLoginDate} ${user.lastLoginTime}`.toLowerCase().includes(keyword)) ||
      actions.some(action => action.includes(keyword));
    const matchesRole = roleFilter === 'All Roles' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'All Status' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      case 'Pending Invitation':
        return 'bg-yellow-100 text-yellow-800';
      case 'Suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Recruiter Admin':
        return 'bg-purple-100 text-purple-800';
      case 'Recruiter User':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEditUser = (userId) => {
    // Navigate to edit user page
    navigate(`/recruiter-admin/edit-user/${userId}`);
  };

  const handleResetPassword = (userId) => {
    // Show confirmation dialog
    if (window.confirm('Are you sure you want to reset the password for this user?')) {
      alert('Password reset email has been sent to the user.');
    }
  };

  const handleToggleStatus = (userId, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    const action = newStatus === 'Active' ? 'activate' : 'deactivate';
    
    if (window.confirm(`Are you sure you want to ${action} this user?`)) {
      alert(`User has been ${action}d successfully.`);
    }
  };

  const handleDeleteUser = (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete ${userName}? This action cannot be undone.`)) {
      alert('User has been deleted successfully.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center">
            <BackButton className="mr-4" />
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">VishwasJobPortal</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumbs */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/recruiter-admin" className="text-gray-700 hover:text-primary-600">
                Dashboard
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-500">Manage Team Members</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Team Members</h1>
            <p className="mt-2 text-gray-600">View and manage all users in your recruitment team.</p>
          </div>
          <button
            onClick={() => navigate('/recruiter-admin/add-user')}
            className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add User
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <UserGroupIcon className="h-8 w-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Total Users</p>
                <p className="text-lg font-semibold text-gray-900">{users.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <CheckCircleIcon className="h-8 w-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Active Users</p>
                <p className="text-lg font-semibold text-gray-900">
                  {users.filter(u => u.status === 'Active').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="h-8 w-8 text-yellow-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Pending Invitations</p>
                <p className="text-lg font-semibold text-gray-900">
                  {users.filter(u => u.status === 'Pending Invitation').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <XCircleIcon className="h-8 w-8 text-red-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Inactive Users</p>
                <p className="text-lg font-semibold text-gray-900">
                  {users.filter(u => u.status === 'Inactive').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option>All Roles</option>
              <option>Recruiter Admin</option>
              <option>Recruiter User</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>Pending Invitation</option>
              <option>Suspended</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <UserGroupIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchQuery || roleFilter !== 'All Roles' || statusFilter !== 'All Status'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Get started by creating your first team member.'}
              </p>
              {!searchQuery && roleFilter === 'All Roles' && statusFilter === 'All Status' && (
                <div className="mt-6">
                  <button
                    onClick={() => navigate('/recruiter-admin/add-user')}
                    className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Add User
                  </button>
                </div>
              )}
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200 table-fixed">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 w-28 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Id</th>
                  <th className="px-4 py-3 w-56 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-4 py-3 w-32 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-4 py-3 w-32 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 w-32 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-4 py-3 w-32 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login Date</th>
                  <th className="px-4 py-3 w-32 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login Time</th>
                  <th className="px-4 py-3 w-32 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 break-words text-sm text-gray-700">
                      <div className="flex justify-center items-center h-full w-full">
                        <span className="text-center w-full block" style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{user.userId}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 break-words">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-primary-600 font-medium text-sm">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 break-words">
                        <div className="flex justify-center items-center h-full w-full">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full text-center ${getRoleColor(user.role)}`}
                                style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                            {user.role}
                          </span>
                        </div>
                    </td>
                    <td className="px-4 py-4 break-words">
                        <div className="flex justify-center items-center h-full w-full">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full text-center ${getStatusColor(user.status)}`}
                                style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                            {user.status}
                          </span>
                        </div>
                    </td>
                    <td className="px-4 py-4 break-words">
                      <div className="text-sm text-gray-900">{user.department}</div>
                    </td>
                    <td className="px-4 py-4 break-words text-sm text-gray-900">{user.lastLoginDate || <span className="text-gray-500">Never</span>}</td>
                    <td className="px-4 py-4 break-words text-sm text-gray-900">{user.lastLoginTime || <span className="text-gray-500">Never</span>}</td>
                    <td className="px-4 py-4 break-words text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditUser(user.id)}
                          className="text-primary-600 hover:text-primary-900"
                          title="Edit User"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleResetPassword(user.id)}
                          className="text-primary-600 hover:text-primary-900"
                          title="Reset Password"
                        >
                          <KeyIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleToggleStatus(user.id, user.status)}
                          className={user.status === 'Active' ? 'text-gray-400 hover:text-green-600' : 'text-green-600 hover:text-green-800'}
                          title={user.status === 'Active' ? 'Deactivate User' : 'Activate User'}
                        >
                          {user.status === 'Active' ? <XCircleIcon className="h-5 w-5" /> : <CheckCircleIcon className="h-5 w-5" />}
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id, user.name)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete User"
                        >
                          <UserGroupIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewUsersPage; 