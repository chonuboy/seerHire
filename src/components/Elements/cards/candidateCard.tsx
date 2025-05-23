import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "./Card";
import { Candidate } from "@/lib/definitions";
import { getContactPreferredJobTypeByContact } from "@/api/candidates/preferredJob";
import { getContactHiringTypeByContactId } from "@/api/candidates/hiringType";

export const CandidateCard = ({
  children,
  candidateData,
}: {
  children?: React.ReactNode;
  candidateData?: Candidate | null;
}) => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(
    null
  );
  const [candidateId, setCandidateId] = useState<number | null>(null);
  const [allPreferredJobTypes, setAllPreferredJobTypes] = useState<any[]>([]);

  useEffect(() => {
    if (candidateData) setCurrentCandidate(candidateData);
    if (candidateData?.contactId) setCandidateId(candidateData?.contactId);
    if (candidateId !== undefined || candidateId !== 0) {
      try {
        if (candidateId) {
          getContactPreferredJobTypeByContact(candidateId)
            .then((data) => {
              let modes;
              if (data.status == "NOT_FOUND") {
                setAllPreferredJobTypes(["Not Menioned"]);
                return;
              }
              if (data.length > 1) {
                modes = data.map((job: any) => job.preferredJobMode);
              } else {
                modes = [data[0].preferredJobMode];
              }
              setAllPreferredJobTypes(modes);
            })
            .catch((err) => {});
        }
      } catch (err) {}
    }
  }, [candidateData, candidateId]);

  return (
    <div className="rounded-lg border border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800 shadow-sm overflow-hidden">
      {/* Header Section */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-bold text-xl md:text-2xl text-gray-900 dark:text-white">
              {currentCandidate?.firstName} {currentCandidate?.lastName}
            </h1>
            <div className="flex items-center gap-6 mt-2">
              <h3 className="font-medium text-gray-600 dark:text-gray-400">
                {currentCandidate?.designation}
              </h3>
              <h3 className="font-medium text-gray-600 dark:text-gray-400 flex items-center">
                <span className="inline-block w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                {currentCandidate?.companyName}
              </h3>
            </div>
          </div>

          <div className="flex-shrink-0">
            {currentCandidate?.isActive === true ? (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 rounded-full">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                <p className="font-medium text-green-700 dark:text-green-400 text-sm">
                  Active
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 dark:bg-red-900/20 rounded-full">
                <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                <p className="font-medium text-red-700 dark:text-red-400 text-sm">
                  Inactive
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 bg-gray-50 dark:bg-gray-900">
        <div className="grid md:grid-cols-4 grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
            <p className="text-blue-500 dark:text-blue-400 text-md">
              Preferred Job Type
            </p>
            <p className="text-gray-900 dark:text-white font-medium mt-1 text-sm">
              {allPreferredJobTypes.join(", ")}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
            <p className="text-blue-500 dark:text-blue-400 text-md">Gender</p>
            <p className="text-gray-900 dark:text-white font-medium mt-1 text-sm">
              {currentCandidate?.gender}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
            <p className="text-blue-500 dark:text-blue-400 text-md">
              Notice Period
            </p>
            <p className="text-gray-900 dark:text-white font-medium mt-1 text-sm">
              {currentCandidate?.noticePeriod} Days
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
            <p className="text-blue-500 dark:text-blue-400 text-md">
              Marital Status
            </p>
            <p className="text-gray-900 dark:text-white font-medium mt-1 text-sm">
              {currentCandidate?.maritalStatus}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
            <p className="text-blue-500 dark:text-blue-400 text-md">Location</p>
            <p className="text-gray-900 dark:text-white font-medium mt-1 text-sm">
              {typeof currentCandidate?.currentLocation === "string"
                ? currentCandidate?.currentLocation
                : currentCandidate?.currentLocation?.locationDetails}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
            <p className="text-blue-500 dark:text-blue-400 text-md">
              Education
            </p>
            <p className="text-gray-900 dark:text-white font-medium mt-1 text-sm">
              {currentCandidate?.highestEducation}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
            <p className="text-blue-500 dark:text-blue-400 text-md">
              Experience
            </p>
            <p className="text-gray-900 dark:text-white font-medium mt-1 text-sm">
              {currentCandidate?.totalExperience} YRS
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
            <p className="text-blue-500 dark:text-blue-400 text-md">
              Expected Salary
            </p>
            <p className="text-gray-900 dark:text-white font-medium mt-1 text-sm">
              {currentCandidate?.currentSalary} LPA
            </p>
          </div>
        </div>

        {/* Children Content */}
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
};
