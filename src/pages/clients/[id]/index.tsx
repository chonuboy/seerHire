import MainLayout from "@/components/Layouts/layout";
import ContentHeader from "@/components/Layouts/content-header";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/Elements/cards/collapsible";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/router";
import { JobCard } from "@/components/Elements/cards/jobCard";
import ClientCard from "@/components/Elements/cards/clientCard";
import { fetchJobsByClient } from "@/api/client/clientJob";
import { Popup } from "@/components/Elements/cards/popup";
import { AddJob } from "@/components/Forms/addJob";
import { fetchClient } from "@/api/master/clients";
export default function Client() {
  const router = useRouter();
  const id = router.query.id;
  const [allJobs, setAllJobs] = useState([]);
  const [isAddJob, setIsAddJob] = useState(false);
  const [currentClient, setCurrentClient] = useState(null);

  useEffect(() => {
    fetchJobsByClient(Number(id)).then((data) => {
      setAllJobs(data);
    });
    fetchClient(Number(id)).then((data) => {
      setCurrentClient(data);
    });
  }, []);

  return (
    <MainLayout>
      <ContentHeader title="Client Info" />
      <div className="space-y-8">
        <ClientCard id={Number(id)} />

        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">All Branch</h2>

            <div className="space-y-2">
              {["Chennai", "Delhi", "Hyderabad", "Mumbai"].map(
                (city, index) => (
                  <Collapsible key={city}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-4 border rounded-lg hover:bg-accent">
                      <span>{city}</span>
                      <ChevronDown className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2">
                      {index === 0 && ( // Only render content for Chennai (index 0)
                        <div className="p-6 bg-muted rounded-lg space-y-4 bg-gray-200">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <p className="text-sm">State</p>
                              <p>Chennai</p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm">Pin Code</p>
                              <p>811302</p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm">HR Contact No</p>
                              <p>8292782487</p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm">HR Email</p>
                              <p>abc@gmail.com</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm">Company Land Line</p>
                            <p>8292782487</p>
                          </div>
                        </div>
                      )}
                    </CollapsibleContent>

                    <CollapsibleContent className="mt-2">
                      {index === 1 && ( // Only render content for Delhi (index 1)
                        <div className="p-6 bg-muted rounded-lg space-y-4 bg-gray-200">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <p className="text-sm">State</p>
                              <p>Delhi</p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm">Pin Code</p>
                              <p>110001</p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm">HR Contact No</p>
                              <p>9876543210</p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm">HR Email</p>
                              <p>def@gmail.com</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm">Company Land Line</p>
                            <p>9876543210</p>
                          </div>
                        </div>
                      )}
                    </CollapsibleContent>

                    <CollapsibleContent className="mt-2">
                      {index === 2 && ( // Only render content for Hyderabad (index 2)
                        <div className="p-6 bg-muted rounded-lg space-y-4 bg-gray-200">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <p className="text-sm">State</p>
                              <p>Hyderabad</p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm">Pin Code</p>
                              <p>500001</p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm">HR Contact No</p>
                              <p>8765432109</p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm">HR Email</p>
                              <p>ghi@gmail.com</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm">Company Land Line</p>
                            <p>8765432109</p>
                          </div>
                        </div>
                      )}
                    </CollapsibleContent>

                    <CollapsibleContent className="mt-2">
                      {index === 3 && ( // Only render content for Mumbai (index 3)
                        <div className="p-6 bg-muted rounded-lg space-y-4 bg-gray-200">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <p className="text-sm">State</p>
                              <p>Mumbai</p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm">Pin Code</p>
                              <p>400001</p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm">HR Contact No</p>
                              <p>7654321098</p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm">HR Email</p>
                              <p>jkl@gmail.com</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm">Company Land Line</p>
                            <p>7654321098</p>
                          </div>
                        </div>
                      )}
                    </CollapsibleContent>
                  </Collapsible>
                )
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold">Active Jobs</h3>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg"
              onClick={() => setIsAddJob(true)}
            >
              Add New Job
            </button>
            {isAddJob && (
              <Popup onClose={() => setIsAddJob(false)}>
                <AddJob
                  client={currentClient}
                  autoClose={() => setIsAddJob(false)}
                />
              </Popup>
            )}
          </div>

          <div className={allJobs?.length > 0 ? "mx-10 md:mx-20 grid grid-cols-1 md:grid-cols-2 gap-6 mt-4": "py-2"}>
            {allJobs?.length > 0 ? (
              allJobs.map((job, index) => <JobCard jobData={job} isClient />)
            ) : (
              <div>
                <p>No Active Jobs</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
