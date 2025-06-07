"use client"

import { Formik, Form, Field, FieldArray } from "formik"
import { RecruitCandidateData } from "./RecruitmentAdd"

// const InitialValues: RecruitCandidateData = {
//   date: "2025-05-29",
//   recruiterName: "John Doe",
//   portal: "LinkedIn",
//   candidateName: "Jane Smith",
//   role: "Software Engineer",
//   primarySkill: "React",
//   secondarySkill: "Node.js",
//   contactNumber: "+631-9073770732",
//   emailID: "example@gmail.com",
//   totalExperience: 5,
//   relevantExperience: 3,
//   currentCTC: 800000,
//   expectedCTC: 1200000,
//   noticePeriod: 30,
//   currentLocation: "Mumbai",
//   preferredLocation: "Bangalore",
//   qualification: "B.Tech Computer Science",
//   communicationSkillsRating: 4,
//   technicalSkillsRating: 5,
//   remarks: "Excellent candidate with strong technical skills",
//   resumeLink: "https://example.com/resume.pdf",
//   sourcingStatus: "Active",
//   preferredRoles: ["Frontend Developer", "Full Stack Developer"],
// }

export default function UpdateCandidateForm({ initialValues }: { initialValues: RecruitCandidateData }) {
  const handleSubmit = (values: RecruitCandidateData) => {
    console.log("Form submitted:", values)
    alert("Updated candidate successfully!")
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Update Candidate Information</h1>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">Edit Candidate Details</h2>
            <p className="text-sm sm:text-base text-gray-600">
              Update the candidate information as needed
            </p>
          </div>

          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ values }) => (
              <Form className="space-y-6 sm:space-y-8">
                {/* Basic Information */}
                <div className="border-b border-gray-200 pb-6 sm:pb-8">
                  <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-4 sm:mb-6 flex items-center">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                      1
                    </div>
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                        Date <span className="text-red-500">*</span>
                      </label>
                      <Field
                        type="date"
                        name="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                      />
                    </div>

                    {/* Other basic fields... */}
                    {/* Keep all the form fields from the original component */}
                    {/* ... */}

                  </div>
                </div>

                {/* Skills & Experience */}
                <div className="border-b border-gray-200 pb-6 sm:pb-8">
                  <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-4 sm:mb-6 flex items-center">
                    <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                      2
                    </div>
                    Skills & Experience
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {/* Skills fields... */}
                    {/* ... */}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="border-b border-gray-200 pb-6 sm:pb-8">
                  <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-4 sm:mb-6 flex items-center">
                    <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                      3
                    </div>
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {/* Contact fields... */}
                    {/* ... */}
                  </div>
                </div>

                {/* Compensation & Notice Period */}
                <div className="border-b border-gray-200 pb-6 sm:pb-8">
                  <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-4 sm:mb-6 flex items-center">
                    <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                      4
                    </div>
                    Compensation & Availability
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {/* Compensation fields... */}
                    {/* ... */}
                  </div>
                </div>

                {/* Preferred Roles */}
                <div className="border-b border-gray-200 pb-6 sm:pb-8">
                  <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-4 sm:mb-6 flex items-center">
                    <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                      5
                    </div>
                    Preferred Roles
                  </h3>
                  <FieldArray name="preferredRoles">
                    {({ push, remove }) => (
                      <div className="space-y-4">
                        {values.preferredRoles.map((_, index) => (
                          <div key={index} className="flex gap-3 sm:gap-4 items-start">
                            <div className="flex-1 space-y-2">
                              <label className="block text-sm font-medium text-gray-700">
                                Preferred Role {index + 1} <span className="text-red-500">*</span>
                              </label>
                              <Field
                                name={`preferredRoles.${index}`}
                                placeholder={`Enter preferred role ${index + 1}`}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base placeholder-gray-400"
                              />
                            </div>
                            {values.preferredRoles.length > 1 && (
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="mt-7 px-3 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 font-medium rounded-md transition-colors duration-200 text-sm border border-red-200"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => push("")}
                          className="inline-flex items-center px-4 py-2 text-blue-600 hover:text-blue-800 font-medium border border-blue-300 rounded-md hover:bg-blue-50 transition-colors duration-200 text-sm"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                          Add Another Role
                        </button>
                      </div>
                    )}
                  </FieldArray>
                </div>

                {/* Additional Information */}
                <div className="border-b border-gray-200 pb-6 sm:pb-8">
                  <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-4 sm:mb-6 flex items-center">
                    <div className="w-8 h-8 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                      6
                    </div>
                    Additional Information
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {/* Additional info fields... */}
                    {/* ... */}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                  <button
                    type="button"
                    className="w-full sm:w-auto px-6 py-2.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium transition-colors duration-200 text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium shadow-sm transition-colors duration-200 text-sm sm:text-base"
                  >
                    Update Candidate
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}