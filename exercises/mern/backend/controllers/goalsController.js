import { raiseError } from "../middleware/error.js";
import Goal from "../models/goalModel.js";

export const getGoals = async (request, response) => {

	const goals = await Goal.find({ owner: request.user.id }).catch(error => { throw error; });

	response.status(200).json(goals)
};

export const postGoal = async (request, response) => {

	if (!request.body.text) raiseError(400, "body has no text");

	const goal = new Goal({
		owner: request.user.id,
		text: request.body.text,
	});

	await goal.save(goal).catch(error => { throw error; });

	response.status(200).json(goal)
};

export const putGoal = async (request, response) => {
	if (!request.body.text) raiseError(400, "Body has no text");

	const id = request.params.id;

	const goal = await Goal.findById(id).catch(error => { throw error; });

	if (!goal) raiseError(404, "goal not found");
	if (goal.owner.toString() !== request.user.id) raiseError(401, "Unauthorized")

	goal.text = request.body.text;

	await goal.save().catch(error => { throw error; });

	response.status(200).json(goal)
};

export const deleteGoal = async (request, response) => {
	const id = request.params.id;

	const goal = await Goal.findById(id).catch(error => { throw error; });

	if (!goal) raiseError(404, "goal not found");
	if (goal.owner.toString() !== request.user.id) raiseError(401, "Unauthorized")

	await goal.deleteOne().catch(error => { throw error; });

	response.status(200).json({ id: id });
};

