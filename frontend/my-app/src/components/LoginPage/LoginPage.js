import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import "./LoginPage.css";

const LoginPage = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			await authService.login(username, password);
			// Redirect to the dashboard after successful login
			navigate("/dashboard");
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div className="login-page">
			<div className="form-container">
				<h1>Login</h1>
				<form onSubmit={handleLogin}>
					<div>
						<label>Username:</label>
						<input
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
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
