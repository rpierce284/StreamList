import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

// Function to generate a random salt
const generateSalt = (length = 16) => {
  return [...Array(length)].map(() => Math.floor(Math.random() * 36).toString(36)).join('');
};

// Function to hash the password using SHA-256 with salt
const hashPassword = async (password, salt) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(salt + password); // Concatenate salt with the password
  const hash = await crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(hash))); // Convert to base64
};

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Function to validate the password
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]:;"'<>,.?/~`|\\]).{8,}$/;
    return regex.test(password);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Check if the password meets the requirements
    if (!validatePassword(password)) {
      setError('Password must contain at least 1 capital letter, 1 number, and 1 special character');
      return;
    }

    try {
      // Generate a unique salt
      const salt = generateSalt();
      // Hash the password with the salt
      const hashedPassword = await hashPassword(password, salt);

      // Store the salt and hashed password in localStorage (for testing purposes)
      localStorage.setItem(email, JSON.stringify({ salt, hashedPassword }));

      setSuccess('User created successfully!');
      setTimeout(() => navigate('/login'), 2000); // Redirect to login after 2 seconds
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSignup}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
