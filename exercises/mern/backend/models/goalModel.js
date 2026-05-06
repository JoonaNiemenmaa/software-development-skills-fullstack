import { Types, Schema, model } from "mongoose";

const options = {
	timestamps: true
};

const goalSchema = new Schema({
	owner: { type: Types.ObjectId, required: true, ref: "User" },
	text: { type: String, required: true },
}, options);

const Goal = model("Goal", goalSchema);

export default Goal;
