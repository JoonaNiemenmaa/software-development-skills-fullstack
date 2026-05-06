import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import User from "../models/userModel.js"
import { raiseError } from "../middleware/error.js";

const saltRounds = 10;

export const register = async (request, response) => {

	const { name, passphrase } = request.body;

	const hash = await bcrypt.hash(passphrase, saltRounds);

	const user = new User({
		name: name,
		passphraseHash: hash,
	});

	await user.save();

	return response.status(201).json({
		name: name,
		passphraseHash: hash
	});
};

export const login = async (request, response) => {

	const { name, passphrase } = request.body;

	const user = await User.findOne({ name: name });

	if (!user) raiseError(404, "user not found");

	if (!await bcrypt.compare(passphrase, user.passphraseHash)) raiseError(401, "Password incorrect");

	const token = jwt.sign({ id: user._id }, process.env.SECRET || "peanuts");

	return response.status(200).json({
		token: token
	});
};

