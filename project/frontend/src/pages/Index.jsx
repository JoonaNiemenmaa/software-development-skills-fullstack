import { Link, useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";

import AuthContext from "../AuthContext";
import config from "../config";
import Card from "../components/Card";

const Index = () => {
    const navigate = useNavigate();
    const user = useContext(AuthContext);
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        if (!user) return;

        const fetchWorkouts = async () => {
            const url = `${config.base_url}/api/workout`;
            try {
                const response = await fetch(url, {
                    credentials: "include",
                });
                const json = await response.json();
                setWorkouts(json);
            } catch (error) {
                console.error(error);
            }
        };

        fetchWorkouts();
    }, [user, navigate]);

    return (
        <>
            <div>
                <Link to="/create">Start workout</Link>
            </div>
            <div>
                {workouts.map((workout, index) => (
                    <Card key={index} workout={workout} />
                ))}
            </div>
        </>
    );
};

export default Index;
