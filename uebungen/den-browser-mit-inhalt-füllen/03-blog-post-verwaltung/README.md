# Blog-Post-Verwaltung mit JSONPlaceholder

In dieser Übung baust du eine einfache Blog-Post-Verwaltung, die mit einer REST-API kommuniziert. Du lernst, wie man Daten vom Server lädt, im Browser anzeigt und neue Daten an den Server sendet.

## Lernziele

In dieser Übung lernst du:
- Asynchrone HTTP-Requests mit der Fetch API durchzuführen
- JSON-Daten von einer REST-API abzurufen und zu verarbeiten
- Das DOM dynamisch zu manipulieren und Inhalte einzufügen
- Event Listener für Formulare und Buttons zu implementieren
- Zwischen Seiten zu navigieren und URL-Parameter zu verwenden
- Mit Promises und Async/Await zu arbeiten

## Voraussetzungen

Für diese Übung benötigst du:
- Einen modernen Webbrowser (Chrome, Firefox, Safari, Edge)
- Grundlegende JavaScript-Kenntnisse

## Die JSONPlaceholder API

Für diese Übung verwenden wir [JSONPlaceholder](https://jsonplaceholder.typicode.com/), eine kostenlose REST-API für Testzwecke. Sie simuliert ein Backend für Blog-Posts.

**Wichtig:** Die API simuliert nur die Operationen. Daten werden nicht wirklich gespeichert oder gelöscht, aber die API antwortet so, als ob sie es täten.

## Aufgabenstellung

### Pflichtaufgaben

#### 1. Posts laden und anzeigen

Als Nutzer möchte ich beim Laden der Seite automatisch die ersten 10 Blog-Posts sehen.

**Technische Anforderungen:**
- Beim Laden von `index.html` sollen die ersten 10 Posts von der API abgerufen werden
- API-Endpunkt: `GET https://jsonplaceholder.typicode.com/posts?_limit=10`
- Jeder Post soll als Card in der Liste angezeigt werden (HTML-Struktur ist vorgegeben)
- Zeige mindestens Title und Body des Posts an
- Verwende `async/await` und die Fetch API

**Hinweise:**
- Die Fetch API gibt ein Promise zurück, das mit einem Response-Objekt erfüllt wird
- Mit `response.json()` kannst du den Response-Body als JSON parsen
- Verwende `document.getElementById()` oder `document.querySelector()`, um den Container zu finden
- Erstelle für jeden Post ein neues Element und füge es dem Container hinzu

#### 2. Neuen Post erstellen

Als Nutzer möchte ich über ein Formular einen neuen Post erstellen können, der direkt in der Liste erscheint.

**Technische Anforderungen:**
- Das Formular soll beim Absenden einen POST-Request an die API senden
- API-Endpunkt: `POST https://jsonplaceholder.typicode.com/posts`
- Der Request-Body soll die Formulardaten als JSON enthalten
- Nach erfolgreichem Erstellen soll der neue Post direkt in die Liste eingefügt werden
- Das Formular soll zurückgesetzt werden

**Hinweise:**
- Verwende `event.preventDefault()`, um das Standard-Formularverhalten zu verhindern
- Der Request benötigt den Header `Content-Type: application/json`
- Mit `JSON.stringify()` kannst du JavaScript-Objekte in JSON umwandeln
- Die API gibt den erstellten Post zurück (mit einer ID)

**Beispiel für einen POST-Request:**
```javascript
const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'Mein Titel',
    body: 'Mein Text',
    userId: 1
  })
});
const newPost = await response.json();
```

#### 3. Zur Detailseite navigieren

Als Nutzer möchte ich auf einen Post klicken können, um zur Detailseite zu gelangen.

**Technische Anforderungen:**
- Jeder Post in der Liste soll klickbar sein
- Bei Klick soll zur `details.html` navigiert werden
- Die Post-ID soll als URL-Parameter übergeben werden (z.B. `details.html?id=1`)

**Hinweise:**
- Verwende `window.location.href` oder `<a>`-Tags zur Navigation
- Template Strings helfen beim Erstellen der URL: `` `details.html?id=${post.id}` ``

#### 4. Post-Details anzeigen

Als Nutzer möchte ich auf der Detailseite alle Informationen zu einem Post sehen.

**Technische Anforderungen:**
- Beim Laden von `details.html` soll die Post-ID aus der URL gelesen werden
- Der entsprechende Post soll von der API abgerufen werden
- API-Endpunkt: `GET https://jsonplaceholder.typicode.com/posts/{id}`
- Die Post-Details sollen im vorgegebenen Container angezeigt werden

**Hinweise:**
- Mit `URLSearchParams` kannst du URL-Parameter auslesen:
```javascript
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');
```
- Behandle den Fall, dass keine ID übergeben wurde oder der Post nicht gefunden wird

### Bonusaufgaben

#### 5. Post löschen

Als Nutzer möchte ich einen Post in der Übersicht löschen können.

**Technische Anforderungen:**
- Jeder Post in der Liste soll einen "Löschen"-Button haben
- Bei Klick soll ein DELETE-Request an die API gesendet werden
- API-Endpunkt: `DELETE https://jsonplaceholder.typicode.com/posts/{id}`
- Nach erfolgreichem Löschen soll der Post aus der Liste entfernt werden

**Hinweise:**
- Verwende `element.remove()`, um ein Element aus dem DOM zu entfernen
- Die API gibt Status 200 zurück, auch wenn die Daten nicht wirklich gelöscht werden

#### 6. Formularvalidierung

Als Nutzer möchte ich, dass das Formular validiert wird, bevor ein Post erstellt wird.

**Technische Anforderungen:**
- Title und Body dürfen nicht leer sein
- Zeige eine Fehlermeldung an, wenn die Validierung fehlschlägt
- Das Formular soll nur abgesendet werden, wenn die Validierung erfolgreich ist

**Hinweise:**
- Du kannst HTML5-Validierung (`required`-Attribut) oder JavaScript-Validierung verwenden
- Für eine bessere Benutzererfahrung kannst du die Fehlermeldung direkt beim Formular anzeigen

## Weiterführende Ressourcen

- [MDN: Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MDN: Working with JSON](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON)
- [MDN: Using Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
- [JSONPlaceholder Guide](https://jsonplaceholder.typicode.com/guide/)
