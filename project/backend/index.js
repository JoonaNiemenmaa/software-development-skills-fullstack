import express from "express";
import mongoose from "mongoose";

import auth from "./src/auth.js";
import workout from "./src/workout.js";
import handleError from "./src/error.js";

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/testdb";

mongoose.connect(MONGO_URI).catch(error => console.error(error));

const app = express();

app.use(express.urlencoded());
app.use(express.json());

app.use("/api/auth", auth);
app.use("/api/workout", workout);

app.use(handleError);

app.listen(PORT, () => console.log(`Backend server listening on port ${PORT}`));
