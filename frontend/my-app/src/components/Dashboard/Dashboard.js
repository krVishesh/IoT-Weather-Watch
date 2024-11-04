import React, { useEffect, useState } from "react";
import axios from "axios";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import GaugeChart from "react-gauge-chart";
import "./Dashboard.css";

const Dashboard = () => {
	const [data, setData] = useState([]);
	const [latestData, setLatestData] = useState({ temperature: 0, pressure: 0 });

	const fetchData = async () => {
		try {
			const endDate = new Date().toISOString().replace("Z", "");
			const startDate = new Date(Date.now() - 24 * 60 * 60 * 1000)
				.toISOString()
				.replace("Z", ""); // Last 24 hours
			const requestUrl = `http://localhost:5000/data/range?start=${startDate}&end=${endDate}`;
			console.log("Request URL:", requestUrl); // Debug log
			const response = await axios.get(requestUrl, {
				withCredentials: true, // Include credentials (cookies) in the request
			});
			console.log("API Response:", response.data); // Debug log
			setData(response.data);
			if (response.data.length > 0) {
				setLatestData(response.data[response.data.length - 1]);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="dashboard">
			<h1>IoT Weather Watch Dashboard</h1>
			<div className="gauges">
				<div className="gauge">
					<h3>Temperature</h3>
					<GaugeChart
						id="temperature-gauge"
						percent={latestData.temperature / 100}
					/>
				</div>
				<div className="gauge">
					<h3>Pressure</h3>
					<GaugeChart
						id="pressure-gauge"
						percent={latestData.pressure / 2000}
					/>
				</div>
			</div>
			<div className="charts">
				<ResponsiveContainer width="100%" height={400}>
					<LineChart data={data}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="timestamp" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Line type="monotone" dataKey="temperature" stroke="#8884d8" />
						<Line type="monotone" dataKey="pressure" stroke="#82ca9d" />
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};

export default Dashboard;
