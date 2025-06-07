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
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const router = useRouter();
  const [query, setQuery] = useState<any>(null);
  const [jobId, setJobId] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false); // Track search mode

  useEffect(() => {
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

    // Only fetch all candidates if not in search mode
    if (!isSearchMode) {
      fetchCandidates(currentPage - 1, 10).then((data: any) => {
        setAllCandidates(data);
      });
    }
  }, [currentPage, router.isReady, isSearchMode]);

  const handleSearch = () => {
    if (!searchKeyword.trim()) {
      toast.error("Please Enter a Keyword", {
        position: "top-center",
      });
      return;
    }

    setIsLoading(true);
    setIsSearchMode(true); // Enter search mode
    setCurrentPage(1); // Reset to first page when performing new search

    contactSearchByKeyword(searchKeyword, currentPage - 1).then((data) => {
      setIsLoading(false);
      if (data.status === "NOT_FOUND") {
        toast.error(`Candidate Not Found for this keyword: ${searchKeyword}`, {
          position: "top-center",
        });
        setIsSearchMode(false); // Exit search mode if no results
      } else {
        setAllCandidates(data);
      }
    });
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);

    // If in search mode, perform search with new page
    if (isSearchMode && searchKeyword.trim()) {
      setIsLoading(true);
      contactSearchByKeyword(searchKeyword, newPage - 1).then((data) => {
        setIsLoading(false);
        if (data.status === "NOT_FOUND") {
          toast.error("No more candidates found", {
            position: "top-center",
          });
        } else {
          setAllCandidates(data);
        }
      });
    }
  };

  const clearSearch = () => {
    setSearchKeyword("");
    setIsSearchMode(false);
    setCurrentPage(1);
    // Fetch all candidates again
    fetchCandidates(0, 10).then((data: any) => {
      setAllCandidates(data);
    });
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
              <div>
                <button
                  className="bg-blue-500 text-white px-4 py-1 rounded-md border-2 border-blue-500 hover:bg-white hover:text-blue-500 hover:shadow-lg transition duration-200 box-border mr-2"
                  onClick={handleSearch}
                >
                  Search
                </button>
                {isSearchMode && (
                  <button
                    className="bg-gray-500 text-white px-4 py-1 rounded-md border-2 border-gray-500 hover:bg-white hover:text-gray-500 hover:shadow-lg transition duration-200 box-border"
                    onClick={clearSearch}
                  >
                    Clear
                  </button>
                )}
              </div>
              <AddButton title="Add New Candidate" url="add" />
            </div>
          </div>
        </div>

        {isLoading && (
          <Popup onClose={() => setIsLoading(false)}>
            <div className="flex mx-auto items-center justify-center flex-col my-80">
              <div>
                <div className="ml-4 w-10 h-10 rounded-full border-white border-4 border-t-blue-600 animate-spin" />
                <span className="text-white">Searching</span>
              </div>
            </div>
          </Popup>
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
