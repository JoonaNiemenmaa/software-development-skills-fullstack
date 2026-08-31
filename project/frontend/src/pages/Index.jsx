import { useNavigate } from "react-router";
import { useContext, useEffect } from "react";

import AuthContext from "../AuthContext";

const Index = () => {

  const navigate = useNavigate();
  const token = useContext(AuthContext);

  useEffect(() => {
    if (!token) navigate("/login");
  }, [navigate, token])

  return (
    <h1>HIANO SIVU</h1>
  );
}

export default Index;
