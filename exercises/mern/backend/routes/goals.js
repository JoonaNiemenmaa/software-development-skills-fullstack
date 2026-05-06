import { Router } from "express";

import { deleteGoal, getGoals, postGoal, putGoal } from "../controllers/goalsController.js";
import authorize from "../middleware/authorize.js";

const goals = Router();

goals.get("/", authorize, getGoals);
goals.post("/", authorize, postGoal);
goals.put("/:id", authorize, putGoal);
goals.delete("/:id", authorize, deleteGoal);

export default goals;
