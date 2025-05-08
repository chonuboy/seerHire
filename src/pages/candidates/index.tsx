import MainLayout from "@/components/Layouts/layout";
import { candidateTableColumns } from "@/lib/models/candidate";
import AddButton from "@/components/Elements/utils/add-button";
import ContentHeader from "@/components/Layouts/content-header";
import CandidateTable from "@/components/Elements/tables/candidateTable";
import { useEffect, useState } from "react";
import { fetchCandidates } from "@/api/candidates/candidates";
import { contactSearchByKeyword } from "@/api/candidates/candidates";
import { toast } from "react-toastify";

export default function Candidates() {
  const [allCandidates, setAllCandidates] = useState();
  const [candidateFound, setCandidateFound] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    fetchCandidates(currentPage-1, 10).then((data: any) => {
      setAllCandidates(data);
    });
  }, [currentPage,searchKeyword]);

 
  const handleSearch = () => {
    if (!searchKeyword) {
      toast.error("Please Enter a Keyword", {
        position: "top-center",
      });
    }
    contactSearchByKeyword(searchKeyword).then((data) => {
      if (data.status === "NOT_FOUND") {
        setCandidateFound(true);
        toast.error(data.message, {
          position: "top-center",
        })
        return;
      } else {
        setCandidateFound(false);
        setTimeout(() => {
          setAllCandidates(data);
        }, 1000);
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
        <div className="flex justify-between mb-4">
          <AddButton title="Add New Candidate" url="add" />
          <div className="flex items-center gap-4">
            <input
              type="text"
              className="text-sm py-1 border w-full rounded-md dark:text-black px-2"
              placeholder="Search Candidates"
              onChange={(e) => setSearchKeyword(e.target.value)}
              value={searchKeyword}
              onKeyDown={(e) => {
                e.key === "Enter" && handleSearch();
              }}
            />
            <button
              className="px-4 py-0.5 bg-blue-600 text-white rounded-md"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>

        <div>
          {allCandidates ? (
            <CandidateTable
              candidateTableData={allCandidates}
              candidateTableColumns={candidateTableColumns}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          ) : (
            <p className="p-2">Loading Candidates...</p>
          )}
        </div>
      </div>
    </MainLayout>
  );
}