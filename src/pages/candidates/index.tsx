import MainLayout from "@/components/Layouts/layout";
import { candidateTableColumns } from "@/lib/models/candidate";
import AddButton from "@/components/Elements/add-button";
import ContentHeader from "@/components/Layouts/content-header";
import CandidateTable from "@/components/Elements/tables/candidateTable";
import { useEffect, useState } from "react";
import { fetchCandidates } from "@/api/candidates/candidates";
import { contactSearchByKeyword } from "@/api/candidates/candidates";
import { toast } from "react-toastify";
export default function Candidates() {
  const [allCandidates, setAllCandidates] = useState();
  const [candidateFound, setCandidateFound] = useState(false);
  const [candidateResponse, setCandidateResponse] = useState("");

  useEffect(() => {
    fetchCandidates().then((data) => {
      setAllCandidates(data);
    });
  }, []);
  const [searchKeyword, setSearchKeyword] = useState("");
  const handleSearch = () => {
    if (!searchKeyword) {
      toast.error("Please Enter a Keyword", {
        position: "top-center",
      });
    }
    contactSearchByKeyword(searchKeyword).then((data) => {
      if (data.status === "NOT_FOUND") {
        setCandidateFound(true);
        setCandidateResponse(data.message);
        return;
      } else {
        setCandidateFound(false);
        setTimeout(() => {
          setAllCandidates(data);
        }, 1000);
      }
    });
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
                  className="text-sm p-2 border w-full  border-gray-300 rounded focus:outline-blue-600 focus:ring-blue-600"
                  placeholder="Search Candidates"
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <button
                  className="px-4 py-1 bg-blue-600 text-white rounded-md"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
        </div>

        {/* Childrens go here. Initially it will be empty, ensure that an id or path is entered after candidates */}
        <div>
          {candidateFound && (
            <div className="text-red-500">{candidateResponse}</div>
          )}
          {allCandidates ? (
            <CandidateTable
              candidateTableData={allCandidates}
              candidateTableColumns={candidateTableColumns}
            />
          ) : (
            "Loading Candidates..."
          )}
        </div>
      </div>
    </MainLayout>
  );
}
