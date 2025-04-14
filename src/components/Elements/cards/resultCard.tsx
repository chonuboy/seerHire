import { useState, useEffect } from "react";
import { Candidate } from "@/lib/definitions";
import { CandidateCard } from "./candidateCard";
import Link from "next/link";

export const ResultCard = ({
  candidateData,
}: {
  candidateData?: Candidate[];
}) => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate[] | null>(
    null
  );

  const [technologies, setTechnologies] = useState<any[]>([]);

  useEffect(() => {
    if (candidateData) setCurrentCandidate(candidateData);
  });

  return (
    <div className="grid md:grid-cols-2 gap-8 grid-cols-1 p-4">
      
      {currentCandidate ? currentCandidate?.map((candidate, index) => (
        <div className="space-y-4">
          <CandidateCard candidateData={candidate}>
            <div className="space-y-4 mt-8">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <h3 className="font-semibold">Action</h3>
                <div className="flex items-center gap-4">
                  <button className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700">
                    View Resume
                  </button>
                  <Link href={`/candidates/${candidate.contactId}`}>
                    <button className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-700">
                      View Profile
                    </button>
                  </Link>
                  <button className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700">
                    Select
                  </button>
                </div>
              </div>
            </div>
          </CandidateCard>
        </div>
      )): <p className="p-4">No Relevant candidates Found</p> }
    </div>
  );
};
