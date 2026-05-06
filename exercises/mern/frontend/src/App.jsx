import { BrowserRouter, Routes, Route } from "react-router";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

import "./index.css";

const App = () => {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route index element={<Dashboard />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
