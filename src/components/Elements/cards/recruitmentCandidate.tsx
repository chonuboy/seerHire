import { recruitmentCandidate } from "@/lib/models/recruitmentCandidate";
import React from "react";
import { useState } from "react";
import { Pencil, Check, X } from "lucide-react"

const RecruitmentCandidateCard = ({ candidate }: { candidate: recruitmentCandidate }) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, any>>({});

  const handleEdit = (field: string, value: any) => {
    setEditingField(field);
    setEditValues({ ...editValues, [field]: value });
  };

  const handleSave = (field: string) => {
    // Here you would typically save the updated value to your backend
    console.log(`Saving ${field} with value:`, editValues[field]);
    setEditingField(null);
  };

  const handleCancel = () => {
    setEditingField(null);
  };

  const renderEditableField = (label: string, field: string, value: any) => {
    const isEditing = editingField === field;

    return (
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <label className="text-sm font-medium text-gray-600">{label}</label>
          {!isEditing ? (
            <button
              onClick={() => handleEdit(field, value)}
              className="text-blue-500 hover:text-blue-700 transition-colors"
            >
              <Pencil className="h-4 w-4" />
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={() => handleSave(field)}
                className="text-green-500 hover:text-green-700 transition-colors"
              >
                <Check className="h-4 w-4" />
              </button>
              <button
                onClick={handleCancel}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {isEditing ? (
          <input
            type={typeof value === "number" ? "number" : "text"}
            value={editValues[field]}
            onChange={(e) =>
              setEditValues({
                ...editValues,
                [field]:
                  typeof value === "number"
                    ? Number(e.target.value)
                    : e.target.value,
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <div className="bg-gray-50 px-3 py-2 rounded-md border border-gray-200">
            {value !== null && value !== "" ? (
              value
            ) : (
              <span className="text-gray-400">Not specified</span>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">
            {candidate.candidateName}
          </h2>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            ID: {candidate.id}
          </span>
        </div>
        <p className="text-blue-100 mt-1">{candidate.role}</p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          {renderEditableField(
            "Recruiter Name",
            "recruiterName",
            candidate.recruiterName
          )}
          {renderEditableField("Portal", "portal", candidate.portal)}
          {renderEditableField(
            "Primary Skill",
            "primarySkill",
            candidate.primarySkill
          )}
          {renderEditableField(
            "Secondary Skill",
            "secondarySkill",
            candidate.secondarySkill
          )}
          {renderEditableField(
            "Contact Number",
            "contactNumber",
            candidate.contactNumber
          )}
          {renderEditableField("Email ID", "emailID", candidate.emailID)}
          {renderEditableField(
            "Total Experience (years)",
            "totalExperience",
            candidate.totalExperience
          )}
          {renderEditableField(
            "Relevant Experience (years)",
            "relevantExperience",
            candidate.relevantExperience
          )}
          {renderEditableField(
            "Current CTC (LPA)",
            "currentCTC",
            candidate.currentCTC
          )}
          {renderEditableField(
            "Expected CTC (LPA)",
            "expectedCTC",
            candidate.expectedCTC
          )}
          {renderEditableField(
            "Notice Period (days)",
            "noticePeriod",
            candidate.noticePeriod
          )}
          {renderEditableField(
            "Current Location",
            "currentLocation",
            candidate.currentLocation
          )}
          {renderEditableField(
            "Preferred Location",
            "preferredLocation",
            candidate.preferredLocation
          )}
          {renderEditableField(
            "Qualification",
            "qualification",
            candidate.qualification
          )}
          {renderEditableField(
            "Communication Skills Rating",
            "communicationSkillsRating",
            candidate.communicationSkillsRating
          )}
          {renderEditableField(
            "Technical Skills Rating",
            "technicalSkillsRating",
            candidate.technicalSkillsRating
          )}
        </div>

        <div className="mt-4">
          {renderEditableField("Remarks", "remarks", candidate.remarks)}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <h3 className="text-lg font-medium mb-3">Additional Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            {renderEditableField(
              "Resume Link",
              "resumeLink",
              candidate.resumeLink
            )}
            {renderEditableField(
              "Sourcing Status",
              "sourcingStatus",
              candidate.sourcingStatus
            )}
          </div>

          <div className="mt-4">
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium text-gray-600">
                Preferred Roles
              </label>
              <button
                onClick={() =>
                  handleEdit(
                    "preferredRoles",
                    candidate.preferredRoles.join(", ")
                  )
                }
                className="text-blue-500 hover:text-blue-700 transition-colors"
              >
                <Pencil className="h-4 w-4" />
              </button>
            </div>

            {editingField === "preferredRoles" ? (
              <div>
                <input
                  type="text"
                  value={editValues["preferredRoles"]}
                  onChange={(e) =>
                    setEditValues({
                      ...editValues,
                      preferredRoles: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                  placeholder="Comma separated roles"
                />
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleSave("preferredRoles")}
                    className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md text-sm transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md text-sm transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 px-3 py-2 rounded-md border border-gray-200">
                {candidate.preferredRoles &&
                candidate.preferredRoles.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {candidate.preferredRoles.map((role, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-400">
                    No preferred roles specified
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          Application Date: {new Date(candidate.date).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default RecruitmentCandidateCard;
