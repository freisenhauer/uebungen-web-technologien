import path from "node:path";
import { fileURLToPath } from "node:url";
import cookieParser from "cookie-parser";
import express from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// In-Memory Speicher für Kommentare
let comments = [];

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Session-Cookie setzen (simuliert eine echte Session)
app.use((req, res, next) => {
    if (!req.cookies.sessionId) {
        // TODO Phase 2: Füge hier das httpOnly-Flag hinzu, um Cookie-Diebstahl zu verhindern
        res.cookie("sessionId", `session-${Date.now()}-${Math.random()}`, {
            maxAge: 24 * 60 * 60 * 1000, // 24 Stunden
        });
    }
    next();
});

// TODO Phase 4, Aufgabe 2: Füge hier einen Content-Security-Policy Header hinzu
// Beispiel: res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'");

// API Endpunkte
app.get("/api/comments", (_req, res) => {
    res.json(comments);
});

app.post("/api/comments", (req, res) => {
    const { author, text } = req.body;

    if (!author || !text) {
        return res
            .status(400)
            .json({ error: "Autor und Text sind erforderlich" });
    }

    const comment = {
        id: Date.now(),
        author,
        text,
        timestamp: new Date().toISOString(),
    };

    comments.push(comment);
    res.status(201).json(comment);
});

app.delete("/api/comments", (_req, res) => {
    comments = [];
    res.json({ message: "Alle Kommentare wurden gelöscht" });
});

app.listen(PORT, () => {
    console.log(`Blog-App läuft auf http://localhost:${PORT}`);
    console.log("Drücke Strg+C zum Beenden");
});
