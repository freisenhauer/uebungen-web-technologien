// DOM-Elemente
const commentForm = document.getElementById("commentForm");
const commentsList = document.getElementById("commentsList");
const clearCommentsBtn = document.getElementById("clearCommentsBtn");

// Event-Listener registrieren
commentForm.addEventListener("submit", handleCommentSubmit);
clearCommentsBtn.addEventListener("click", handleClearComments);

// Kommentare beim Laden der Seite abrufen
loadComments();

/**
 * Lädt alle Kommentare vom Server und zeigt sie an
 */
async function loadComments() {
    try {
        const response = await fetch("/api/comments");
        const comments = await response.json();
        displayComments(comments);
    } catch (error) {
        console.error("Fehler beim Laden der Kommentare:", error);
        commentsList.innerHTML =
            '<p class="error">Fehler beim Laden der Kommentare.</p>';
    }
}

/**
 * Zeigt Kommentare in der Liste an
 */
function displayComments(comments) {
    if (comments.length === 0) {
        commentsList.innerHTML =
            '<p class="empty">Noch keine Kommentare. Sei der Erste!</p>';
        return;
    }

    // TODO Phase 4, Aufgabe 1: Ändere innerHTML zu textContent, um XSS zu verhindern
    // ACHTUNG: Diese Zeile ist unsicher und erlaubt XSS-Angriffe!
    commentsList.innerHTML = comments
        .map(
            (comment) => `
        <article class="comment">
            <header class="comment-header">
                <strong class="comment-author">${comment.author}</strong>
                <time class="comment-time">${new Date(comment.timestamp).toLocaleString("de-DE")}</time>
            </header>
            <div class="comment-text">${comment.text}</div>
        </article>
    `,
        )
        .join("");
}

/**
 * Behandelt das Absenden eines neuen Kommentars
 */
async function handleCommentSubmit(event) {
    event.preventDefault();

    const formData = new FormData(commentForm);
    const author = formData.get("author");
    const text = formData.get("text");

    try {
        const response = await fetch("/api/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ author, text }),
        });

        if (response.ok) {
            commentForm.reset();
            await loadComments();
        } else {
            alert("Fehler beim Speichern des Kommentars");
        }
    } catch (error) {
        console.error("Fehler beim Absenden:", error);
        alert("Fehler beim Absenden des Kommentars");
    }
}

/**
 * Löscht alle Kommentare
 */
async function handleClearComments() {
    if (!confirm("Wirklich alle Kommentare löschen?")) {
        return;
    }

    try {
        const response = await fetch("/api/comments", {
            method: "DELETE",
        });

        if (response.ok) {
            await loadComments();
        } else {
            alert("Fehler beim Löschen der Kommentare");
        }
    } catch (error) {
        console.error("Fehler beim Löschen:", error);
        alert("Fehler beim Löschen der Kommentare");
    }
}
