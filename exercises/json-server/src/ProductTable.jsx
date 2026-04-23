import ProductRow from "./ProductRow";
import ProductCategoryRow from "../ProductCategoryRow";


const ProductTable = ({ products, query, hideNotStocked }) => {
	let lastCategory;
	let rows = [];

	const search = new RegExp(`${query.toLowerCase()}`);

	products.forEach((product, index) => {
		if (lastCategory !== product.category) {
			lastCategory = product.category;
			rows.push(<ProductCategoryRow key={product.category} category={product.category} />);
		}

		if ((!hideNotStocked || product.stocked) && search.test(product.name.toLowerCase())) {
			rows.push(<ProductRow key={index} name={product.name} price={product.price} stocked={product.stocked} />);
		}
	});

	return (
		<table>
			<thead>
				<tr>
					<th scope={"col"}>Product</th>
					<th scope={"col"}>Price</th>
				</tr>
			</thead>
			<tbody>{rows}</tbody>
		</table>
	);
}

export default ProductTable;
