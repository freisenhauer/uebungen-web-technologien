import express from "express";
import { ticketsRouter } from "./routes/tickets.js";

const app = express();
const PORT = 3000;

// Middleware für JSON-Body-Parsing
app.use(express.json());

// Logging-Middleware (zum Debugging)
app.use((req, res, next) => {
	console.log(`${req.method} ${req.url}`);
	next();
});

// Routes einbinden
app.use("/tickets", ticketsRouter);

// Root-Endpoint
app.get("/", (req, res) => {
	res.json({
		message: "SQL-Injection Übungs-API",
		endpoints: [
			"GET /tickets?as_user=<username>&search=<optional>",
			"GET /tickets/:id?as_user=<username>",
			"PUT /tickets/:id?as_user=<username>",
			"DELETE /tickets/:id?as_user=<username>",
		],
		users: ["alice", "bob", "charlie"],
	});
});

// Server starten
app.listen(PORT, () => {
	console.log(`\n🚀 Server läuft auf http://localhost:${PORT}`);
	console.log(`📋 Verfügbare Benutzer: alice, bob, charlie`);
	console.log(`\nBeispiel: curl "http://localhost:${PORT}/tickets?as_user=alice"\n`);
});