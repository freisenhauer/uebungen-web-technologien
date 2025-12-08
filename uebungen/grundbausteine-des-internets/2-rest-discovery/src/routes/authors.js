import express from "express";
import {
    authors,
    books,
    getCurrentAuthorId,
    incrementAuthorId,
} from "../data.js";
import { getNextInstructions } from "../instructions.js";
import { progress } from "../progress.js";

const router = express.Router();

// GET /authors - Alle Autoren abrufen
router.get("/", (req, res) => {
    progress.visitedAuthorsCollection = true;

    res.json({
        authors: authors,
        count: authors.length,
        _instructions: getNextInstructions(),
    });
});

// GET /authors/:id - Einen bestimmten Autor abrufen
router.get("/:id", (req, res) => {
    const id = Number.parseInt(req.params.id);
    const author = authors.find((a) => a.id === id);

    if (!author) {
        return res.status(404).json({
            error: "Not Found",
            message: `Autor mit ID ${id} wurde nicht gefunden`,
        });
    }

    progress.visitedAuthorDetail = true;

    res.json({
        author: author,
        _instructions: getNextInstructions(),
    });
});

// GET /authors/:id/books - Alle Bücher eines Autors (Sub-Ressource)
router.get("/:id/books", (req, res) => {
    const id = Number.parseInt(req.params.id);
    const author = authors.find((a) => a.id === id);

    if (!author) {
        return res.status(404).json({
            error: "Not Found",
            message: `Autor mit ID ${id} wurde nicht gefunden`,
        });
    }

    const authorBooks = books.filter((b) => b.authorId === id);
    progress.visitedSubResource = true;

    res.json({
        author: {
            id: author.id,
            name: author.name,
        },
        books: authorBooks,
        count: authorBooks.length,
        _instructions: getNextInstructions(),
    });
});

// POST /authors - Neuen Autor erstellen
router.post("/", (req, res) => {
    const { name, bio } = req.body;

    if (!name || !bio) {
        return res.status(400).json({
            error: "Bad Request",
            message: "Fehlende erforderliche Felder",
            required: ["name", "bio"],
            received: req.body,
        });
    }

    const newAuthor = {
        id: getCurrentAuthorId(),
        name,
        bio,
    };

    authors.push(newAuthor);
    incrementAuthorId();
    progress.createdAuthor = true;

    res.status(201).location(`/authors/${newAuthor.id}`).json({
        message: "Autor erfolgreich erstellt",
        author: newAuthor,
        _instructions: getNextInstructions(),
    });
});

// PUT /authors/:id - Autor vollständig aktualisieren
router.put("/:id", (req, res) => {
    const id = Number.parseInt(req.params.id);
    const authorIndex = authors.findIndex((a) => a.id === id);

    if (authorIndex === -1) {
        return res.status(404).json({
            error: "Not Found",
            message: `Autor mit ID ${id} wurde nicht gefunden`,
        });
    }

    const { name, bio } = req.body;

    if (!name || !bio) {
        return res.status(400).json({
            error: "Bad Request",
            message:
                "PUT erfordert alle Felder. Für teilweise Updates verwende PATCH.",
            required: ["name", "bio"],
            received: req.body,
        });
    }

    authors[authorIndex] = {
        id,
        name,
        bio,
    };

    res.json({
        message: "Autor vollständig aktualisiert",
        author: authors[authorIndex],
    });
});

// PATCH /authors/:id - Autor teilweise aktualisieren
router.patch("/:id", (req, res) => {
    const id = Number.parseInt(req.params.id);
    const authorIndex = authors.findIndex((a) => a.id === id);

    if (authorIndex === -1) {
        return res.status(404).json({
            error: "Not Found",
            message: `Autor mit ID ${id} wurde nicht gefunden`,
        });
    }

    const allowedFields = ["name", "bio"];
    const updates = {};

    for (const field of allowedFields) {
        if (req.body[field] !== undefined) {
            updates[field] = req.body[field];
        }
    }

    authors[authorIndex] = {
        ...authors[authorIndex],
        ...updates,
    };

    res.json({
        message: "Autor teilweise aktualisiert",
        author: authors[authorIndex],
        updatedFields: Object.keys(updates),
    });
});

// DELETE /authors/:id - Autor löschen
router.delete("/:id", (req, res) => {
    const id = Number.parseInt(req.params.id);
    const authorIndex = authors.findIndex((a) => a.id === id);

    if (authorIndex === -1) {
        return res.status(200).json({
            message: "Ressource wurde bereits gelöscht oder existiert nicht",
            note: "DELETE ist idempotent - mehrfaches Löschen hat den gleichen Effekt",
        });
    }

    // Prüfen ob der Autor noch Bücher hat
    const hasBooks = books.some((b) => b.authorId === id);
    if (hasBooks) {
        return res.status(400).json({
            error: "Bad Request",
            message:
                "Autor kann nicht gelöscht werden, da noch Bücher von diesem Autor existieren",
            hint: "Lösche zuerst alle Bücher dieses Autors",
        });
    }

    authors.splice(authorIndex, 1);
    res.status(200).json({
        message: "Autor erfolgreich gelöscht",
        note: "Normalerweise würde hier ein 204 No Content zurückgegeben werden (ohne Body). Für diese Übung verwenden wir 200 OK, damit du die nächsten Anweisungen sehen kannst.",
    });
});

export default router;
