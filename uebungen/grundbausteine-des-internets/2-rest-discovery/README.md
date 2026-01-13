# REST Discovery - Eine interaktive Bibliotheks-API

## Lernziele

In dieser Übung lernst du:
- Die Grundprinzipien von REST (Representational State Transfer) praktisch anzuwenden
- Ressourcenorientierung statt Funktionsorientierung zu verstehen
- HTTP-Methoden (GET, POST, PUT, PATCH, DELETE) im Kontext von REST einzusetzen
- HTTP-Statuscodes zu interpretieren und deren Bedeutung zu verstehen
- Collections und Einzelressourcen zu unterscheiden
- Sub-Ressourcen und Beziehungen zwischen Ressourcen zu erkunden
- Die Konzepte "safe" und "idempotent" praktisch zu erfahren

## Beschreibung

Diese Übung bietet dir eine **selbsterklärende REST-API** für ein einfaches Bibliothekssystem. Du wirst durch die API geführt, indem du verschiedene HTTP-Anfragen stellst und die Responses analysierst.

Die API verwaltet zwei Hauptressourcen:
- **Bücher** (`/books`) - Eine Sammlung von Büchern mit Titel, Autor-ID, ISBN und Erscheinungsjahr
- **Autoren** (`/authors`) - Eine Sammlung von Autoren mit Name und Biographie

Alle Daten werden im Arbeitsspeicher gehalten (in-memory), d.h. nach einem Neustart der API sind alle deine Änderungen zurückgesetzt.

**Das Besondere**: Die API gibt dir bei jedem Schritt Anweisungen, was als nächstes zu tun ist. Folge einfach dem Pfad, den die API für dich vorgibt!

## Voraussetzungen

- Grundkenntnisse über HTTP (Methoden, Statuscodes, URIs)
- Grundverständnis von REST-Prinzipien (aus der Vorlesung)
- Bereitschaft zum Experimentieren

## Abhängigkeiten

### Node.js
Die API läuft auf Node.js. Du benötigst mindestens Version 18.x.

Überprüfe die Installation mit:
```bash
node --version
npm --version
```

### HTTP-Client (wähle einen)

Du benötigst ein Tool, um HTTP-Anfragen an die API zu senden. Wähle eines der folgenden:

#### Option 1: curl (für Kommandozeilen-Fans)
- **macOS/Linux**: Bereits vorinstalliert
- **Windows**: Ab Windows 10 vorinstalliert, oder über [curl.se](https://curl.se/windows/)
- Kommandozeilen-Tool, erfordert etwas mehr Einarbeitung
- 
#### Option 2: Postman
- **Alle Betriebssysteme**: Download von [postman.com](https://www.postman.com/downloads/)
- Grafische Oberfläche, sehr intuitiv
- Zeigt Request und Response übersichtlich an

#### Option 3: Insomnia
- **Alle Betriebssysteme**: Download von [insomnia.rest](https://insomnia.rest/download)
- Open Source Alternative zu Postman
- Ebenfalls grafische Oberfläche, etwas minimalistischer

## Durchführung

### 1. API starten

Navigiere in das Übungsverzeichnis und installiere die Abhängigkeiten:

```bash
npm install
```

Starte die API:

```bash
npm start
```

Du solltest eine Ausgabe sehen wie:
```
REST Discovery API läuft auf http://localhost:3000
Starte mit: GET http://localhost:3000/
```

Die API läuft nun und ist bereit für deine Anfragen!

### 2. Dein HTTP-Client Tool vorbereiten

**Postman/Insomnia:**
1. Öffne die Anwendung
2. Erstelle eine neue Collection/Folder namens "REST Discovery"
3. Erstelle deine erste Anfrage: `GET http://localhost:3000/`

**curl:**
```bash
curl http://localhost:3000/
```

### 3. Die Entdeckungsreise beginnt

**Starte mit deiner ersten Anfrage:**

```
GET http://localhost:3000/
```

Die API wird dir in der Response die erste Aufgabe stellen. Folge einfach den Anweisungen, die die API dir gibt!

**Wichtige Hinweise:**
- Lies die Responses aufmerksam - sie enthalten die nächsten Schritte
- Achte auf HTTP-Statuscodes - sie geben wichtige Informationen über das Ergebnis deiner Anfrage
- Experimentiere! Die API läuft in-memory, du kannst nichts kaputt machen (das heißt aber auch, dass du von vorne anfängst, wenn du neu startest)
- Bei Unsicherheiten: Starte die API einfach neu mit `npm start`
- **Hinweis:** Diese API weicht an manchen Stellen bewusst von REST-Standards ab (z.B. 200 OK statt 204 No Content bei DELETE), um dich besser durch die Übung zu führen. Die API erklärt in den Responses, wo sie abweicht und warum.

## Aufgaben

Die API führt dich durch folgende Konzepte:

### Phase 1: Ressourcen entdecken (GET)
- Collections abrufen (`/books`, `/authors`)
- Einzelressourcen abrufen (`/books/{id}`, `/authors/{id}`)
- Verstehen, was "safe" bedeutet

### Phase 2: Ressourcen erstellen (POST)
- Neue Bücher und Autoren anlegen
- Den Statuscode `201 Created` verstehen
- Die `Location`-Header-Bedeutung kennenlernen

### Phase 3: Ressourcen aktualisieren (PUT & PATCH)
- Vollständige Aktualisierung mit `PUT`
- Teilweise Aktualisierung mit `PATCH`
- Den Unterschied zwischen beiden verstehen
- Idempotenz erleben

### Phase 4: Ressourcen löschen (DELETE)
- Ressourcen entfernen
- Idempotenz von DELETE verstehen
- Die üblichen Statuscodes für DELETE kennenlernen (200 OK oder 204 No Content)

### Phase 5: Fehler verstehen
- Nicht existierende Ressourcen abrufen (`404 Not Found`)
- Ungültige Daten senden (`400 Bad Request`)
- Error-Responses analysieren

### Phase 6: Beziehungen erkunden
- Sub-Ressourcen verwenden (`/authors/{id}/books`)
- Hierarchische URIs verstehen

### Finale Challenge
Die API wird dir am Ende eine komplexe Aufgabe stellen, die mehrere REST-Konzepte kombiniert!

## Weiterführende Aufgaben (Optional)

Falls du die Hauptaufgaben abgeschlossen hast und mehr lernen möchtest:

1. **API-Design analysieren**
   - Welche Design-Entscheidungen hat die API getroffen?
   - Wo werden REST-Best-Practices befolgt?
   - Gibt es Verbesserungspotenzial?

2. **Idempotenz testen**
   - Sende die gleiche `PUT`-Anfrage mehrmals - was passiert?
   - Sende die gleiche `POST`-Anfrage mehrmals - was passiert?
   - Warum verhält sich `POST` anders als `PUT`?

3. **Error-Handling erkunden**
   - Was passiert, wenn du `POST /books` ohne Body sendest?
   - Was passiert, wenn du `PUT /books/1` mit unvollständigen Daten sendest?
   - Wie unterscheiden sich die Fehlermeldungen?

4. **Statuscodes sammeln**
   - Welche verschiedenen Statuscodes kannst du provozieren?
   - Erstelle eine Liste aller Statuscodes, die die API zurückgeben kann

5. **RPC vs. REST Vergleich**
   - Wie würde eine funktionsorientierte (RPC) API die gleichen Operationen modellieren?
   - Beispiel: `/getBook?id=1` vs. `/books/1`
   - Was sind die Vor- und Nachteile?

## Ressourcen

- [HTTP Status Codes](https://httpstatuses.com/) - Übersicht aller HTTP-Statuscodes
- [REST API Tutorial](https://restfulapi.net/) - Umfassendes REST-Tutorial
- [HTTP Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) - MDN Dokumentation zu HTTP-Methoden
- [JSON Formatter](https://jsonformatter.org/) - Tool zum Formatieren von JSON-Responses (falls dein Tool das nicht automatisch macht)

---

**Viel Erfolg beim Entdecken der REST-API!**
