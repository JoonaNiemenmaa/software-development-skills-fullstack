const ShoppingList = () => {
	const products = [
		{ name: "Apples", isFruit: true },
		{ name: "Salad", isFruit: false },
		{ name: "Peaches", isFruit: true },
		{ name: "Cucumber", isFruit: false },
	];
	const listItems = products.map((product, index) => {
		return <li style={{ color: product.isFruit ? 'magenta' : 'darkgreen' }} key={index}>{product.name}</li>;
	});

	return <ul>{listItems}</ul>;
}

export default ShoppingList;
