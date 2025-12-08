import express from "express";
import { authors, books, getCurrentBookId, incrementBookId } from "../data.js";
import { getNextInstructions } from "../instructions.js";
import { progress } from "../progress.js";

const router = express.Router();

// GET /books - Alle Bücher abrufen
router.get("/", (req, res) => {
    progress.visitedBooksCollection = true;

    res.json({
        books: books,
        count: books.length,
        _instructions: getNextInstructions(),
    });
});

// GET /books/:id - Ein bestimmtes Buch abrufen
router.get("/:id", (req, res) => {
    const id = Number.parseInt(req.params.id);
    const book = books.find((b) => b.id === id);

    if (!book) {
        progress.experiencedNotFound = true;
        return res.status(404).json({
            error: "Not Found",
            message: `Buch mit ID ${id} wurde nicht gefunden`,
            _instructions: getNextInstructions(),
        });
    }

    progress.visitedBookDetail = true;

    res.json({
        book: book,
        _instructions: getNextInstructions(),
    });
});

// POST /books - Neues Buch erstellen
router.post("/", (req, res) => {
    const { title, authorId, isbn, year } = req.body;

    // Validierung
    if (!title || !authorId || !isbn || !year) {
        progress.experiencedBadRequest = true;
        return res.status(400).json({
            error: "Bad Request",
            message: "Fehlende erforderliche Felder",
            required: ["title", "authorId", "isbn", "year"],
            received: req.body,
            _instructions: getNextInstructions(),
        });
    }

    // Prüfen ob Autor existiert
    const authorExists = authors.find((a) => a.id === authorId);
    if (!authorExists) {
        return res.status(400).json({
            error: "Bad Request",
            message: `Autor mit ID ${authorId} existiert nicht`,
            _instructions: getNextInstructions(),
        });
    }

    const newBook = {
        id: getCurrentBookId(),
        title,
        authorId,
        isbn,
        year,
    };

    books.push(newBook);
    incrementBookId();
    progress.createdBook = true;

    res.status(201).location(`/books/${newBook.id}`).json({
        message: "Buch erfolgreich erstellt",
        book: newBook,
        _instructions: getNextInstructions(),
    });
});

// PUT /books/:id - Buch vollständig aktualisieren
router.put("/:id", (req, res) => {
    const id = Number.parseInt(req.params.id);
    const bookIndex = books.findIndex((b) => b.id === id);

    if (bookIndex === -1) {
        return res.status(404).json({
            error: "Not Found",
            message: `Buch mit ID ${id} wurde nicht gefunden`,
        });
    }

    const { title, authorId, isbn, year } = req.body;

    // Validierung - PUT erfordert alle Felder
    if (!title || !authorId || !isbn || !year) {
        return res.status(400).json({
            error: "Bad Request",
            message:
                "PUT erfordert alle Felder. Für teilweise Updates verwende PATCH.",
            required: ["title", "authorId", "isbn", "year"],
            received: req.body,
        });
    }

    books[bookIndex] = {
        id,
        title,
        authorId,
        isbn,
        year,
    };

    progress.updatedWithPut = true;

    res.json({
        message: "Buch vollständig aktualisiert",
        book: books[bookIndex],
        _instructions: getNextInstructions(),
    });
});

// PATCH /books/:id - Buch teilweise aktualisieren
router.patch("/:id", (req, res) => {
    const id = Number.parseInt(req.params.id);
    const bookIndex = books.findIndex((b) => b.id === id);

    if (bookIndex === -1) {
        return res.status(404).json({
            error: "Not Found",
            message: `Buch mit ID ${id} wurde nicht gefunden`,
        });
    }

    // Nur die gesendeten Felder aktualisieren
    const allowedFields = ["title", "authorId", "isbn", "year"];
    const updates = {};

    for (const field of allowedFields) {
        if (req.body[field] !== undefined) {
            updates[field] = req.body[field];
        }
    }

    books[bookIndex] = {
        ...books[bookIndex],
        ...updates,
    };

    progress.updatedWithPatch = true;

    res.json({
        message: "Buch teilweise aktualisiert",
        book: books[bookIndex],
        updatedFields: Object.keys(updates),
        _instructions: getNextInstructions(),
    });
});

// DELETE /books/:id - Buch löschen
router.delete("/:id", (req, res) => {
    const id = Number.parseInt(req.params.id);
    const bookIndex = books.findIndex((b) => b.id === id);

    if (bookIndex === -1) {
        // Idempotent: Auch wenn nicht gefunden, geben wir 200 zurück
        // (Viele APIs machen das so, manche geben 404 zurück)
        progress.deletedResource = true;
        return res.status(200).json({
            message: "Ressource wurde bereits gelöscht oder existiert nicht",
            note: "DELETE ist idempotent - mehrfaches Löschen hat den gleichen Effekt",
            _instructions: getNextInstructions(),
        });
    }

    books.splice(bookIndex, 1);
    progress.deletedResource = true;

    res.status(200).json({
        message: "Buch erfolgreich gelöscht",
        note: "Normalerweise würde hier ein 204 No Content zurückgegeben werden (ohne Body). Für diese Übung verwenden wir 200 OK, damit du die nächsten Anweisungen sehen kannst.",
        _instructions: getNextInstructions(),
    });
});

export default router;
