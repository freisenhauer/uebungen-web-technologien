import { Router } from "express";
import type { Request, Response } from "express";
import * as todoService from "../todo-service.js";
import type { TodoStatus } from "../types.js";

const router = Router();

// ============================================
// GET /api/todos - Alle Todos abrufen (mit optionaler Filterung)
// ============================================
router.get("/", (req: Request, res: Response) => {
	try {
		const filter = req.query.status as TodoStatus | undefined;
		const todos = todoService.getTodos(filter);
		res.status(200).json(todos);
	} catch (error) {
		res.status(500).json({ error: "Interner Serverfehler" });
	}
});

// ============================================
// POST /api/todos - Neues Todo erstellen
// ============================================
router.post("/", (req: Request, res: Response) => {
	try {
		const { title, description } = req.body;

		// Validierung
		if (!title || !description) {
			res.status(400).json({ error: "Title und Description sind Pflichtfelder" });
			return;
		}

		const newTodo = todoService.createTodo(title, description);
		res.status(201).json(newTodo);
	} catch (error) {
		res.status(500).json({ error: "Interner Serverfehler" });
	}
});

// ============================================
// PUT /api/todos/:id/complete - Todo als erledigt markieren
// ============================================
router.put("/:id/complete", (req: Request, res: Response) => {
	try {
		const id = Number.parseInt(req.params.id, 10);

		// Validierung der ID
		if (Number.isNaN(id)) {
			res.status(400).json({ error: "Ungültige ID" });
			return;
		}

		const updatedTodo = todoService.markTodoAsCompleted(id);
		res.status(200).json(updatedTodo);
	} catch (error) {
		if (error instanceof Error && error.message.includes("nicht gefunden")) {
			res.status(404).json({ error: error.message });
		} else {
			res.status(500).json({ error: "Interner Serverfehler" });
		}
	}
});

// ============================================
// DELETE /api/todos/:id - Todo löschen
// ============================================
router.delete("/:id", (req: Request, res: Response) => {
	try {
		const id = Number.parseInt(req.params.id, 10);

		// Validierung der ID
		if (Number.isNaN(id)) {
			res.status(400).json({ error: "Ungültige ID" });
			return;
		}

		const deletedTodo = todoService.removeTodo(id);
		res.status(200).json(deletedTodo);
	} catch (error) {
		if (error instanceof Error && error.message.includes("nicht gefunden")) {
			res.status(404).json({ error: error.message });
		} else {
			res.status(500).json({ error: "Interner Serverfehler" });
		}
	}
});

export default router;
