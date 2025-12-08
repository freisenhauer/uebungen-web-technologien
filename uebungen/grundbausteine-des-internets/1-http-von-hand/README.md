# HTTP von Hand - Das Protokoll verstehen

## Beschreibung

In dieser Übung wirst du HTTP-Requests mit curl senden und die rohen Requests und Responses analysieren. Du wirst verstehen, dass hinter allen modernen Web-Frameworks und Bibliotheken ein simples textbasiertes Protokoll steckt.

## Lernziele

Nach dieser Übung kannst du:
- Die Struktur von HTTP-Requests und Responses erklären
- HTTP-Requests mit curl erstellen und senden
- Die Bedeutung wichtiger HTTP-Headers verstehen
- Verschiedene HTTP-Methoden (GET, POST, HEAD) anwenden
- HTTP-Status Codes interpretieren
- Content-Negotiation verstehen

## Voraussetzungen

### Benötigte Software

- **Node.js** (v18 oder höher)
- **curl** (auf den meisten Systemen vorinstalliert)

#### Installation von curl

**macOS:**
```bash
# curl ist bereits vorinstalliert
curl --version
```

**Linux:**
```bash
# Debian/Ubuntu
sudo apt-get install curl

# Fedora/RHEL
sudo dnf install curl

# Arch
sudo pacman -S curl
```

**Windows:**
```bash
# Auf Windows 10/11 ist curl vorinstalliert
curl --version

# Falls nicht: Download von https://curl.se/windows/
```

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

### Aufgabe 1: Der erste HTTP-Request

Sende einen GET-Request an `http://localhost:3000/` mit curl.

```bash
curl -v http://localhost:3000/
```

**Worauf du achten solltest:**
- Der Request beginnt mit einer **Request-Line**: `GET / HTTP/1.1`
- Danach folgen **Request-Header** (Host, User-Agent, Accept)
- Eine **Leerzeile** trennt Header vom Body
- Die Response beginnt mit einer **Status-Line**: `HTTP/1.1 200 OK`
- Danach folgen **Response-Header** (Content-Type, Content-Length, etc.)
- Eine **Leerzeile** trennt Header vom Response-Body
- Der **Body** enthält die eigentliche HTML-Seite

**Experimentiere:**
- Welche Header sendet curl automatisch?
- Welche Header sendet der Server zurück?
- Was steht in der Status-Line?

---

### Aufgabe 2: Request-Header manipulieren

Füge eigene Header zum Request hinzu.

```bash
curl -v http://localhost:3000/api/echo \
  -H "User-Agent: MeinBrowser/1.0" \
  -H "Accept: application/json" \
  -H "X-Custom-Header: Hallo"
```

Der `/api/echo` Endpunkt zeigt dir alle empfangenen Header im Response-Body.

**Worauf du achten solltest:**
- Welche Header kommen beim Server an?
- Welche Header fügt curl automatisch hinzu (Host, etc.)?
- Der `User-Agent` Header identifiziert den Client
- Der `Accept` Header sagt dem Server, welches Format du bevorzugst

**Experimentiere:**
- Was passiert, wenn du den `Host`-Header überschreibst?
- Füge mehrere Custom-Header hinzu

---

### Aufgabe 3: Content-Negotiation verstehen

Fordere `/api/data` mit unterschiedlichen `Accept`-Headern an.

**JSON-Response:**
```bash
curl -v http://localhost:3000/api/data \
  -H "Accept: application/json"
```

**HTML-Response:**
```bash
curl -v http://localhost:3000/api/data \
  -H "Accept: text/html"
```

**Plain-Text-Response:**
```bash
curl -v http://localhost:3000/api/data \
  -H "Accept: text/plain"
```

**Worauf du achten solltest:**
- Der Server gibt verschiedene Formate zurück, je nach `Accept`-Header
- Schau dir den `Content-Type` Response-Header an
- Der Server entscheidet anhand des `Accept`-Headers, welches Format gesendet wird
- Das nennt man **Content-Negotiation**

**Experimentiere:**
- Was passiert mit `Accept: */*`?
- Was passiert mit `Accept: application/xml` (nicht unterstützt)?
- Was passiert, wenn du den `Accept`-Header weglässt?

---

### Aufgabe 4: POST-Requests mit Body

Sende Daten per POST an `/api/greet`.

**JSON-Daten senden:**
```bash
curl -v http://localhost:3000/api/greet \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"Max","age":25}'
```

**Worauf du achten solltest:**
- Der `Content-Type` Header sagt dem Server, wie die Daten formatiert sind
- Der Request-Body enthält die JSON-Daten
- curl berechnet automatisch den `Content-Length` Header
- Der Server parst die Daten und gibt eine personalisierte Antwort

**Experimentiere:**
```bash
# Ohne Content-Type → Server-Fehler
curl -v http://localhost:3000/api/greet \
  -X POST \
  -d '{"name":"Anna","age":30}'

# Ohne Body → Server-Fehler
curl -v http://localhost:3000/api/greet \
  -X POST \
  -H "Content-Type: application/json"

# Nur Name, kein Alter
curl -v http://localhost:3000/api/greet \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"Lisa"}'
```

**Was passiert bei:**
- Fehlender `Content-Type`?
- Leerem Body?
- Fehlenden Pflichtfeldern?

---

### Aufgabe 5: HTTP-Status Codes verstehen

Teste verschiedene Endpunkte und beobachte die Status Codes.

**200 OK (Erfolg):**
```bash
curl -v http://localhost:3000/
```

**404 Not Found (Ressource existiert nicht):**
```bash
curl -v http://localhost:3000/notfound
```

**301 Moved Permanently (Redirect):**
```bash
curl -v -L http://localhost:3000/redirect
```

**Ohne Redirect folgen:**
```bash
curl -v http://localhost:3000/redirect
```

**418 I'm a teapot (Easter Egg):**
```bash
curl -v http://localhost:3000/teapot
```

**Worauf du achten solltest:**
- **2xx** = Erfolg (200 OK, 201 Created, etc.)
- **3xx** = Redirect (301 Permanent, 302 Temporary, etc.)
  - Der `Location`-Header gibt das Redirect-Ziel an
  - curl folgt Redirects standardmäßig (mit `-L` erzwingen)
- **4xx** = Client-Fehler (400 Bad Request, 404 Not Found, etc.)
- **5xx** = Server-Fehler (500 Internal Server Error, etc.)
- **418** ist ein Scherz aus RFC 2324 (Hyper Text Coffee Pot Control Protocol)

**Experimentiere:**
- Wie verhält sich curl bei Redirects?
- Was steht im `Location`-Header?
- Rufe eine nicht-existierende Route auf

---

### Aufgabe 6: HEAD-Methode

Die HEAD-Methode funktioniert wie GET, liefert aber nur die Header ohne Body.

```bash
curl -v -X HEAD http://localhost:3000/
```

Alternativ (HEAD ist Standard-Methode mit `-I`):
```bash
curl -I http://localhost:3000/
```

**Worauf du achten solltest:**
- Die Response enthält alle Header wie bei GET
- Aber **kein Body**!
- Der `Content-Length` Header zeigt trotzdem die Größe, die ein GET hätte
- Nützlich, um Metadaten zu prüfen ohne die ganze Ressource herunterzuladen

**Experimentiere:**
- Vergleiche HEAD und GET für dieselbe URL
- Was unterscheidet sich?
- Wann würdest du HEAD statt GET verwenden?

---

### Aufgabe 7: Request-Body in Datei speichern

Manchmal willst du den Response analysieren, ohne dass er im Terminal angezeigt wird.

**Nur Header anzeigen:**
```bash
curl -v http://localhost:3000/ > /dev/null
```

**Body in Datei speichern:**
```bash
curl -v http://localhost:3000/ -o response.html
```

**Header in Datei, Body auf stdout:**
```bash
curl -D headers.txt http://localhost:3000/
```

**Worauf du achten solltest:**
- `-o filename`: Speichert den Body in eine Datei
- `-D filename`: Speichert die Header in eine Datei
- `> /dev/null`: Unterdrückt die Body-Ausgabe im Terminal

---

### Aufgabe 8: Mehrere Requests vergleichen

Sende denselben Request mehrmals und beobachte Unterschiede.

```bash
# Request 1
curl -v http://localhost:3000/api/echo

# Request 2 - ein paar Sekunden später
curl -v http://localhost:3000/api/echo
```

**Worauf du achten solltest:**
- Ändert sich der `Date` Response-Header?
- Ändert sich der Timestamp im Response-Body?
- Welche Header bleiben gleich?

**Experimentiere:**
- Sende Requests mit verschiedenen `User-Agent` Headern
- Vergleiche die Responses

---

## Weiterführende Ressourcen

- [RFC 7230 - HTTP/1.1 Message Syntax and Routing](https://tools.ietf.org/html/rfc7230)
- [RFC 7231 - HTTP/1.1 Semantics and Content](https://tools.ietf.org/html/rfc7231)
- [MDN Web Docs - HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)
- [curl Documentation](https://curl.se/docs/)
- [HTTP Status Dogs](https://httpstatusdogs.com/) (Humorvolle Darstellung von Status Codes)

## Debugging-Tipps

**curl-Optionen:**
- `-v`: Verbose (zeigt alles)
- `-s`: Silent (keine Progress-Bar)
- `-S`: Show errors (mit `-s` kombinierbar)
- `-i`: Include headers in output
- `-I`: HEAD-Request
- `--http1.1`: Erzwingt HTTP/1.1

**Häufige Fehler:**
- Vergessener `Content-Type` bei POST → Server kann Daten nicht parsen
- Falscher HTTP-Method → 405 Method Not Allowed
- Fehlende Daten im Body → 400 Bad Request

**Server-Output beobachten:**
Der Server loggt alle eingehenden Requests. Schau dir das Terminal mit `npm start` an, um zu sehen, was beim Server ankommt.

## Tipps für die Praxis

1. **Immer -v verwenden beim Debuggen** - Du siehst, was wirklich gesendet wird
2. **Header sind case-insensitive** - `Content-Type` = `content-type`
3. **Die Leerzeile ist wichtig** - Sie trennt Header vom Body
4. **curl folgt Redirects nicht automatisch** - Nutze `-L` dafür
5. **Probiere verschiedene Accept-Header** - Lerne Content-Negotiation verstehen
