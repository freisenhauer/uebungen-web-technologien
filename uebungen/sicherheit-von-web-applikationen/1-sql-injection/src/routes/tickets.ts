import express from "express";
import { db } from "../db.js";

export const ticketsRouter = express.Router();

// GET /tickets - Alle Tickets des angemeldeten Benutzers
// Optional: ?search=<suchbegriff> zum Filtern
ticketsRouter.get("/", (req, res) => {
	const username = req.query.as_user as string;
	const search = (req.query.search as string) || "";

	if (!username) {
		return res.status(400).json({ error: "Parameter 'as_user' fehlt" });
	}

	try {
		let sql: string;

		if (search) {
			sql = `SELECT * FROM tickets WHERE username = '${username}' AND title LIKE '%${search}%'`;
		} else {
			sql = `SELECT * FROM tickets WHERE username = '${username}'`;
		}

		const tickets = db.prepare(sql).all();
		res.json(tickets);
	} catch (error) {
		console.error("Fehler beim Abrufen der Tickets:", error);
		res.status(500).json({ error: "Interner Serverfehler" });
	}
});

// GET /tickets/:id - Ein spezifisches Ticket abrufen
ticketsRouter.get("/:id", (req, res) => {
	const id = req.params.id;
	const username = req.query.as_user as string;

	if (!username) {
		return res.status(400).json({ error: "Parameter 'as_user' fehlt" });
	}

	try {
		const sql = `SELECT * FROM tickets WHERE id = ${id} AND username = '${username}'`;
		const ticket = db.prepare(sql).get();

		if (!ticket) {
			return res.status(404).json({ error: "Ticket nicht gefunden" });
		}

		res.json(ticket);
	} catch (error) {
		console.error("Fehler beim Abrufen des Tickets:", error);
		res.status(500).json({ error: "Interner Serverfehler" });
	}
});

// PUT /tickets/:id - Ticket aktualisieren
ticketsRouter.put("/:id", (req, res) => {
	const id = req.params.id;
	const username = req.query.as_user as string;
	const { description } = req.body;

	if (!username) {
		return res.status(400).json({ error: "Parameter 'as_user' fehlt" });
	}

	if (!description) {
		return res.status(400).json({ error: "Feld 'description' fehlt" });
	}

	try {
		const sql = `UPDATE tickets SET description = '${description}' WHERE id = ${id} AND username = '${username}'`;
		const result = db.prepare(sql).run();

		if (result.changes === 0) {
			return res.status(404).json({ error: "Ticket nicht gefunden" });
		}

		res.json({ message: "Ticket erfolgreich aktualisiert" });
	} catch (error) {
		console.error("Fehler beim Aktualisieren des Tickets:", error);
		res.status(500).json({ error: "Interner Serverfehler" });
	}
});

// DELETE /tickets/:id - Ticket löschen
ticketsRouter.delete("/:id", (req, res) => {
	const id = req.params.id;
	const username = req.query.as_user as string;

	if (!username) {
		return res.status(400).json({ error: "Parameter 'as_user' fehlt" });
	}

	try {
		const sql = `DELETE FROM tickets WHERE id = ${id} AND username = '${username}'`;
		const result = db.prepare(sql).run();

		if (result.changes === 0) {
			return res.status(404).json({ error: "Ticket nicht gefunden" });
		}

		res.json({ message: "Ticket erfolgreich gelöscht" });
	} catch (error) {
		console.error("Fehler beim Löschen des Tickets:", error);
		res.status(500).json({ error: "Interner Serverfehler" });
	}
});