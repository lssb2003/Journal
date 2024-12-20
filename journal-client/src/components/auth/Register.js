import React, { useState } from 'react';
import axios from 'axios';
import { sharedStyles, combineStyles } from '../styles/shared-styles';

function Register({ onRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/users', {
        user: {
          username,
          password,
        }
      });
      
      console.log('Registration response:', response);  // Add this for debugging
      
      if (response.data.message) {
        setMessage('Registration successful! Please log in.');
        onRegister();
      }
    } catch (error) {
      console.error('Registration error details:', error.response || error);  // Enhanced error logging
      if (error.response?.data?.errors) {
        setMessage('Error: ' + error.response.data.errors.join(', '));
      } else {
        setMessage('An unknown error occurred. Please try again.');
      }
    }
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          input:focus {
            outline: none;
            border-color: #ffc5a8 !important;
            box-shadow: 0 0 0 2px rgba(255, 139, 95, 0.2) !important;
          }
        `}
      </style>
      <h2 style={styles.heading}>Register</h2>
      <form onSubmit={handleRegister} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Email address:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            placeholder="Enter your email"
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            placeholder="Create a password"
            required
          />
        </div>
        <div style={styles.buttonGroup}>
          <button 
            type="submit" 
            style={combineStyles(styles.button, styles.successButton)}
          >
            Register
          </button>
        </div>
      </form>
      {message && (
        <p style={combineStyles(
          styles.message,
          message.includes('successful') ? styles.successMessage : styles.errorMessage
        )}>
          {message}
        </p>
      )}
    </div>
  );
}

const styles = {
  ...sharedStyles,
  container: {
    ...sharedStyles.container,
    maxWidth: '500px',
  }  
};

export default Register;






