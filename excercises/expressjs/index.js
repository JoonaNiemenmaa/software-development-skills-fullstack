import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import posts from "./routes/posts.js";
import errorHandler from "./middleware/error.js";

const PORT = process.env.PORT || 8080;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/posts", posts);

app.use((request, response, next) => {
	const error = new Error("Not Found");
	error.status = 404;
	next(error);
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

