import React, { useEffect, useState } from "react";
import filter from "../../images/filter.svg";
import { Slider } from "antd";
import "./GoodFilters.css";
import arrow from "../../images/arrow.svg";

function GoodsFilters({
  setCurrentCategory,
  filteredGoodsByCategory,
  isPickedCategory,
  currentCategory,
  setRangePrices,
  rangePrices,
  filterByPriceRange,
}: {
  setCurrentCategory: (category: string) => void;
  filteredGoodsByCategory: (category: string) => void;
  isPickedCategory: boolean;
  currentCategory: string;
  rangePrices: [number, number];
  setRangePrices: (value: [number, number]) => void;
  filterByPriceRange: (value: [number, number]) => void;
}) {
  const [categories, setCategories] = useState([]);

  const onChange = (value: [number, number]) => {
    console.log("onChange: ", value);
    setRangePrices(value);
    filterByPriceRange(value);
  };

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((result) => {
        setCategories(result);
      });
  }, []);

  const renderCategories = () => {
    return categories.map((category) => {
      return (
        <div
          className={
            currentCategory === category ? "category_picked" : "category"
          }
          onClick={() => {
            setCurrentCategory(category);
            filteredGoodsByCategory(category);
          }}
        >
          <div>{category}</div>
          <img src={arrow} alt="arrow" />
        </div>
      );
    });
  };

  return (
    <div>
      <div className="price_range">
        <div className="price_header">
          <div className="title">Price</div>
          <img src={filter} alt="Filter" />
        </div>
        <div className="price_range_controller">
          <Slider
            range
            step={5}
            defaultValue={rangePrices}
            onChange={onChange}
            max={1000}
            min={1}
          />
          <div className="range">
            <div>Range</div>
            <div>
              ${rangePrices[0]} - ${rangePrices[1]}
            </div>
          </div>
        </div>
      </div>
      <div className="categories">
        <div className="title">Categories</div>
        <div className="all_categories">
          <div
            className={
              currentCategory === "all categories"
                ? "category_picked"
                : "category"
            }
            onClick={() => {
              setCurrentCategory("all categories");
              filteredGoodsByCategory("all categories");
            }}
          >
            all categories
          </div>
          {renderCategories()}
        </div>
      </div>
    </div>
  );
}

export default GoodsFilters;
