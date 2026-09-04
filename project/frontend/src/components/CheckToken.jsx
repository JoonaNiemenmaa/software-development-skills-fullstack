import { useContext, useEffect } from "react"
import { Outlet, useNavigate } from "react-router";
import AuthContext from "../AuthContext";

const CheckToken = () => {
  const navigate = useNavigate();
  const token = useContext(AuthContext);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
  }, [navigate, token])

  return (
    <Outlet />
  );
}

export default CheckToken;
