import { BrowserRouter, Routes, Route } from "react-router";
import { useState } from "react";

import AuthContext from "./AuthContext";
import Header from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

import "./index.css";

const App = () => {

	const [token, setToken] = useState(null);

	return (
		<BrowserRouter>
			<AuthContext value={token}>
				<Header setToken={setToken} />
				<Routes>
					<Route index element={<Dashboard />} />
					<Route path="/login" element={<Login setToken={setToken} />} />
					<Route path="/register" element={<Register />} />
				</Routes>
			</AuthContext>
		</BrowserRouter>
	);
}

export default App;
