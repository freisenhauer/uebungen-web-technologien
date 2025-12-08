import express from "express";
import authorsRouter from "./routes/authors.js";
import booksRouter from "./routes/books.js";
import rootRouter from "./routes/root.js";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/", rootRouter);
app.use("/books", booksRouter);
app.use("/authors", authorsRouter);

// 404 Handler für alle anderen Routen
app.use((req, res) => {
    res.status(404).json({
        error: "Not Found",
        message: `Route ${req.method} ${req.path} wurde nicht gefunden`,
        availableRoutes: {
            GET: [
                "/",
                "/books",
                "/books/:id",
                "/authors",
                "/authors/:id",
                "/authors/:id/books",
            ],
            POST: ["/books", "/authors"],
            PUT: ["/books/:id", "/authors/:id"],
            PATCH: ["/books/:id", "/authors/:id"],
            DELETE: ["/books/:id", "/authors/:id"],
        },
    });
});

// Server starten
app.listen(PORT, () => {
    console.log(`REST Discovery API läuft auf http://localhost:${PORT}`);
    console.log(`Starte mit: GET http://localhost:${PORT}/`);
});
