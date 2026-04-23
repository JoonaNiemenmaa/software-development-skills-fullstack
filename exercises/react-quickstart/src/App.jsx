import { useState } from "react";

import ShoppingList from "./ShoppingList";
import MyButton from "./MyButton";

const App = () => {
	const user = "Joona Niemenmaa";

	const [count, setCount] = useState(0);

	return (
		<>
			<h1>Welcome {user}!</h1>
			<MyButton count={count} setCount={setCount} />
			<MyButton count={count} setCount={setCount} />
			<ShoppingList />
		</>
	);
};

export default App;
