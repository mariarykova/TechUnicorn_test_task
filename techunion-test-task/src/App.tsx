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
  const [isPickedCategory, setIsPickedCategory] = useState<boolean>(false);

  const [rangePrices, setRangePrices] = useState<[number, number]>([1, 1000]);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    console.log(startItem);
    const endItem = currentPage * itemsPerPage;
    setFirstItem(startItem);
    setLastItem(endItem);
  };

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

  const filteredGoodsByCategory = useCallback(
    (category: string) => {
      const result = items.filter((item) => item.category === category);
      setFilteredData(result);

      if (category === "all categories") {
        setFilteredData(items);
      }

      setCurrentPage(1);
    },
    [items]
  );

  const handleFilter = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    const searchWord: string = target.value.toLowerCase();
    setWordEntered(searchWord);

    const newFilter: Good[] = items.filter((item): boolean =>
      item.title.toLowerCase().includes(searchWord)
    );

    // if (!searchWord) return setFilteredData(items);
    setFilteredData(newFilter);
    setCurrentPage(1);
  };

  const renderCards = useCallback(() => {
    const startItem = (currentPage - 1) * itemsPerPage;
    const endItem = currentPage * itemsPerPage;
    return filteredData.slice(startItem, endItem).map((item) => {
      return <GoodCard good={item} />;
    });
  }, [filteredData, currentPage]);

  const filterByPriceRange = useCallback(
    (value: [number, number]) => {
      const result = items.filter(
        (item) => item.price >= value[0] && item.price <= value[1]
      );

      setFilteredData(result);
      setCurrentPage(1);
    },
    [items]
  );

  return (
    <div className="App">
      <div className="content">
        <div className="filters">
          <GoodsFilters
            setCurrentCategory={setCurrentCategory}
            filteredGoodsByCategory={filteredGoodsByCategory}
            isPickedCategory={isPickedCategory}
            currentCategory={currentCategory}
            rangePrices={rangePrices}
            setRangePrices={setRangePrices}
            filterByPriceRange={filterByPriceRange}
          />
        </div>
        <div className="search_goods">
          <div className="search">
            <GoodsSearching handleSearch={handleFilter} />
          </div>
          <div className="sorting">
            <GoodsSorting firstItem={firstItem} lastItem={lastItem} />
          </div>
          <div className="goods">{renderCards()}</div>
          <Pagination
            allPagesNumber={allPages}
            itemsPerPage={itemsPerPage}
            itemsNumber={filteredData.length}
            pageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
