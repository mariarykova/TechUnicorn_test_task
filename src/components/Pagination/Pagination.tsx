import React, { useEffect, useState, useMemo } from "react";
import chevronLeft from "../../images/chevron-left.svg";
import doubleArrowLeft from "../../images/double_arrow_left.svg";
import "./Pagination.css";

interface PaginationProps {
  allPagesNumber: number;
  itemsPerPage: number;
  itemsNumber: number;
  pageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = (props) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    props.pageChange(currentPage);
  }, [currentPage, props]);

  const renderPages = useMemo(() => {
    const pagesNumber: number[] = [];
    for (let i = 1; i <= props.allPagesNumber; i++) {
      pagesNumber.push(i);
    }
    return pagesNumber;
  }, [props.allPagesNumber]);

  const onFirstPage = (): void => {
    setCurrentPage(1);
  };

  const onLastPage = (): void => {
    setCurrentPage(props.allPagesNumber);
  };

  const onNextPage = (): void => {
    setCurrentPage(currentPage + 1);
  };

  const onPreviousPage = (): void => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="pagination__container">
      <div onClick={() => onFirstPage()}>
        <img src={doubleArrowLeft} alt="doubleArrowLeft" />
      </div>
      <div onClick={() => onPreviousPage()}>
        <img src={chevronLeft} alt="chevronLeft" />
      </div>
      {renderPages.map((page, index) => {
        return (
          <button
            key={index}
            className={currentPage === page ? "page_active" : "page"}
            onClick={() => {
              props.pageChange(page);
              setCurrentPage(page);
            }}
          >
            {page}
          </button>
        );
      })}
      <div onClick={() => onNextPage()}>
        <img src={chevronLeft} alt="" className="arrow_right" />
      </div>
      <div onClick={() => onLastPage()}>
        <img
          src={doubleArrowLeft}
          alt="doubleArrowLeft"
          className="double_arrow_right"
        />
      </div>
    </div>
  );
};

export default Pagination;
