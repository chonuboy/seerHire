import MainLayout from "@/components/Layouts/layout";
import { candidateTableColumns } from "@/lib/models/candidate";
import AddButton from "@/components/Elements/utils/add-button";
import ContentHeader from "@/components/Layouts/content-header";
import CandidateTable from "@/components/Elements/tables/candidateTable";
import { useEffect, useState } from "react";
import { fetchCandidates } from "@/api/candidates/candidates";
import { contactSearchByKeyword } from "@/api/candidates/candidates";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Popup } from "@/components/Elements/cards/popup";

export default function Candidates() {
  const [allCandidates, setAllCandidates] = useState();
  const [candidateFound, setCandidateFound] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const router = useRouter();
  const [query, setQuery] = useState<any>(null);
  const [jobId, setJobId] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCandidates(currentPage - 1, 10).then((data: any) => {
      setAllCandidates(data);
    });
    if (router.isReady) {
      if (router.query.jobId && router.query.assignInterview) {
        setJobId(router.query.jobId);
        setQuery(router.query.assignInterview);
        localStorage.setItem(
          "assignInterview",
          JSON.stringify(router.query.assignInterview)
        );
        localStorage.setItem("jobId", JSON.stringify(router.query.jobId));
      }
    }
  }, [currentPage, searchKeyword, router.isReady]);

  const handleSearch = () => {
    if (!searchKeyword) {
      toast.error("Please Enter a Keyword", {
        position: "top-center",
      });
      return;
    }
    contactSearchByKeyword(searchKeyword).then((data) => {
      if (data.status === "NOT_FOUND") {
        setCandidateFound(true);
        toast.error(`Candidate Not Found for this keyword : ${searchKeyword}`, {
          position: "top-center",
        });
        setIsLoading(false);
        return;
      } else {
        setIsLoading(true);
        setTimeout(() => {
          setCandidateFound(false);
          setIsLoading(false);
          setAllCandidates(data);
        }, 2000);
      }
    });
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <MainLayout>
      <div className="min-h-screen">
        <ContentHeader title="Candidates" />
        <div className="mb-4">
          <div className="space-y-2">
            <input
              type="text"
              className="text-sm py-3 border bg-gray-50 w-full rounded-md font-sans dark:text-black px-2"
              placeholder="Search Candidates By Name or Email or Phone or Company or Designation or Tech Role"
              onChange={(e) => setSearchKeyword(e.target.value)}
              value={searchKeyword}
              onKeyDown={(e) => {
                e.key === "Enter" && handleSearch();
              }}
            />

            <div className="flex justify-between">
              <button
                className="px-4 py-0.5 bg-blue-600 text-white rounded-md"
                onClick={handleSearch}
              >
                Search
              </button>
              <AddButton title="Add New Candidate" url="add" />
            </div>
          </div>
        </div>
        {isLoading && (
          <div>
            <Popup onClose={() => setIsLoading(false)}>
              <div className="flex mx-auto items-center justify-center flex-col my-80">
                <div>
                  <div className="ml-4 w-10 h-10 rounded-full border-white border-4 border-t-blue-600 animate-spin" />
                  <span className="text-white">Searching</span>
                </div>
              </div>
            </Popup>
          </div>
        )}

        <div>
          {allCandidates ? (
            <CandidateTable
              candidateTableData={allCandidates}
              candidateTableColumns={candidateTableColumns}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              interviewAssign={query}
              interviewjobId={jobId}
            />
          ) : (
            <p className="p-2">Loading Candidates...</p>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
