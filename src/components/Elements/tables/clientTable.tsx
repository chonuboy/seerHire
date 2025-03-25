import { Columns } from "@/lib/definitions";
import { useState } from "react";
import { Table } from "./table";

const ClientTable = ({ clientTableData, clientTableColumns,onPageChange} :{clientTableData:any,clientTableColumns:Columns,onPageChange:(page: number) => void}) => {
 
  return (
    <Table
      data={clientTableData.content}
      columns={clientTableColumns}
      getRowLink={(item, index) => `/clients/${item.clientId}`}
      currentPage={clientTableData.currentPage+1}
      isPaginated
      totalPages={clientTableData.totalPages}
      onPageChange={onPageChange}
    />
  );
};

export default ClientTable;