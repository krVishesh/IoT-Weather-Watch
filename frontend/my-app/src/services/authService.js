const BASE_URL = "http://localhost:5000/api";

const authService = {
	signup: async (username, password) => {
		try {
			const response = await fetch(`${BASE_URL}/auth/signup`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, password }),
				credentials: "include", // Include credentials (cookies) in the request
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Signup failed");
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error("Error during signup:", error);
			throw error;
		}
	},

	login: async (username, password) => {
		try {
			const response = await fetch(`${BASE_URL}/auth/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, password }),
				credentials: "include", // Include credentials (cookies) in the request
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Login failed");
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error("Error during login:", error);
			throw error;
		}
	},

	logout: async () => {
		try {
			const response = await fetch(`${BASE_URL}/auth/logout`, {
				method: "GET",
				credentials: "include", // Include credentials (cookies) in the request
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Logout failed");
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error("Error during logout:", error);
			throw error;
		}
	},
};

export default authService;
