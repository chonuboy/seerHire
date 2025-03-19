import React, { useState } from "react";
import { Table } from "./table";
import { Columns } from "@/lib/definitions";

const CandidateTable = ({
  candidateTableData,
  candidateTableColumns,
}: {
  candidateTableData: any;
  candidateTableColumns: Columns;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(candidateTableData.content.length / 10); // Assuming 10 items per page

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const paginatedData = candidateTableData?.content.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );

  return (
    <Table
      data={paginatedData}
      columns={candidateTableColumns}
      getRowLink={(item, index, edit) => ({
        pathname: `/candidates/${item.contactId}`,
        query: edit ? { mode: "edit" } : {}, // Include mode=edit for edit mode
      })}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      pageSize={10}
    />
  );
};

export default CandidateTable;
