const errorHandler = (error, request, response, next) => {

	if (!error.status) {
		error.status = 500;
	}

	return response.status(error.status).json({
		msg: error.message
	});
};

export default errorHandler;
