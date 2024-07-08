import React from "react";
import "./Cart.css";

const Cart = ({ cart, removeFromCart, completeOrder }) => {
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart">
      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <span>{item.name}</span>
          <span>Quantity: {item.quantity}</span>
          <button onClick={() => removeFromCart(item)}>Remove</button>
        </div>
      ))}
      <div className="total">Total: ${(totalPrice / 100).toFixed(2)}</div>
      <button onClick={completeOrder} disabled={cart.length === 0}>
        Complete Order
      </button>
    </div>
  );
};

export default Cart;
