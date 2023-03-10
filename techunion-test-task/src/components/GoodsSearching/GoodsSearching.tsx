import React from "react";
import { Input, Space } from "antd";
import "./GoodsSearching.css";
const { Search } = Input;

const GoodsSearching = ({
  handleSearch,
}: {
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div>
      <Search
        placeholder="Search products"
        onSearch={(value) => console.log(value)}
        onChange={(value) => handleSearch(value)}
        style={{ width: 920 }}
      />
    </div>
  );
};

export default GoodsSearching;
