import { useNavigate } from "react-router";
import { useState } from "react";

const Register = () => {
	const navigate = useNavigate();

	const [errorText, setErrorText] = useState("");

	const handleSubmit = async (formData) => {

		const name = formData.get("name");
		const passphrase = formData.get("passphrase");
		const passphraseConfirm = formData.get("confirm-passphrase");

		try {
			if (passphrase !== passphraseConfirm) throw new Error("Passphrases do not match!");

			const url = "http://localhost:3000/api/auth/register"
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
				navigate("/login");
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
			<h2>Register</h2>
			<form action={handleSubmit} className="register-form">

				<label htmlFor="name">Name</label>
				<input name="name" type="text" />
				<br />

				<label htmlFor="passphrase">Passphrase</label>
				<input name="passphrase" type="password" />
				<br />

				<label htmlFor="confirm-passphrase">Confirm Passphrase</label>
				<input name="confirm-passphrase" type="password" />
				<br />

				<button type="submit">Register</button>

				<p style={{ color: "red" }}>{errorText}</p>
			</form>
		</section>
	);
}

export default Register;
