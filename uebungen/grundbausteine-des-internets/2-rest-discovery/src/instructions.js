import { progress } from "./progress.js";

// Helper Funktion für Anweisungen basierend auf Fortschritt
export function getNextInstructions() {
    if (!progress.visitedBooksCollection) {
        return {
            next: "Rufe die Bücher-Collection ab",
            hint: "Versuche: GET /books",
            concept:
                "Collections sind Sammlungen von Ressourcen. Sie werden im Plural benannt.",
        };
    }

    if (!progress.visitedBookDetail) {
        return {
            next: "Rufe ein einzelnes Buch ab",
            hint: "Versuche: GET /books/1",
            concept:
                "Einzelressourcen werden über ihre ID identifiziert. Die URL folgt dem Muster: /collection/{id}",
        };
    }

    if (!progress.visitedAuthorsCollection) {
        return {
            next: "Entdecke die Autoren-Collection",
            hint: "Versuche: GET /authors",
            concept: "APIs können mehrere Ressourcen-Typen verwalten.",
        };
    }

    if (!progress.visitedAuthorDetail) {
        return {
            next: "Rufe einen einzelnen Autor ab",
            hint: "Versuche: GET /authors/1",
            concept: "Das Muster ist konsistent über alle Ressourcen-Typen.",
        };
    }

    if (!progress.createdBook) {
        return {
            next: "Erstelle ein neues Buch",
            hint: 'Versuche: POST /books mit Body: {"title": "Dein Titel", "authorId": 1, "isbn": "978-...", "year": 2024}',
            concept:
                "POST wird verwendet, um neue Ressourcen zu erstellen. Der Statuscode 201 Created zeigt erfolgreiche Erstellung an.",
        };
    }

    if (!progress.updatedWithPut) {
        return {
            next: "Aktualisiere ein Buch vollständig",
            hint: "Versuche: PUT /books/{id} mit einem vollständigen Buch-Objekt",
            concept:
                "PUT ersetzt die gesamte Ressource. Du musst alle Felder senden.",
        };
    }

    if (!progress.updatedWithPatch) {
        return {
            next: "Aktualisiere ein Buch teilweise",
            hint: 'Versuche: PATCH /books/{id} mit z.B. {"year": 2025}',
            concept:
                "PATCH aktualisiert nur die gesendeten Felder. Die anderen bleiben unverändert.",
        };
    }

    if (!progress.deletedResource) {
        return {
            next: "Lösche ein Buch",
            hint: "Versuche: DELETE /books/{id}",
            concept:
                "DELETE entfernt eine Ressource. Der Statuscode 204 No Content bedeutet erfolgreiche Löschung ohne Response-Body.",
        };
    }

    if (!progress.experiencedNotFound) {
        return {
            next: "Versuche eine nicht existierende Ressource abzurufen",
            hint: "Versuche: GET /books/999",
            concept:
                "404 Not Found zeigt an, dass die Ressource nicht existiert. Dies ist ein wichtiger Teil der REST-API.",
        };
    }

    if (!progress.experiencedBadRequest) {
        return {
            next: "Sende ungültige Daten",
            hint: 'Versuche: POST /books mit unvollständigen Daten, z.B. {"title": "Nur ein Titel"}',
            concept:
                "400 Bad Request zeigt an, dass die Anfrage ungültig ist. Die Response sollte Details zum Fehler enthalten.",
        };
    }

    if (!progress.visitedSubResource) {
        return {
            next: "Entdecke Sub-Ressourcen",
            hint: "Versuche: GET /authors/1/books",
            concept:
                "Sub-Ressourcen zeigen Beziehungen zwischen Ressourcen. Hier: Alle Bücher eines bestimmten Autors.",
        };
    }

    return {
        next: "Gratulation! Du hast alle Basis-Konzepte entdeckt.",
        challenge:
            "Finale Challenge: Erstelle einen neuen Autor, dann ein neues Buch für diesen Autor, aktualisiere das Jahr des Buches, und rufe dann alle Bücher des Autors ab.",
        concept:
            "REST-APIs folgen konsistenten Mustern. Du kannst jetzt mit jeder REST-API arbeiten!",
    };
}
