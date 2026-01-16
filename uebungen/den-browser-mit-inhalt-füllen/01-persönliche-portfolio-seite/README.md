# Übung: Persönliche Portfolio-Seite

## Beschreibung

In dieser Übung erstellst du eine einfache persönliche Portfolio-Seite mit HTML. Du lernst dabei, wie man Inhalte strukturiert, semantische HTML-Elemente einsetzt und eine Navigation aufbaut. Du musst nicht zwingend deine eigenen Inhalte verwenden; es stehen dir auch Dummy-Inhalte zur Verfügung.

Die Übung fokussiert sich bewusst nur auf HTML - ohne CSS oder JavaScript. Es geht darum zu verstehen, wie man Inhalte sinnvoll strukturiert und welche HTML-Elemente es dafür gibt.

## Lernziele

Nach dieser Übung kannst du:
- Eine vollständige HTML-Seite mit korrekter Grundstruktur erstellen
- Semantische HTML5-Elemente sinnvoll einsetzen
- Eine Navigation mit internen Sprungmarken aufbauen
- Verschiedene Inhaltstypen strukturieren (Texte, Listen, Bilder, Links)
- Den `<head>`-Bereich mit wichtigen Metadaten befüllen

## Voraussetzungen

Für diese Übung benötigst du:
- Einen Texteditor (z.B. VS Code, Sublime Text, oder einen anderen Editor deiner Wahl)
- Einen modernen Webbrowser (z.B. Chrome, Firefox, Safari, Edge)

**Installation:**
- **macOS:** Browser ist bereits vorinstalliert, Texteditor nach Wahl (z.B. VS Code über https://code.visualstudio.com/)
- **Linux:** Browser in der Regel vorinstalliert, Texteditor über Paketmanager (z.B. `sudo apt install code` für VS Code)
- **Windows:** Browser in der Regel vorinstalliert, Texteditor nach Wahl (z.B. VS Code über https://code.visualstudio.com/)

## Aufgabenstellung

Deine Aufgabe ist es, die Datei `index.html` mit Inhalt zu füllen und dabei eine strukturierte Portfolio-Seite zu erstellen.

### User Stories

**Als Besucher möchte ich eine übersichtliche Navigation am Anfang der Seite sehen, um schnell zu den verschiedenen Bereichen der Seite zu gelangen.**

Erstelle einen Kopfbereich mit:
- Dem Namen der Person als Hauptüberschrift
- Einer Navigation mit Links zu den verschiedenen Bereichen der Seite
- Die Links sollen als interne Sprungmarken funktionieren

---

**Als Besucher möchte ich etwas über die Person erfahren, um zu verstehen, wer sie ist.**

Erstelle einen "Über mich"-Bereich mit:
- Einer passenden Überschrift
- Einem Profilbild mit sinnvollem Alternativtext
- Ein oder zwei Absätzen mit einer Kurzbeschreibung
- Einer Auflistung von Interessen oder Hobbies

---

**Als Besucher möchte ich die Fähigkeiten der Person sehen, um ihre Kompetenzen einzuschätzen.**

Erstelle einen "Skills"-Bereich mit:
- Einer passenden Überschrift
- Einer Auflistung von Programmiersprachen/Technologien
- Optional: Unterteilung in verschiedene Kategorien

---

**Als Besucher möchte ich Kontaktmöglichkeiten finden, um mit der Person in Verbindung zu treten.**

Erstelle einen "Kontakt"-Bereich mit:
- Einer passenden Überschrift
- Einem klickbaren E-Mail-Kontakt
- Optional: Links zu Social Media oder GitHub

---

**Als Besucher möchte ich einen professionellen Abschluss der Seite sehen.**

Erstelle einen Fußbereich mit:
- Einem Copyright-Hinweis
- Optional: Weitere Links oder Informationen

---

### Zusätzliche Anforderungen

- Nutze semantische HTML5-Elemente wo möglich (überlege dir, welche Elemente die Bedeutung der Inhalte am besten beschreiben)
- Jeder Bereich der Seite sollte eine eindeutige `id` haben (für die Navigation)
- Bilder sollten immer einen Alternativtext haben
- Der `<head>`-Bereich sollte mindestens enthalten:
  - Die Zeichenkodierung UTF-8
  - Eine Viewport-Einstellung für mobile Geräte
  - Einen aussagekräftigen Seitentitel

## Dummy-Inhalte

Falls du keine eigenen Inhalte verwenden möchtest, kannst du die folgenden Dummy-Inhalte nutzen:

### Name
Max Mustermann

### Über mich - Text
```
Hallo! Ich bin Informatik-Student im 3. Semester und interessiere mich besonders für Webentwicklung und Datenbanken. In meiner Freizeit beschäftige ich mich gerne mit neuen Technologien und arbeite an kleinen Programmierprojekten.

Aktuell lerne ich moderne Web-Technologien wie HTML, CSS und JavaScript. Mein Ziel ist es, nach dem Studium als Full-Stack-Entwickler zu arbeiten.
```

### Interessen
- Webentwicklung
- Open Source Software
- Gaming
- Fotografie

### Programmiersprachen
- Java
- JavaScript
- Python
- SQL

### Technologien & Tools
- Git & GitHub
- VS Code
- Node.js
- Docker

### Kontakt
- E-Mail: max.mustermann@example.com
- GitHub: github.com/maxmustermann
- LinkedIn: linkedin.com/in/maxmustermann

### Profilbild
Du kannst als Platzhalter einen beliebigen Placeholder-Service nutzen, z.B.: https://dummyimage.com/600x400/000/fff&text=foo

## Hinweise zur Bearbeitung

1. **Beginne mit der Struktur:** Lege zuerst die Grundstruktur mit allen Bereichen an, bevor du Inhalte einfügst
2. **Semantik beachten:** Überlege dir bei jedem Element, welches HTML-Tag die Bedeutung am besten beschreibt
3. **Navigation zuletzt:** Baue die Navigation erst auf, wenn alle Bereiche ihre IDs haben
4. **Testen nicht vergessen:** Öffne die Datei regelmäßig im Browser und teste, ob die Links funktionieren
5. **Validierung:** Du kannst deine HTML-Datei mit dem [W3C Validator](https://validator.w3.org/) auf Fehler prüfen

## Testen der Lösung

Öffne die `index.html` im Browser und überprüfe:
- [ ] Die Seite wird korrekt angezeigt
- [ ] Die Navigation funktioniert (Klick auf Links springt zur richtigen Sektion)
- [ ] Das Bild wird angezeigt
- [ ] Alle Links sind klickbar
- [ ] Die Überschriften-Hierarchie ist sinnvoll (von der höchsten zur niedrigsten Ebene)
- [ ] Der Seitentitel wird im Browser-Tab angezeigt

## Bonusaufgaben

Wenn du die Hauptaufgabe abgeschlossen hast, kannst du folgende Erweiterungen umsetzen:

### 1. Modul-Tabelle
Füge eine neue Sektion "Studium" hinzu mit einer Tabelle der bisher belegten Module:

| Semester | Modul | Note |
|----------|-------|------|
| 1 | Programmieren 1 | 1,7 |
| 1 | Mathematik 1 | 2,3 |
| 2 | Programmieren 2 | 1,3 |
| 2 | Datenbanken | 2,0 |

### 2. Weitere Verbesserungen
- Füge ein Favicon hinzu
- Ergänze Meta-Tags für Social Media (Open Graph)
- Füge eine "Download CV"-Funktion hinzu
- Nutze geeignete Elemente für Abkürzungen (z.B. HTML, CSS)
- Füge ein Zitat mit deinem Lebensmotto hinzu

## Weiterführende Ressourcen

- [MDN Web Docs - HTML](https://developer.mozilla.org/de/docs/Web/HTML)
- [W3C HTML Validator](https://validator.w3.org/)
- [HTML5 Element Reference](https://developer.mozilla.org/de/docs/Web/HTML/Element)
- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/)
