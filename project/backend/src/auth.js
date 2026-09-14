import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import User from "./models/User.js";
import authorize from "./authorize.js";

const saltRounds = 10;

const auth = Router();

auth.post("/register", async (request, response) => {
    const { username, password } = request.body;

    if (!username || !password) {
        return response.status(400).send({ message: "bad request" });
    }

    const hash = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
        username: username,
        passwordHash: hash,
        exercises: ["Pushup", "Pullup", "Squat", "Leg Raise", "Dip", "Lunge"],
    });

    try {
        await workout.save();
        return response.status(201).json({
            message: "user registered successfully",
        });
    } catch (error) {
        return response.status(400).send({ message: error.message });
    }
});

auth.post("/login", async (request, response) => {
    const { username, password } = request.body;

    if (!username || !password) {
        return response.status(400).send({ message: "bad request" });
    }

    const user = await User.findOne({
        username: username,
    });

    if (!user) {
        return response.status(404).send({ message: "user not found" });
    }

    if (!(await bcrypt.compare(password, user.passwordHash))) {
        return response.status(401).send({ message: "unauthorized" });
    }

    const payload = { userId: user._id, username: user.username };

    const token = jwt.sign(payload, process.env.SECRET || "peanuts");

    response.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
    });

    response.status(201).json(payload);
});

auth.get("/user", authorize, (request, response) => {
    return response.status(200).json(request.user);
});

auth.post("/logout", authorize, (request, response) => {
    response.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
    });

    return response.status(200).json({ message: "logged out successfully" });
});

export default auth;
