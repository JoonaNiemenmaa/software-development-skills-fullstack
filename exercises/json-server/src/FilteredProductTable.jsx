import { useState, useEffect } from "react";

import ProductTable from "./ProductTable";
import Search from "./Search";

const FilteredProductTable = () => {

	const [products, setProducts] = useState([]);
	const [query, setQuery] = useState("");
	const [hideNotStocked, setHideNotStocked] = useState(false);

	useEffect(() => {
		const url = "http://localhost:8000/products";

		fetch(url)
			.then(data => data.json())
			.then(json => setProducts(json));

	}, []);

	return (
		<>
			<Search setQuery={setQuery} setHideNotStocked={setHideNotStocked} />
			<ProductTable products={products} query={query} hideNotStocked={hideNotStocked} />
		</>
	);
}

export default FilteredProductTable;
