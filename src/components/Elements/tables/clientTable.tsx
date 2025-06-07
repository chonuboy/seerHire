import { Columns } from "@/lib/definitions";
import { useState } from "react";
import { Table } from "./table";

const ClientTable = ({ clientTableData, clientTableColumns,onPageChange,currentPage} :{clientTableData:any,clientTableColumns:Columns,onPageChange:(page: number) => void,currentPage?: number}) => {
 
  return (
    <Table
      data={clientTableData.content}
      columns={clientTableColumns}
      getRowLink={(item, index) => `/clients/${item.clientId}`}
      currentPage={currentPage}
      totalPages={clientTableData.totalPages}
      onPageChange={onPageChange}
    />
  );
};

export default ClientTable;