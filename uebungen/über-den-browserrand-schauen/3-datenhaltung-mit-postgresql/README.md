# Datenhaltung mit PostgreSQL

In dieser Übung lernst du, wie man in einer Node.js-Anwendung mit einer relationalen Datenbank (PostgreSQL) arbeitet. Du wirst Datenbankabfragen mit der `pg`-Bibliothek durchführen, Fehler behandeln und Transaktionen nutzen.

## Lernziele

- SQL-Abfragen mit der `pg`-Bibliothek ausführen
- Parameterisierte Queries zur Vermeidung von SQL-Injection nutzen
- Datenbankfehler erkennen und behandeln (z.B. Unique Violations, Foreign Key Constraints)
- Transaktionen für atomare Operationen einsetzen
- Den "Object-Relational Impedance Mismatch" praktisch erfahren: Verschachtelte Objekte aus flachen Tabellen rekonstruieren

## Kontext

Du entwickelst eine **Task Manager API**, mit der Nutzer ihre Projekte und Tasks verwalten können. Die API speichert alle Daten in einer PostgreSQL-Datenbank.

Das Datenmodell sieht wie folgt aus:

```
users (id, name, email)
  └── projects (id, name, owner_id -> users.id)
        └── tasks (id, title, description, status, project_id -> projects.id, created_at)
```

- Ein User kann mehrere Projects besitzen
- Ein Project kann mehrere Tasks enthalten
- Beziehungen werden über Foreign Keys hergestellt

## Vorbereitung

### Abhängigkeiten

Diese Übung benötigt:

- **Node.js** (v18 oder höher) - [Download & Installationsanleitung](https://nodejs.org/en/download)
- **Docker Desktop** - [Download & Installationsanleitung](https://docs.docker.com/get-started/introduction/get-docker-desktop/)

### Projekt einrichten

1. **Abhängigkeiten installieren:**
   ```bash
   npm install
   ```

2. **Datenbank starten:**
   ```bash
   docker compose up -d
   ```

   Dieser Befehl startet eine PostgreSQL-Datenbank im Hintergrund. Das Schema wird automatisch angelegt und Beispieldaten werden eingefügt.

3. **Überprüfen, ob die Datenbank läuft:**
   ```bash
   docker compose ps
   ```

   Du solltest einen Container namens `taskmanager-db` im Status "Up" sehen.

4. **(Optional) Datenbank inspizieren:**
   ```bash
   docker compose exec db psql -U postgres -d taskmanager
   ```

   Jetzt bist du in der PostgreSQL-Shell. Probiere aus:
   ```sql
   \dt                    -- Zeigt alle Tabellen
   SELECT * FROM users;   -- Zeigt alle User
   \q                     -- Beendet die Shell
   ```

5. **Server starten:**
   ```bash
   npm start
   ```

   Der Server läuft auf `http://localhost:3000`.

6. **Code formatieren und linten:**
   ```bash
   npm run format
   ```

## Aufgaben

Die API-Endpunkte sind bereits vorbereitet, aber die Service-Funktionen, die mit der Datenbank kommunizieren, sind noch nicht implementiert. Deine Aufgabe ist es, diese Funktionen zu implementieren.

### User Story 1: Tasks verwalten

**Als Nutzer möchte ich Tasks erstellen, abrufen, aktualisieren und löschen können.**

**Akzeptanzkriterien:**
- Ich kann einen neuen Task mit `POST /api/tasks` erstellen
- Ich kann alle Tasks eines Projects mit `GET /api/projects/:projectId/tasks` abrufen
- Ich kann einen Task mit `PUT /api/tasks/:id` aktualisieren
- Ich kann einen Task mit `DELETE /api/tasks/:id` löschen

**Zu implementieren:**
- `src/services/taskService.ts`:
  - `createTask()`
  - `getTasksByProject()`
  - `updateTask()`
  - `deleteTask()`

**Hinweise:**
- Nutze parameterisierte Queries mit `$1`, `$2`, ... Platzhaltern
- Verwende `RETURNING *` in INSERT/UPDATE Queries, um das erstellte/aktualisierte Objekt zurückzubekommen
- Die `pg`-Bibliothek gibt Ergebnisse in `result.rows` zurück

**Testen:**
```bash
# Task erstellen
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Neue Aufgabe","description":"Beschreibung","projectId":1}'

# Tasks eines Projects abrufen
curl http://localhost:3000/api/projects/1/tasks

# Task aktualisieren
curl -X PUT http://localhost:3000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Aktualisierte Aufgabe","status":"done"}'

# Task löschen
curl -X DELETE http://localhost:3000/api/tasks/1
```

---

### User Story 2: Project mit allen Tasks laden

**Als Nutzer möchte ich ein Project mit allen zugehörigen Tasks sehen, um einen Überblick über meine Arbeit zu bekommen.**

**Akzeptanzkriterien:**
- Ich kann ein Project mit `GET /api/projects/:id` abrufen
- Die Response enthält das Project-Objekt mit einem `tasks`-Array

Beispiel-Response:
```json
{
  "id": 1,
  "name": "Webshop entwickeln",
  "ownerId": 1,
  "tasks": [
    {
      "id": 1,
      "title": "Produktkatalog implementieren",
      "description": "...",
      "status": "in_progress",
      "projectId": 1,
      "createdAt": "2025-01-15T10:00:00Z"
    },
    {
      "id": 2,
      "title": "Warenkorb entwickeln",
      "description": "...",
      "status": "pending",
      "projectId": 1,
      "createdAt": "2025-01-15T11:00:00Z"
    }
  ]
}
```

**Zu implementieren:**
- `src/services/projectService.ts`:
  - `getProjectWithTasks()`

**Hinweise:**
- Nutze einen `LEFT JOIN`, um das Project mit allen Tasks zu laden
- Das Ergebnis ist eine flache Tabelle mit mehreren Zeilen pro Project (eine Zeile pro Task)
- Du musst die Daten manuell zu einem verschachtelten Objekt zusammenbauen:
  1. Erstelle das Project-Objekt aus der ersten Zeile
  2. Iteriere über alle Zeilen und füge jeden Task dem `tasks`-Array hinzu
  3. Achte darauf, dass ein Project ohne Tasks ebenfalls zurückgegeben wird (daher `LEFT JOIN`)

**Das ist der "Impedance Mismatch"!**
- In der objektorientierten Welt: Ein Project-Objekt mit einem `tasks`-Array
- In der relationalen Welt: Flache Tabellen mit Zeilen und Spalten
- Du musst die Brücke zwischen beiden Welten manuell schlagen

**Testen:**
```bash
curl http://localhost:3000/api/projects/1
```

---

### User Story 3: Project löschen (mit Transaktion)

**Als Nutzer möchte ich ein Project löschen können, wobei alle zugehörigen Tasks ebenfalls gelöscht werden.**

**Akzeptanzkriterien:**
- Ich kann ein Project mit `DELETE /api/projects/:id` löschen
- Alle Tasks des Projects werden automatisch mitgelöscht
- Entweder werden sowohl das Project als auch alle Tasks gelöscht, oder nichts wird gelöscht (Atomarität)

**Zu implementieren:**
- `src/services/projectService.ts`:
  - `deleteProject()`

**Hinweise:**
- Nutze eine Transaktion, um sicherzustellen, dass entweder alles oder nichts gelöscht wird
- Eine Transaktion in `pg` läuft so ab:
  ```typescript
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    // ... deine DELETE Queries hier
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
  ```
- Lösche zuerst alle Tasks des Projects (Foreign Key!), dann das Project selbst

**Testen:**
```bash
# Project löschen
curl -X DELETE http://localhost:3000/api/projects/1

# Verifizieren, dass auch die Tasks gelöscht wurden
curl http://localhost:3000/api/projects/1/tasks
# Sollte einen 404-Fehler zurückgeben
```

---

### User Story 4: User mit eindeutiger E-Mail erstellen

**Als System möchte ich sicherstellen, dass keine zwei User mit derselben E-Mail-Adresse existieren.**

**Akzeptanzkriterien:**
- Ich kann einen User mit `POST /api/users` erstellen
- Wenn die E-Mail bereits existiert, wird ein **400 Bad Request** mit einer aussagekräftigen Fehlermeldung zurückgegeben
- Andere Datenbankfehler werden ebenfalls behandelt

**Zu implementieren:**
- `src/services/userService.ts`:
  - `createUser()`

**Hinweise:**
- In der Datenbank ist die E-Mail als `UNIQUE` definiert
- PostgreSQL wirft einen Fehler mit dem Code `23505`, wenn ein Unique Constraint verletzt wird
- Fange diesen spezifischen Fehler ab und wirf eine verständliche Fehlermeldung
- Beispiel:
  ```typescript
  try {
    // ... INSERT Query
  } catch (error: any) {
    if (error.code === '23505') {
      throw new Error('Ein User mit dieser E-Mail existiert bereits');
    }
    throw error; // Andere Fehler weiterwerfen
  }
  ```

**Testen:**
```bash
# User erstellen
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Max Mustermann","email":"max@example.com"}'

# Nochmal denselben User erstellen (sollte fehlschlagen)
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Max Mustermann","email":"max@example.com"}'
# Sollte einen 400-Fehler mit "Ein User mit dieser E-Mail existiert bereits" zurückgeben
```

---

## Weiterführende Aufgaben (Optional)

Wenn du noch mehr üben möchtest:

1. **Alle Projects eines Users laden:**
   - Implementiere `GET /api/users/:id/projects`
   - Lade alle Projects eines Users inklusive deren Tasks
   - Noch mehr Impedance Mismatch: User → Projects → Tasks (3 Ebenen!)

2. **Paginierung:**
   - Erweitere `GET /api/projects/:projectId/tasks` um Query-Parameter `limit` und `offset`
   - Nutze `LIMIT` und `OFFSET` in SQL

3. **Volltextsuche:**
   - Implementiere `GET /api/tasks/search?q=...`
   - Nutze `ILIKE` oder PostgreSQLs Full-Text-Search

4. **Optimierung:**
   - Analysiere die generierten SQL-Queries mit `EXPLAIN ANALYZE`
   - Füge Indizes hinzu, wo sinnvoll

## Ressourcen

- [PostgreSQL Dokumentation](https://www.postgresql.org/docs/)
- [node-postgres (pg) Dokumentation](https://node-postgres.com/)
- [SQL Tutorial auf w3schools](https://www.w3schools.com/sql/)
- [PostgreSQL Error Codes](https://www.postgresql.org/docs/current/errcodes-appendix.html)

## Aufräumen

Wenn du mit der Übung fertig bist, kannst du die Datenbank stoppen:

```bash
docker compose down
```

Um die Datenbank **inklusive aller Daten** zu löschen:

```bash
docker compose down -v
```
