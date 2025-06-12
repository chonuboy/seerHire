import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Star,
  X,
  Award,
} from "lucide-react";
import { RecruitCandidateData } from "@/lib/models/recruitmentCandidate";
import { useState } from "react";
import { useFormik } from "formik";
import { RecruitmentCandidateUpdateSchema } from "@/lib/models/recruitmentCandidate";
import { Popup } from "./popup";

export default function RecruitmentCandidateCard({
  candidate,
}: {
  candidate: RecruitCandidateData;
}) {
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);
  const [currentPreferredRole, setCurrentPreferredRole] = useState("");
  const initialValues = candidate;
  const getUpdatedFields = (initialValues: any, values: any) => {
    return Object.keys(values).reduce((acc: Record<string, any>, key) => {
      if (values[key] !== initialValues[key]) {
        acc[key] = values[key];
      }

      return acc;
    }, {});
  };

  const formik = useFormik({
    initialValues: candidate,
    // validationSchema: RecruitmentCandidateUpdateSchema,
    onSubmit: (values) => {
      const updatedFields = getUpdatedFields(initialValues, values);
      console.log(updatedFields);
      // try {
      //   updateCandidate(updatedFields, id).then((data) => {
      //     console.log(data);
      //     if (data.status === 200) {
      //       toast.success("Profile updated successfully", {
      //         position: "top-right",
      //       });
      //       autoClose();
      //     } else {
      //       toast.error(data.message, {
      //         position: "top-right",
      //       });
      //     }
      //   });
      // } catch (error) {
      //   console.error("Error updating profile:", error);
      //   toast.error("Failed to update profile. Please try again.", {
      //     position: "top-right",
      //   });
      // }
    },
  });

  return (
    <div className="min-h-screen text-gray-800">
      <main className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="rounded-lg bg-white flex items-center justify-between shadow-lg p-4 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold bg-blue-500 text-white">
              {candidate.candidateName &&
                candidate.candidateName.charAt(0).toUpperCase()}
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
          <div>
            <button
              className="bg-blue-500 text-white px-4 py-1 rounded-md border-2 border-blue-500 hover:bg-white hover:text-blue-500 hover:shadow-lg transition duration-200 box-border mt-4"
              onClick={() => setIsProfileUpdated(true)}
            >
              Update Profile
            </button>
          </div>
        </div>

        {isProfileUpdated && (
          <Popup onClose={() => setIsProfileUpdated(false)}>
            <div className="bg-white shadow-lg rounded-2xl mx-auto max-w-4xl mt-14">
              {/* Header */}
              <div className="px-8 py-6 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-gray-900">
                  Update Profile
                </h1>
              </div>

              <form onSubmit={formik.handleSubmit} className="p-8">
                {/* Basic Information */}
                <div className="space-y-8 pb-6 mb-6">
                  <h3 className="text-lg font-semibold text-cyan-500 mb-4">
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label
                        htmlFor="recruiterName"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Recruiter Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={candidate.recruiterName}
                        onChange={formik.handleChange}
                        name="recruiterName"
                        className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="portal"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Portal <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="portal"
                        className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none bg-white"
                        value={candidate.portal}
                        onChange={formik.handleChange}
                      >
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="Naukri">Naukri</option>
                        <option value="Indeed">Indeed</option>
                        <option value="Referral">Referral</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="candidateName"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Candidate Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={candidate.candidateName}
                        onChange={formik.handleChange}
                        name="candidateName"
                        className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="role"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Role <span className="text-red-500">*</span>
                      </label>
                      <input
                        value={candidate.role}
                        onChange={formik.handleChange}
                        type="text"
                        name="role"
                        className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="qualification"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Qualification <span className="text-red-500">*</span>
                      </label>
                      <input
                        value={candidate.qualification}
                        onChange={formik.handleChange}
                        type="text"
                        name="qualification"
                        className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Skills & Experience */}
                <div className="space-y-8 pb-6 mb-6">
                  <h3 className="text-lg font-semibold text-cyan-500 mb-4">
                    Skills & Experience
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label
                        htmlFor="primarySkill"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Primary Skill <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={candidate.primarySkill}
                        onChange={formik.handleChange}
                        name="primarySkill"
                        className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="secondarySkill"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Secondary Skill <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={candidate.secondarySkill}
                        onChange={formik.handleChange}
                        name="secondarySkill"
                        className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="totalExperience"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Total Experience (Years){" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="totalExperience"
                        value={candidate.totalExperience}
                        onChange={formik.handleChange}
                        className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="relevantExperience"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Relevant Experience (Years){" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="relevantExperience"
                        value={candidate.relevantExperience}
                        onChange={formik.handleChange}
                        className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="communicationSkillsRating"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Communication Skills (1-5){" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="communicationSkillsRating"
                        value={candidate.communicationSkillsRating}
                        onChange={formik.handleChange}
                        min={0}
                        max={5}
                        className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="technicalSkillsRating"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Technical Skills (1-5){" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="technicalSkillsRating"
                        min={0}
                        max={5}
                        className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                        value={candidate.technicalSkillsRating}
                        onChange={formik.handleChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-8 pb-6 mb-6">
                  <h3 className="text-lg font-semibold text-cyan-500 mb-4">
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label
                        htmlFor="contactNumber"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Contact Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="contactNumber"
                        value={candidate.contactNumber}
                        onChange={formik.handleChange}
                        className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="emailID"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Email ID <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="emailID"
                        id="emailID"
                        value={candidate.emailId}
                        onChange={formik.handleChange}
                        className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="currentLocation"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Current Location <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="currentLocation"
                        value={candidate.currentLocation}
                        onChange={formik.handleChange}
                        className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="preferredLocation"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Preferred Location{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="preferredLocation"
                        value={candidate.preferredLocation}
                        onChange={formik.handleChange}
                        className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Compensation & Notice Period */}
                <div className="pb-6 mb-6 space-y-8">
                  <h3 className="text-lg font-semibold text-cyan-500 mb-4">
                    Compensation & Availability
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label
                        htmlFor="currentCTC"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Current CTC (₹) LPA{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="currentCTC"
                        min="0"
                        value={candidate.currentCTC}
                        onChange={formik.handleChange}
                        className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="expectedCTC"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Expected CTC (₹) LPA{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="expectedCTC"
                        min="0"
                        value={candidate.expectedCTC}
                        onChange={formik.handleChange}
                        className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="noticePeriod"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Notice Period (Days){" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="noticePeriod"
                        min="0"
                        value={candidate.noticePeriod}
                        onChange={formik.handleChange}
                        className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Preferred Roles */}
                <div className="pb-6 mb-6 space-y-8">
                  <h3 className="text-lg font-semibold text-cyan-500 mb-4">
                    Preferred Roles
                  </h3>
                  <div className="relative">
                    <input
                      type="text"
                      name="preferredRoles"
                      value={currentPreferredRole}
                      id="preferredRoles"
                      placeholder="Enter preferred roles"
                      className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none"
                      onChange={(e) => {
                        setCurrentPreferredRole(e.target.value);
                      }}
                    />
                    <button
                      className="absolute right-0 top-0 px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium text-sm"
                      type="button"
                      onClick={() => {
                        const updatedRoles = [
                          ...candidate.preferredRoles,
                          currentPreferredRole,
                        ];
                        candidate.preferredRoles = updatedRoles;
                        formik.setFieldValue("preferredRoles", updatedRoles);
                        setCurrentPreferredRole("");
                      }}
                    >
                      Add
                    </button>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {candidate.preferredRoles.length > 0 &&
                        candidate.preferredRoles.map((role, index) => (
                          <div key={index} className="relative">
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                              {role}
                              <X
                                onClick={() => {
                                  const updatedRoles =
                                    candidate.preferredRoles.filter(
                                      (_, i) => i !== index
                                    );
                                  formik.setFieldValue(
                                    "preferredRoles",
                                    updatedRoles
                                  );
                                  candidate.preferredRoles = updatedRoles;
                                }}
                                className="inline-block ml-1 w-3 h-3 cursor-pointer text-blue-800 hover:text-red-500"
                              />
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="pb-6 mb-6 space-y-8">
                  <h3 className="text-lg font-semibold text-cyan-500 mb-4">
                    Additional Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label
                        htmlFor="sourcingStatus"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Sourcing Status <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="sourcingStatus"
                        className="w-full px-0 py-1 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 text-sm placeholder-gray-400 focus:outline-none bg-white"
                        onChange={formik.handleChange}
                        value={candidate.sourcingStatus}
                      >
                        <option value="Active">Active</option>
                        <option value="Passive">Inactive</option>
                        <option value="On Hold">On Hold</option>
                        <option value="Hired">Hired</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label
                        htmlFor="remarks"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Remarks <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="remarks"
                        rows={4}
                        value={candidate.remarks}
                        onChange={formik.handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-end">
                  <button
                    type="button"
                    onClick={()=>setIsProfileUpdated(false)}
                    className="flex-1 sm:flex-none sm:px-8 py-2 border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 sm:flex-none sm:px-8 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </Popup>
        )}

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
                    <p className="font-medium">{candidate.emailId}</p>
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
            <div className="rounded-lg bg-white shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Award size={18} className="mr-2" /> Skills
              </h3>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Primary Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {candidate.primarySkill && candidate.primarySkill.length > 0
                    ? candidate.primarySkill.split(",").map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                        >
                          {skill}
                        </span>
                      ))
                    : null}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Secondary Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {candidate.secondarySkill &&
                  candidate.secondarySkill.length > 0
                    ? candidate.secondarySkill
                        ?.split(",")
                        .map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 rounded-full text-sm bg-gray-200 text-gray-800"
                          >
                            {skill}
                          </span>
                        ))
                    : null}
                </div>
              </div>
            </div>

            {/* Preferred Roles */}
            <div className="rounded-lg bg-white shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Briefcase size={18} className="mr-2" /> Preferred Roles
              </h3>
              <div className="flex flex-wrap gap-2">
                {candidate.preferredRoles &&
                  candidate.preferredRoles.map((role, index) => (
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
                    <span>{candidate.communicationSkillsRating}/5</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-blue-500"
                      style={{
                        width: `${candidate.communicationSkillsRating * 20}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span>Technical Skills</span>
                    <span>{candidate.technicalSkillsRating}/5</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-green-500"
                      style={{
                        width: `${candidate.technicalSkillsRating * 20}%`,
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
                  {candidate.recruiterName &&
                    candidate.recruiterName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium">{candidate.recruiterName}</p>
                  <p className="text-sm opacity-70">
                    Recruiter • {candidate.portal}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="mt-12 py-6 bg-gray-100 text-gray-600">
          <div className="container px-4 text-center">
            <p>Last Updated: {candidate.date}</p>
          </div>
        </footer>
      </main>

      {/* Footer */}
    </div>
  );
}
