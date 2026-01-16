# Übung: Type-Safe Todo-Liste (CLI)

## Lernziele

In dieser Übung lernst du:
- TypeScript in einem Node.js Projekt einzurichten
- Interfaces und Type Aliases zu definieren und anzuwenden
- Literal Types für vordefinierte Werte zu nutzen
- Mit Union Types zu arbeiten
- Type Guards für Validierung einzusetzen
- Den Unterschied zwischen JavaScript und TypeScript in der Praxis zu erleben

## Voraussetzungen

- Node.js (Version 18 oder höher)
- npm
- Ein Code-Editor (z.B. VS Code)

### Installation unter verschiedenen Betriebssystemen

**macOS:**
```bash
brew install node
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install nodejs npm
```

**Windows:**
- Download von [nodejs.org](https://nodejs.org/)
- Oder mit [nvm-windows](https://github.com/coreybutler/nvm-windows)

## Szenario

Du hast von einem Kollegen ein funktionierendes CLI-Tool für eine Todo-Liste übernommen. Der Code ist in JavaScript geschrieben und funktioniert grundsätzlich. Allerdings hat dein Team beschlossen, auf TypeScript umzusteigen, um die Code-Qualität zu verbessern und Fehler früher zu erkennen.

Deine Aufgabe ist es, das Projekt auf TypeScript zu migrieren und dabei saubere Typen zu definieren.

**Hinweis:** Die Anwendung speichert Todos aktuell nur im Arbeitsspeicher (In-Memory). Das bedeutet, dass alle Änderungen nach Beenden des Programms verloren gehen. Die Anwendung startet immer mit ein paar vordefinierten Beispiel-Todos.

## Aufgaben

### User Story 1: TypeScript Setup
**Als Entwickler möchte ich TypeScript in meinem Projekt einrichten, damit ich von statischer Typisierung profitieren kann.**

Akzeptanzkriterien:
- [ ] TypeScript und notwendige Abhängigkeiten sind installiert
- [ ] Eine `tsconfig.json` ist erstellt und sinnvoll konfiguriert
- [ ] Die `package.json` enthält Scripts zum Bauen und Ausführen
- [ ] Der bestehende JavaScript-Code ist nach TypeScript migriert (`.js` → `.ts`)

**Hinweise:**
- Nutze `npx tsc --init` für eine Standard-Konfiguration
- Achte auf `rootDir` und `outDir` in der `tsconfig.json`
- Setze `strict: true` für maximale Typsicherheit

### User Story 2: Todo-Datenmodell typisieren
**Als Entwickler möchte ich ein typsicheres Datenmodell für Todos definieren, damit Fehler bei der Verarbeitung vermieden werden.**

Akzeptanzkriterien:
- [ ] Ein `Todo` Interface ist definiert mit mindestens: `id`, `title`, `description`, `status`
- [ ] Der Status ist als Literal Type `"pending" | "completed"` definiert
- [ ] Optionale Properties (z.B. `priority`, `dueDate`) sind korrekt gekennzeichnet
- [ ] Alle Funktionen, die mit Todos arbeiten, nutzen diese Typen

**Hinweise:**
- Überlege, welche Properties required und welche optional sein sollen
- Nutze einen eigenen Type Alias für den Status: `type TodoStatus = "pending" | "completed"`

### User Story 3: Funktionen typisieren
**Als Entwickler möchte ich alle Funktionen mit korrekten Typen versehen, damit die Verwendung klar und sicher ist.**

Akzeptanzkriterien:
- [ ] Alle Funktionsparameter haben Typen
- [ ] Alle Funktionen haben explizite Rückgabetypen
- [ ] Array-Operationen (filter, map, find) sind korrekt typisiert
- [ ] Der Code kompiliert ohne TypeScript-Fehler

**Hinweise:**
- Achte besonders auf Funktionen wie `Array.find()` - was geben sie zurück?
- Nutze Type Guards (z.B. `if (todo !== undefined)`), wo nötig

### User Story 4: Input-Validierung typisieren
**Als Entwickler möchte ich User Input korrekt validieren und typisieren, damit keine Runtime-Fehler durch falsche Typen entstehen.**

Akzeptanzkriterien:
- [ ] CLI-Input (aus `process.argv`) wird korrekt verarbeitet
- [ ] String-zu-Number Konvertierungen sind explizit und sicher
- [ ] Ungültige Inputs führen zu aussagekräftigen Fehlermeldungen
- [ ] Type Guards validieren die Eingaben zur Laufzeit

**Hinweise:**
- `process.argv` liefert immer Strings - auch wenn der User eine Zahl eingibt
- Nutze `Number()` oder `parseInt()` für die Konvertierung
- Prüfe mit `isNaN()` ob die Konvertierung erfolgreich war

## Projekt starten

```bash
# Dependencies installieren
npm install

# TypeScript kompilieren
npm run build

# Programm ausführen
npm start

# Während der Entwicklung (mit Watch-Mode)
npm run dev
```

## Befehle der Todo-Liste

```bash
# Todo hinzufügen
node dist/index.js add "Einkaufen" "Milch und Brot kaufen"

# Alle Todos anzeigen
node dist/index.js list

# Nur pending Todos anzeigen
node dist/index.js list pending

# Nur completed Todos anzeigen
node dist/index.js list completed

# Todo als erledigt markieren (by ID)
node dist/index.js complete 1

# Todo löschen (by ID)
node dist/index.js delete 1
```

**Hinweis:** Da die Daten nur im Arbeitsspeicher gehalten werden, startet die Anwendung bei jedem Aufruf mit den gleichen Beispiel-Todos. Änderungen sind nur während der Programmlaufzeit sichtbar.

## Weiterführende Aufgaben

Wenn du mit den Hauptaufgaben fertig bist, kannst du folgende Features ergänzen:

1. **Prioritäten:** Füge ein `priority` Feld hinzu (Enum: `low | medium | high`)
2. **Sortierung:** Implementiere Sortierung nach Priorität oder Erstellungsdatum
3. **Suche:** Füge eine Suchfunktion hinzu, die nach Stichworten in Titel/Beschreibung filtert
4. **Persistenz:** Speichere die Todos in einer JSON-Datei statt nur im Arbeitsspeicher
5. **Due Date Warnings:** Zeige Todos mit überschrittenem Fälligkeitsdatum rot an

## Weiterführende Ressourcen

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [Type Challenges](https://github.com/type-challenges/type-challenges) - Für Fortgeschrittene
