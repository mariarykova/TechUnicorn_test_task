import React from "react";
import { Input } from "antd";
import "./GoodsSearching.css";
const { Search } = Input;

const GoodsSearching = ({
  setWordEntered,
}: {
  setWordEntered: (value: string) => void;
}) => {
  return (
    <div className="section_search">
      <Search
        placeholder="Search products"
        onChange={(value) => {
          setWordEntered(value.target.value);
        }}
        className="search_input"
      />
    </div>
  );
};

export default GoodsSearching;
