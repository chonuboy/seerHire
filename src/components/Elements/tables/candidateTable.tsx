import React, { useEffect, useState } from "react";
import { Table } from "./table";
import { Columns } from "@/lib/definitions";

const CandidateTable = ({
  candidateTableData,
  candidateTableColumns,
  currentPage,
  onPageChange,
}: {
  candidateTableData: any;
  candidateTableColumns: Columns;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}) => {

  return (
    <Table
      data={candidateTableData.content}
      columns={candidateTableColumns}
      getRowLink={(item, index, edit) => ({
        pathname: `/candidates/${item.contactId}`,
        query: edit ? { mode: "edit" } : {}, // Include mode=edit for edit mode
      })}
      isPaginated
      currentPage={currentPage}
      totalPages={candidateTableData.totalPages}
      onPageChange={onPageChange}
    />
  );
};

export default CandidateTable;