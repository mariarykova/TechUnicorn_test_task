import React from "react";
import "./GoodsSorting.css";

const GoodsSorting = ({
  lastItem,
  firstItem,
}: {
  lastItem: number;
  firstItem: number;
}) => {
  return (
    <div className="sorting">
      <div>
        Showing {firstItem}-{lastItem} Results
      </div>
    </div>
  );
};

export default GoodsSorting;
