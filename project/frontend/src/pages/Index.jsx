import { useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";

import AuthContext from "../AuthContext";
import config from "../config";
import Card from "../components/Card";

const Index = () => {

  const navigate = useNavigate();
  const token = useContext(AuthContext);
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchWorkouts = async () => {
      const url = `${config.base_url}/api/workout`
      const response = await fetch(url, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      const json = await response.json()
      setWorkouts(json);
    };

    fetchWorkouts();
  }, [token, navigate])

  return (
    <>
      <div>
        {workouts.map((workout, index) => <Card key={index} workout={workout} />)}
      </div>
    </>
  );
}

export default Index;
