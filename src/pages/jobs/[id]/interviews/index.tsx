import { useEffect, useState } from "react";
import { Interview } from "@/lib/models/candidate";
import { fetchAllContactInterviews, fetchContactsByJob } from "@/api/candidates/interviews";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Link from "next/link";
import MainLayout from "@/components/Layouts/layout";
import ContentHeader from "@/components/Layouts/content-header";
export default function AllInterviews() {
  const [allInterviews, setAllInterviews] = useState<Interview[] | null>(null);
  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    try {
      if(router.isReady){
        fetchContactsByJob(Number(router.query.id)).then((data) => {
        setAllInterviews(data);
        console.log(data);
      });
      }
      
    } catch (err) {
      console.log(err);
    }
  }, [router.isReady]);

  return (
    <MainLayout>
      <ContentHeader title="All Interviews"></ContentHeader>
      <div>
        <section className="rounded-lg shadow-sm p-4">
          <div
            id="interviews"
            className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white py-4 dark:bg-black"
          >
            {allInterviews?.length ? (
              allInterviews?.map((item, index) => (
                <div
                  key={index}
                  className="border border-black-200  shadow-md bg-[var(--content-background)] p-4 rounded-lg text-xs md:text-base space-y-4 relative"
                >
                  <div className="flex items-center justify-between flex-wrap border-b border-black-200">
                    <h2 className="font-semibold md:text-xl text-lg">
                      {item.clientJob?.jobTitle}
                    </h2>
                    <div className="flex gap-2 items-center">
                      <div
                        className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${
                          item.interviewStatus === "DONE"
                            ? "bg-green-500"
                            : item.interviewStatus === "PENDING"
                            ? "bg-yellow-500"
                            : item.interviewStatus === "REJECTED"
                            ? "bg-red-500"
                            : "bg-blue-500"
                        }`}
                      ></div>
                      <span className="text-xs md:text-base">
                        {item.interviewStatus}
                      </span>
                    </div>
                  </div>
                  <h4 className="font-bold md:text-lg text-md text-blue-700">
                    {item.clientJob?.client.clientName}
                  </h4>
                  <p className="text-xs md:text-base">
                    Date : {item.interviewDate}
                  </p>
                  <Link
                    href={{ pathname:`/candidates/${item?.contactDetails?.contactId}/interviews/${item?.clientJob?.jobId}`,query:{contactInterViewId:item?.interviewId}}}
                  >
                    <button className="bg-[var(--theme-background)] border-black-200 border-2 py-1 px-2 absolute right-4 bottom-4 bg-blue-500 text-white rounded-md border-blue-500 hover:bg-white hover:text-blue-500 hover:shadow-lg transition duration-200 box-border">
                      All Rounds
                    </button>
                  </Link>
                </div>
              ))
            ) : (
              <div className="dark:bg-black">
                <h1 className="dark:text-white">No Interviews</h1>
              </div>
            )}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
