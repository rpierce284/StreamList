import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import UUID package

const StreamList = () => {
  const [input, setInput] = useState('');
  const [type, setType] = useState('Movie');
  const [entries, setEntries] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editInput, setEditInput] = useState('');

  // Handle Input Change
  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  // Handle Type Change (Movie or Show)
  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  // Handle Submission of New Entries
  const handleSubmit = (event) => {
    event.preventDefault();
    const newEntry = {
      id: uuidv4(),
      title: input,
      type,
      completed: false,
    };
    setEntries([...entries, newEntry]);
    setInput(''); // Clear input field
  };

  // Handle Marking as Completed
  const handleComplete = (id) => {
    setEntries(
      entries.map((entry) =>
        entry.id === id ? { ...entry, completed: !entry.completed } : entry
      )
    );
  };

  // Handle Deleting an Entry
  const handleDelete = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  // Handle Editing an Entry
  const handleEdit = (id, currentTitle) => {
    setEditingId(id); // Set the id of the entry being edited
    setEditInput(currentTitle); // Pre-fill the edit input with current title
  };

  // Handle Save After Edit
  const handleSaveEdit = (id) => {
    setEntries(
      entries.map((entry) =>
        entry.id === id ? { ...entry, title: editInput } : entry
      )
    );
    setEditingId(null); // Exit edit mode
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
            {entries.map((entry) => (
              <li key={entry.id}>
                {editingId === entry.id ? (
                  <>
                    <input
                      type="text"
                      value={editInput}
                      onChange={(e) => setEditInput(e.target.value)}
                      className="edit-input"
                    />
                    <button className="save-button" onClick={() => handleSaveEdit(entry.id)}>Save</button>
                  </>
                ) : (
                  <>
                    <span
                      style={{
                        textDecoration: entry.completed ? 'line-through' : 'none',
                      }}
                    >
                      {entry.title} - <strong>{entry.type}</strong>
                    </span>
                    <button onClick={() => handleComplete(entry.id)}>
                      {entry.completed ? 'Undo' : 'Complete'}
                    </button>
                    <button onClick={() => handleEdit(entry.id, entry.title)}>Edit</button>
                    <button onClick={() => handleDelete(entry.id)}>Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StreamList;
