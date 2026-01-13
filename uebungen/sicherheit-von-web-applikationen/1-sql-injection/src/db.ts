import Database from "better-sqlite3";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Pfad zur Datenbankdatei im Projektverzeichnis
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = join(__dirname, "..", "tickets.db");

// SQLite-Datenbankverbindung erstellen
export const db = new Database(dbPath);

// Aktiviere Foreign Keys für referentielle Integrität
db.pragma("foreign_keys = ON");