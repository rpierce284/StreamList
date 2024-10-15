import React, { useState } from 'react';

const StreamList = () => {
  const [input, setInput] = useState('');
  const [type, setType] = useState('Movie'); 
  const [entries, setEntries] = useState([]); 

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setEntries([...entries, { title: input, type }]);
    setInput('');
  };

  return (
    <div className="main-container">
      {/* Title Container */}
      <div className="title-container">
        <h1>Welcome to StreamList</h1>
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
            {entries.map((entry, index) => (
              <li key={index}>
                {entry.title} - <strong>{entry.type}</strong>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StreamList;
