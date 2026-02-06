# Übung: Portfolio-Seite stylen

## Beschreibung

In dieser Übung stylst du deine HTML-Portfolio-Seite aus der vorherigen Übung mit CSS. Du lernst dabei die Grundlagen von CSS kennen: das Box-Modell, Typografie, Farben und einfache Layout-Techniken mit Flexbox. Die Übung zeigt dir, wie aus einer ungestylten HTML-Seite eine professionell aussehende Webseite wird.

Die Übung fokussiert sich auf die wichtigsten CSS-Grundlagen, die du brauchst, um Webseiten ansprechend zu gestalten. Am Ende hast du eine responsive Portfolio-Seite, die auf Desktop und Mobilgeräten gut aussieht.

## Lernziele

Nach dieser Übung kannst du:
- Das CSS-Box-Modell verstehen und anwenden (Content, Padding, Border, Margin)
- Typografie professionell gestalten (Schriftarten, -größen, Zeilenabstände)
- Farben und Kontraste sinnvoll einsetzen
- Externe CSS-Dateien erstellen und einbinden
- Flexbox für einfache Layouts verwenden (z.B. horizontale Navigation)
- Media Queries für responsive Designs einsetzen
- Die Browser Developer Tools zum Debuggen von CSS nutzen

## Voraussetzungen

Für diese Übung benötigst du:
- Die abgeschlossene Übung "Persönliche Portfolio-Seite" (oder nutze die bereitgestellte `index.html`)
- Einen Texteditor (z.B. VS Code, Sublime Text)
- Einen modernen Webbrowser mit Developer Tools (z.B. Chrome, Firefox, Safari, Edge)

## Aufgabenstellung

Deine Aufgabe ist es, die Portfolio-Seite `index.html` durch eine externe CSS-Datei `styles.css` zu stylen.

### User Stories

**Als Besucher möchte ich eine ansprechend formatierte Seite mit lesbarer Typografie und angenehmen Abständen sehen, damit ich die Inhalte gut erfassen kann.**

Erstelle ein grundlegendes Styling:
- Lege eine externe CSS-Datei `styles.css` an und binde sie in der `index.html` ein
- Setze eine angenehme Schriftart und Schriftgröße für die gesamte Seite (z.B. Sans-Serif, 16px oder 1rem)
- Definiere einen passenden Zeilenabstand für bessere Lesbarkeit (z.B. 1.6)
- Begrenze die Seitenbreite auf maximal 1200px und zentriere den Inhalt
- Setze `box-sizing: border-box` für alle Elemente
- Entferne die Standard-Margins des `body`
- Füge einen Hintergrund-Farbton hinzu (z.B. helles Grau)

**Akzeptanzkriterien:**
- Die CSS-Datei ist korrekt eingebunden und wird geladen
- Der Text ist gut lesbar
- Die Seite ist auf maximal 1200px begrenzt und horizontal zentriert
- Es gibt keine ungewollten Abstände am Seitenrand

---

**Als Besucher möchte ich eine gut sichtbare, horizontal ausgerichtete Navigation haben, damit ich schnell zwischen den Bereichen wechseln kann.**

Style die Navigation:
- Entferne die Standard-Listenpunkte der Navigationsliste
- Ordne die Navigationslinks horizontal mit Flexbox an
- Füge Abstände zwischen den Links ein
- Gestalte die Links ansprechend (z.B. keine Unterstreichung, passende Farbe)
- Füge einen Hover-Effekt hinzu (z.B. Farbwechsel oder Unterstreichung beim Hovern)
- Gib dem Header-Bereich einen passenden Hintergrund und Padding

**Akzeptanzkriterien:**
- Die Navigation ist horizontal ausgerichtet
- Links reagieren auf Hover
- Der Header-Bereich hebt sich visuell vom Rest der Seite ab

---

**Als Besucher möchte ich die verschiedenen Bereiche (Sections) visuell voneinander unterscheiden können, damit ich die Struktur der Seite besser erfasse.**

Gestalte die einzelnen Sections:
- Füge allen `<section>`-Elementen angemessenes Padding hinzu
- Gib einzelnen Sections unterschiedliche Hintergrundfarben (z.B. weiß und helles Grau im Wechsel)
- Füge Abstände zwischen den Sections ein
- Style das Profilbild:
  - Begrenze die maximale Breite (z.B. 300px)
  - Mache das Bild rund mit `border-radius`
  - Füge einen subtilen Schatten hinzu
- Style die Listen in den Sections (z.B. andere Listenpunkte, Abstände)

**Akzeptanzkriterien:**
- Sections sind visuell voneinander abgegrenzt
- Das Profilbild ist rund und ansprechend gestaltet
- Listen sind gut lesbar und strukturiert

---

**Als Besucher möchte ich die Seite auch auf meinem Smartphone gut nutzen können, damit ich die Inhalte auf allen Geräten konsumieren kann.**

Mache die Seite responsive:
- Erstelle eine Media Query für Bildschirme bis 768px Breite
- Ändere die Navigation auf mobilen Geräten zu einer vertikalen Liste
- Passe Schriftgrößen bei Bedarf an (z.B. kleinere Überschriften auf mobilen Geräten)
- Reduziere Paddings und Margins auf kleineren Bildschirmen
- Stelle sicher, dass das Profilbild sich an die Bildschirmbreite anpasst

**Akzeptanzkriterien:**
- Die Navigation stapelt sich vertikal auf schmalen Bildschirmen
- Alle Inhalte sind auf mobilen Geräten gut lesbar
- Es gibt kein horizontales Scrollen

---

### Zusätzliche Anforderungen

- Verwende relative Einheiten (rem, em, %) wo sinnvoll statt fixer Pixel-Werte
- Nutze CSS-Variablen oder konsistente Farben für ein einheitliches Design
- Achte auf gute Kontraste zwischen Text und Hintergrund (Barrierefreiheit)
- Verwende semantische Selektoren (Element-, Klassen-Selektoren) sinnvoll
- Kommentiere deine CSS-Datei in sinnvollen Abschnitten

## Hinweise zur Bearbeitung

1. **Beginne mit dem Reset und Grundlagen:** Setze zuerst `box-sizing`, entferne Standard-Margins und definiere Basiswerte
2. **Von oben nach unten:** Style die Seite von oben (Header) nach unten (Footer)
3. **Browser Developer Tools nutzen:** Öffne die Developer Tools (F12), um deine CSS-Änderungen live zu testen
4. **Box-Modell visualisieren:** Nutze die Developer Tools, um das Box-Modell der Elemente zu sehen (Inspect Element)
5. **Mobile-First oder Desktop-First:** Du kannst entweder zuerst für Desktop stylen und dann Media Queries für Mobile hinzufügen, oder umgekehrt
6. **Teste regelmäßig:** Öffne die Seite im Browser und teste nach jeder größeren Änderung
7. **Responsive testen:** Nutze die Device-Toolbar in den Developer Tools, um verschiedene Bildschirmgrößen zu testen

## Testen der Lösung

Öffne die `index.html` im Browser und überprüfe:
- [ ] Die externe CSS-Datei wird geladen (keine unstyled Seite)
- [ ] Die Seite ist horizontal zentriert mit begrenzter Breite
- [ ] Die Navigation ist horizontal und funktioniert
- [ ] Hover-Effekte auf Links funktionieren
- [ ] Sections sind visuell unterscheidbar
- [ ] Das Profilbild ist rund und passend groß
- [ ] Die Seite sieht auf mobilen Geräten gut aus (teste mit Device-Toolbar)
- [ ] Es gibt keine ungewollten Scrollbalken
- [ ] Text ist gut lesbar (ausreichend Kontrast)

### Browser Developer Tools

Nutze die Developer Tools zum Debuggen:
- **Elements/Inspector Tab:** Klicke auf Elemente und sieh dir die angewendeten CSS-Regeln an
- **Box-Modell:** Im Elements-Tab siehst du das Box-Modell mit Content, Padding, Border, Margin
- **Live-Editing:** Ändere CSS-Werte direkt im Browser, um verschiedene Optionen auszuprobieren
- **Device-Toolbar:** Teste verschiedene Bildschirmgrößen (Responsive Design Mode)

## Bonusaufgaben

Wenn du die Hauptaufgabe abgeschlossen hast, kannst du folgende Erweiterungen umsetzen:

### 1. Erweiterte Typografie
- Binde eine Google Font ein (z.B. "Roboto" oder "Open Sans")
- Nutze verschiedene Schriftstärken (font-weight) für Überschriften
- Experimentiere mit `letter-spacing` für Überschriften

### 2. Fortgeschrittenes Layout
- Nutze CSS Grid statt einfacher Sections für ein zwei- oder dreispaltiges Layout
- Erstelle eine Card-Ansicht für die Skills mit Flexbox oder Grid

### 3. Animationen und Übergänge
- Füge `transition` zu Links hinzu für sanfte Hover-Effekte
- Animiere das Erscheinen von Sections beim Scrollen (mit CSS oder später mit JavaScript)

### 4. Mehr Responsive Breakpoints
- Füge weitere Media Queries hinzu für Tablets (768px - 1024px)
- Optimiere das Layout für sehr große Bildschirme (> 1920px)

### 5. Dark Mode
- Implementiere ein alternatives Farbschema für Dark Mode mit `prefers-color-scheme`

## Weiterführende Ressourcen

- [MDN Web Docs - CSS](https://developer.mozilla.org/de/docs/Web/CSS)
- [CSS-Tricks - A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [MDN - Box Model](https://developer.mozilla.org/de/docs/Learn/CSS/Building_blocks/The_box_model)
- [MDN - Media Queries](https://developer.mozilla.org/de/docs/Web/CSS/CSS_media_queries/Using_media_queries)
- [Google Fonts](https://fonts.google.com/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) (für Barrierefreiheit)
