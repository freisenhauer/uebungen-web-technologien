import express from "express";
import todoRouter from "./routes/todos.js";

const app = express();

// Middleware für JSON-Body-Parsing
app.use(express.json());

// Routes registrieren
app.use("/api/todos", todoRouter);

// Server starten
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server läuft auf http://localhost:${PORT}`);
	console.log(`API verfügbar unter http://localhost:${PORT}/api/todos`);
});
