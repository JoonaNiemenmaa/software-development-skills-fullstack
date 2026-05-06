import express from "express";
import mongoose from "mongoose";

import goals from "./routes/goals.js";
import auth from "./routes/auth.js";
import { errorHandler } from "./middleware/error.js";

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/goals", goals);
app.use("/api/auth", auth);

app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/testdb")
	.then(connection => console.log(`Connected to database on ${connection.connection.host}`))
	.catch(error => {
		console.error(error);
		process.exit(1);
	});

app.listen(port, () => console.log(`Server listening on port ${port}`));

