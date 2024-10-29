import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; // Import UUID package
import './Movies.css'; // Import the Movies.css file for styling

const Movies = ({ cart, setCart }) => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  useEffect(() => {
    // Fetch popular movies from TMDb API
    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=61857dda9750c8d2c9336724a7eacb2e`
        );
        const moviesWithUUID = response.data.results.map(movie => ({
          ...movie,
          uuid: uuidv4() // Assign UUID to each movie
        }));
        setPopularMovies(moviesWithUUID);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    };

    // Fetch top-rated movies from TMDb API
    const fetchTopRatedMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=61857dda9750c8d2c9336724a7eacb2e`
        );
        const moviesWithUUID = response.data.results.map(movie => ({
          ...movie,
          uuid: uuidv4() // Assign UUID to each movie
        }));
        setTopRatedMovies(moviesWithUUID);
      } catch (error) {
        console.error('Error fetching top-rated movies:', error);
      }
    };

    fetchPopularMovies();
    fetchTopRatedMovies();
  }, []);

  // Function to handle adding movies to the cart with subscription pricing
  const handleAddToCart = (item, price) => {
    const newItem = { ...item, price, id: uuidv4() };
    setCart((prevCart) => [...prevCart, newItem]);
    alert(`${item.title || item.name} added to cart for $${price}`);
  };
  

  return (
    <div className="movies-container">
      {/* Popular Movies Section */}
      <h1>Popular Movies</h1>
      <ul className="movies-list">
        {popularMovies.map((movie) => (
          <li key={movie.uuid} className="movie-item">
            <h2>{movie.title}</h2>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
            <p>$5.99</p> {/* Display price for popular movies */}
            <button
              className="add-to-cart-button"
              onClick={() => handleAddToCart(movie, 5.99)}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>

      {/* Top Rated Movies Section */}
      <h1>Top Rated Movies</h1>
      <ul className="movies-list">
        {topRatedMovies.map((movie) => (
          <li key={movie.uuid} className="movie-item">
            <h2>{movie.title}</h2>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
            <p>$3.99</p> {/* Display price for top-rated movies */}
            <button
              className="add-to-cart-button"
              onClick={() => handleAddToCart(movie, 3.99)}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;
