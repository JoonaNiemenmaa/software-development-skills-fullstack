import { useNavigate } from "react-router"
import config from "../config"

const Register = () => {

  const navigate = useNavigate();

  const onRegister = async (formData) => {

    const username = formData.get("username")
    const password = formData.get("password")
    const confirmPassword = formData.get("confirmPassword")

    if (!username || !password) return;

    if (password !== confirmPassword) return;

    const url = `${config.base_url}/api/auth/register`

    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    }

    const response = await fetch(url, opts)

    if (!response.ok) return;

    navigate("/login");

  }

  return (
    <form action={ onRegister }>
      <label htmlFor="username">Username</label>
      <input name="username" type="text"></input>

      <label htmlFor="password">Password</label>
      <input name="password" type="password"></input>

      <label htmlFor="confirmPassword">Password</label>
      <input name="confirmPassword" type="password"></input>

      <button>Register</button>
    </form>
  )

}

export default Register;
