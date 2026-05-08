import { useContext } from "react";
import AuthContext from "../AuthContext";


const Goal = ({ id, text, setErrorText, updateGoals }) => {

	const token = useContext(AuthContext);

	const handleDelete = async () => {
		try {
			const url = `http://localhost:3000/api/goals/${id}`
			const opts = {
				method: "DELETE",
				headers: {
					"Authorization": `Bearer ${token}`
				}
			};

			const response = await fetch(url, opts);

			if (response.ok) {
				updateGoals();
			} else {
				setErrorText(error.message);
			}

		} catch (error) {
			setErrorText(error.message);
			console.error(error);
		}
	};

	return (
		<li>
			<p>{text}</p>
			<button onClick={handleDelete}>X</button>
		</li>
	);
};

export default Goal;
