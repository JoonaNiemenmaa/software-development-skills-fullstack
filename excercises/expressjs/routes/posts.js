import Router from "express";

import { createPost, deletePost, getPost, getPosts, updatePost } from "../controllers/postsController.js";

import logger from "../middleware/logger.js"

const router = Router();

router.use(logger);

router.get("/:id", getPost);
router.get("/", getPosts);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;

