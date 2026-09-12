import jwt from "jsonwebtoken";

const authorize = (request, response, next) => {
    let authorization = request.headers.authorization;

    if (!authorization) {
        return response
            .status(400)
            .send({ message: "no authorization header provided" });
    }

    authorization = authorization.split(" ");

    const schema = authorization[0];

    if (schema !== "Bearer") {
        return response
            .status(400)
            .send({ message: "Bearer authorization schema was not used" });
    }

    const token = authorization[1];

    console.log(token);

    try {
        const payload = jwt.verify(token, process.env.SECRET || "peanuts");
        request.user = payload;
        next();
    } catch (error) {
        return response
            .status(401)
            .send({ message: "token verification failed" });
    }
};

export default authorize;
