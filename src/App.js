import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar'; // Make sure this is a default export
import StreamList from './Components/StreamList'; // Make sure this is a default export
import Movies from './Components/Movies'; // Make sure this is a default export
import Cart from './Components/Cart'; // Make sure this is a default export
import About from './Components/About'; // Make sure this is a default export
import Login from './Components/Login'; // Make sure this is a default export
import Signup from './Components/Signup'; // Make sure this is a default export

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<StreamList />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



