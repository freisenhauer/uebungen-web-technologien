# API-Übung: Studiengänge und Studierende

## Projektstart (Docker + Schema)

### 1. Datenbank-Container bauen und starten
```bash
docker compose up -d --build db
```

### 2. Backend-Abhängigkeiten lokal installieren (für Drizzle-CLI)
```bash
cd backend
npm install
```

### 3. Datenbank-Schema anwenden
```bash
npm run db:push
```

Hinweis: `drizzle.config.js` ist auf `localhost:5432` konfiguriert. Deshalb muss der `db`-Container aus Schritt 1 laufen.

### 4. Backend-Container bauen und starten
```bash
cd ..
docker compose up -d --build backend
```

### 5. Lauf prüfen
```bash
docker compose ps
docker compose logs -f backend
```

API-Basis: [http://localhost:3000](http://localhost:3000)

Nützliche Befehle:
```bash
docker compose down
docker compose down -v
```

`down -v` löscht auch die DB-Volumes (kompletter Reset).

## Übungsauftrag

Ziel ist, diese API eigenständig zu einem sauberen, nutzbaren Stand weiterzuentwickeln.  
Der vorhandene Code ist absichtlich unvollständig.

### Eure Aufgabe (grob)
- Implementiert die fehlenden Endpunkte sinnvoll zu Ende.
- Vervollständigt die Fachlichkeit für beide Ressourcen: `studiengaenge` und `studierende`.
- Nutzt Drizzle konsistent im Service-Layer.
- Implementiert Request-Validierung für alle relevanten Eingaben (Path-Parameter, Query-Parameter, Body).
- Ergänzt sinnvolle Fehlerbehandlung und HTTP-Statuscodes.
- Schafft eine Struktur, die wartbar bleibt (Route/Service/DB klar getrennt).

### Optionale Zusatzaufgabe: Authentifizierung mit Session
- Ergänzt eine `users`-Tabelle im Schema.
- Implementiert eine `register`-Route, die einen User mit `username` und `password` anlegt.
- Implementiert eine `login`-Route, die eine Session erstellt.
- Schützt alle übrigen API-Routen so, dass eine gültige Session vorausgesetzt wird.

### Erwartung an eure Arbeitsweise
- Lest die offizielle Drizzle-Dokumentation und übertragt die Patterns auf dieses Projekt.
- Lest die Docker-Compose-Dokumentation und nutzt sie aktiv für euren Entwicklungsworkflow.
- Trefft eigene technische Entscheidungen und begründet sie kurz (macht euch ruhig Notizen).
- Wenn ihr merkt, dass ihr einen Themenbereich noch nicht vollständig begreift, stellt Fragen oder notiert euch das Thema, sodass wir im Nachgang darüber sprechen können.

## Dokumentation, die ihr nutzen sollt

- Drizzle ORM Docs: [https://orm.drizzle.team/docs/overview](https://orm.drizzle.team/docs/overview)
- Drizzle Query API: [https://orm.drizzle.team/docs/rqb-v2](https://orm.drizzle.team/docs/rqb-v2)
- Drizzle Kit (`push`, schema workflow): [https://orm.drizzle.team/docs/drizzle-kit-push](https://orm.drizzle.team/docs/drizzle-kit-push)
- Docker Compose Docs: [https://docs.docker.com/compose/](https://docs.docker.com/compose/)

## Ergebnisbild (was am Ende stehen sollte)

- Die API ist für die zentralen Use-Cases implementiert.
- Das Schema wird reproduzierbar angewendet.
- Das Projekt startet stabil per Docker Compose.
- Die wichtigsten Endpunkte liefern erwartbare Responses.

Wie ihr genau dorthin kommt, ist Teil der Übung.
