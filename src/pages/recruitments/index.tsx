import MainLayout from "@/components/Layouts/layout";
import ContentHeader from "@/components/Layouts/content-header";
import { useEffect } from "react";
import { fetchAllRecruitmentData } from "@/api/recruitment/recruitmentData";
import { useState } from "react";
import CandidateTable from "@/components/Elements/tables/candidateTable";
import { RecruitmentColumn } from "@/lib/models/client";
export default function Recruitments() {
  const [recruitmentData, setRecruitmentData] = useState();

  useEffect(() => {
    try {
      fetchAllRecruitmentData().then((data) => {
        setRecruitmentData(data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <MainLayout>
      <ContentHeader title="Recruitments" />
      {recruitmentData ? (
        <CandidateTable
          candidateTableData={recruitmentData}
          candidateTableColumns={RecruitmentColumn}
          isRecruitment
        ></CandidateTable>
      ) : (
        <p className="p-4">Loading Data...</p>
      )}
    </MainLayout>
  );
}
