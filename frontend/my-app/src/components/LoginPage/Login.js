import React, { useState } from "react";
import axios from "axios";

const Login = ({ onLogin }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				"http://localhost:5000/api/auth/login",
				{
					username,
					password,
				},
				{ withCredentials: true }
			);
			if (response.status === 200) {
				onLogin(); // Update your app's state to reflect the logged-in status
			}
		} catch (error) {
			console.error("Login failed:", error);
			setError("Login failed!");
		}
	};

	return (
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
	);
};

export default Login;
