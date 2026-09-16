import { useContext, useState } from "react";
import config from "../config";
import { useNavigate } from "react-router";
import AuthContext from "../AuthContext";

const Create = () => {
    const user = useContext(AuthContext);
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
            credentials: "include",
            headers: {
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
                {user.exercises.map((exercise, index) => (
                    <>
                        <input
                            id={exercise}
                            key={index}
                            name="exercise"
                            value={exercise}
                            type="radio"
                        />
                        <label htmlFor={exercise}>{exercise}</label>
                    </>
                ))}

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
