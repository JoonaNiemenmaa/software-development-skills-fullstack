const logger = (request, response, next) => {
	console.log(`${(new Date(Date.now())).toLocaleString()} | ${request.method} ${request.protocol}://${request.get("host")}${request.originalUrl}`);
	next();
};

export default logger;

