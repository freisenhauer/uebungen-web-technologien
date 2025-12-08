import express from "express";
import { createUser } from "../services/userService.js";

const router = express.Router();

// POST /api/users - User erstellen
router.post("/", async (req, res) => {
	try {
		const { name, email } = req.body;

		if (!name || !email) {
			res.status(400).json({ error: "name und email sind erforderlich" });
			return;
		}

		const user = await createUser(name, email);
		res.status(201).json(user);
	} catch (error: unknown) {
		if (
			error instanceof Error &&
			error.message.includes("E-Mail existiert bereits")
		) {
			res.status(400).json({ error: error.message });
			return;
		}
		console.error("Fehler beim Erstellen des Users:", error);
		res.status(500).json({ error: "Interner Serverfehler" });
	}
});

export default router;
