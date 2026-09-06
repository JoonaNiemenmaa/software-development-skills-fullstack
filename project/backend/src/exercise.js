import { Router } from "express";
import authorize from "./authorize.js";
import User from "./models/User.js";

const exercise = Router();

exercise.get("/", authorize, async (request, response) => {
    const user = await User.findById(request.user.userId);
    response.send(user.exercises);
});

exercise.put("/", authorize, async (request, response) => {
    const exercise = request.body.exercise;

    if (!exercise) {
        response.status(400);
        throw new Error("bad request");
    }

    const token = request.user;

    const user = await User.findById(token.userId);

    user.exercises.push(exercise);

    user.save();

    response.send(user.exercises);
});

exercise.delete("/", authorize, async (request, response) => {
    if (!request.body.exercise) {
        response.status(400);
        throw new Error("bad request");
    }

    const token = request.user;

    const user = await User.findById(token.userId);

    if (
        !user.exercises.find((exercise) => exercise === request.body.exercise)
    ) {
        response.status(404);
        throw new Error("exercise not found");
    }

    user.exercises = user.exercises.filter(
        (exercise) => request.body.exercise !== exercise,
    );

    user.save();

    response.send(user.exercises);
});

export default exercise;
