import React, { useState } from "react";
import Item from "../item/Item";
import itemsData from "../../data/items.json";
import "./items.css";
import ItemModal from "../modal/ItemModal";
import Cart from "../cart/Cart";

const Items = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeTab, setActiveTab] = useState("items");
  const [cart, setCart] = useState([]);

  const openModal = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (item) => {
    const updatedCart = cart
      .map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      )
      .filter((cartItem) => cartItem.quantity > 0);
    setCart(updatedCart);
  };

  const calculateTotalPrice = (cart) => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const completeOrder = () => {
    sendOrderToBackend();
    setCart([]);
  };

  const sendOrderToBackend = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cart,
          totalPrice: calculateTotalPrice(cart),
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to complete order");
      }
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error sending order to backend:", error);
      alert("An error occurred while completing the order");
    }
  };

  return (
    <div className="container">
      <div className="tabs">
        <button onClick={() => setActiveTab("items")}>Items</button>
        <button onClick={() => setActiveTab("cart")}>
          Cart <span className="badge">{cart.length}</span>
        </button>
      </div>
      <h1>{activeTab}</h1>
      {activeTab === "items" && (
        <>
          <div className="item-list">
            {itemsData.map((item) => (
              <div
                className="item"
                key={item.id}
                onClick={() => openModal(item)}
              >
                <Item item={item} addToCart={addToCart} />
              </div>
            ))}
          </div>
          {selectedItem && (
            <ItemModal item={selectedItem} onClose={closeModal} />
          )}
        </>
      )}
      {activeTab === "cart" && (
        <Cart
          cart={cart}
          removeFromCart={removeFromCart}
          completeOrder={completeOrder}
        />
      )}
    </div>
  );
};

export default Items;
