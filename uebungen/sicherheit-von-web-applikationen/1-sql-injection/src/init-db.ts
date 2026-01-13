import { db } from "./db.js";

console.log("🗄️  Initialisiere Datenbank...");

// Alte Tabellen löschen, falls vorhanden
db.exec("DROP TABLE IF EXISTS tickets");
db.exec("DROP TABLE IF EXISTS users");

// Benutzer-Tabelle erstellen
db.exec(`
  CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL
  )
`);

// Tickets-Tabelle erstellen
db.exec(`
  CREATE TABLE tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    username TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (username) REFERENCES users(username)
  )
`);

console.log("✅ Tabellen erstellt");

// Benutzer anlegen
const insertUser = db.prepare(
	"INSERT INTO users (username, role) VALUES (?, ?)",
);

insertUser.run("alice", "support");
insertUser.run("bob", "developer");
insertUser.run("charlie", "manager");

console.log("✅ Benutzer angelegt");

// Tickets für Alice (Support-Mitarbeiterin)
const insertTicket = db.prepare(
	"INSERT INTO tickets (title, description, username) VALUES (?, ?, ?)",
);

insertTicket.run(
	"Login-Problem im CRM",
	"Benutzer können sich seit heute Morgen nicht mehr im CRM einloggen. Fehlermeldung: 'Invalid credentials'",
	"alice",
);

insertTicket.run(
	"Dashboard lädt langsam",
	"Das Dashboard braucht über 10 Sekunden zum Laden. Kann das optimiert werden?",
	"alice",
);

insertTicket.run(
	"E-Mail Benachrichtigungen kommen nicht an",
	"Kunden beschweren sich, dass sie keine Bestätigungsmails erhalten.",
	"alice",
);

// Tickets für Bob (Entwickler)
insertTicket.run(
	"API-Endpoint returns 500",
	"Der /api/users endpoint wirft einen Internal Server Error. Stack trace im Log.",
	"bob",
);

insertTicket.run(
	"Unit tests failing",
	"Nach dem letzten Merge schlagen 5 Tests in der user-service.test.ts fehl.",
	"bob",
);

insertTicket.run(
	"Database migration needed",
	"Wir müssen eine neue Spalte 'avatar_url' zur users Tabelle hinzufügen.",
	"bob",
);

// Tickets für Charlie (Manager)
insertTicket.run(
	"Quarterly report needed",
	"Bitte Umsatzzahlen Q4 2024 für Board-Meeting vorbereiten.",
	"charlie",
);

insertTicket.run(
	"Budget approval pending",
	"Das Budget für die neue Marketing-Kampagne muss noch vom CFO freigegeben werden.",
	"charlie",
);

insertTicket.run(
	"Team offsite planning",
	"Termin und Location für Team-Event im März finden. Budget: 5000€",
	"charlie",
);

console.log("✅ Tickets angelegt");

// Statistik ausgeben
const userCount = db.prepare("SELECT COUNT(*) as count FROM users").get() as {
	count: number;
};
const ticketCount = db
	.prepare("SELECT COUNT(*) as count FROM tickets")
	.get() as { count: number };

console.log(`\n📊 Datenbank-Statistik:`);
console.log(`   - ${userCount.count} Benutzer`);
console.log(`   - ${ticketCount.count} Tickets`);

db.close();
console.log("\n✨ Datenbank erfolgreich initialisiert!\n");