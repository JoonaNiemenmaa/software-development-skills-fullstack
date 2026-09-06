import { useState } from "react";
import config from "../config";
import { useContext } from "react";
import AuthContext from "../AuthContext";
import { useNavigate } from "react-router";

const Create = () => {
    const token = useContext(AuthContext);
    const [sets, setSets] = useState([]);
    const navigate = useNavigate();

    const addSet = (formData) => {
        const exercise = formData.get("exercise");
        const reps = parseInt(formData.get("reps"));
        const rest = parseInt(formData.get("rest"));

        if (!exercise && !reps && !rest) return;

        const newSets = sets.map((set) => set);

        newSets.push({
            exercise: exercise,
            reps: reps,
            rest: rest,
        });

        setSets(newSets);
    };

    const finishWorkout = async () => {
        if (sets.length === 0) return;

        console.log(sets);

        const response = await fetch(`${config.base_url}/api/workout`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(sets),
        });

        if (!response.ok) return;

        navigate("/");
    };

    return (
        <>
            <form action={addSet}>
                <label htmlFor="exercise">Exercise</label>
                <input name="exercise" type="text" />

                <label htmlFor="reps">Reps</label>
                <input name="reps" type="number" />

                <label htmlFor="rest">Rest (s)</label>
                <input name="rest" type="number" />

                <button>Add set</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Set</th>
                        <th scope="col">Exercise</th>
                        <th scope="col">Reps</th>
                        <th scope="col">Rest</th>
                    </tr>
                </thead>
                <tbody>
                    {sets.map((set, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{set.exercise}</td>
                            <td>{set.reps}</td>
                            <td>{`${set.rest}s`}</td>
                            <td>
                                <button
                                    onClick={() => {
                                        setSets(sets.filter((s) => s !== set));
                                    }}
                                >
                                    -
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button type="button" onClick={finishWorkout}>
                Finish Workout
            </button>
        </>
    );
};

export default Create;
