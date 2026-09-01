import jwt from "jsonwebtoken";

const authorize = (request, response, next) => {
	let authorization = request.headers.authorization;

	if (!authorization) {
		response.status(400);
		throw new Error("no authorization header provided");
	}

	authorization = authorization.split(" ");

	const schema = authorization[0];

	if (schema !== "Bearer") {
		response.status(400);
		throw new Error("Bearer authorization schema was not used");
	}

	const token = authorization[1];

  console.log(token);

	try {
		const payload = jwt.verify(token, process.env.SECRET || "peanuts");
		request.user = payload;
		next();
	} catch (error) {
		response.status(401);
		throw new Error("token verification failed");
	}
};

export default authorize;
