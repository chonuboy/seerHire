import { useEffect, useState } from "react";
import { store } from "@/Features/Store";
import { searchRecruitmentData } from "@/api/recruitment/recruitmentData";
import MainLayout from "@/components/Layouts/layout";
import ContentHeader from "@/components/Layouts/content-header";

export default function RecruitmentResults() {
  const [currentPage, setCurrentPage] = useState(0);
  const [allResults, setAllResults] = useState([]);
  const [allPages, setAllPages] = useState(0);
  const [pageNo, setpageNo] = useState(0);

  useEffect(() => {
    const searchQueries = store.getState().recruitSearch;
    console.log(searchQueries);
    try {
      searchRecruitmentData(searchQueries, pageNo).then((data) => {
        console.log(data);
        console.log(data.data.content);
        setAllResults(data.data.content);
        setAllPages(data.data.totalPages);
        setCurrentPage(data.data.pageNumber);
      });
    } catch (err) {
      console.log(err);
    }
  }, [pageNo]);

  const getStatusColor = (status: string) => {
    return "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <MainLayout>
      <ContentHeader title="Recruitment Search Results"></ContentHeader>
      {allResults.length === 0 && (
        <div className="text-center">No results found</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {allResults &&
          allResults.length > 0 &&
          allResults.map((result: any) => (
            <div className=" bg-white">
              <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                {/* Compact Header */}
                <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-4 py-3 text-white">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h1 className="text-lg font-bold mb-1">
                        {result.candidateName}
                      </h1>
                      <p className="text-slate-300 text-sm font-medium">
                        {result.role}
                      </p>
                    </div>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                        result.sourcingStatus
                      )}`}
                    >
                      {result.sourcingStatus}
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  {/* Essential Info Grid */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-slate-600 font-medium">Experience</p>
                      <p className="text-slate-800 font-semibold">
                        {result.totalExperience} years
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-600 font-medium">Location</p>
                      <p className="text-slate-800 font-semibold">
                        {result.currentLocation}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-600 font-medium">Current CTC</p>
                      <p className="text-slate-800 font-semibold">
                        ₹{result.currentCTC.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-600 font-medium">Expected CTC</p>
                      <p className="text-emerald-600 font-semibold">
                        ₹{result.expectedCTC.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="bg-slate-50 rounded-lg p-3">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Email:</span>
                        <span className="text-slate-800 text-xs truncate ml-2">
                          {result.emailId}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Phone:</span>
                        <span className="text-slate-800">
                          {result.contactNumber}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Notice:</span>
                        <span className="text-slate-800">
                          {result.noticePeriod} days
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  {/* <div>
                    <p className="text-slate-600 font-medium text-sm mb-2">
                      Primary Skills
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {result && result.primarySkill.length > 0 ? (
                        result.primarySkill.map(
                          (skill: string, index: number) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium"
                            >
                              {skill.trim()}
                            </span>
                          )
                        )
                      ) : (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                          N/A
                        </span>
                      )}
                    </div>
                  </div> */}

                  {/* Footer */}
                  <div className="flex justify-between items-center text-xs text-slate-500 pt-2 border-t border-slate-200">
                    <span>via {result.portal}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      {allResults.length > 0 && allResults && (
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
              className="w-12 h-7  text-sm border text-center dark:text-black border-gray-300 rounded"
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
      )}
    </MainLayout>
  );
}
