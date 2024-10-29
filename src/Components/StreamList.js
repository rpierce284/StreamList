import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './StreamList.css';

const StreamList = ({ cart, setCart }) => {
  const [input, setInput] = useState('');
  const [type, setType] = useState('Movie');
  const [entries, setEntries] = useState([]);
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newEntry = {
      id: uuidv4(),
      title: input,
      type,
      completed: false,
    };
    setEntries([...entries, newEntry]);
    setInput('');
  };

  const handleSubscriptionSelect = (subscription) => {
    setSelectedSubscription(subscription);
    const subscriptionItem = {
      ...subscription,
      id: uuidv4(),
      itemType: 'subscription',
    };
    setCart([...cart, subscriptionItem]);
    alert(`Added ${subscription.name} to cart for $${subscription.price.toFixed(2)}`);
  };

  // Adjust price based on the selected subscription
  const getPrice = () => {
    if (selectedSubscription?.name === 'Basic Plan') {
      return type === 'Movie' ? 5.33 : 5.33;
    } else if (selectedSubscription?.name === 'Premium Plan') {
      return type === 'Movie' ? 3.57 : 4.99;
    }
    return 5.99; // default price if no subscription is selected
  };

  const addToCart = (item) => {
    const newItem = {
      ...item,
      id: uuidv4(),
      price: item.price || getPrice(),
    };
    setCart([...cart, newItem]);
  };

  const handleAddToCart = (entry) => {
    const itemWithPrice = {
      ...entry,
      price: getPrice(),
    };
    addToCart(itemWithPrice);
    alert(`Added to cart with price: $${itemWithPrice.price.toFixed(2)}`);
  };

  return (
    <div className="main-container streamlist-page">
      {/* Title Container */}
      <div className="title-container">
        <h1>Welcome to StreamList</h1>
      </div>

      {/* Subscription Options */}
      <div className="subscription-container">
        <h2>Choose Your Subscription Plan</h2>
        <div className="subscription-options">
          <div className="subscription-option">
            <h3>Basic Plan</h3>
            <p>Price: $15.99</p>
            <p>Includes: 3 movies and 3 shows</p>
            <button onClick={() => handleSubscriptionSelect({ name: 'Basic Plan', price: 15.99 })}>
              Add Basic Plan to Cart
            </button>
          </div>
          <div className="subscription-option">
            <h3>Premium Plan</h3>
            <p>Price: $24.99</p>
            <p>Includes: 7 movies and 5 shows</p>
            <button onClick={() => handleSubscriptionSelect({ name: 'Premium Plan', price: 24.99 })}>
              Add Premium Plan to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="form-container">
        <form onSubmit={handleSubmit} className="streamlist-form">
          <div className="form-group">
            <input
              type="text"
              id="titleInput"
              value={input}
              onChange={handleInputChange}
              placeholder="Enter a Movie or Show"
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <select
              id="typeSelect"
              value={type}
              onChange={handleTypeChange}
              className="form-select"
            >
              <option value="Movie">Movie</option>
              <option value="Show">Show</option>
            </select>
          </div>
          <button type="submit" className="add-button">Add</button>
        </form>

        {/* Display the list of entries below the form */}
        <div className="entries-list">
          <h2>Your List</h2>
          <ul>
            {entries.map((entry) => (
              <li key={entry.id}>
                <span style={{ textDecoration: entry.completed ? 'line-through' : 'none' }}>
                  {entry.title} - <strong>{entry.type}</strong>
                </span>
                <button onClick={() => handleAddToCart(entry)}>Add to Cart</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StreamList;
