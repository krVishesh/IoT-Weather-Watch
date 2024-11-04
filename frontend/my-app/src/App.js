import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import SignupPage from "./components/SignupPage/SignupPage";
import Dashboard from "./components/Dashboard/Dashboard";

const App = () => {
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignupPage />} />
					<Route path="/dashboard" element={<Dashboard />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
