import { Router } from "express";
import { register, login } from "../controllers/authController.js";

const auth = Router();

auth.post("/register", register);
auth.post("/login", login);

export default auth;
