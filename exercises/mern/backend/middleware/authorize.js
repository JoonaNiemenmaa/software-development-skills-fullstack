import jwt from "jsonwebtoken";

import { raiseError } from "./error.js"

const authorize = (request, response, next) => {

	let authorization = request.headers.authorization;
	if (!authorization) raiseError(400, "No authorization header provided");

	authorization = authorization.split(" ");

	if (authorization.length !== 2) raiseError(400, "Malformed authorization header");

	const method = authorization[0];
	const token = authorization[1];

	if (method !== "Bearer") raiseError(400, "The server only supports 'Bearer' auth scheme");

	try {
		const payload = jwt.verify(token, process.env.SECRET || "peanuts");
		request.user = payload;
		next();
	} catch (error) {
		raiseError(401, "Unauthorized");
	}
};

export default authorize;
