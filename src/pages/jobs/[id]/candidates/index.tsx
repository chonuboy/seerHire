import MainLayout from "@/components/Layouts/layout";
import ContentHeader from "@/components/Layouts/content-header";
import { useEffect, useState } from "react";
import { fetchContactsByJob } from "@/api/candidates/interviews";
import { useRouter } from "next/router";
import { ResultCard } from "@/components/Elements/cards/resultCard";
import { Interview } from "@/lib/models/candidate";
import { Candidate } from "@/lib/definitions";

export default function InterviewCandidates() {
  const router = useRouter();
  const id = Number(router.query.id);
  const [Candidates, setCandidates] = useState<Candidate[] | null>(null);
  useEffect(() => {
    fetchContactsByJob(id).then((data) => {
      if (data.length > 0) {
        const contactDetailsArray = data
          .map((interview: Interview) => interview.contactDetails)
          .filter(
            (contactDetails: any) =>
              contactDetails !== null && contactDetails !== undefined
          );
        setCandidates(contactDetailsArray);
      }
    });
  }, []);
  return (
    <MainLayout>
      <ContentHeader title="Applied Candidates" />
      {Candidates && Candidates.length > 0 ? (
        <div>
          <div className="flex justify-end">
            <button
              className="bg-blue-500 text-white px-4 py-1 rounded-md"
              onClick={() =>
                router.push({
                  pathname: `/candidates`,
                  query: {jobId: id, assignInterview: true},
                })
              }
            >
              Add New Candidate
            </button>
          </div>
          <ResultCard candidateData={Candidates}></ResultCard>
        </div>
      ) : (
        <h1 className="p-4">No Candidates Found</h1>
      )}
    </MainLayout>
  );
}
