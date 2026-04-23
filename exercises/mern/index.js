import express from "express";

import goals from "./routes/goals.js";
import { errorHandler } from "./middleware/error.js";

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/goals", goals);

app.use(errorHandler);

app.listen(port, () => console.log(`Server listening on port ${port}`));
