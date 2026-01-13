# Übung: Middleware, Sessions und Fehlerbehandlung

## Lernziele

In dieser Übung lernst du:
- Middleware-Konzepte zu verstehen und anzuwenden
- Request-Response-Pipeline in Express.js zu nutzen
- Sessions für Authentifizierung einzusetzen
- Zentrale Fehlerbehandlung zu implementieren
- Geschützte API-Routen zu erstellen
- Den Unterschied zwischen globaler und routenspezifischer Middleware zu verstehen

## Voraussetzungen

- Node.js (Version 18 oder höher)
- npm
- TypeScript- und Express.js-Kenntnisse aus den vorherigen Übungen
- Ein Code-Editor (z.B. VS Code)
- Ein Tool zum Testen von APIs (curl, Postman, VS Code REST Client, oder ähnliches)

## Abhängigkeiten

Für diese Übung benötigst du zusätzliche npm-Packages:

```bash
npm install express-session
npm install --save-dev @types/express-session
```

**Wichtig:** Unter allen Betriebssystemen (macOS, Linux, Windows) können diese Pakete über npm installiert werden.

## Szenario

Die Todo-REST-API aus der letzten Übung ist ein Erfolg! Doch der Product Owner hat neue Anforderungen: Die API soll jetzt mehrere Benutzer unterstützen. Jeder Benutzer soll sich einloggen können und nur seine eigenen Todos sehen und bearbeiten können.

Um dies umzusetzen, benötigst du:
1. **Middleware** - um Requests zu verarbeiten, zu loggen und zu authentifizieren
2. **Session-Management** - um Benutzer nach dem Login zu "erkennen"
3. **Fehlerbehandlung** - um Fehler (z.B. "nicht eingeloggt") zentral und konsistent zu behandeln

**Hinweis:** Die Anwendung nutzt weiterhin In-Memory-Speicherung. Benutzer und ihre Passwörter werden hart-kodiert im Code gespeichert (das ist für Lernzwecke OK, aber niemals in Produktivsystemen!). Sessions werden ebenfalls im Arbeitsspeicher gespeichert.

## Ausgangssituation

Diese Übung baut auf **Übung 2 (Todo REST API)** auf. Der Code aus Übung 2 liegt bereits in diesem Verzeichnis vor und dient als Startpunkt.

Die bestehende API bietet bereits:
- CRUD-Operationen für Todos
- JSON-Parsing Middleware
- Grundlegende Fehlerbehandlung in den einzelnen Routes

Das wirst du erweitern um:
- Authentifizierung mit Login/Logout
- Session-basierte Benutzerverwaltung
- Middleware für Logging und Auth-Checks
- Zentrale Fehlerbehandlung

## Aufgaben

### User Story 1: Logging-Middleware implementieren
**Als Entwickler möchte ich alle eingehenden HTTP-Requests loggen, damit ich nachvollziehen kann, welche Anfragen an die API gestellt werden.**

Akzeptanzkriterien:
- [ ] Eine Middleware loggt jede eingehende Anfrage (Methode, URL, Timestamp)
- [ ] Die Middleware wird global für alle Routes registriert
- [ ] Das Log erscheint in der Konsole

**Hinweise:**
- Middleware-Funktionen haben die Signatur: `(req, res, next) => { ... }`
- Mit `next()` wird die Kontrolle an die nächste Middleware weitergegeben
- Globale Middleware wird mit `app.use()` registriert
- Die Reihenfolge der Middleware-Registrierung ist wichtig!

**Erwartetes Output-Format:**
```
[2024-01-15T10:30:45.123Z] GET /api/todos
[2024-01-15T10:30:47.456Z] POST /api/auth/login
```

### User Story 2: Benutzer-Daten und Session-Setup
**Als System möchte ich Benutzer verwalten und Sessions nutzen können, damit ich Benutzer nach dem Login wiedererkennen kann.**

Akzeptanzkriterien:
- [ ] Benutzer-Daten sind definiert (mindestens: id, username, password)
- [ ] Mehrere Test-Benutzer sind hart-kodiert vorhanden
- [ ] `express-session` ist konfiguriert und aktiviert
- [ ] Session-Cookie wird beim Client gespeichert
- [ ] Todos haben eine Zuordnung zum Benutzer (z.B. `userId`)

**Hinweise:**
- Erweitere die Type-Definitionen um ein `User` Interface
- Erstelle Test-Benutzer (z.B. Alice, Bob, Charlie) mit unterschiedlichen Passwörtern
- Ergänze das `Todo` Interface um ein `userId` Feld
- Passe die Beispiel-Todos an, sodass sie verschiedenen Benutzern gehören
- Konfiguriere `express-session` mit sinnvollen Optionen
- Für TypeScript: Erweitere die Session-Types, um `userId` in der Session speichern zu können

**Session-Konfigurationsoptionen:**
- `secret`: Ein geheimer Schlüssel zum Signieren des Session-Cookies
- `resave`: Session nur speichern, wenn sie geändert wurde?
- `saveUninitialized`: Leere Sessions speichern?
- `cookie`: Cookie-Einstellungen (secure, maxAge, etc.)

### User Story 3: Login und Logout Endpoints
**Als Benutzer möchte ich mich einloggen und ausloggen können, damit das System mich wiedererkennt.**

Akzeptanzkriterien:
- [ ] `POST /api/auth/login` mit username und password im Body
- [ ] Bei erfolgreicher Authentifizierung wird die `userId` in der Session gespeichert
- [ ] Bei falschen Zugangsdaten wird ein 401-Fehler zurückgegeben
- [ ] `POST /api/auth/logout` löscht die Session
- [ ] Nach Login erhalte ich eine Bestätigung mit User-Informationen

**Hinweise:**
- Erstelle eine neue Route-Datei für Auth-Endpoints
- Vergleiche Username und Passwort mit den hart-kodierten Benutzern
- Speichere die User-ID in der Session nach erfolgreicher Authentifizierung
- Passwörter im Klartext zu vergleichen ist für diese Übung OK (in Produktion: Hashing!)

**Aha-Moment:** Sessions machen HTTP zustandsbehaftet - der Server "erinnert" sich an dich!

### User Story 4: Auth-Middleware für geschützte Routen
**Als System möchte ich bestimmte Routen nur für eingeloggte Benutzer zugänglich machen, damit unautorisierte Zugriffe verhindert werden.**

Akzeptanzkriterien:
- [ ] Eine Middleware prüft, ob ein Benutzer eingeloggt ist (Session enthält `userId`)
- [ ] Wenn nicht eingeloggt: 401 Unauthorized Error
- [ ] Wenn eingeloggt: Request wird weitergeleitet
- [ ] Die Middleware wird nur auf geschützte Routen angewendet (z.B. alle `/api/todos/*` Routen)

**Hinweise:**
- Die Middleware prüft, ob `req.session.userId` vorhanden ist
- Die Middleware kann routenspezifisch oder auf einen ganzen Router angewendet werden
- Überlege dir, ob Login/Logout-Routen auch geschützt sein sollen

**Aha-Moment:** Middleware ist wie eine Pipeline - jede Funktion kann die Anfrage bearbeiten, stoppen oder weitergeben!

### User Story 5: Zentrale Fehlerbehandlung
**Als Entwickler möchte ich Fehler zentral behandeln, damit alle Fehler-Responses ein einheitliches Format haben und ich nicht in jeder Route try-catch schreiben muss.**

Akzeptanzkriterien:
- [ ] Eine zentrale Error-Handler-Middleware fängt alle Fehler ab
- [ ] Unterschiedliche Fehlertypen führen zu unterschiedlichen HTTP Status Codes:
  - Nicht authentifiziert → 401 Unauthorized
  - Ressource nicht gefunden → 404 Not Found
  - Validierungsfehler → 400 Bad Request
  - Unerwartete Fehler → 500 Internal Server Error
- [ ] Alle Fehler-Responses haben ein einheitliches JSON-Format
- [ ] Bei 500-Fehlern wird der Stack-Trace geloggt (aber nicht an den Client gesendet)

**Hinweise:**
- Error-Handler-Middleware hat **vier** Parameter: `(err, req, res, next) => { ... }`
- Express erkennt Error-Handler automatisch an der 4-Parameter-Signatur
- Error-Handler muss **nach** allen anderen Routes registriert werden
- Optional: Erstelle Custom Error-Klassen für verschiedene Fehlertypen
- Nutze `instanceof` oder andere Mechanismen, um Fehlertypen zu unterscheiden

**Aha-Moment:** Zentrale Fehlerbehandlung vermeidet Code-Duplikation und macht alle Fehler konsistent!

### User Story 6: Todo-Endpoints mit User-Filter
**Als Benutzer möchte ich nur meine eigenen Todos sehen und bearbeiten können, damit meine Daten privat bleiben.**

Akzeptanzkriterien:
- [ ] `GET /api/todos` gibt nur Todos des eingeloggten Benutzers zurück
- [ ] `POST /api/todos` erstellt ein Todo für den eingeloggten Benutzer
- [ ] `PUT /api/todos/:id/complete` funktioniert nur, wenn das Todo dem eingeloggten Benutzer gehört
- [ ] `DELETE /api/todos/:id` funktioniert nur, wenn das Todo dem eingeloggten Benutzer gehört
- [ ] Beim Versuch, fremde Todos zu bearbeiten: 403 Forbidden oder 404 Not Found

**Hinweise:**
- Passe die Todo-Service-Funktionen an, um nach `userId` zu filtern
- Die `userId` kommt aus der Session: `req.session.userId`
- Beim Erstellen eines Todos: Setze automatisch `userId` aus der Session
- Prüfe bei Update/Delete, ob das Todo dem aktuellen Benutzer gehört

## Testen der API

Nach Abschluss solltest du folgende Szenarien testen können:

1. **Login-Flow:**
   - Login mit gültigen Credentials → Session-Cookie wird gesetzt
   - Versuch ohne Login auf Todos zuzugreifen → 401 Unauthorized
   - Nach Login: Todos abrufen → nur eigene Todos sichtbar

2. **Multi-User-Szenario:**
   - Als Alice einloggen und ihre Todos abrufen
   - Ausloggen
   - Als Bob einloggen und seine Todos abrufen → komplett andere Liste!

3. **Fehlerbehandlung:**
   - Login mit falschen Daten → 401
   - Todo erstellen ohne Login → 401
   - Fremdes Todo bearbeiten → 403 oder 404
   - Ungültige oder nicht existierende Todo-ID → passender Fehlercode

4. **Middleware-Pipeline:**
   - Beobachte die Logs: Jeder Request sollte geloggt werden
   - Prüfe, ob Auth-Middleware nur auf geschützten Routen läuft

## Weiterführende Aufgaben

Wenn du mit den Hauptaufgaben fertig bist:

1. **Rate-Limiting Middleware:**
   - Begrenze Requests auf z.B. 10 pro Minute pro IP-Adresse
   - Bei Überschreitung: 429 Too Many Requests

2. **Request-ID für besseres Logging:**
   - Generiere für jeden Request eine eindeutige ID
   - Füge die Request-ID zu jedem Log-Eintrag hinzu
   - Sende die Request-ID im Response-Header zurück

3. **User-Registration Endpoint:**
   - Erstelle einen Endpoint zum Registrieren neuer Benutzer
   - Validiere, dass Username eindeutig ist

4. **Current-User Endpoint:**
   - Erstelle einen Endpoint, der Infos über den eingeloggten Benutzer zurückgibt
   - Ohne Login: 401

## Weiterführende Ressourcen

- [Express.js Middleware Guide](https://expressjs.com/en/guide/using-middleware.html)
- [express-session Dokumentation](https://github.com/expressjs/session)
- [HTTP Authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication)
- [Error Handling in Express](https://expressjs.com/en/guide/error-handling.html)
- [REST API Security Best Practices](https://restfulapi.net/security-essentials/)
