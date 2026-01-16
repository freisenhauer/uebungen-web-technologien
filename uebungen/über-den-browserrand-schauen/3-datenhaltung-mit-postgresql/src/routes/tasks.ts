import express from "express";
import {
	createTask,
	deleteTask,
	updateTask,
} from "../services/taskService.js";

const router = express.Router();

// POST /api/tasks - Task erstellen
router.post("/", async (req, res) => {
	try {
		const { title, description, projectId } = req.body;

		if (!title || !projectId) {
			res.status(400).json({ error: "title und projectId sind erforderlich" });
			return;
		}

		const task = await createTask(title, description || "", projectId);
		res.status(201).json(task);
	} catch (error: unknown) {
		console.error("Fehler beim Erstellen des Tasks:", error);
		res.status(500).json({ error: "Interner Serverfehler" });
	}
});

// PUT /api/tasks/:id - Task aktualisieren
router.put("/:id", async (req, res) => {
	try {
		const id = Number.parseInt(req.params.id);
		const { title, description, status } = req.body;

		if (Number.isNaN(id)) {
			res.status(400).json({ error: "Ungültige Task-ID" });
			return;
		}

		const task = await updateTask(id, title, description, status);
		res.json(task);
	} catch (error: unknown) {
		if (error instanceof Error && error.message.includes("nicht gefunden")) {
			res.status(404).json({ error: error.message });
			return;
		}
		console.error("Fehler beim Aktualisieren des Tasks:", error);
		res.status(500).json({ error: "Interner Serverfehler" });
	}
});

// DELETE /api/tasks/:id - Task löschen
router.delete("/:id", async (req, res) => {
	try {
		const id = Number.parseInt(req.params.id);

		if (Number.isNaN(id)) {
			res.status(400).json({ error: "Ungültige Task-ID" });
			return;
		}

		await deleteTask(id);
		res.status(204).send();
	} catch (error: unknown) {
		if (error instanceof Error && error.message.includes("nicht gefunden")) {
			res.status(404).json({ error: error.message });
			return;
		}
		console.error("Fehler beim Löschen des Tasks:", error);
		res.status(500).json({ error: "Interner Serverfehler" });
	}
});

export default router;
