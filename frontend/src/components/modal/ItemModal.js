import React from "react";
import "./ItemModal.css";

const ItemModal = ({ item, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <img src={item.imageUrl} alt={item.name} />
        <h2>{item.name}</h2>
        <p>{item.description}</p>
        <p>Price: ${item.price / 100}</p>
      </div>
    </div>
  );
};

export default ItemModal;
