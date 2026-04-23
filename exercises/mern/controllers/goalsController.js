export const getGoals = (request, response) => {
	response.status(200).json({
		"message": "get goals"
	})
};

export const postGoal = (request, response) => {

	if (!request.body.text) {
		throw new Error("body has no text");
	}

	response.status(200).json({
		"message": "post goal"
	})
};

export const putGoal = (request, response) => {
	response.status(200).json({
		"message": `update ${request.params.id}`
	})
};

export const deleteGoal = (request, response) => {
	response.status(200).json({
		"message": `delete ${request.params.id}`
	})
};

