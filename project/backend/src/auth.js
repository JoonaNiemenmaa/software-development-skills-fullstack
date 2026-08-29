import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import User from "./models/User.js";

const saltRounds = 10;

const auth = Router();

auth.post("/register", async (request, response) => {
	const { username, password } = request.body;

	if (!username || !password) {
		response.status(400);
		throw new Error("bad request")
	};

	const hash = await bcrypt.hash(password, saltRounds);

	const newUser = new User({
		username: username,
		passwordHash: hash,
	});

	await newUser.save();

	response.status(201).json({
		message: "user registered successfully"
	});
});

auth.post("/login", async (request, response) => {

	const { username, password } = request.body;

	if (!username || !password) {
		response.status(400);
		throw new Error("bad request")
	};

	const user = await User.findOne({
		username: username
	});

	if (!user) {
		response.status(404);
		throw new Error("user not found");
	}

	if (!await bcrypt.compare(password, user.passwordHash)) {
		response.status(401);
		throw new Error("Unauthorized");
	}

	const token = jwt.sign({ userId: user._id, username: user.username }, process.env.SECRET || "peanuts");

	response.status(201).json({
		token: token,
	});
});

export default auth;
