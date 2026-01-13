# SQL-Injection: Angriff und Verteidigung

## Überblick

In dieser Übung lernst du SQL-Injection-Angriffe kennen – eine der gefährlichsten Sicherheitslücken in Webanwendungen. Du wirst selbst Angriffe durchführen, um zu verstehen, wie sie funktionieren, und anschließend die Schwachstellen schließen.

## Szenario

Du arbeitest an einem internen Support-Ticketsystem eines kleinen Unternehmens. Das System ermöglicht es Mitarbeitern, Support-Tickets zu erstellen und zu verwalten. Jeder Benutzer soll nur seine eigenen Tickets sehen und bearbeiten können.

Allerdings enthält die Anwendung mehrere SQL-Injection-Schwachstellen, die es einem Angreifer ermöglichen, auf fremde Daten zuzugreifen oder diese zu manipulieren.

**Deine Aufgabe:**
1. Als "Ethical Hacker" verschiedene SQL-Injection-Angriffe durchführen
2. Die Schwachstellen durch sichere Programmierung beheben

## Lernziele

- Verstehen, wie SQL-Injection-Angriffe funktionieren
- Praktische Erfahrung mit verschiedenen Angriffsvektoren sammeln
- Prepared Statements als Abwehrmaßnahme implementieren
- Input-Validierung richtig einsetzen
- Das Prinzip der geringsten Privilegien anwenden

## Voraussetzungen

### Software

**Alle Betriebssysteme:**
- Node.js (Version 18 oder höher)
- npm (kommt mit Node.js)
- Ein HTTP-Client deiner Wahl

## Setup

1. Installiere die Abhängigkeiten:
```bash
npm install
```

2. Starte die Anwendung:
```bash
npm start
```

Die API läuft nun auf `http://localhost:3000`.

3. Teste, ob die API läuft:
```bash
curl "http://localhost:3000/tickets?as_user=alice"
```

Du solltest eine Liste von Alices Tickets sehen.

## Die API

### Authentifizierung (vereinfacht)

Um die Übung fokussiert zu halten, simulieren wir Authentifizierung über den Query-Parameter `as_user`:

```
GET /tickets?as_user=alice
```

Dies simuliert, dass Alice eingeloggt ist. In einer echten Anwendung würde dies über Sessions oder JWTs gelöst.

### Verfügbare Benutzer

Die Datenbank enthält drei Testbenutzer mit jeweils mehreren Tickets:
- **alice** (Support-Mitarbeiterin)
- **bob** (Entwickler)
- **charlie** (Manager)

### Endpoints

Alle Endpoints benötigen den `as_user` Parameter:

- `GET /tickets?as_user=<username>` - Liste aller eigenen Tickets
- `GET /tickets?as_user=<username>&search=<suchbegriff>` - Suche in eigenen Tickets
- `GET /tickets/:id?as_user=<username>` - Ein spezifisches Ticket abrufen
- `PUT /tickets/:id?as_user=<username>` - Ticket aktualisieren (Body: `{ "description": "..." }`)
- `DELETE /tickets/:id?as_user=<username>` - Ticket löschen

## Teil 1: Angriffe durchführen (ca. 45 Minuten)

In diesem Teil schlüpfst du in die Rolle eines Angreifers und nutzt SQL-Injection-Schwachstellen aus.

### Aufgabe 1.1: Fremde Tickets lesen

**User Story**: Als Angreifer möchte ich alle Tickets in der Datenbank sehen, nicht nur meine eigenen.

**Ziel**: Du sollst als Alice eingeloggt sein, aber trotzdem Tickets von Bob und Charlie sehen können.

**Hinweise**:
- Der `search`-Endpoint ist verwundbar
- Überlege dir, wie SQL WHERE-Bedingungen aufgebaut sind
- Du könntest versuchen, die ursprüngliche Bedingung mit einer Oder-Verknüpfung zu umgehen
- Teste deine Anfragen mit `curl` oder einem REST-Client

**Erfolgskriterium**: Du siehst mehr Tickets als nur die von Alice (es gibt insgesamt Tickets von drei Benutzern)

### Aufgabe 1.2: Spezifische Tickets anderer Benutzer lesen

**User Story**: Als Angreifer möchte ich gezielt Tickets von einem bestimmten Benutzer (z.B. "charlie") auslesen.

**Ziel**: Du sollst als Alice eingeloggt sein, aber gezielt nur Charlies Tickets sehen können.

**Hinweise**:
- Der `GET /tickets/:id` Endpoint ist verwundbar
- Du kannst SQL-Injection im URL-Parameter nutzen
- Denke daran, dass SQL-Kommentare (`--`) den Rest der Query auskommentieren können
- Überlege, wie du die WHERE-Bedingung so manipulieren könntest, dass sie nach einem anderen Benutzer filtert

**Erfolgskriterium**: Du siehst ausschließlich Tickets von Charlie, obwohl du als Alice eingeloggt bist

### Aufgabe 1.3: Daten manipulieren

**User Story**: Als Angreifer möchte ich Tickets anderer Benutzer löschen oder verändern.

**Ziel**:
- Lösche gezielt ein Ticket von Bob, während du als Alice eingeloggt bist
- Verändere die Beschreibung eines Tickets von Charlie

**Hinweise**:
- Die `PUT /tickets/:id` und `DELETE /tickets/:id` Endpoints sind verwundbar
- Du kannst SQL-Injection sowohl im URL-Parameter als auch im Request-Body versuchen
- Überlege, wie du zusätzliche SQL-Statements in deine Eingabe einschleusen könntest
- Manche Datenbank-Treiber erlauben mehrere Statements auf einmal (getrennt durch `;`)

**Erfolgskriterium**:
- Ein Ticket von Bob ist gelöscht
- Die Beschreibung eines Tickets von Charlie wurde verändert
- Dokumentiere, welche Strategien funktioniert haben

### Aufgabe 1.4: Datenbankstruktur erkunden (Advanced)

**User Story**: Als Angreifer möchte ich herausfinden, welche anderen Tabellen in der Datenbank existieren.

**Ziel**: Finde heraus, welche Tabellen es in der Datenbank gibt und wie die `users`-Tabelle strukturiert ist.

**Hinweise**:
- SQLite speichert Metadaten in einer speziellen Systemtabelle namens `sqlite_master`
- Du kannst `UNION SELECT` verwenden, um Daten aus mehreren Tabellen zu kombinieren
- Achte darauf, dass die Anzahl der Spalten und deren Typen übereinstimmen müssen
- Du kannst `NULL` verwenden, um fehlende Spalten aufzufüllen

**Erfolgskriterium**: Du kannst die Namen aller Tabellen und die Struktur der `users`-Tabelle ausgeben

## Teil 2: Schwachstellen beheben (ca. 45 Minuten)

Jetzt wechselst du die Seiten: Du bist nun der Entwickler, der die Sicherheitslücken schließen muss.

### Aufgabe 2.1: Prepared Statements implementieren

**User Story**: Als Entwickler möchte ich alle SQL-Abfragen durch Prepared Statements absichern, damit SQL-Injection nicht mehr möglich ist.

**Deine Aufgabe**:
- Öffne `src/routes/tickets.ts`
- Finde alle Stellen, wo SQL-Abfragen per String-Interpolation gebaut werden
- Ersetze sie durch Prepared Statements mit Platzhaltern (`?`)

**Beispiel einer unsicheren Abfrage**:
```typescript
const sql = `SELECT * FROM tickets WHERE username = '${username}' AND title LIKE '%${search}%'`;
const tickets = db.prepare(sql).all();
```

**Abgesicherte Version**:
```typescript
const sql = `SELECT * FROM tickets WHERE username = ? AND title LIKE ?`;
const tickets = db.prepare(sql).all(username, `%${search}%`);
```

**Wichtig**:
- Alle Benutzereingaben (Query-Parameter, URL-Parameter, Request-Body) müssen als Parameter gebunden werden
- String-Interpolation (`${}`) ist NIEMALS sicher für SQL-Abfragen

**Testkriterium**:
- Wiederhole die Angriffe aus Teil 1
- Keiner der Angriffe sollte mehr funktionieren
- Normale Anfragen (ohne Injection) sollten weiterhin funktionieren

### Aufgabe 2.2: Input-Validierung

**User Story**: Als Entwickler möchte ich Eingabedaten validieren, um frühzeitig ungültige oder verdächtige Anfragen abzulehnen.

**Deine Aufgabe**:
- Validiere, dass `id` Parameter tatsächlich Zahlen sind
- Validiere, dass `username` nur alphanumerische Zeichen enthält
- Lehne Anfragen mit ungültigen Werten mit HTTP 400 (Bad Request) ab

**Beispiel**:
```typescript
const id = parseInt(req.params.id);
if (isNaN(id) || id < 1) {
  return res.status(400).json({ error: "Invalid ticket ID" });
}
```

**Hinweis**: Input-Validierung ist eine zusätzliche Schutzschicht, ersetzt aber NICHT Prepared Statements!

### Aufgabe 2.3: Testen der Absicherung

**User Story**: Als Entwickler möchte ich sicherstellen, dass die Anwendung nun gegen SQL-Injection geschützt ist.

**Deine Aufgabe**:
- Erstelle eine Datei `test-security.http` (für VS Code REST Client) oder ein Postman-Collection
- Füge alle Angriffe aus Teil 1 als Test-Cases hinzu
- Dokumentiere, dass sie nun alle fehlschlagen bzw. keinen Schaden mehr anrichten

**Beispiel `test-security.http`**:
```http
### Test 1: Versuch, alle Tickets zu lesen (sollte fehlschlagen)
GET http://localhost:3000/tickets?as_user=alice&search=' OR '1'='1

### Test 2: Normaler Search sollte funktionieren
GET http://localhost:3000/tickets?as_user=alice&search=bug
```

## Bonusaufgaben

### Bonus 1: Prinzip der geringsten Privilegien

**Hinweis**: In einer realen Anwendung würde man mehrere Datenbankverbindungen mit unterschiedlichen Rechten verwenden:
- Eine Verbindung nur mit Leserechten für SELECT-Queries
- Eine Verbindung mit Schreibrechten für INSERT/UPDATE/DELETE

Recherchiere, wie man dies in SQLite bzw. PostgreSQL umsetzen könnte und dokumentiere deine Erkenntnisse.

### Bonus 2: Rate Limiting

Implementiere ein einfaches Rate Limiting, um Brute-Force-Angriffe zu erschweren:
- Maximal 10 Anfragen pro Minute pro IP-Adresse
- Nutze die Library `express-rate-limit`

### Bonus 3: Logging verdächtiger Aktivitäten

Implementiere ein Logging-System, das verdächtige Anfragen (z.B. mit SQL-Sonderzeichen) protokolliert:
- Erkenne typische SQL-Injection-Muster (z.B. `'`, `--`, `UNION`, `SELECT`)
- Schreibe verdächtige Anfragen in eine Log-Datei
- **Wichtig**: Dies ersetzt NICHT die eigentliche Absicherung!

## Weiterführende Ressourcen

- [OWASP SQL Injection](https://owasp.org/www-community/attacks/SQL_Injection)
- [OWASP Top 10 - Injection](https://owasp.org/Top10/A03_2021-Injection/)
- [SQLite Prepared Statements](https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md#binding-parameters)
- [Prepared Statements in PostgreSQL](https://node-postgres.com/features/queries#parameterized-query)

## Reflexion

Beantworte nach Abschluss der Übung folgende Fragen:

1. **Wie fühlt es sich an, eine Anwendung zu hacken?** Was hat dich überrascht?

2. **Warum ist SQL-Injection so gefährlich?** Welche realen Schäden könnte ein Angreifer anrichten?

3. **Warum reicht Input-Validierung allein nicht aus?** Was ist der Unterschied zu Prepared Statements?

4. **In welchen Situationen könntest du selbst versehentlich SQL-Injection-Lücken einbauen?**

5. **Wie würdest du als Code-Reviewer solche Lücken finden?**