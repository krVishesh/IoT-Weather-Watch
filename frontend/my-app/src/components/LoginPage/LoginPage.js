import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Login from "./Login";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="form-container">
        <h1>Login</h1>
        <Login onLogin={handleLoginSuccess} />
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;