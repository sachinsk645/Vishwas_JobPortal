import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';

// Context
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Components
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import LoadingSpinner from './components/common/LoadingSpinner';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import RecruiterDashboard from './pages/recruiter/RecruiterDashboard';
import RecruiterAdminDashboard from './pages/recruiter/RecruiterAdminDashboard';
import RecruiterUserDashboard from './pages/recruiter/RecruiterUserDashboard';
import ApplicantDashboard from './pages/applicant/ApplicantDashboard';
import AddUserPage from './pages/recruiter/AddUserPage';
import ViewUsersPage from './pages/recruiter/ViewUsersPage';
import PostNewJobPage from './pages/recruiter/PostNewJobPage';
import JobsPage from './pages/JobsPage';
import JobDetailsPage from './pages/applicant/JobDetailsPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import ViewAllApplicationsPage from './pages/recruiter/ViewAllApplicationsPage';
import ScheduleInterviewPage from './pages/recruiter/ScheduleInterviewPage';
import InterviewManagementPage from './pages/recruiter/InterviewManagementPage';
import NewRecruiterPage from './pages/recruiter/NewRecruiterPage';
import UpgradePlanPage from './pages/recruiter/UpgradePlanPage';
import AddCandidatePage from './pages/recruiter/AddCandidatePage';
import ScheduleNewInterviewPage from './pages/recruiter/ScheduleNewInterviewPage';
import ReviewNewApplicationsPage from './pages/recruiter/ReviewNewApplicationsPage';
import ApplyJobPage from './pages/applicant/ApplyJobPage';
import ResumeBuilderPage from './pages/applicant/ResumeBuilderPage';
import ResumePaymentPage from './pages/applicant/ResumePaymentPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Dashboard Layout Component
const DashboardLayout = ({ children }) => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="lg:pl-64">
        <main className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

// Main App Component
const AppContent = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/applicant/jobs/:id" element={<JobDetailsPage />} />
        <Route path="/applicant/jobs/:id/apply" element={<ApplyJobPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/recruiter-admin" element={<RecruiterAdminDashboard />} />
        <Route path="/recruiter-admin/add-user" element={<AddUserPage />} />
        <Route path="/recruiter-admin/view-users" element={<ViewUsersPage />} />
        <Route path="/recruiter-admin/post-job" element={<PostNewJobPage />} />
        <Route path="/recruiter-admin/applications" element={<ViewAllApplicationsPage />} />
        <Route path="/recruiter-admin/schedule-interview" element={<ScheduleInterviewPage />} />
        <Route path="/recruiter-admin/interview-management" element={<InterviewManagementPage />} />
        <Route path="/recruiter-admin/new-recruiter" element={<NewRecruiterPage />} />
        <Route path="/recruiter-admin/upgrade-plan" element={<UpgradePlanPage />} />
        <Route path="/recruiter-user" element={<RecruiterUserDashboard />} />
        <Route path="/recruiter-user/add-candidate" element={<AddCandidatePage />} />
        <Route path="/recruiter-user/schedule-interview" element={<ScheduleNewInterviewPage />} />
        <Route path="/recruiter-user/review-new-applications" element={<ReviewNewApplicationsPage />} />
        <Route path="/applicant" element={<ApplicantDashboard />} />
        <Route path="/applicant/resume/builder" element={<ResumeBuilderPage />} />
        <Route path="/applicant/resume/payment" element={<ResumePaymentPage />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Protected Routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DashboardLayout>
                <Routes>
                  <Route path="/" element={<AdminDashboard />} />
                  <Route path="/dashboard" element={<AdminDashboard />} />
                  {/* Add more admin routes here */}
                </Routes>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/*"
          element={
            <ProtectedRoute allowedRoles={['recruiter']}>
              <DashboardLayout>
                <Routes>
                  <Route path="/" element={<RecruiterDashboard />} />
                  <Route path="/dashboard" element={<RecruiterDashboard />} />
                  {/* Add more recruiter routes here */}
                </Routes>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/applicant/*"
          element={
            <ProtectedRoute allowedRoles={['applicant']}>
              <DashboardLayout>
                <Routes>
                  <Route path="/" element={<ApplicantDashboard />} />
                  <Route path="/dashboard" element={<ApplicantDashboard />} />
                  {/* Add more applicant routes here */}
                </Routes>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Profile Route */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <ProfilePage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Redirect based on user role */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              {user?.role === 'admin' && <Navigate to="/admin/dashboard" replace />}
              {user?.role === 'recruiter' && <Navigate to="/recruiter/dashboard" replace />}
              {user?.role === 'applicant' && <Navigate to="/applicant/dashboard" replace />}
            </ProtectedRoute>
          }
        />

        {/* 404 Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

// App Component with Providers
const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppContent />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#22c55e',
                secondary: '#fff',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App; 