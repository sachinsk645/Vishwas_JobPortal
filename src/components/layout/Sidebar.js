import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  XMarkIcon,
  HomeIcon,
  BriefcaseIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  BellIcon,
  ClipboardDocumentListIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

const Sidebar = ({ open, onClose }) => {
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  const getMenuItems = () => {
    const baseItems = [
      {
        name: 'Dashboard',
        href: `/${user?.role}/dashboard`,
        icon: HomeIcon
      }
    ];

    switch (user?.role) {
      case 'admin':
        return [
          ...baseItems,
          {
            name: 'Users',
            href: '/admin/users',
            icon: UserGroupIcon
          },
          {
            name: 'Jobs',
            href: '/admin/jobs',
            icon: BriefcaseIcon
          },
          {
            name: 'Companies',
            href: '/admin/companies',
            icon: BuildingOfficeIcon
          },
          {
            name: 'Reports',
            href: '/admin/reports',
            icon: ChartBarIcon
          }
        ];

      case 'recruiter':
        return [
          ...baseItems,
          {
            name: 'My Jobs',
            href: '/recruiter/jobs',
            icon: BriefcaseIcon
          },
          {
            name: 'Post Job',
            href: '/recruiter/jobs/new',
            icon: PlusIcon
          },
          {
            name: 'Applications',
            href: '/recruiter/applications',
            icon: ClipboardDocumentListIcon
          },
          {
            name: 'Search Candidates',
            href: '/recruiter/candidates',
            icon: MagnifyingGlassIcon
          },
          {
            name: 'Company Profile',
            href: '/recruiter/company',
            icon: BuildingOfficeIcon
          }
        ];

      case 'applicant':
        return [
          ...baseItems,
          {
            name: 'Browse Jobs',
            href: '/applicant/jobs',
            icon: BriefcaseIcon
          },
          {
            name: 'My Applications',
            href: '/applicant/applications',
            icon: ClipboardDocumentListIcon
          },
          {
            name: 'Saved Jobs',
            href: '/applicant/saved',
            icon: EyeIcon
          },
          {
            name: 'Notifications',
            href: '/applicant/notifications',
            icon: BellIcon
          }
        ];

      default:
        return baseItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`sidebar ${open ? 'sidebar-open' : 'sidebar-closed'} lg:translate-x-0`}>
        <div className="flex h-full flex-col bg-white">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <span className="ml-2 text-lg font-semibold text-gray-900">Vishwas</span>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive(item.href)
                      ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={onClose}
                >
                  <Icon
                    className={`mr-3 h-5 w-5 flex-shrink-0 ${
                      isActive(item.href) ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                {user?.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <span className="text-primary-600 font-medium text-sm">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </span>
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {user?.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar; 