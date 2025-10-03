import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 2,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}) {
  const getVisiblePages = () => {
    const pages = [];

    if (totalPages <= maxVisiblePages! + 2) {
      // If total pages is small, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // Always show first page
    pages.push(1);

    let startPage, endPage;

    if (currentPage <= 3) {
      // Near the beginning
      startPage = 2;
      endPage = Math.min(maxVisiblePages!, totalPages - 1);
    } else if (currentPage >= totalPages - 2) {
      // Near the end
      startPage = Math.max(totalPages - maxVisiblePages! + 1, 2);
      endPage = totalPages - 1;
    } else {
      // In the middle
      startPage = currentPage - 1;
      endPage = currentPage + 1;
    }

    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pages.push("...");
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pages.push("...");
    }

    // Always show last page (if it's not already included)
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageClick = (page: string | number) => {
    if (page !== "..." && page !== currentPage) {
      onPageChange?.(Number(page));
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange?.(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange?.(currentPage + 1);
    }
  };

  const visiblePages = getVisiblePages();
  return (
    <div className="flex items-center justify-center space-x-1 flex-wrap gap-1">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`p-2 rounded-md border transition-colors ${
          currentPage === 1
            ? "bg-gray-700 text-gray-500 cursor-not-allowed border-gray-700"
            : "bg-gray-600 text-gray-50 hover:bg-gray-600 border-gray-600"
        }`}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>

      {visiblePages.map((page, index) => (
        <button
          key={index}
          type="button"
          onClick={() => handlePageClick(page)}
          disabled={page === "..."}
          className={`px-3 py-2 rounded-md border text-sm font-medium transition-colors ${
            page === currentPage
              ? "bg-orange-500 text-gray-50 border-orange-500"
              : page === "..."
                ? "bg-gray-600 text-gray-400 cursor-default border-gray-600"
                : "bg-gray-600 text-gray-500 hover:bg-gray-500 border-gray-600"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-md border transition-colors ${
          currentPage === totalPages
            ? "bg-gray-700 text-gray-500 cursor-not-allowed border-gray-700"
            : "bg-gray-600 text-gray-50 hover:bg-gray-600 border-gray-600"
        }`}
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

export default Pagination;