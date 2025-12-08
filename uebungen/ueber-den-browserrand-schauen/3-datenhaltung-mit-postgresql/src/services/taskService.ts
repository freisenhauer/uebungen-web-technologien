import pool from "../db.js";
import type { Task, TaskStatus } from "../types/task.js";

/**
 * TODO: Implementiere diese Funktion
 *
 * Erstellt einen neuen Task in der Datenbank.
 *
 * Hinweise:
 * - Nutze eine parameterisierte Query mit $1, $2, ... Platzhaltern
 * - Verwende RETURNING * um den erstellten Task zurückzubekommen
 * - Der Status ist standardmäßig 'pending'
 * - Die created_at Spalte wird automatisch von der Datenbank gesetzt
 */
export async function createTask(
	title: string,
	description: string,
	projectId: number,
): Promise<Task> {
	// TODO: Implementierung hier
	throw new Error("Not implemented");
}

/**
 * TODO: Implementiere diese Funktion
 *
 * Lädt alle Tasks eines Projects aus der Datenbank.
 *
 * Hinweise:
 * - Nutze eine SELECT-Query mit WHERE project_id = $1
 * - Die Ergebnisse sind in result.rows verfügbar
 * - Mappe die Spalten-Namen (snake_case) auf die TypeScript-Felder (camelCase)
 */
export async function getTasksByProject(projectId: number): Promise<Task[]> {
	// TODO: Implementierung hier
	throw new Error("Not implemented");
}

/**
 * TODO: Implementiere diese Funktion
 *
 * Aktualisiert einen Task in der Datenbank.
 *
 * Hinweise:
 * - Nutze eine UPDATE-Query mit SET und WHERE
 * - Verwende RETURNING * um den aktualisierten Task zurückzubekommen
 * - Wenn kein Task mit der ID existiert, wirf einen Fehler
 */
export async function updateTask(
	id: number,
	title?: string,
	description?: string,
	status?: TaskStatus,
): Promise<Task> {
	// TODO: Implementierung hier
	throw new Error("Not implemented");
}

/**
 * TODO: Implementiere diese Funktion
 *
 * Löscht einen Task aus der Datenbank.
 *
 * Hinweise:
 * - Nutze eine DELETE-Query mit WHERE id = $1
 * - Prüfe result.rowCount um zu sehen, ob ein Task gelöscht wurde
 * - Wenn kein Task mit der ID existiert, wirf einen Fehler
 */
export async function deleteTask(id: number): Promise<void> {
	// TODO: Implementierung hier
	throw new Error("Not implemented");
}
