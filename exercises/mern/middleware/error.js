export const errorHandler = (error, request, response, next) => {
	const statusCode = error.statusCode || 500;

	return response.status(statusCode).json({
		message: error.message,
		stack: process.env.NODE_ENV === "production" ? null : error.stack,
	});
};
