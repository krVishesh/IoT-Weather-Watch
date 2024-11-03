import React, { useState } from 'react';
import './SignupPage.css';
import authService from '../../services/authService';
import { validateEmail, validatePassword } from '../../utils/validation';
import Heading from '../Heading/Heading';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateEmail(email) || !validatePassword(password) || password !== confirmPassword) {
      setError('Invalid email or password');
      return;
    }
    try {
      await authService.signup(email, password);
      // Redirect to login or another page
    } catch (err) {
      setError('Signup failed');
    }
  };

  return (
    <div className="signup-page">
      <div className="form-container">
        <Heading text="Signup" />
        <form onSubmit={handleSignup}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;