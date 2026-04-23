import { Router } from "express";

import { deleteGoal, getGoals, postGoal, putGoal } from "../controllers/goalsController.js";

const goals = Router();

goals.get("/", getGoals);
goals.post("/", postGoal);
goals.put("/:id", putGoal);
goals.delete("/:id", deleteGoal);

export default goals;
