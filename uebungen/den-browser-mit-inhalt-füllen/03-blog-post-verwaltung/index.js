// ========================================
// Konstanten und DOM-Referenzen
// ========================================

const API_BASE_URL = "https://jsonplaceholder.typicode.com";
const POSTS_LIMIT = 10;

// TODO: Hole Referenzen zu den wichtigen DOM-Elementen
// - Formular zum Erstellen eines Posts
// - Container für die Posts-Liste

// ========================================
// Hilfsfunktionen
// ========================================

/**
 * Erstellt ein DOM-Element für einen einzelnen Post
 * @param {Object} post - Das Post-Objekt von der API
 * @returns {HTMLElement} - Das erstellte Post-Card-Element
 */
function createPostCard(post) {
	// TODO: Erstelle ein div-Element mit der Klasse "post-card"

	// TODO: Füge den Inhalt des Posts hinzu (Title, Body, ID)
	// Tipp: Verwende innerHTML oder erstelle einzelne Elemente mit createElement

	// TODO: Füge einen Event-Listener hinzu, der bei Klick zur Detailseite navigiert
	// Tipp: Verwende window.location.href = `details.html?id=${post.id}`

	// TODO (Bonus): Füge einen "Löschen"-Button hinzu, der die deletePost-Funktion aufruft

	// TODO: Gib das erstellte Element zurück
}

/**
 * Fügt einen Post zur Liste hinzu
 * @param {Object} post - Das Post-Objekt von der API
 */
function addPostToList(post) {
	// TODO: Erstelle ein Post-Card-Element mit createPostCard()

	// TODO: Füge das Element dem Posts-Container hinzu
	// Tipp: Füge neue Posts am Anfang ein mit prepend() statt append()
}

// ========================================
// API-Funktionen
// ========================================

/**
 * Lädt die ersten Posts von der API und zeigt sie an
 */
async function loadPosts() {
	// TODO: Führe einen GET-Request aus, um die ersten 10 Posts zu laden
	// API-Endpunkt: `${API_BASE_URL}/posts?_limit=${POSTS_LIMIT}`

	// TODO: Parse die Response als JSON

	// TODO: Iteriere über die Posts und füge sie zur Liste hinzu
	// Tipp: Verwende eine for-Schleife oder forEach
}

/**
 * Erstellt einen neuen Post über die API
 * @param {Object} postData - Die Daten des neuen Posts (title, body, userId)
 * @returns {Object} - Der erstellte Post von der API
 */
async function createPost(postData) {
	// TODO: Führe einen POST-Request aus, um einen neuen Post zu erstellen
	// API-Endpunkt: `${API_BASE_URL}/posts`
	// Denk daran: Content-Type: application/json und body als JSON.stringify()

	// TODO: Parse die Response als JSON und gib sie zurück
}

/**
 * Löscht einen Post über die API
 * @param {number} postId - Die ID des zu löschenden Posts
 */
async function deletePost(postId) {
	// TODO (Bonus): Führe einen DELETE-Request aus
	// API-Endpunkt: `${API_BASE_URL}/posts/${postId}`

	// TODO (Bonus): Entferne das Post-Element aus dem DOM
	// Tipp: Finde das Element anhand einer data-id Attribute
}

// ========================================
// Event Handler
// ========================================

/**
 * Behandelt das Absenden des Formulars
 * @param {Event} event - Das Submit-Event
 */
async function handleFormSubmit(event) {
	// TODO: Verhindere das Standard-Formularverhalten
	// Tipp: event.preventDefault()

	// TODO (Bonus): Validiere die Formulareingaben
	// - Title und Body dürfen nicht leer sein
	// - Zeige eine Fehlermeldung an, falls die Validierung fehlschlägt

	// TODO: Hole die Werte aus den Formularfeldern
	// Tipp: Verwende event.target.elements['title'].value

	// TODO: Erstelle ein Post-Objekt mit den Formulardaten
	// userId kannst du auf 1 setzen

	// TODO: Rufe createPost() auf und warte auf die Antwort

	// TODO: Füge den neuen Post zur Liste hinzu

	// TODO: Setze das Formular zurück
	// Tipp: event.target.reset()
}

// ========================================
// Initialisierung
// ========================================

/**
 * Wird ausgeführt, wenn die Seite geladen ist
 */
function init() {
	// TODO: Lade die Posts beim Laden der Seite

	// TODO: Füge einen Event-Listener für das Formular hinzu
}

// Starte die Anwendung, wenn das DOM bereit ist
document.addEventListener("DOMContentLoaded", init);
