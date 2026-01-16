import pool from "../db.js";
import type { ProjectWithTasks } from "../types/project.js";
import type { Task } from "../types/task.js";

/**
 * TODO: Implementiere diese Funktion
 *
 * Lädt ein Project mit allen zugehörigen Tasks aus der Datenbank.
 *
 * Hinweise:
 * - Nutze einen LEFT JOIN um das Project mit allen Tasks zu verknüpfen
 * - Das Ergebnis ist eine flache Tabelle mit mehreren Zeilen (eine pro Task)
 * - Du musst die Daten manuell zu einem verschachtelten Objekt zusammenbauen:
 *   1. Erstelle das Project-Objekt aus der ersten Zeile
 *   2. Iteriere über alle Zeilen und füge jeden Task dem tasks-Array hinzu
 *   3. Achte darauf, dass ein Project ohne Tasks ebenfalls zurückgegeben wird
 * - Wenn das Project nicht existiert, wirf einen Fehler
 * - Das ist der "Impedance Mismatch": Objekte vs. flache Tabellen!
 */
export async function getProjectWithTasks(
	id: number,
): Promise<ProjectWithTasks> {
	// TODO: Implementierung hier
	throw new Error("Not implemented");
}

/**
 * TODO: Implementiere diese Funktion
 *
 * Löscht ein Project und alle zugehörigen Tasks aus der Datenbank.
 *
 * Hinweise:
 * - Nutze eine Transaktion um sicherzustellen, dass entweder alles oder nichts gelöscht wird
 * - Eine Transaktion läuft so ab:
 *   const client = await pool.connect();
 *   try {
 *     await client.query("BEGIN");
 *     // ... deine DELETE Queries hier
 *     await client.query("COMMIT");
 *   } catch (error) {
 *     await client.query("ROLLBACK");
 *     throw error;
 *   } finally {
 *     client.release();
 *   }
 * - Lösche zuerst alle Tasks des Projects (Foreign Key!), dann das Project selbst
 * - Wenn das Project nicht existiert, wirf einen Fehler
 */
export async function deleteProject(id: number): Promise<void> {
	// TODO: Implementierung hier
	throw new Error("Not implemented");
}
