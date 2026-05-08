import { useState, useContext, useEffect } from "react";
import AuthContext from "../AuthContext";

import { useNavigate } from "react-router";

import Goal from "../components/Goal";

const Dashboard = () => {

	const navigate = useNavigate();
	const token = useContext(AuthContext);

	const [goals, setGoals] = useState([]);
	const [errorText, setErrorText] = useState("");

	useEffect(() => {
		if (!token) navigate("/login");
	}, [token])

	const fetchGoals = async () => {
		const url = "http://localhost:3000/api/goals"

		const opts = {
			headers: {
				"Authorization": `Bearer ${token}`
			},
		};

		try {
			const response = await fetch(url, opts);

			if (response.ok) {
				const json = await response.json();
				setGoals(json);
			} else {
				setErrorText(`${response.statusCode} ${response.statusText}`);
			}

		} catch (error) {
			console.error(error);
			setErrorText(error.message);
		}
	};

	useEffect(() => {
		if (token) fetchGoals();
	}, [])

	const postGoal = async (formData) => {
		const goalText = formData.get("goal");

		try {
			const url = "http://localhost:3000/api/goals"

			const opts = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`
				},
				body: JSON.stringify({
					text: goalText
				})
			};

			const response = await fetch(url, opts);

			if (response.ok) {
				fetchGoals()
			} else {
				setErrorText(`${response.statusCode} ${response.statusText}`);
			}

		} catch (error) {
			console.error(error);
			setErrorText(error.message);
		}
	};

	return (
		<section>
			<h2>My goals</h2>
			<p style={{ color: "red" }}>{errorText}</p>
			<form className="goal-form" action={postGoal}>
				<input name="goal" type="text" placeholder="type in goal text" />
				<button>Post Goal</button>
			</form>
			<ul>{goals.map(goal => <Goal key={goal._id} id={goal._id} text={goal.text} setErrorText={setErrorText} updateGoals={fetchGoals} />)}</ul>
		</section>
	);
}

export default Dashboard;
