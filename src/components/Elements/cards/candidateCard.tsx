import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "./Card";
import { Candidate } from "@/lib/definitions";

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

  useEffect(() => {
    if (candidateData) setCurrentCandidate(candidateData);
  });

  return (
    <Card className="p-2 space-y-4 max-h-full shadow-none md:text-base text-sm">
      <div className="flex justify-between">
        <h1 className="font-semibold text-xl">
          {currentCandidate?.firstName} {currentCandidate?.lastName}
        </h1>
        <div className="flex gap-2">
          {currentCandidate?.isActive === true ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <p className="font-semibold text-green-600">Active</p>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <p className="font-semibold text-red-600">Inactive</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <h3 className="font-semibold text-gray-500">
          {currentCandidate?.designation}
        </h3>
        <h3 className="font-semibold text-gray-500">
          {currentCandidate?.companyName}
        </h3>
      </div>
      <CardContent className="bg-white p-2 w-full">
        <div className="grid md:grid-cols-4 grid-cols-2 gap-2">
          <div className="space-y-2">
            <p>Preferred Job Type</p>
            <p className="text-blue-600 font-semibold text-sm">
              {currentCandidate?.preferredJobType
                ? currentCandidate.preferredJobType
                : "Not Mentioned"}
            </p>
          </div>
          <div className="space-y-2">
            <p>Gender</p>
            <p className="text-blue-600 font-semibold text-sm">
              {currentCandidate?.gender}
            </p>
          </div>
          <div className="space-y-2">
            <p>Notice Period</p>
            <p className="text-blue-600 font-semibold text-sm">
              {currentCandidate?.noticePeriod} Days
            </p>
          </div>
          <div className="space-y-2">
            <p>Marital status</p>
            <p className="text-blue-600 font-semibold text-sm">
              {currentCandidate?.maritalStatus}
            </p>
          </div>
          <div className="space-y-2">
            <p>Location</p>
            <p className="text-blue-600 font-semibold text-sm">
              {typeof currentCandidate?.currentLocation === "string"
                ? currentCandidate?.currentLocation
                : currentCandidate?.currentLocation?.locationDetails}
            </p>
          </div>
          <div className="space-y-2">
            <p>Education</p>
            <p className="text-blue-600 font-semibold text-sm">
              {currentCandidate?.highestEducation}
            </p>
          </div>
          <div className="space-y-2">
            <p>Experience</p>
            <p className="text-blue-600 font-semibold text-sm">
              {currentCandidate?.totalExperience} YRS
            </p>
          </div>
          <div className="space-y-2">
            <p>Expected Salary</p>
            <p className="text-blue-600 font-semibold text-sm">
              {currentCandidate?.currentSalary}
            </p>
          </div>
        </div>
        <div>{children}</div>
      </CardContent>
    </Card>
  );
};
