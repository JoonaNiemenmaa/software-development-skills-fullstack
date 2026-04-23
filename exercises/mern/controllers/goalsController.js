import Goal from "../models/goalModel.js";

export const getGoals = async (request, response) => {

	const goals = await Goal.find().catch(error => { throw error; });

	response.status(200).json(goals)
};

export const postGoal = async (request, response) => {

	if (!request.body.text) {
		throw new Error("body has no text");
	}

	const goal = new Goal({
		text: request.body.text,
	});

	await goal.save(goal).catch(error => { throw error; });

	response.status(200).json(goal)
};

export const putGoal = async (request, response) => {
	if (!request.body.text) {
		throw new Error("body has no text");
	}

	const id = request.params.id;

	const goal = await Goal.findOne({ _id: id }).catch(error => { throw error; });

	if (!goal) {
		throw new Error("Goal not found");
	}

	goal.text = request.body.text;

	await goal.save().catch(error => { throw error; });

	response.status(200).json(goal)
};

export const deleteGoal = async (request, response) => {
	const id = request.params.id;

	const goal = await Goal.findOne({ _id: id }).catch(error => { throw error; });

	if (!goal) {
		throw new Error("Goal not found");
	}

	await goal.deleteOne().catch(error => { throw error; });

	response.status(200).json({ id: id });
};

