import { Schema, model, Types } from "mongoose"

const workoutSchema = new Schema({
  trainee: { type: Types.ObjectId, required: true },
  sets: [{
    exercise: { type: String, required: true },
    reps: { type: Number, required: true },
    rest: { type: Number, required: true },
  }]
})

const Workout = model("Workout", workoutSchema)

export default Workout;
