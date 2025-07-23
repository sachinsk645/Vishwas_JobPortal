import BackButton from '../../components/common/BackButton';

const JobDetailsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center">
          <BackButton className="mr-4" />
          <div className="bg-primary-600 rounded-full p-2 mr-2">
            <span className="text-white font-bold text-lg">V</span>
          </div>
          <span className="font-bold text-lg text-primary-700">VishwasJobPortal</span>
        </div>
      </header>

      <main className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-4">Job Details</h1>
        <p className="text-lg text-gray-800 mb-6">
          This page displays detailed information about a specific job posting.
        </p>

        {/* Placeholder for job details content */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Job Title</h2>
          <p className="text-lg text-gray-800 mb-4">
            Company Name
          </p>
          <p className="text-lg text-gray-800 mb-4">
            Location: City, Country
          </p>
          <p className="text-lg text-gray-800 mb-4">
            Salary: $50,000 - $70,000
          </p>
          <p className="text-lg text-gray-800 mb-4">
            Posted on: 2023-10-27
          </p>
          <p className="text-lg text-gray-800 mb-4">
            Application Deadline: 2023-11-10
          </p>
          <p className="text-lg text-gray-800 mb-4">
            Job Type: Full-time
          </p>
          <p className="text-lg text-gray-800 mb-4">
            Experience Level: Senior
          </p>
          <p className="text-lg text-gray-800 mb-4">
            Skills Required: React, Node.js, MongoDB
          </p>
          <p className="text-lg text-gray-800 mb-4">
            Description:
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p className="text-lg text-gray-800 mb-4">
            Responsibilities:
            - Develop and maintain web applications
            - Collaborate with other developers and designers
            - Write clean, maintainable, and efficient code
          </p>
          <p className="text-lg text-gray-800 mb-4">
            Requirements:
            - Bachelor's degree in Computer Science or related field
            - 3+ years of experience in web development
            - Proficient in JavaScript, React, and Node.js
            - Experience with MongoDB and RESTful APIs
          </p>
        </div>
      </main>
    </div>
  );
};

export default JobDetailsPage; 