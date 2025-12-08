import pool from "../db.js";
import type { User } from "../types/user.js";

/**
 * TODO: Implementiere diese Funktion
 *
 * Erstellt einen neuen User in der Datenbank.
 *
 * Hinweise:
 * - Nutze eine parameterisierte INSERT-Query
 * - Verwende RETURNING * um den erstellten User zurückzubekommen
 * - Die E-Mail-Adresse muss eindeutig sein (UNIQUE Constraint in der Datenbank)
 * - PostgreSQL wirft einen Fehler mit dem Code '23505', wenn ein Unique Constraint verletzt wird
 * - Fange diesen spezifischen Fehler ab und wirf eine verständliche Fehlermeldung
 *
 * Beispiel für Fehlerbehandlung:
 * try {
 *   // ... INSERT Query
 * } catch (error: any) {
 *   if (error.code === '23505') {
 *     throw new Error('Ein User mit dieser E-Mail existiert bereits');
 *   }
 *   throw error;
 * }
 */
export async function createUser(name: string, email: string): Promise<User> {
	// TODO: Implementierung hier
	throw new Error("Not implemented");
}
