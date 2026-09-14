const handleError = (error, request, response, next) => {
    response.status(500);
    console.error(error);
    return response.json({
        message: error.message,
        stack: process.env.NODE_ENV == "production" ? null : error.stack,
    });
};

export default handleError;
