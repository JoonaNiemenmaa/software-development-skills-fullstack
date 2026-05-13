const handleError = (error, request, response, next) => {
	return response.json({
		message: error.message,
		stack: (process.env.NODE_ENV == "production") ? null : error.stack,
	})
};

export default handleError;
