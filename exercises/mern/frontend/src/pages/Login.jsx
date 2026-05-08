import { useNavigate } from "react-router";
import { useState } from "react";

const Login = ({ setToken }) => {
	const navigate = useNavigate();

	const [errorText, setErrorText] = useState("");

	const handleSubmit = async (formData) => {

		const name = formData.get("name");
		const passphrase = formData.get("passphrase");

		try {
			const url = "http://localhost:3000/api/auth/login"
			const opts = {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					name: name,
					passphrase: passphrase,
				})
			};

			const response = await fetch(url, opts);

			if (response.ok) {
				const json = await response.json();
				setToken(json.token);
				navigate("/");
			} else {
				const json = await response.json();
				setErrorText(json.message);
			}

		} catch (error) {
			setErrorText(error.message);
			console.error(error);
		}
	};

	return (
		<section>
			<h2>Login</h2>
			<form action={handleSubmit} className="login-form">

				<label htmlFor="name">Name</label>
				<input name="name" type="text" />
				<br />

				<label htmlFor="passphrase">Passphrase</label>
				<input name="passphrase" type="password" />
				<br />

				<button type="submit">Login</button>

				<p style={{ color: "red" }}>{errorText}</p>
			</form>
		</section>
	);
}

export default Login;
