# HTTP von Hand - Das Protokoll verstehen

## Beschreibung

Diese Übung soll vor dem Durchkauen der Theorie zu HTTP einen praktischen Einblick in das Protokoll geben.
In dieser Übung wirst du HTTP-Requests mit curl senden und die rohen Requests und Responses analysieren.
Du wirst verstehen, dass hinter allen modernen Web-Frameworks und Bibliotheken ein simples textbasiertes Protokoll steckt.

## Lernziele

Nach dieser Übung kannst du:
- Die Struktur von HTTP-Requests und Responses erklären
- HTTP-Requests mit curl senden
- Die Bedeutung wichtiger HTTP-Headers verstehen
- Verschiedene HTTP-Methoden (GET, POST) anwenden
- HTTP-Status Codes interpretieren
- Content-Negotiation verstehen

## Voraussetzungen

### Benötigte Software

- **Node.js** (v18 oder höher)
- **curl** (auf den meisten Systemen vorinstalliert)

## Setup

1. Installiere die Abhängigkeiten:
```bash
npm install
```

2. Starte den Server:
```bash
npm start
```

Der Server läuft nun auf `http://localhost:3000`.

3. Öffne ein neues Terminal für deine curl-Experimente.

## Grundlagen: HTTP mit curl verstehen

curl ist ein Kommandozeilen-Tool zum Übertragen von Daten mit URLs. Mit dem `-v` (verbose) Flag kannst du den kompletten HTTP-Verkehr sehen.

### Wichtige curl-Flags

- `-v` oder `--verbose`: Zeigt Request- und Response-Header
- `-X METHOD`: HTTP-Methode festlegen (GET, POST, PUT, etc.)
- `-H "Header: Value"`: Custom Header hinzufügen
- `-d "data"`: Daten im Request-Body senden
- `-i`: Zeigt nur Response-Header (ohne Request-Details)
- `--http1.1`: Erzwingt HTTP/1.1

### Beispiel: Ein einfacher GET-Request

```bash
curl -v http://localhost:3000/
```

**Was siehst du?**
```
> GET / HTTP/1.1           ← Request-Line
> Host: localhost:3000     ← Header
> User-Agent: curl/8.x.x   ← Header
> Accept: */*              ← Header
>                          ← Leerzeile (Ende der Header)
< HTTP/1.1 200 OK          ← Status-Line
< Content-Type: text/html  ← Response-Header
< Content-Length: 1234     ← Response-Header
<                          ← Leerzeile
<!DOCTYPE html>            ← Response-Body
...
```

**Legende:**
- `>` = Gesendeter Request (von dir zum Server)
- `<` = Empfangene Response (vom Server zu dir)

## Aufgaben

### Aufgabe 1: Den ersten HTTP-Request verstehen

**Dein Ziel:** Sende einen GET-Request an `http://localhost:3000/` und verschaffe dir einen Überblick über die Struktur von HTTP-Requests und Responses.

**Wie du vorgehst:**
- Nutze curl mit dem `-v` Flag, um den kompletten HTTP-Verkehr zu sehen
- Die URL ist `http://localhost:3000/`

**Worauf du achten solltest:**

Der **Request** (Zeilen mit `>`):
- Die erste Zeile ist die **Request-Line**: `GET / HTTP/1.1`
- Danach folgen **Request-Header** (Host, User-Agent, Accept, etc.)
- Eine **Leerzeile** trennt Header vom Body (bei GET meist leer)

Die **Response** (Zeilen mit `<`):
- Die erste Zeile ist die **Status-Line**: `HTTP/1.1 200 OK`
- Danach folgen **Response-Header** (Content-Type, Content-Length, Date, etc.)
- Eine **Leerzeile** trennt Header vom Body
- Der **Body** enthält die eigentliche HTML-Seite

**Fragen zum Nachdenken:**
- Welche Header sendet curl automatisch?
- Welche Header sendet der Server zurück?
- Was bedeuten die drei Teile der Status-Line?

---

### Aufgabe 2: Request-Header selbst setzen

**Dein Ziel:** Sende einen Request mit eigenen Headern an `/api/echo` und sieh dir an, was beim Server ankommt.

Der `/api/echo` Endpunkt ist praktisch: Er schickt dir alle empfangenen Request-Informationen als JSON zurück.

**Was du tun sollst:**
- Setze einen eigenen `User-Agent` Header (z.B. "MeinBrowser/1.0")
- Setze einen `Accept` Header auf "application/json"
- Füge einen Custom-Header hinzu (z.B. `X-Custom-Header: Hallo`)

**Tipps:**
- Mit `-H "Header: Wert"` fügst du Header hinzu
- Du kannst `-H` mehrfach verwenden für mehrere Header
- Der `User-Agent` identifiziert den Client
- Der `Accept` Header sagt dem Server, welches Format du bevorzugst

**Experimentiere:**
- Was passiert, wenn du keinen `Accept` Header setzt?
- Füge 3-4 verschiedene Custom-Header hinzu - kommen alle beim Server an?
- Versuche mal, den `Host`-Header zu überschreiben. Was passiert? Was bedeutet das für diesen und andere (Standard-) Header?

---

### Aufgabe 3: Content-Negotiation erleben

**Dein Ziel:** Fordere dieselbe Ressource `/api/data` in verschiedenen Formaten an und verstehe, wie Content-Negotiation funktioniert.

Der Server kann dir die Daten in drei Formaten liefern:
- JSON (`application/json`)
- HTML (`text/html`)
- Plain Text (`text/plain`)

**Was du tun sollst:**
- Fordere `/api/data` dreimal an, jedes Mal mit einem anderen `Accept` Header
- Beobachte den `Content-Type` Header in der Response
- Vergleiche die Response-Bodies

**Tipps:**
- Mit `-H "Accept: ..."` steuerst du, welches Format du bevorzugst
- Der Server schaut sich deinen `Accept` Header an und entscheidet, was er zurückschickt
- Das nennt man **Content-Negotiation**

**Experimentiere:**
- Was passiert mit `Accept: */*`? Welches Format bekommst du?
- Was passiert mit `Accept: application/xml`?
- Was passiert, wenn du gar keinen `Accept` Header sendest?
- Kannst du mehrere Formate angeben (z.B. `Accept: text/html, application/json`)? Wie verhält sich dieser Server?

---

### Aufgabe 4: POST-Request mit JSON-Daten

**Dein Ziel:** Sende JSON-Daten per POST an `/api/greet` und lass dir eine personalisierte Antwort geben.

Der Server erwartet:
- HTTP-Methode: POST
- Content-Type: `application/json`
- Body: JSON-Objekt mit `name` (Pflichtfeld) und optional `age`

**Was du tun sollst:**
- Sende einen POST-Request mit JSON-Daten
- Probiere verschiedene Kombinationen aus (nur Name, Name + Alter)

**Tipps:**
- Du musst curl mitteilen, welche Methode du verwenden willst (POST)
- Du musst den `Content-Type` Header setzen
- Du musst die JSON-Daten im Body senden
- Bei Bedarf: Recherchiere, wie dies mit curl funktioniert, curl ist sehr gut dokumentiert
- curl berechnet automatisch den `Content-Length` Header

**Experimentiere systematisch:**
1. Sende einen vollständigen Request mit Name und Alter
2. Was passiert, wenn du den `Content-Type` Header weglässt?
4. Was passiert, wenn du nur den Namen sendest (ohne Alter)?
5. Was passiert, wenn du gar kein `name` Feld sendest?
3. Was passiert, wenn du einen leeren Body sendest (`-d ''`)?

**Fragen zum Nachdenken:**
- Welche Status Codes bekommst du bei den verschiedenen Fehlerfällen?
- Warum ist der `Content-Type` Header so wichtig?
- Warum sendet der Server nicht nur den entsprechenden Status Code, sondern auch eine erklärende Nachricht im Body?

---

### Aufgabe 5: HTTP-Status Codes kennenlernen

**Dein Ziel:** Löse verschiedene Status Codes beim Server aus und verstehe, was sie bedeuten.

**Was du tun sollst:** Finde heraus, wie du folgende Status Codes provozieren kannst:
- **200 OK** - Alles gut
- **301 Moved Permanently** - Die Ressource ist umgezogen
- **404 Not Found** - Die Ressource existiert nicht
- **418 I'm a teapot** - Ein Easter Egg (ja, das gibt's wirklich, siehe RFC 2324)
- **500 Internal Server Error** - Ein Server-Fehler

**Tipps:**
- Öffne im Browser `http://localhost:3000/` oder schaue in die Logs des Servers, um verfügbare Endpunkte zu sehen

**Für den Redirect-Endpunkt:**
- Probiere den Request einmal normal aus - was passiert?
- Mit `-L` folgt curl dem Redirect automatisch - was ändert sich?
- Schau dir den `Location` Header an - wohin wird umgeleitet?

**Fragen zum Nachdenken:**
- Was bedeuten die Status Code-Bereiche (2xx, 3xx, 4xx, 5xx)? (Wir schauen uns die Codes noch genauer an)
- Wann ist ein Fehler ein 4xx vs. ein 5xx?
- Was ist der Unterschied zwischen einem 404 und einem 500?

---
---

## Weiterführende Ressourcen

- [MDN Web Docs - HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)
- [curl Documentation](https://curl.se/docs/)
- [HTTP Status Dogs](https://httpstatusdogs.com/) (Humorvolle Darstellung von Status Codes)

## Debugging-Tipps

**Häufige Fehler:**
- Vergessener `Content-Type` bei POST → Server kann Daten nicht parsen
- Falscher HTTP-Method → 405 Method Not Allowed
- Fehlende Daten im Body → 400 Bad Request

**Server-Output beobachten:**
Der Server loggt alle eingehenden Requests. Schau dir das Terminal mit `npm start` an, um zu sehen, was beim Server ankommt.

## Tipps für die Praxis

1. **Immer -v verwenden beim Debuggen** - Du siehst, was wirklich gesendet wird
2. **Header sind case-insensitive** - `Content-Type` = `content-type`
3. **curl folgt Redirects nicht automatisch** - Nutze `-L` dafür
