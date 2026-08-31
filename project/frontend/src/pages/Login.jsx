import { useNavigate } from "react-router";
import config from "../config";

const Login = ({ setToken }) => {

  const navigate = useNavigate();

  const onLogin = async (formData) => {

    const username = formData.get("username")
    const password = formData.get("password")

    if (!username || !password) return;

    const url = `${config.base_url}/api/auth/login`

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

    const json = await response.json();

    setToken(json.token);

    navigate("/");

  }

  return (
    <form action={ onLogin }>
      <label htmlFor="username">Username</label>
      <input name="username" type="text"></input>

      <label htmlFor="username">Password</label>
      <input name="password" type="password"></input>

      <button>Login</button>
    </form>
  )
}

export default Login;
