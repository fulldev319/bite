import React from "react";
import "./item.css";

const Item = ({ item, addToCart }) => {
  return (
    <div className="item-card">
      <img src={item.imageUrl} alt={item.name} />
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p>Price: ${item.price / 100}</p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          addToCart(item);
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Item;
