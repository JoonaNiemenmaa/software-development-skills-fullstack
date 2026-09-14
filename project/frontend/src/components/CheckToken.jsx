import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import AuthContext from "../AuthContext";
import config from "../config";

const CheckLogin = ({ setUser }) => {
    const navigate = useNavigate();
    const user = useContext(AuthContext);

    useEffect(() => {
        if (user) return;

        const fetchUser = async () => {
            try {
                const url = `${config.base_url}/api/auth/user`;

                const response = await fetch(url, {
                    credentials: "include",
                });

                if (!response.ok) return null;

                const user = response.json();

                setUser(user);

                return user;
            } catch (error) {
                console.error(error);
                return null;
            }
        };
        fetchUser().then((user) => {
            console.log(user);
            if (!user) navigate("/login");
        });
    }, [navigate, user]);

    return <Outlet />;
};

export default CheckLogin;
