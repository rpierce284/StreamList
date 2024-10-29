import React, { useState } from 'react';
import './Cart.css';

const Cart = ({ cart, setCart }) => {
  // Handle changing the quantity of an item
  const handleQuantityChange = (id, newQuantity) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
  };

  // Handle removing an item from the cart
  const handleRemove = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul className="cart-list">
          {cart.map((item) => (
            <li key={item.id} className="cart-item">
              <div className="item-details">
                <h3>{item.name || item.title}</h3>
                <p>${item.price.toFixed(2)}</p>
                <label>
                  Quantity:
                  <input
                    type="number"
                    min="1"
                    value={item.quantity || 1}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10))}
                  />
                </label>
                <button onClick={() => handleRemove(item.id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="cart-total">
        <h3>Total: ${calculateTotal()}</h3>
      </div>
    </div>
  );
};

export default Cart;
