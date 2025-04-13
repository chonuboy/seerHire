import Link from "next/link";
import React from "react";
import { deleteClient } from "@/api/master/clients";
import { deleteUser } from "@/api/users/users";
import { useRouter } from "next/router";
import { get } from "http";
// Define types for the Table component props
interface Column {
  Header: string;
  accessor: string;
  hiddenOnSmall?: boolean;
}

interface TableProps {
  columns: Column[];
  data: any[];
  getRowLink?: (
    item: any,
    index: number,
    mode?: string,
  ) => string | { pathname: string; query?: any };
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  pageSize?: number;
  isRecruitment?: boolean;
}

export const Table: React.FC<TableProps> = ({
  columns,
  data,
  getRowLink,
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  isRecruitment,
}) => {
  const router = useRouter();

  // Handle empty data or columns
  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-4">
        No data available
      </div>
    );
  }

  if (!columns || columns.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-4">
        No columns defined
      </div>
    );
  }

  return (
    <div className="rounded-lg border text-xs md:text-base border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800 overflow-hidden">
      <div className="flex flex-col">
        {/* Table Header */}
        <div
          className={`grid grid-cols-3 rounded-t-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-700 dark:to-blue-700 sm:grid-cols-5`}
          role="rowheader"
        >
          {columns.map((col, index) => (
            <div
              key={index}
              className={`p-3 xl:p-4 overflow-scroll text-wrap ${
                col.hiddenOnSmall ? "hidden sm:block" : "" 
              }` }
            >
              <h5 className="text-xs md:text-sm font-semibold uppercase tracking-wide text-gray-700 dark:text-gray-200">
                {col.Header}
              </h5>
            </div>
          ))}
        </div>

        {/* Table Rows */}
        {data.map((item, index) => {
          const rowContent = (
            <div
              className={`grid grid-cols-3 sm:grid-cols-5 transition-all duration-200 ease-in-out ${
                getRowLink
                  ? "hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                  : ""
              } border-b border-gray-100 dark:border-gray-700`}
              key={index}
              role="row"
            >
              {columns.map((col, colIndex) => (
                <div
                  key={colIndex}
                  className={`p-3 xl:p-4 flex items-center overflow-scroll text-ellipsis ${
                    col.hiddenOnSmall ? "hidden sm:block" : ""
                  }`}
                >
                  <p
                    className={`text-xs md:text-base font-light ${
                      item[col.accessor] === false
                        ? "bg-red-800  text-white px-2 py-1 rounded-lg font-semibold text-xs w-fit  dark:border-white"
                        : item[col.accessor] === true
                        ? "bg-green-500 text-white px-4 py-1 rounded-lg font-semibold text-xs w-fit  dark:border-white"
                        : "text-gray-700 dark:text-gray-200 text-xs"
                    }`}
                  >
                    {col.accessor === "fullName"
                      ? `${item.firstName} ${item.lastName}`
                      : item[col.accessor] === true
                      ? "Active"
                      : item[col.accessor] === false
                      ? "Inactive"
                      : item[col.accessor] === null
                      ? "-"
                      : item[col.accessor]}
                  </p>
                  {col.accessor === "roles[roles.length-1]" &&
                    item.roles.map((role: any) => (
                      <p
                        key={role.roleId}
                        className="text-md font-light text-gray-700 mb-3"
                      >
                        {role.roleName}
                      </p>
                    ))}
                  {col.Header === "Action" && (
                    <div>
                      <button className="bg-yellow-500 hover:bg-yellow-700 text-sm text-white font-bold py-1 px-4 rounded">
                        Update
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          );

          // If a link generator is provided, wrap the row in a Link component
          const rowLink = getRowLink && !isRecruitment
            ? getRowLink(item, index, "edit") // Pass 'edit' for edit mode
            : getRowLink && isRecruitment
            ? getRowLink(item, index):null // Pass 'edit' for edit mode;

          // If a link generator is provided, wrap the row in a Link component
          return rowLink ? (
            <Link href={rowLink} key={index}>
              {rowContent}
            </Link>
          ) : (
            rowContent
          );
        })}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700">
        <button
          onClick={() =>
            onPageChange && currentPage && onPageChange(currentPage - 1)
          }
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous Page"
        >
          Previous
        </button>
        <span className="text-sm text-gray-700 dark:text-gray-200">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            onPageChange && currentPage && onPageChange(currentPage + 1)
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next Page"
        >
          Next
        </button>
      </div>
    </div>
  );
};
