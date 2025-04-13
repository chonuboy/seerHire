import Piechart from "../pieChart";
import React from "react";
import ContentHeader from "@/components/Layouts/content-header";
import { useState } from "react";
import {
  ChevronDown,
  Users,
  CheckCircle,
  UserCheck,
  TrendingUp,
  TrendingDown,
  UserX
} from "lucide-react";

export default function Dashboard() {
  const [selectedUser, setSelectedUser] = useState("All Users");
  const [selectedJob, setSelectedJob] = useState("All Jobs");
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isJobDropdownOpen, setIsJobDropdownOpen] = useState(false);

  // Mock data
  const users = [
    "John Doe",
    "Jane Smith",
    "Robert Johnson",
    "Emily Davis",
  ];
  const jobs = {
    "All Users": [
      "All Jobs",
      "Frontend Developer",
      "Backend Engineer",
      "UX Designer",
      "Product Manager",
    ],
    "John Doe": ["All Jobs", "Frontend Developer", "UX Designer"],
    "Jane Smith": ["All Jobs", "Backend Engineer", "DevOps Engineer"],
    "Robert Johnson": ["All Jobs", "Product Manager", "Project Manager"],
    "Emily Davis": ["All Jobs", "UX Designer", "UI Designer"],
  };

  const stats = {
    "All Jobs": {
      applied: { count: 245, growth: 12.5 },
      shortlisted: { count: 120, growth: 8.3 },
      selected: { count: 45, growth: -3.2 },
      total: { count: 245 },
    },
    "Frontend Developer": {
      applied: { count: 78, growth: 15.2 },
      shortlisted: { count: 42, growth: 10.5 },
      selected: { count: 12, growth: 5.8 },
      total: { count: 78 },
    },
    "Backend Engineer": {
      applied: { count: 65, growth: 8.7 },
      shortlisted: { count: 30, growth: -2.1 },
      selected: { count: 10, growth: 12.3 },
      total: { count: 65 },
    },
    "UX Designer": {
      applied: { count: 52, growth: 6.3 },
      shortlisted: { count: 28, growth: 9.5 },
      selected: { count: 8, growth: -5.2 },
      total: { count: 52 },
    },
    "Product Manager": {
      applied: { count: 50, growth: 3.8 },
      shortlisted: { count: 20, growth: 7.2 },
      selected: { count: 15, growth: 10.5 },
      total: { count: 50 },
    },
    "DevOps Engineer": {
      applied: { count: 35, growth: 5.6 },
      shortlisted: { count: 18, growth: -1.8 },
      selected: { count: 7, growth: 3.2 },
      total: { count: 35 },
    },
    "Project Manager": {
      applied: { count: 40, growth: 2.5 },
      shortlisted: { count: 22, growth: 6.7 },
      selected: { count: 8, growth: -2.3 },
      total: { count: 40 },
    },
    "UI Designer": {
      applied: { count: 45, growth: 9.2 },
      shortlisted: { count: 25, growth: 4.5 },
      selected: { count: 10, growth: 8.1 },
      total: { count: 45 },
    },
  };

  const handleUserSelect = (user: string) => {
    setSelectedUser(user);
    setIsUserDropdownOpen(false);
    setSelectedJob("All Jobs");
  };

  const handleJobSelect = (job: string) => {
    setSelectedJob(job);
    setIsJobDropdownOpen(false);
  };

  const currentStats =
    stats[selectedJob as keyof typeof stats] || stats["All Jobs"];
  return (
    <>
      <ContentHeader title="Dashboard" />
      {/* Users */}
      <section>
        <div className="w-full grid md:grid-cols-3 items-center grid-cols-1 gap-4">
          <div className="text-center">
            <p className="text-lg text-blue-500">Total Clients</p>
            <div className="">
              <Piechart />
            </div>
          </div>
          <div className="font-sans">
            <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-blue-600">
                  Active Clients
                </h2>
                <Users className="h-6 w-6 text-blue-500" />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-gray-800">200</span>
                <span className="bg-green-200 text-green-800 px-3 py-1 font-semibold rounded-full flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 15l7-7 7 7" />
                  </svg>
                  10%
                </span>
              </div>
            </div>
          </div>
          <div className="font-sans">
            <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-blue-600">
                  Inactive Clients
                </h2>
                <UserX className="h-6 w-6 text-gray-500" />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-gray-800">50</span>
                <span className="bg-red-200 text-red-800 font-semibold px-3 py-1 rounded-full flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 9l7 7 7-7" />
                  </svg>
                  5%
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Jobs */}
      <section className="mt-10">
        <div className="w-full p-6 bg-white rounded-lg">
          {/* Dropdowns */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* User Dropdown */}
            <div className="relative w-full md:w-1/2 space-y-2">
            <h3 className="font-semibold">Select Client</h3>
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="w-full flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-700">
                  {selectedUser}
                </span>
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </button>
              {isUserDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                  <ul className="py-1 max-h-60 overflow-auto">
                    {users.map((user) => (
                      <li
                        key={user}
                        onClick={() => handleUserSelect(user)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                      >
                        {user}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Job Dropdown */}
            <div className="relative w-full md:w-1/2 space-y-2">
            <h3 className="font-semibold">Select Job</h3>
              <button
                onClick={() => setIsJobDropdownOpen(!isJobDropdownOpen)}
                className="w-full flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-700">{selectedJob}</span>
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </button>
              {isJobDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                  <ul className="py-1 max-h-60 overflow-auto">
                    {jobs[selectedUser as keyof typeof jobs]?.map((job) => (
                      <li
                        key={job}
                        onClick={() => handleJobSelect(job)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                      >
                        {job}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Candidates Card */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-700">
                  Total Candidates
                </h2>
                <Users className="h-6 w-6 text-blue-500" />
              </div>
              <p className="text-3xl font-bold text-gray-800">
                {currentStats.total.count}
              </p>
              <p className="text-sm text-gray-500 mt-2">For {selectedJob}</p>
            </div>

            {/* Applied Candidates Card */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-700">Applied</h2>
                <Users className="h-6 w-6 text-indigo-500" />
              </div>
              <p className="text-3xl font-bold text-gray-800">
                {currentStats.applied.count}
              </p>
              <div className="flex items-center mt-2">
                {currentStats.applied.growth > 0 ? (
                  <>
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <p className="text-sm text-green-500">
                      +{currentStats.applied.growth}% from last month
                    </p>
                  </>
                ) : (
                  <>
                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    <p className="text-sm text-red-500">
                      {currentStats.applied.growth}% from last month
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Shortlisted Candidates Card */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-700">
                  Shortlisted
                </h2>
                <UserCheck className="h-6 w-6 text-yellow-500" />
              </div>
              <p className="text-3xl font-bold text-gray-800">
                {currentStats.shortlisted.count}
              </p>
              <div className="flex items-center mt-2">
                {currentStats.shortlisted.growth > 0 ? (
                  <>
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <p className="text-sm text-green-500">
                      +{currentStats.shortlisted.growth}% from last month
                    </p>
                  </>
                ) : (
                  <>
                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    <p className="text-sm text-red-500">
                      {currentStats.shortlisted.growth}% from last month
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Selected Candidates Card */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-700">
                  Selected
                </h2>
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <p className="text-3xl font-bold text-gray-800">
                {currentStats.selected.count}
              </p>
              <div className="flex items-center mt-2">
                {currentStats.selected.growth > 0 ? (
                  <>
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <p className="text-sm text-green-500">
                      +{currentStats.selected.growth}% from last month
                    </p>
                  </>
                ) : (
                  <>
                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    <p className="text-sm text-red-500">
                      {currentStats.selected.growth}% from last month
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
