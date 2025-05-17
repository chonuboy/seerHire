import MainLayout from "@/components/Layouts/layout";
import ContentHeader from "@/components/Layouts/content-header";
import { ResultCard } from "@/components/Elements/cards/resultCard";
import { useEffect, useState } from "react";
import { store } from "@/Features/Store";
import { searchCandidates } from "@/api/candidates/candidates";
import { Candidate } from "@/lib/definitions";
export default function SearchResults() {
  const [results, setResults] = useState<any>();
  const [pageNo, setpageNo] = useState(0);
  const [allPages, setAllPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const currentQueries = store.getState().search;
    console.log(currentQueries);
    try {
      searchCandidates(currentQueries, pageNo)
        .then((data) => {
          setResults(data.content);
          console.log(data);
          setAllPages(data.totalPages);
          setCurrentPage(data.pageNumber);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }, [pageNo]);

  return (
    <MainLayout>
      <ContentHeader title="Search Results" />
      
      <ResultCard candidateData={results}></ResultCard>
      <div className="flex justify-center gap-4 items-center mt-4 pr-4">
        <div className="text-sm flex items-center gap-2">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded"
            onClick={() => {
              if (currentPage > 0) setpageNo(pageNo - 1);
            }}
            disabled={currentPage === 0}
          >
            Previous Page
          </button>
          <input
            type="text"
            className="w-12 h-7  text-sm border text-center border-gray-300 rounded"
            value={`${currentPage + 1} of ${allPages}`}
          />
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-4 rounded"
            onClick={() => {
              if (currentPage < allPages - 1) {
                setpageNo(pageNo + 1);
              }
            }}
            disabled={currentPage === allPages}
          >
            Next Page
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
