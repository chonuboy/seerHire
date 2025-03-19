import { Columns } from "@/lib/definitions";
import { useState } from "react";
import { Table } from "./table";

const ClientTable = ({ clientTableData, clientTableColumns} :{clientTableData:any,clientTableColumns:Columns}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(clientTableData.content.length / 10); // Assuming 10 items per page

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const paginatedData = clientTableData.content.
  slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );

  return (
    <Table
      data={paginatedData}
      columns={clientTableColumns}
      getRowLink={(item, index) => `/clients/${item.clientId}`}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      pageSize={10}
    />
  );
};

export default ClientTable;