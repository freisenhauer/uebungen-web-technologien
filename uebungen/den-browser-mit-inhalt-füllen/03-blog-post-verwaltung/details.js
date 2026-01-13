// ========================================
// Konstanten und DOM-Referenzen
// ========================================

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

// TODO: Hole Referenz zum Container für die Post-Details

// ========================================
// Hilfsfunktionen
// ========================================

/**
 * Liest die Post-ID aus der URL
 * @returns {string|null} - Die Post-ID oder null, falls nicht vorhanden
 */
function getPostIdFromUrl() {
	// TODO: Erstelle ein URLSearchParams-Objekt aus window.location.search

	// TODO: Hole den 'id'-Query-Parameter und gib ihn zurück
}

/**
 * Zeigt die Post-Details im DOM an
 * @param {Object} post - Das Post-Objekt von der API
 */
function displayPostDetails(post) {
	// TODO: Erstelle HTML-Elemente für die Post-Details
	// - Title (h2)
	// - Post-ID (z.B. in einem span mit der Klasse "post-meta")
	// - Body (p mit der Klasse "post-body")

	// TODO: Füge die Elemente dem Container hinzu
	// Tipp: Du kannst innerHTML verwenden oder einzelne Elemente erstellen
}

/**
 * Zeigt eine Fehlermeldung an
 * @param {string} message - Die anzuzeigende Fehlermeldung
 */
function displayError(message) {
	// TODO: Erstelle ein Element für die Fehlermeldung

	// TODO: Füge die Fehlermeldung dem Container hinzu
}

// ========================================
// API-Funktionen
// ========================================

/**
 * Lädt einen einzelnen Post von der API
 * @param {string} postId - Die ID des Posts
 * @returns {Object} - Das Post-Objekt von der API
 */
async function loadPost(postId) {
	// TODO: Führe einen GET-Request aus, um den Post zu laden
	// API-Endpunkt: `${API_BASE_URL}/posts/${postId}`

	// TODO: Prüfe, ob die Response erfolgreich war (response.ok)
	// Falls nicht, wirf einen Fehler

	// TODO: Parse die Response als JSON und gib sie zurück
}

// ========================================
// Initialisierung
// ========================================

/**
 * Wird ausgeführt, wenn die Seite geladen ist
 */
async function init() {
	// TODO: Hole die Post-ID aus der URL

	// TODO: Prüfe, ob eine ID vorhanden ist
	// Falls nicht, zeige eine Fehlermeldung an und beende die Funktion

	// TODO: Lade den Post von der API
	// Verwende try/catch für Fehlerbehandlung

	// TODO: Zeige die Post-Details an
	// Falls ein Fehler auftritt, zeige eine Fehlermeldung an
}

// Starte die Anwendung, wenn das DOM bereit ist
document.addEventListener("DOMContentLoaded", init);
