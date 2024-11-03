import React, { useState } from 'react';
import './LoginPage.css';
import authService from '../../services/authService';
import { validateEmail, validatePassword } from '../../utils/validation';
import Heading from '../Heading/Heading';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email) || !validatePassword(password)) {
      setError('Invalid email or password');
      return;
    }
    try {
      await authService.login(email, password);
      // Redirect to dashboard or another page
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <div className="login-page">
      <div className="form-container">
        <Heading text="Login" />
        <form onSubmit={handleLogin}>
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
          {error && <p className="error">{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;