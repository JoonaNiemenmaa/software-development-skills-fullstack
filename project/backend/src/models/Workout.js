import { Schema, model, Types } from "mongoose";
import User from "./User.js";

const workoutSchema = new Schema({
    trainee: { type: Types.ObjectId, required: true },
    sets: [
        {
            exercise: {
                type: String,
                required: true,
                validate: async function (exercise) {
                    const user = await User.findById(this.parent().trainee);
                    return user.exercises.includes(exercise);
                },
            },
            reps: { type: Number, required: true },
            rest: { type: Number, required: true },
        },
    ],
});

const Workout = model("Workout", workoutSchema);

export default Workout;
