import express from "express";
import {
	deleteProject,
	getProjectWithTasks,
} from "../services/projectService.js";
import { getTasksByProject } from "../services/taskService.js";

const router = express.Router();

// GET /api/projects/:id - Project mit Tasks abrufen
router.get("/:id", async (req, res) => {
	try {
		const id = Number.parseInt(req.params.id);

		if (Number.isNaN(id)) {
			res.status(400).json({ error: "Ungültige Project-ID" });
			return;
		}

		const project = await getProjectWithTasks(id);
		res.json(project);
	} catch (error: unknown) {
		if (error instanceof Error && error.message.includes("nicht gefunden")) {
			res.status(404).json({ error: error.message });
			return;
		}
		console.error("Fehler beim Abrufen des Projects:", error);
		res.status(500).json({ error: "Interner Serverfehler" });
	}
});

// GET /api/projects/:id/tasks - Alle Tasks eines Projects abrufen
router.get("/:id/tasks", async (req, res) => {
	try {
		const projectId = Number.parseInt(req.params.id);

		if (Number.isNaN(projectId)) {
			res.status(400).json({ error: "Ungültige Project-ID" });
			return;
		}

		const tasks = await getTasksByProject(projectId);
		res.json(tasks);
	} catch (error: unknown) {
		console.error("Fehler beim Abrufen der Tasks:", error);
		res.status(500).json({ error: "Interner Serverfehler" });
	}
});

// DELETE /api/projects/:id - Project löschen
router.delete("/:id", async (req, res) => {
	try {
		const id = Number.parseInt(req.params.id);

		if (Number.isNaN(id)) {
			res.status(400).json({ error: "Ungültige Project-ID" });
			return;
		}

		await deleteProject(id);
		res.status(204).send();
	} catch (error: unknown) {
		if (error instanceof Error && error.message.includes("nicht gefunden")) {
			res.status(404).json({ error: error.message });
			return;
		}
		console.error("Fehler beim Löschen des Projects:", error);
		res.status(500).json({ error: "Interner Serverfehler" });
	}
});

export default router;
