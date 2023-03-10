import React from "react";
import { Good } from "../../types";
import heart from "../../images/heart.svg";

import "./GoodCard.css";

function GoodCard({ good }: { good: Good }) {
  return (
    <div key={good.id} className="card">
      <div className="image">
        <div className="like_svg">
          <img src={heart} alt="Like" />
        </div>
        <img className="goods_img" src={good.image} alt={good.title} />
      </div>
      <div className="good_category">{good.category}</div>
      <div className="title">{good.title}</div>
      <div className="description">{good.description}</div>
      <div className="price">${good.price}</div>
    </div>
  );
}

export default GoodCard;
