// In-Memory Datenbank mit Seed-Daten

export const books = [
    {
        id: 1,
        title: "1984",
        authorId: 1,
        isbn: "978-0-452-28423-4",
        year: 1949,
    },
    {
        id: 2,
        title: "Animal Farm",
        authorId: 1,
        isbn: "978-0-452-28424-1",
        year: 1945,
    },
    {
        id: 3,
        title: "To Kill a Mockingbird",
        authorId: 2,
        isbn: "978-0-06-112008-4",
        year: 1960,
    },
];

export const authors = [
    {
        id: 1,
        name: "George Orwell",
        bio: "Englischer Schriftsteller, Essayist und Journalist",
    },
    {
        id: 2,
        name: "Harper Lee",
        bio: "Amerikanische Schriftstellerin",
    },
    {
        id: 3,
        name: "Jane Austen",
        bio: "Englische Schriftstellerin der Romantik",
    },
];

// Counter für neue IDs
// Wichtig: Diese werden erst nach erfolgreichem Erstellen inkrementiert
let nextBookId = 4;
let nextAuthorId = 4;

export function getCurrentBookId() {
    return nextBookId;
}

export function incrementBookId() {
    nextBookId++;
}

export function getCurrentAuthorId() {
    return nextAuthorId;
}

export function incrementAuthorId() {
    nextAuthorId++;
}
