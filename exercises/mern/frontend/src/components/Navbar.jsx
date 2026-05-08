import { useContext } from "react";
import { NavLink } from "react-router";

import AuthContext from "../AuthContext";

const Header = ({ setToken }) => {
	const token = useContext(AuthContext);

	const handleLogout = () => {
		setToken(null);
	};

	return (
		<nav>
			<div className="navbar-content">
				<h1>Goal Setter</h1>
				<NavLink to="/" >Dashboard</NavLink>
				<NavLink to="/login" >Login</NavLink>
				<NavLink to="/register" >Register</NavLink>
				{(token) ? <button onClick={handleLogout} >Logout</button> : null}
			</div>
		</nav>
	);
}

export default Header;
