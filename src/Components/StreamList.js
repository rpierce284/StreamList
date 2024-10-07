import React, { useState } from 'react';

const StreamList = () => {
  const [input, setInput] = useState('');

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = () => {
    console.log(input);
  };

  return (
    <div>
      <h1>StreamList</h1>
      <input type="text" value={input} onChange={handleInputChange} placeholder="Enter text" />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default StreamList;
