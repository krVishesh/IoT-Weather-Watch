import React, { useEffect, useState, useCallback } from "react";
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Dashboard.css";
import authService from "../../services/authService";

const Dashboard = () => {
	const [data, setData] = useState([]);
	const [latestData, setLatestData] = useState({ temperature: 0, pressure: 0 });
	const [startDate, setStartDate] = useState(
		new Date(Date.now() - 24 * 60 * 60 * 1000)
	);
	const [endDate, setEndDate] = useState(new Date());

	const processData = useCallback(
		(data) => {
			const interval = 20 * 60 * 1000; // 20 minutes in milliseconds
			const groupedData = [];
			let currentIntervalStart = new Date(startDate).getTime();
			let currentIntervalEnd = currentIntervalStart + interval;
			let currentGroup = [];

			data.forEach((entry) => {
				const entryTime = new Date(entry.timestamp).getTime();
				if (
					entryTime >= currentIntervalStart &&
					entryTime < currentIntervalEnd
				) {
					currentGroup.push(entry);
				} else {
					if (currentGroup.length > 0) {
						const averageTemperature =
							currentGroup.reduce((sum, item) => sum + item.temperature, 0) /
							currentGroup.length;
						const averagePressure =
							currentGroup.reduce((sum, item) => sum + item.pressure, 0) /
							currentGroup.length;
						groupedData.push({
							timestamp: new Date(currentIntervalStart).toISOString(),
							temperature: averageTemperature,
							pressure: averagePressure,
						});
					}
					currentIntervalStart = currentIntervalEnd;
					currentIntervalEnd = currentIntervalStart + interval;
					currentGroup = [entry];
				}
			});

			// Add the last group if it has any entries
			if (currentGroup.length > 0) {
				const averageTemperature =
					currentGroup.reduce((sum, item) => sum + item.temperature, 0) /
					currentGroup.length;
				const averagePressure =
					currentGroup.reduce((sum, item) => sum + item.pressure, 0) /
					currentGroup.length;
				groupedData.push({
					timestamp: new Date(currentIntervalStart).toISOString(),
					temperature: averageTemperature,
					pressure: averagePressure,
				});
			}

			return groupedData;
		},
		[startDate]
	);

	const fetchData = useCallback(async () => {
		try {
			const formattedStartDate = startDate.toISOString().replace("Z", "");
			const formattedEndDate = endDate.toISOString().replace("Z", "");
			const requestUrl = `http://localhost:5000/data/range?start=${formattedStartDate}&end=${formattedEndDate}`;
			console.log("Request URL:", requestUrl); // Debug log
			const response = await axios.get(requestUrl, {
				withCredentials: true, // Include credentials (cookies) in the request
			});
			console.log("API Response:", response.data); // Debug log
			const processedData = processData(response.data);
			setData(processedData);
			if (response.data.length > 0) {
				setLatestData(response.data[response.data.length - 1]);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	}, [startDate, endDate, processData]);

	const fetchLatestData = useCallback(async () => {
		try {
			const response = await axios.get("http://localhost:5000/data/latest", {
				withCredentials: true, // Include credentials (cookies) in the request
			});
			if (response.data) {
				setLatestData(response.data);
			}
		} catch (error) {
			console.error("Error fetching latest data:", error);
		}
	}, []);

	useEffect(() => {
		fetchData();
		const interval = setInterval(fetchLatestData, 5000);
		return () => clearInterval(interval);
	}, [fetchData, fetchLatestData]);

	const handleLogout = async () => {
		try {
			await authService.logout();
			// Redirect to the login page after successful logout
			window.location.href = "/login";
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	const downloadCSV = async () => {
		try {
			const formattedStartDate = startDate.toISOString().replace("Z", "");
			const formattedEndDate = endDate.toISOString().replace("Z", "");
			const response = await axios.get(
				`http://localhost:5000/data/download?start=${formattedStartDate}&end=${formattedEndDate}`,
				{
					responseType: "blob",
					withCredentials: true, // Include credentials (cookies) in the request
				}
			);
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", "data.csv");
			document.body.appendChild(link);
			link.click();
		} catch (error) {
			console.error("Error downloading CSV:", error);
		}
	};

	return (
		<div className="dashboard">
			<div className="header">
				<h1>IoT Weather Watch Dashboard</h1>
				<button className="logout-button" onClick={handleLogout}>
					Logout
				</button>
			</div>
			<div className="date-picker">
				<label>From:</label>
				<DatePicker
					selected={startDate}
					onChange={(date) => setStartDate(date)}
					selectsStart
					startDate={startDate}
					endDate={endDate}
					dateFormat="yyyy-MM-dd"
				/>
				<label>To:</label>
				<DatePicker
					selected={endDate}
					onChange={(date) => setEndDate(date)}
					selectsEnd
					startDate={startDate}
					endDate={endDate}
					minDate={startDate}
					dateFormat="yyyy-MM-dd"
				/>
				<button className="download-button" onClick={downloadCSV}>
					Download CSV
				</button>
			</div>
			<div className="content">
				<div className="charts">
					<div className="chart">
						<h3>Temperature Over Time</h3>
						<ResponsiveContainer width="100%" height={350}>
							<LineChart
								data={data}
								margin={{ top: 10, right: 30, left: 0, bottom: 50 }}
							>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis />
								<YAxis domain={[-10, 50]} />
								<Tooltip />
								<Legend />
								<Line type="monotone" dataKey="temperature" stroke="#8884d8" />
							</LineChart>
						</ResponsiveContainer>
					</div>
					<div className="chart">
						<h3>Pressure Over Time</h3>
						<ResponsiveContainer width="100%" height={350}>
							<LineChart
								data={data}
								margin={{ top: 10, right: 30, left: 0, bottom: 50 }}
							>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis />
								<YAxis domain={[750, 1200]} />
								<Tooltip />
								<Legend />
								<Line type="monotone" dataKey="pressure" stroke="#82ca9d" />
							</LineChart>
						</ResponsiveContainer>
					</div>
				</div>
				<div className="gauges">
					<div className="gauge">
						<h3>Temperature</h3>
						<GaugeChart
							id="temperature-gauge"
							percent={latestData.temperature / 100}
							nrOfLevels={30}
							colors={["#FF5F6D", "#FFC371"]}
							arcWidth={0.3}
							textColor="#000000"
							formatTextValue={(value) =>
								`${latestData.temperature.toFixed(2)}°C`
							}
							style={{ height: "350px" }} // Adjust the height to make the gauge bigger
						/>
					</div>
					<div className="gauge">
						<h3>Pressure</h3>
						<GaugeChart
							id="pressure-gauge"
							percent={latestData.pressure / 2000}
							nrOfLevels={30}
							colors={["#5BE12C", "#F5CD19", "#EA4228"]}
							arcWidth={0.3}
							textColor="#000000"
							formatTextValue={(value) =>
								`${latestData.pressure.toFixed(2)} hPa`
							}
							style={{ height: "350px" }} // Adjust the height to make the gauge bigger
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
