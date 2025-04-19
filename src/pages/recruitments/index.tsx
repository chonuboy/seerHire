import MainLayout from "@/components/Layouts/layout";
import ContentHeader from "@/components/Layouts/content-header";
import { useEffect } from "react";
import { fetchAllRecruitmentData } from "@/api/recruitment/recruitmentData";
import { useState } from "react";
import CandidateTable from "@/components/Elements/tables/candidateTable";
import { RecruitmentColumn } from "@/lib/models/client";
import { Popup } from "@/components/Elements/cards/popup";
import RecruitmentDataSearch from "@/components/Elements/utils/recruitmentSearch";
import { toast } from "react-toastify";
import { searchRecruitmentData } from "@/api/recruitment/recruitmentData";
export default function Recruitments() {
  const [recruitmentData, setRecruitmentData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [showSearchForm, setShowSearchForm] = useState(false);

  useEffect(() => {
    try {
      fetchAllRecruitmentData(currentPage - 1, 10).then((data: any) => {
        setRecruitmentData(data);
      });
    } catch (err) {
      console.log(err);
    }
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };


  return (
    <MainLayout>
      <ContentHeader title="Recruitments" />
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
          onClick={() => setShowSearchForm(!showSearchForm)}
        >
          Search
        </button>
      </div>
      {showSearchForm && (
        <Popup
          onClose={() => setShowSearchForm(false)}
        >
          <RecruitmentDataSearch autoClose={() => setShowSearchForm(false)}></RecruitmentDataSearch>
        </Popup>
      )}
      {recruitmentData ? (
        <CandidateTable
          candidateTableData={recruitmentData}
          candidateTableColumns={RecruitmentColumn}
          currentPage={currentPage}
          isRecruitment
          onPageChange={handlePageChange}
        ></CandidateTable>
      ) : (
        <p className="p-4">Loading Data...</p>
      )}
    </MainLayout>
  );
}
