import React from "react";
import { setPage } from "../../Slices/MediaSlice";
import { useDispatch } from "react-redux";

const Pagination = ({
  currentPage,
  totalPages,
  pageRange = 5, // Customize the number of visible page buttons
}) => {
  const dispatch = useDispatch();

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) {
      return; // Prevent invalid page navigation
    }
    dispatch(setPage(pageNumber));
  };

  const renderNumbers = () => {
    const buttons = [];
    const showPrev = currentPage > 1;
    const showNext = currentPage < totalPages;

    // Use Math.ceil to ensure at least one page is displayed
    const maxButtons = Math.ceil(Math.min(pageRange, totalPages - 2));
    const halfButtons = Math.floor(maxButtons / 2);

    // Calculate minimum and maximum page numbers to display
    let startPage = Math.max(currentPage - halfButtons, 1);
    const endPage = Math.min(startPage + maxButtons - 1, totalPages);

    // Display "First" and "Last" buttons if needed
    if (startPage > 1) {
      buttons.push(
        <button key="first" onClick={() => handlePageChange(1)}>
          1
        </button>
      );
    }

    // Display ellipsis if pages are trimmed from the beginning
    if (startPage > 2) {
      buttons.push(
        <button
          key="ellipsis-start"
          onClick={() => handlePageChange(startPage - 1)}
        >
          ...
        </button>
      );
    }

    // Display page numbers within adjusted range
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          className={i === currentPage ? "active" : ""}
          onClick={() => handlePageChange(i)}
        >
          <div className="activeInnerLayer">{i}</div>
        </button>
      );
    }

    // Display ellipsis if pages are trimmed from the end
    if (endPage < totalPages - 1) {
      buttons.push(
        <button
          key="ellipsis-end"
          onClick={() => handlePageChange(endPage + 1)}
        >
          ...
        </button>
      );
    }

    // Display "Last" button if needed
    if (endPage < totalPages) {
      buttons.push(
        <button key="last" onClick={() => handlePageChange(totalPages)}>
          {totalPages}
        </button>
      );
    }

    return (
      <>
        {showPrev && (
          <button onClick={() => handlePageChange(currentPage - 1)}>
            Prev
          </button>
        )}
        {buttons}
        {showNext && (
          <button onClick={() => handlePageChange(currentPage + 1)}>
            Next
          </button>
        )}
      </>
    );
  };

  return <div className="paginationContainer">{renderNumbers()}</div>;
};

export default Pagination;
