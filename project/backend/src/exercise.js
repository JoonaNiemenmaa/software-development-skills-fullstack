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
        return response.status(400).send({ message: "bad request" });
    }

    const token = request.user;

    const user = await User.findById(token.userId);

    user.exercises.push(exercise);

    try {
        user.save();
        return response.send(user.exercises);
    } catch (error) {
        return response.status(400).send({ message: error.message });
    }
});

exercise.delete("/", authorize, async (request, response) => {
    if (!request.body.exercise) {
        return response.status(400).send({ message: "bad request" });
    }

    const token = request.user;

    const user = await User.findById(token.userId);

    if (!user.exercises.includes(request.body.exercise)) {
        return response.status(404).send({ message: "exercise not found" });
    }

    user.exercises = user.exercises.filter(
        (exercise) => request.body.exercise !== exercise,
    );

    user.save();

    response.send(user.exercises);
});

export default exercise;
