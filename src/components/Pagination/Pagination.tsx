import React, { useMemo } from "react";
import chevronLeft from "../../images/chevron-left.svg";
import doubleArrowLeft from "../../images/double_arrow_left.svg";
import "./Pagination.css";

interface PaginationProps {
  allPagesNumber: number;
  itemsPerPage: number;
  itemsNumber: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = (props) => {
  const renderPages = useMemo(() => {
    const pagesNumber: number[] = [];
    for (let i = 1; i <= props.allPagesNumber; i++) {
      pagesNumber.push(i);
    }
    return pagesNumber;
  }, [props.allPagesNumber]);

  const onFirstPage = (): void => {
    props.setCurrentPage(1);
  };

  const onLastPage = (): void => {
    props.setCurrentPage(props.allPagesNumber);
  };

  const onNextPage = (): void => {
    props.setCurrentPage(props.currentPage + 1);
  };

  const onPreviousPage = (): void => {
    props.setCurrentPage(props.currentPage - 1);
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
            className={props.currentPage === page ? "page_active" : "page"}
            onClick={() => {
              props.setCurrentPage(page);
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
