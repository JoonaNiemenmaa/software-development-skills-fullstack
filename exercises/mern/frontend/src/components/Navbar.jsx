import { NavLink } from "react-router";

const Navbar = () => {
	return (
		<nav>
			<div className="navbar-content">
				<h1>Goal Setter</h1>
				<NavLink to="/" >Dashboard</NavLink>
				<NavLink to="/login" >Login</NavLink>
				<NavLink to="/register" >Register</NavLink>
			</div>
		</nav>
	);
}

export default Navbar;
