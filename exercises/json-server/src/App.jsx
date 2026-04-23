import { BrowserRouter, Routes, Route, Link } from "react-router";

import FilteredProductTable from "./FilteredProductTable";

const App = () => {

	return (
		<BrowserRouter>
			<Routes>
				<Route index element={
					<>
						<h2>Products site!</h2>
						<Link to="/products">Click here to see products</Link>
					</>} />
				<Route path="/products" element={
					<>
						<h2>JSON Server</h2>
						<FilteredProductTable />
					</>} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
