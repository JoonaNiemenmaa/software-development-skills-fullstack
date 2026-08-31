import { useContext } from "react";
import { Link } from "react-router";

import AuthContext from "../AuthContext";

const NavBar = ({ setToken }) => {
  const token = useContext(AuthContext);
  return (
    <nav>
      <Link to={"/"}>Dashboard</Link>
      <Link to={"/login"}>Login</Link>
      <Link to={"/register"}>Register</Link>
      {(token) ? <button type="button" onClick={() => { setToken(null) }}>Logout</button> : null}
    </nav>
  )
}

export default NavBar;
