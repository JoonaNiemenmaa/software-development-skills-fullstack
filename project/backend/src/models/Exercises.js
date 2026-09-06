import { model, Schema, Types } from "mongoose";

const exercisesSchema = new Schema({
    user: { type: Types.ObjectId, required: true },
    exercises: [{ type: String, required: true }],
});

const Exercises = model("Exercises", exercisesSchema);

export default Exercises;
