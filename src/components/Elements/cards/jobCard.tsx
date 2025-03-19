import { Card, CardContent, CardHeader } from "./Card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Popup } from "./popup";
import { Client } from "@/lib/models/client";
import { imgHelper } from "@/lib/image-helper";
import JobInfoUpdateForm from "@/components/Forms/updateJobInfo";
export function JobCard({
  jobData,
  isClient,
  onClient,
}: {
  jobData: Client | null;
  isClient: boolean;
  onClient?: boolean;
}) {
  const [currentJob, setCurrentJob] = useState(jobData);
  useEffect(() => {
    setCurrentJob(jobData);
  });

  const [jobUpdated, setJobUpdated] = useState(false);

  return (
    <section className="space-y-4">
      <Card className="border shadow-sm p-2">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <CardHeader>
              <h3 className="text-xl font-semibold">{currentJob?.jobTitle}</h3>
            </CardHeader>
            {!isClient && currentJob?.client.clientName ? (
              <p className="text-lg text-blue-500 font-semibold">
                {currentJob?.client.clientName}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="flex items-center gap-2">
              <div className={`${currentJob?.isJobActive ? "bg-green-500" : "bg-red-500"} w-4 h-4 rounded-full`}></div>
              <p className={`font-semibold ${currentJob?.isJobActive ? "text-green-500" : "text-red-500"}`}>
                {currentJob?.isJobActive ? "Active" : "Inactive"}
              </p>
            </div>
        </div>

        <CardContent className="bg-white p-4 mt-2 text-xs md:text-base">
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <div className="flex gap-4">
              <img src={imgHelper.jobExperience} alt="Experience" className="md:w-6 md:h-6 w-4 h-4" />
              <p className="text-gray-600">{currentJob?.experience} Years</p>
            </div>
           
            <div className="flex gap-4 items-center">
              <img src={imgHelper.jobBudget} alt="Rupees" className="md:w-6 md:h-6 w-4 h-4" />
              <p className="text-gray-600">{currentJob?.salaryInCtc} LPA</p>
            </div>
            <div className="flex gap-4 items-center">
              <img src={imgHelper.job} alt="Job Code" className="md:w-6 md:h-6 w-4 h-4" />
              <p className="text-gray-600">{currentJob?.jobCode}</p>
            </div>
            <div className="flex gap-4 items-center">
              <img src={imgHelper.calendar} alt="Posted On" className="md:w-6 md:h-6 w-4 h-4" />
              <p className="text-gray-600">{currentJob?.createdOn}</p>
            </div>
            <div className="flex gap-4 items-center">
              <img src={imgHelper.insertedBy} alt="Inserted By" className="md:w-6 md:h-6 w-4 h-4" />
              <p className="text-gray-600">{currentJob?.insertedBy}</p>
            </div>
          </div>
          {jobUpdated && currentJob ? (
            <Popup onClose={() => setJobUpdated(false)}>
              <div className="bg-white w-max-3xl p-4 rounded-lg mt-16">
              <JobInfoUpdateForm currentJob={currentJob} id={currentJob?.jobId} autoClose={() => setJobUpdated(false)}/>
                {/* <form className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="experience" className="font-medium">
                        Experience
                      </label>
                      <input
                        id="experience"
                        type="text"
                        value={`${currentJob?.experience} Years`}
                        onChange={(e) =>
                          setCurrentJob({
                            ...currentJob,
                            experience: Number(e.target.value),
                          })
                        }
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="status" className="font-medium">
                        Status
                      </label>
                      <input
                        id="status"
                        type="text"
                        value={currentJob?.isJobActive ? "Active" : "Inactive"}
                        onChange={(e) =>
                          setCurrentJob({
                            ...currentJob,
                            isJobActive: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="budget" className="font-medium">
                        Budget
                      </label>
                      <input
                        id="budget"
                        type="text"
                        value={`${currentJob?.salaryInCtc} LPA`}
                        onChange={(e) =>
                          setCurrentJob({
                            ...currentJob,
                            salaryInCtc: Number(e.target.value),
                          })
                        }
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="jobCode" className="font-medium">
                        Job Code
                      </label>
                      <input
                        id="jobCode"
                        type="text"
                        value={currentJob?.jobCode}
                        onChange={(e) =>
                          setCurrentJob({
                            ...currentJob,
                            jobCode: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="postedOn" className="font-medium">
                        Posted On
                      </label>
                      <input
                        id="postedOn"
                        type="text"
                        value={formattedDate}
                        onChange={(e) => {
                          const date = new Date(e.target.value);
                          setCurrentJob({
                            ...currentJob,
                            postCreatedOn: date,
                          });
                        }}
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="insertedBy" className="font-medium">
                        Inserted By
                      </label>
                      <input
                        id="insertedBy"
                        type="text"
                        value={currentJob?.insertedBy}
                        onChange={(e) =>
                          setCurrentJob({
                            ...currentJob,
                            insertedBy: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
                  >
                    Update
                  </button>
                </form> */}
              </div>
            </Popup>
          ) : (
            ""
          )}
        </CardContent>
        <div className="flex items-center gap-4 mt-4 justify-end">
          {!onClient ? (
            <Link href={`/jobs/${currentJob?.jobId}`}>
              <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1">
                View Info
              </button>
            </Link>
          ) : (
            ""
          )}

          {isClient ? (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1"
              onClick={() => setJobUpdated(true)}
            >
              Update
            </button>
          ) : (
            ""
          )}
        </div>
      </Card>
    </section>
  );
}
