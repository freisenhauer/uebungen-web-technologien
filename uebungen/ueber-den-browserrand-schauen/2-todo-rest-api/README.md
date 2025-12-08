# Übung: Todo REST API mit Express.js

## Lernziele

In dieser Übung lernst du:
- Express.js als Web-Framework einzusetzen
- Eine REST API zu designen und zu implementieren
- HTTP-Methoden (GET, POST, PUT, DELETE) sinnvoll einzusetzen
- HTTP Status Codes korrekt zu verwenden
- JSON als Datenaustauschformat zu nutzen
- Request-Parameter (URL-Parameter, Query-Parameter, Body) zu verarbeiten
- Fehlerbehandlung in Web-APIs zu implementieren

## Voraussetzungen

- Node.js (Version 18 oder höher)
- npm
- TypeScript-Kenntnisse aus der vorherigen Übung
- Ein Code-Editor (z.B. VS Code)
- Ein Tool zum Testen von APIs (curl, Postman, VS Code REST Client, oder ähnliches)

## Szenario

Dein Team hat die Todo-CLI aus der letzten Übung erfolgreich entwickelt. Jetzt möchte euer Product Owner, dass die Todo-Funktionalität als Web-Service verfügbar gemacht wird, damit verschiedene Clients (Web-Apps, Mobile-Apps, andere Services) darauf zugreifen können.

Deine Aufgabe ist es, die bestehende Business-Logik in eine REST API umzuwandeln. Die gute Nachricht: Die gesamte Geschäftslogik (`todo-service.ts`) kann wiederverwendet werden! Du musst nur eine neue HTTP-Schnittstelle davor bauen.

**Hinweis:** Die Anwendung speichert Todos weiterhin nur im Arbeitsspeicher (In-Memory). Das bedeutet, dass alle Änderungen nach einem Server-Neustart verloren gehen. Die Anwendung startet immer mit ein paar vordefinierten Beispiel-Todos. 

## Aufgaben

### User Story 1: Express.js Setup
**Als Entwickler möchte ich Express.js in meinem Projekt einrichten, damit ich einen HTTP-Server aufsetzen kann.**

Akzeptanzkriterien:
- [ ] Express.js und notwendige Typen sind installiert
- [ ] Ein Express-Server läuft und ist über HTTP erreichbar
- [ ] Die `package.json` enthält Scripts zum Bauen und Starten
- [ ] TypeScript kompiliert ohne Fehler

**Hinweise:**
- Die Dependencies sind bereits in der `package.json` definiert - installiere sie mit `npm install`
- Erstelle in `src/index.ts` einen Express-Server
- Der Server sollte auf Port 3000 laufen (oder über eine Umgebungsvariable konfigurierbar sein)
- Express benötigt Middleware, um JSON-Request-Bodies zu parsen

### User Story 2: REST API Design und Implementierung
**Als API-Nutzer möchte ich alle Todo-Operationen über HTTP ausführen können, damit ich die Funktionalität in verschiedenen Clients nutzen kann.**

Akzeptanzkriterien:
- [ ] Alle Operationen aus der CLI sind über die API verfügbar:
  - Alle Todos abrufen
  - Todos nach Status filtern (pending/completed)
  - Ein neues Todo erstellen
  - Ein Todo als erledigt markieren
  - Ein Todo löschen
- [ ] Die API folgt REST-Prinzipien
- [ ] Korrekte HTTP-Methoden werden verwendet
- [ ] Die URLs sind sinnvoll strukturiert
- [ ] Request- und Response-Bodies nutzen JSON

**Hinweise für das REST-Design:**

Bevor du mit der Implementierung beginnst, überlege dir:

1. **Ressourcen identifizieren:**
   - Was ist die Hauptressource in dieser API?
   - Wie sollten die URLs strukturiert sein?

2. **HTTP-Methoden wählen:**
   - Welche HTTP-Methode ist für welche Operation semantisch korrekt?
   - Welche dieser Methoden sind idempotent?

3. **URL-Design:**
   - Wie adressierst du einzelne Todos vs. die gesamte Collection?
   - Wo platzierst du IDs in der URL?
   - Wie modellierst du Aktionen wie "als erledigt markieren"?
   - Solltest du Query-Parameter für Filterung nutzen?

4. **Request/Response Format:**
   - Welche Daten müssen im Request-Body übermittelt werden?
   - Welche Daten sollten in der Response zurückgegeben werden?

**Code-Organisation:**
- Organisiere deine Routes in separate Module (z.B. `routes/todos.ts`)
- Die Business-Logik aus `todo-service.ts` kannst du direkt nutzen
- Express bietet mit `Router()` eine Möglichkeit, Routes modular zu organisieren

### User Story 3: Fehlerbehandlung und Status Codes
**Als API-Nutzer möchte ich aussagekräftige Fehlermeldungen und korrekte HTTP Status Codes erhalten, damit ich Probleme verstehen und behandeln kann.**

Akzeptanzkriterien:
- [ ] Erfolgreiche Operationen liefern passende 2xx Status Codes
- [ ] Client-Fehler (z.B. ungültige ID) liefern 4xx Status Codes
- [ ] Server-Fehler liefern 5xx Status Codes
- [ ] Fehlerantworten enthalten aussagekräftige Fehlermeldungen im JSON-Format
- [ ] Fehlende Ressourcen (z.B. Todo nicht gefunden) werden korrekt behandelt

**Fehler-Response Format:**
```json
{
  "error": "Beschreibende Fehlermeldung"
}
```

**Didaktische Anmerkung:**
In einer produktiven Anwendung würde man bei Operationen wie DELETE typischerweise `204 No Content` verwenden. Für Lernzwecke ist es jedoch oft hilfreicher, `200 OK` mit einem Response-Body zu verwenden, der z.B. das gelöschte Todo oder eine Bestätigungsnachricht enthält. Dies macht es einfacher, die API zu testen und zu verstehen, was passiert ist.

### User Story 4: API Testen
**Als Entwickler möchte ich meine API systematisch testen, damit ich sicherstelle, dass alle Endpoints korrekt funktionieren.**

Akzeptanzkriterien:
- [ ] Jeder Endpoint wurde mindestens einmal erfolgreich getestet
- [ ] Fehlerszenarien (z.B. nicht existierende ID) wurden getestet

## Erwartetes API-Verhalten

Hier ist ein Beispiel-Ablauf, den deine API unterstützen sollte (konkrete URLs musst du selbst designen):

1. **Alle Todos abrufen** → Liste von Todos zurückgeben
2. **Gefilterte Todos abrufen** → Nur "pending" oder nur "completed" Todos
3. **Neues Todo erstellen** → Todo wird angelegt, das neue Todo wird zurückgegeben
4. **Todo als erledigt markieren** → Status ändert sich auf "completed"
5. **Todo löschen** → Todo wird entfernt

Alle Operationen sollten mit sinnvollen Status Codes und JSON-Responses arbeiten.

## Weiterführende Aufgaben

Wenn du mit den Hauptaufgaben fertig bist, kannst du folgende Features ergänzen:

1. **Validation Middleware:** Erstelle eine Middleware, die eingehende Daten validiert (z.B. Pflichtfelder, Datentypen)
2. **Logging Middleware:** Logge alle eingehenden Requests (Methode, URL, Timestamp)
3. **CORS aktivieren:** Erlaube Cross-Origin Requests für spätere Frontend-Integration
4. **Paginierung:** Implementiere Pagination für die Todo-Liste (`?page=1&limit=10`)
5. **Sortierung:** Erlaube Sortierung nach verschiedenen Feldern (`?sort=title`)
6. **Partial Update:** Implementiere PATCH für partielle Updates von Todos

## Weiterführende Ressourcen

- [Express.js Dokumentation](https://expressjs.com/)
- [REST API Tutorial](https://restfulapi.net/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [RESTful API Design Best Practices](https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/)
- [TypeScript Express Tutorial](https://blog.logrocket.com/how-to-set-up-node-typescript-express/)
