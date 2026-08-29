import Router from "express"
import authorize from "./authorize.js";
import Workout from "./models/Workout.js";

const workout = Router();

workout.post("/", authorize, async (request, response) => {
  const { sets } = request.body;

  if (!sets) {
    response.status(400)
    throw new Error("bad request")
  }

  const workout = new Workout({
    trainee: request.user.userId,
    sets: sets,
  })

  await workout.save()

  response.send(workout);
})

workout.get("/", authorize, async (request, response) => {
  return await Workout.find({ trainee: request.user.userId })
})

export default workout;
