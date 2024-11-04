import React, { useState } from "react";
import axios from "axios";

const Login = ({ onLogin }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async () => {
		try {
			const response = await axios.post(
				"http://localhost:5000/auth/login",
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
			alert("Login failed!");
		}
	};

	return (
		<div>
			<input
				type="text"
				placeholder="Username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button onClick={handleLogin}>Login</button>
		</div>
	);
};

export default Login;
