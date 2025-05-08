"use client";

import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Award,
  Calendar,
  Star,
} from "lucide-react";
import { recruitmentCandidate } from "@/lib/models/recruitmentCandidate";

export default function RecruitmentCandidateCard({
  candidate,
}: {
  candidate: recruitmentCandidate;
}) {
  // Parse skills into arrays
  // let primarySkills: string[] = [];
  // let secondarySkills: string[] = [];
  // if (
  //   candidate.primarySkill.length > 0 &&
  //   candidate.secondarySkill &&
  //   candidate.secondarySkill.length > 0
  // ) {
  //   const primarySkills = candidate.primarySkill
  //     .split(",")
  //     .map((skill) => skill.trim());
  //   const secondarySkills = candidate.secondarySkill
  //     ?.split(",")
  //     .map((skill) => skill.trim());
  // }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <main className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="rounded-lg bg-white shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold bg-blue-500 text-white">
              {candidate.candidateName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{candidate.candidateName}</h2>
              <p className="text-lg text-blue-600">{candidate.role}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-200">
                  <Calendar size={14} className="mr-1" /> Sourcing:{" "}
                  {candidate.sourcingStatus}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-200">
                  <Briefcase size={14} className="mr-1" /> Experience:{" "}
                  {candidate.totalExperience} years
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Two column layout for desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-1 space-y-8">
            {/* Contact Information */}
            <div className="rounded-lg bg-white shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Phone size={18} className="mr-2" /> Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="mt-1 mr-3 text-blue-600" size={18} />
                  <div>
                    <p className="text-sm opacity-70">Email</p>
                    <p className="font-medium">{candidate.emailID}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="mt-1 mr-3 text-blue-600" size={18} />
                  <div>
                    <p className="text-sm opacity-70">Phone</p>
                    <p className="font-medium">{candidate.contactNumber}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="mt-1 mr-3 text-blue-600" size={18} />
                  <div>
                    <p className="text-sm opacity-70">Current Location</p>
                    <p className="font-medium">{candidate.currentLocation}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="mt-1 mr-3 text-blue-600" size={18} />
                  <div>
                    <p className="text-sm opacity-70">Preferred Location</p>
                    <p className="font-medium">{candidate.preferredLocation}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            {/* <div className="rounded-lg bg-white shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Award size={18} className="mr-2" /> Skills
              </h3>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Primary Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {primarySkills ? primarySkills.length > 0 && primarySkills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                    >
                      {skill}
                    </span>
                  )): null}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Secondary Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {secondarySkills ?secondarySkills.length > 0 && secondarySkills?.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-sm bg-gray-200 text-gray-800"
                    >
                      {skill}
                    </span>
                  )):null}
                </div>
              </div>
            </div> */}

            {/* Preferred Roles */}
            <div className="rounded-lg bg-white shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Briefcase size={18} className="mr-2" /> Preferred Roles
              </h3>
              <div className="flex flex-wrap gap-2">
                {candidate.preferredRoles.map((role, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800"
                  >
                    {role.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Professional Details */}
            <div className="rounded-lg bg-white shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">
                Professional Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Experience</h4>
                  <div className="space-y-3">
                    <div className="p-3 rounded bg-gray-100">
                      <p className="text-sm opacity-70">Total Experience</p>
                      <p className="font-medium">
                        {candidate.totalExperience} years
                      </p>
                    </div>
                    <div className="p-3 rounded bg-gray-100">
                      <p className="text-sm opacity-70">Relevant Experience</p>
                      <p className="font-medium">
                        {candidate.relevantExperience} years
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Compensation</h4>
                  <div className="space-y-3">
                    <div className="p-3 rounded bg-gray-100">
                      <p className="text-sm opacity-70">Current CTC</p>
                      <p className="font-medium">{candidate.currentCTC} LPA</p>
                    </div>
                    <div className="p-3 rounded bg-gray-100">
                      <p className="text-sm opacity-70">Expected CTC</p>
                      <p className="font-medium">{candidate.expectedCTC} LPA</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-3 rounded bg-gray-100">
                  <p className="text-sm opacity-70">Notice Period</p>
                  <p className="font-medium">{candidate.noticePeriod} days</p>
                </div>

                <div className="p-3 rounded bg-gray-100">
                  <p className="text-sm opacity-70">Qualification</p>
                  <p className="font-medium">{candidate.qualification}</p>
                </div>
              </div>
            </div>

            {/* Skill Ratings */}
            <div className="rounded-lg bg-white shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Star size={18} className="mr-2" /> Skill Ratings
              </h3>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Communication Skills</span>
                    <span>{candidate.communicationSkillsRating}/10</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-blue-500"
                      style={{
                        width: `${candidate.communicationSkillsRating * 10}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span>Technical Skills</span>
                    <span>{candidate.technicalSkillsRating}/10</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-green-500"
                      style={{
                        width: `${candidate.technicalSkillsRating * 10}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recruiter Notes */}
            <div className="rounded-lg bg-white shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Recruiter Notes</h3>

              <div className="p-4 rounded bg-gray-100 italic">
                <p>{candidate.remarks}</p>
              </div>

              <div className="mt-4 flex items-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold bg-purple-500 text-white mr-3">
                  {candidate.recruiterName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium">{candidate.recruiterName}</p>
                  <p className="text-sm opacity-70">
                    Recruiter • {candidate.portal}
                  </p>
                </div>
              </div>
            </div>

            {/* Resume Link */}
            {/* <div className="rounded-lg bg-white shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Resume</h3>

              <a
                href={candidate.resumeLink??"#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download Resume
              </a>
            </div> */}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 bg-gray-100 text-gray-600">
        <div className="container mx-auto px-4 text-center">
          <p>Candidate Profile • Last Updated: {candidate.date}</p>
        </div>
      </footer>
    </div>
  );
}
