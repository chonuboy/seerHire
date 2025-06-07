import MainLayout from "@/components/Layouts/layout";
import ContentHeader from "@/components/Layouts/content-header";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/router";
import JobCard from "@/components/Elements/cards/jobCard";
import ClientCard from "@/components/Elements/cards/clientCard";
import { fetchJobsByClient } from "@/api/client/clientJob";
import { Popup } from "@/components/Elements/cards/popup";
import { AddJob } from "@/components/Forms/jobs/addJob";
import { fetchClient } from "@/api/master/clients";
import { fetchAllClientLocations } from "@/api/client/locations";
import AddClientLocation from "@/components/Forms/clients/addClientLocation";
import UpdateClientLocation from "@/components/Forms/clients/updateClientBranch";
import { fetchAllLocations } from "@/api/master/masterLocation";
import { Location } from "@/lib/definitions";

export default function Client() {
  const router = useRouter();
  const [allJobs, setAllJobs] = useState([]);
  const [isAddJob, setIsAddJob] = useState(false);
  const [currentClient, setCurrentClient] = useState(null);
  const [newJobId, setNewJobId] = useState(0);
  const [currentClientLocations, setCurrentClientLocations] = useState<any[]>(
    []
  );
  const [isJobUpdated, setIsJobUpdated] = useState(false);
  const [isBranchUpdated, setIsBranchUpdated] = useState(false);
  const [masterLocations, setMasterLocations] = useState<Location[]>([]);
  const [expandedLocation, setExpandedLocation] = useState<number | null>(null);
  const [user, setUser] = useState<string | null>(null);
  const [isBranch, setIsBranch] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      const id = Number(router.query.id);
      fetchJobsByClient(id).then((data) => {
        setAllJobs(data);
        if (data.length > 0) {
          setNewJobId(data[data.length - 1].jobId + 1);
        }
      });
      const user = localStorage.getItem("user");
      setUser(user);

      fetchClient(id).then((data) => {
        setCurrentClient(data);
      });

      fetchAllClientLocations().then((data) => {
        if (data.length > 0 && data[0].client.clientId) {
          const filteredLocations = data.filter(
            (location: any) => location.client.clientId === id
          );
          setCurrentClientLocations(filteredLocations);
        }
      });
      fetchAllLocations().then((data) => {
        setMasterLocations(data);
      });
    }
  }, [router.isReady, isAddJob, isBranch, isJobUpdated, isBranchUpdated]);

  const fetchJobs = async () => {
    try {
      if (router.isReady) {
        fetchJobsByClient(Number(router.query.id)).then((data) => {
          setAllJobs(data);
          if (data.length > 0) {
            setNewJobId(data[data.length - 1].jobId + 1);
          }
        });
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  return (
    <MainLayout>
      <ContentHeader title="Client Info" />
      <div className="space-y-8">
        {router.isReady && <ClientCard id={Number(router.query.id)} />}

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold">All Branch</h2>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded"
                onClick={() => setIsBranch(true)}
              >
                Add New Branch
              </button>
            </div>
            {isBranch && (
              <AddClientLocation
                masterLocations={masterLocations}
                autoClose={() => setIsBranch(false)}
                clientId={Number(router.query.id)}
              ></AddClientLocation>
            )}
            <div className="space-y-2 text-xs md:text-base">
              {currentClientLocations && currentClientLocations.length > 0 ? (
                currentClientLocations.map((city: any, index: number) => (
                  <div
                    key={index}
                    className="border rounded-lg overflow-hidden"
                  >
                    {/* Custom expandable card header */}
                    <div
                      className="flex items-center justify-between w-full p-4 hover:bg-accent cursor-pointer"
                      onMouseEnter={() =>
                        setExpandedLocation(city.clientLocationId)
                      }
                      onMouseLeave={() => setExpandedLocation(null)}
                    >
                      <span>{city.cityId.locationDetails}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          expandedLocation === city.clientLocationId
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </div>

                    {/* Custom expandable card content */}
                    <div
                      onMouseEnter={() =>
                        setExpandedLocation(city.clientLocationId)
                      }
                      onMouseLeave={() => setExpandedLocation(null)}
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        expandedLocation === city.clientLocationId
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="p-6 bg-muted bg-gray-200 dark:bg-white dark:text-black space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <p className="text-sm text-gray-600 font-light">
                              State
                            </p>
                            <p className="text-blue-600">
                              {city.state.locationDetails}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm text-gray-600 font-light">
                              Pin Code
                            </p>
                            <p className="text-blue-600">{city.pincode}</p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm text-gray-600 font-light">
                              HR Contact No
                            </p>
                            <p className="text-blue-600">
                              {city.hrMobileNumber}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm text-gray-600 font-light">
                              HR Contact Person
                            </p>
                            <p className="text-blue-600">
                              {city.hrContactPerson
                                ? city.hrContactPerson
                                : "-"}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm text-gray-600 font-light">
                              Technical Contact Person
                            </p>
                            <p className="text-blue-600">
                              {city.technicalPerson
                                ? city.technicalPerson
                                : "-"}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm text-gray-600 font-light">
                              HR Email
                            </p>
                            <p className="text-blue-600">
                              {city.hrContactPersonEmail
                                ? city.hrContactPersonEmail
                                : "-"}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm text-gray-600 font-light">
                              Address
                            </p>
                            <p className="text-blue-600">{city.address1}</p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm text-gray-600 font-light">
                              Company Land Line
                            </p>
                            <p className="text-blue-600">
                              {city.companyLandline}
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <button
                            onClick={() => setIsBranchUpdated(true)}
                            className="bg-blue-500 text-white px-4 py-1 rounded-md border-2 border-blue-500 hover:bg-white hover:text-blue-500 hover:shadow-lg transition duration-200 box-border flex items-center gap-2"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                            Update
                          </button>
                          {isBranchUpdated && (
                            <Popup onClose={() => setIsBranchUpdated(false)}>
                              <UpdateClientLocation
                                currentClientLocation={city}
                                masterLocations={masterLocations}
                                autoClose={() => setIsBranchUpdated(false)}
                                locationId={city.clientLocationId}
                              ></UpdateClientLocation>
                            </Popup>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div>No Branch Found</div>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-xs md:text-base">
            <h3 className="text-lg font-semibold">Active Jobs</h3>
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
                  newjobId={newJobId}
                  autoClose={() => setIsAddJob(false)}
                  User={user ? user : ""}
                />
              </Popup>
            )}
          </div>

          <div
            className={
              allJobs?.length > 0
                ? "mx-10 md:mx-20 grid grid-cols-1 text-xs md:text-base md:grid-cols-2 gap-6 mt-4"
                : "py-2"
            }
          >
            {(allJobs && allJobs?.length > 0) ? (
              allJobs.map((job, index) => (
                <JobCard onUpdate={fetchJobs} job={job} key={index} />
              ))
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
