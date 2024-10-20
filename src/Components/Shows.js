import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import './Shows.css'; 

const Shows = () => {
  const [popularShows, setPopularShows] = useState([]);
  const [topRatedShows, setTopRatedShows] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchPopularShows = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/popular?api_key=61857dda9750c8d2c9336724a7eacb2e`
        );
        const showsWithUUID = response.data.results.map(show => ({
          ...show,
          uuid: uuidv4()
        }));
        setPopularShows(showsWithUUID);
      } catch (error) {
        console.error('Error fetching popular shows:', error);
      }
    };

    const fetchTopRatedShows = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/top_rated?api_key=61857dda9750c8d2c9336724a7eacb2e`
        );
        const showsWithUUID = response.data.results.map(show => ({
          ...show,
          uuid: uuidv4()
        }));
        setTopRatedShows(showsWithUUID);
      } catch (error) {
        console.error('Error fetching top-rated shows:', error);
      }
    };

    fetchPopularShows();
    fetchTopRatedShows();
  }, []);

  const handleAddToCart = (show, price) => {
    const newCartItem = { ...show, price };
    setCart([...cart, newCartItem]);
    alert(`${show.name} added to cart for $${price}`);
  };

  return (
    <div className="shows-container">
      <h1>Popular TV Shows</h1>
      <ul className="shows-list">
        {popularShows.map(show => (
          <li key={show.uuid} className="show-item">
            <h2>{show.name}</h2>
            <img
              src={`https://image.tmdb.org/t/p/w200${show.poster_path}`}
              alt={show.name}
              className="show-poster"
            />
            <p>$5.99</p>
            <button
              className="add-to-cart-button"
              onClick={() => handleAddToCart(show, 5.99)}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>

      <h1>Top Rated TV Shows</h1>
      <ul className="shows-list">
        {topRatedShows.map(show => (
          <li key={show.uuid} className="show-item">
            <h2>{show.name}</h2>
            <img
              src={`https://image.tmdb.org/t/p/w200${show.poster_path}`}
              alt={show.name}
              className="show-poster"
            />
            <p>$3.99</p>
            <button
              className="add-to-cart-button"
              onClick={() => handleAddToCart(show, 3.99)}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Shows;
