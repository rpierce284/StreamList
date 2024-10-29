import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import StreamList from './Components/StreamList';
import Movies from './Components/Movies';
import Shows from './Components/Shows'; 
import Cart from './Components/Cart';
import About from './Components/About';
import Login from './Components/Login';
import Signup from './Components/Signup';

function App() {
  const [cart, setCart] = useState([]); // Initialize cart as an empty array

  return (
    <Router>
      <div>
        <Navbar cart={cart.length} /> {/* Pass the cart count to Navbar */}
        <Routes>
          <Route path="/" element={<StreamList cart={cart} setCart={setCart} />} />
          <Route path="/movies" element={<Movies cart={cart} setCart={setCart} />} />
          <Route path="/shows" element={<Shows cart={cart} setCart={setCart} />} /> 
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
