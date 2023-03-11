import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import GoodCard from "./components/GoodCard/GoodCard";
import GoodsFilters from "./components/GoodsFilters/GoodsFilters";
import GoodsSearching from "./components/GoodsSearching/GoodsSearching";
import GoodsSorting from "./components/GoodsSorting/GoodsSorting";
import Pagination from "./components/Pagination/Pagination";
import { Good } from "./types";

function App() {
  const [items, setItems] = useState<Good[]>([]);
  const [filteredData, setFilteredData] = useState<Good[]>([]);
  const [wordEntered, setWordEntered] = useState<string>("");
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const allPages = Math.ceil(filteredData.length / itemsPerPage);
  const [firstItem, setFirstItem] = useState<number>(1);
  const [lastItem, setLastItem] = useState<number>(6);
  const [currentCategory, setCurrentCategory] = useState("all categories");
  const [rangePrices, setRangePrices] = useState<[number, number]>([1, 1000]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then(
        (result) => {
          setItems(result);
          setFilteredData(result);
        },
        (error) => () => console.log(error)
      );
  }, []);

  const updateParams = useCallback(
    ({
      category,
      searchWord,
      rangePrices,
    }: {
      category: string;
      searchWord: string;
      rangePrices: [number, number];
    }) => {
      if (category === "all categories") {
        const newArray = items

          .filter(
            (item) =>
              item.price >= rangePrices[0] && item.price <= rangePrices[1]
          )
          .filter((item): boolean =>
            item.title.toLowerCase().includes(searchWord)
          );

        setFilteredData(newArray);
        setCurrentPage(1);
      } else {
        const newArray = items
          .filter((item) => item.category === category)
          .filter(
            (item) =>
              item.price >= rangePrices[0] && item.price <= rangePrices[1]
          )
          .filter((item): boolean =>
            item.title.toLowerCase().includes(searchWord)
          );

        setFilteredData(newArray);
        setCurrentPage(1);
      }
    },
    [items]
  );

  useEffect(() => {
    updateParams({
      category: currentCategory,
      searchWord: wordEntered,
      rangePrices,
    });
  }, [currentCategory, wordEntered, rangePrices, updateParams]);

  useEffect(() => {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = currentPage * itemsPerPage;
    setFirstItem(startItem);
    setLastItem(endItem);
  }, [currentPage]);

  const renderCards = useCallback(() => {
    const startItem = (currentPage - 1) * itemsPerPage;
    const endItem = currentPage * itemsPerPage;
    return filteredData.slice(startItem, endItem).map((item) => {
      return (
        <div key={item.id}>
          <GoodCard good={item} />
        </div>
      );
    });
  }, [filteredData, currentPage]);

  return (
    <div className="App">
      <div className="content">
        <div className="filters">
          <GoodsFilters
            setCurrentCategory={setCurrentCategory}
            currentCategory={currentCategory}
            rangePrices={rangePrices}
            setRangePrices={setRangePrices}
          />
        </div>
        <div className="search_goods">
          <div className="search">
            <GoodsSearching setWordEntered={setWordEntered} />
          </div>
          <div className="sorting">
            <GoodsSorting firstItem={firstItem} lastItem={lastItem} />
          </div>
          <div className="goods">{renderCards()}</div>
          <Pagination
            allPagesNumber={allPages}
            itemsPerPage={itemsPerPage}
            itemsNumber={filteredData.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
