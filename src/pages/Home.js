import React, { useState } from "react";
import AddIcon from "../assets/addIcon.png";
import BookmarkIcon from "../assets/bookmarkIcon.png";
import Loader from "../components/Loader";

export default function Home({ frequentItems, loading }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil((frequentItems?.length || 0) / itemsPerPage);

  const currentItems = frequentItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPaginationRange = () => {
    // this is ths total number of buttons that you want show for pagination
    const totalVisible = 5;
    const range = [];

    if (totalPages <= totalVisible) {
      // Show all pages if total pages are less than or equal to the visible count
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      // Add first page
      range.push(1);

      // Add ellipsis if needed before current page range
      if (currentPage > 3) range.push("...");

      // Add current page range
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        range.push(i);
      }

      // Add ellipsis if needed after current page range
      if (currentPage < totalPages - 2) range.push("...");

      // Add last page
      range.push(totalPages);
    }

    return range;
  };

  return (
    <div className="bg-white">
      {loading ? (
        <Loader />
      ) : (
        <main className="container mx-auto p-4">
          <div className="overflow-x-auto h-full max-h-[80vh] overflow-y-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-[#e2eafa]">
                <tr>
                  <th className="p-4 text-left text-[12px] font-satoshi font-medium text-[#5C657D]">
                    SL
                  </th>
                  <th className="p-4 text-left text-[12px] font-satoshi font-medium text-[#5C657D]">
                    New Releases({frequentItems?.length || 0})
                  </th>
                  <th className="p-4 text-left text-[12px] font-satoshi font-medium text-[#5C657D]">
                    Range
                  </th>
                  <th className="p-4 text-left text-[12px] font-satoshi font-medium text-[#5C657D]">
                    Unit
                  </th>
                  <th className="p-4 text-left text-[12px] font-satoshi font-medium text-[#5C657D]">
                    Coverage
                  </th>
                  <th className="p-4 text-left text-[12px] font-satoshi font-medium text-[#5C657D]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr
                    key={item?.id}
                    id={item?.id}
                    className={`bg-white ${
                      index !== currentItems.length - 1
                        ? "border-b border-[#EAECF0]"
                        : ""
                    }`}
                  >
                    <td className="px-4 py-5 text-[14px] font-satoshi font-medium text-[#656E85]">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="px-4 py-5 text-[14px] font-satoshi font-bold text-[#030229]">
                      <div>
                        <div>{item?.title}</div>
                        <div className="text-[12px] font-medium text-[#2D9017]">
                          {item?.cat}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-5 text-[14px] font-satoshi font-bold text-[#192648]">
                      <div className="text-[12px] font-medium text-[#2D9017]">
                        {item?.subset}
                      </div>
                    </td>
                    <td className="px-4 py-5 text-[14px] font-satoshi font-medium text-[#656E85]">
                      {item?.unit}
                    </td>
                    <td className="px-4 py-5 text-[14px] font-satoshi font-medium text-[#656E85]">
                      {item?.datatype}
                    </td>
                    <td className="px-4 py-5 text-[14px] font-satoshi font-medium text-[#192648]">
                      <div className="flex justify-center items-center gap-2">
                        <img
                          className="cursor-pointer h-7 w-7"
                          src={AddIcon}
                          alt="add Icon"
                        />
                        <img
                          className="cursor-pointer h-7 w-7"
                          src={BookmarkIcon}
                          alt="book Icon"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-indigo-500"
              }`}
            >
              Previous
            </button>
            {getPaginationRange().map((page, idx) =>
              page === "..." ? (
                <span
                  key={idx}
                  className="px-4 py-2 text-sm font-semibold text-gray-500"
                >
                  ...
                </span>
              ) : (
                <button
                  key={idx}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 text-sm font-semibold rounded-md ${
                    currentPage === page
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-indigo-500 hover:text-white"
                  }`}
                >
                  {page}
                </button>
              )
            )}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-indigo-500"
              }`}
            >
              Next
            </button>
          </div>
        </main>
      )}
    </div>
  );
}
