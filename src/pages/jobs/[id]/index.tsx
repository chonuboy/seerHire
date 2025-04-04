import MainLayout from "@/components/Layouts/layout";
import ContentHeader from "@/components/Layouts/content-header";
import { useRouter } from "next/router";
import { JobCard } from "@/components/Elements/cards/jobCard";
import { fetchJob } from "@/api/client/clientJob";
import { Client } from "@/lib/models/client";
import { useEffect, useState } from "react";
import ClientCard from "@/components/Elements/cards/clientCard";
import { JobDescription } from "@/components/Elements/cards/jobDescription";
import JobDescriptionUploader from "@/components/Forms/jdUploader";

export default function Job() {
  const router = useRouter();
  const jobId = Number(router.query.id);
  const [currentJob, setCurrentJob] = useState<Client | null>(null);

  useEffect(() => {
    if (jobId) {
      fetchJob(jobId)
        .then((data) => {
          setCurrentJob(data);
          console.log(data.jobDescription);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },[]); // Add jobId as a dependency

  return (
    <MainLayout>
      <ContentHeader title="Job" />
      <div className="space-y-8">
        <h3 className="text-xl font-semibold">Client Info</h3>
        {currentJob ? (
          <ClientCard id={currentJob?.client.clientId} />
        ) : (
          "No Client"
        )}

        <h3 className="text-xl font-semibold">Job Info</h3>
        <JobCard jobData={currentJob} onClient isClient />

        <div className="w-full">
        {/* <TextEditor /> */}
        <h3 className="text-xl font-semibold">Job Description</h3>
        <JobDescriptionUploader jobId={Number(router.query.id)}/>
        </div>

        {/* <div className="w-full space-y-4 text-lg" dangerouslySetInnerHTML={{ __html: currentJob?.jobDescription || "" }}>

        </div> */}
        <JobDescription currentJob={currentJob}/>
        <div className="flex justify-end items-end gap-4">
          <button className="bg-gray-400 px-4 py-1 rounded-md hover:bg-gray-500 hover:text-white" onClick={()=>router.push(`/jobs/${jobId}/interviews`)}>
            Interview Section
          </button>
          <button className="bg-blue-500 px-4 py-1 rounded-md hover:bg-blue-600 hover:text-white" onClick={()=>router.push(`/jobs/${jobId}/candidates`)}>
            View Candidates
          </button>
        </div>
      </div>
    </MainLayout>
  );
}