import { useContext } from "react";
import { Link } from "react-router";

import AuthContext from "../AuthContext";
import config from "../config";

const NavBar = ({ setUser }) => {
    const token = useContext(AuthContext);
    return (
        <nav>
            <Link to={"/"}>Index</Link>
            <Link to={"/login"}>Login</Link>
            <Link to={"/register"}>Register</Link>
            {token ? (
                <button
                    type="button"
                    onClick={async () => {
                        const url = `${config.base_url}/api/auth/logout`;
                        const response = await fetch(url, {
                            method: "POST",
                            credentials: "include",
                        });
                        if (response.ok) setUser(null);
                    }}
                >
                    Logout
                </button>
            ) : null}
        </nav>
    );
};

export default NavBar;
