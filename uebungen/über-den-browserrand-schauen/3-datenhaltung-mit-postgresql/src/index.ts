import express from "express";
import tasksRouter from "./routes/tasks.js";
import projectsRouter from "./routes/projects.js";
import usersRouter from "./routes/users.js";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/api/tasks", tasksRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/users", usersRouter);

// Health Check
app.get("/", (req, res) => {
	res.json({ message: "Task Manager API läuft!" });
});

app.listen(PORT, () => {
	console.log(`Server läuft auf http://localhost:${PORT}`);
});
