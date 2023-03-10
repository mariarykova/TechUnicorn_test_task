import React, { useEffect } from "react";

function Goods() {
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => console.log(json));
  }, []);

  return <div>Hello</div>;
}

export default Goods;
