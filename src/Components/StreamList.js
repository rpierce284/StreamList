import React, { useState } from 'react';

const StreamList = () => {
  const [input, setInput] = useState('');
  const [type, setType] = useState('Movie'); // Default selection is "Movie"
  const [entries, setEntries] = useState([]); // State to hold the list of entries

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add the new entry to the list
    setEntries([...entries, { title: input, type }]);
    // Clear the input field
    setInput('');
  };

  return (
    <div className="form-container">
      <h1>Welcome to StreamList</h1>
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
          {entries.map((entry, index) => (
            <li key={index}>
              {entry.title} - <strong>{entry.type}</strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StreamList;

