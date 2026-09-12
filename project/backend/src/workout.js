import Router from "express";
import authorize from "./authorize.js";
import Workout from "./models/Workout.js";

const workout = Router();

workout.post("/", authorize, async (request, response) => {
    const sets = request.body;

    console.log(request.body);

    if (!sets) {
        return response.status(400).send({ message: "bad request" });
    }

    const workout = new Workout({
        trainee: request.user.userId,
        sets: sets,
    });

    try {
        await workout.save();
        return response.status(201).send(workout);
    } catch (error) {
        return response.status(400).send({ message: error.message });
    }
});

workout.get("/", authorize, async (request, response) => {
    response.send(await Workout.find({ trainee: request.user.userId }));
});

export default workout;
