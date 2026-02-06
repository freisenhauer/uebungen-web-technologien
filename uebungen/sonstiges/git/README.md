# **Übung: Wie Git wirklich funktioniert (praxisnah erklärt)**

Dieses Übungsblatt führt dich Schritt für Schritt in die Arbeitsweise von **Git** ein. Wir machen nicht nur „Befehle nach“, sondern erklären jeweils **warum** wir Dinge tun und was im Hintergrund passiert.

Am Ende solltest du verstehen:

* Was Git ist und wie es grundsätzlich funktioniert
* Was ein **Upstream-Repository** (z. B. GitHub) ist
* Wie man ein Repository anlegt und verbindet
* Was **Staging (`git add`)** bedeutet
* Was ein **Commit** ist
* Was **Branches** sind, warum wir sie brauchen und wie man sie auf GitHub sieht
* Wie man Branches **merged**
* Was **Merge Conflicts** sind und wie man sie löst

GitHub wird in dieser Übung als **Upstream-Repository** genutzt.

---

# **Teil 0 – Konzept: Was ist Git eigentlich?**

## 🔹 Git als Versionskontrollsystem

Git ist ein **verteiltes Versionskontrollsystem**. Das bedeutet:

* Jede Person hat eine **vollständige Kopie der Projektgeschichte lokal auf ihrem Rechner**.
* Jeder **Commit** ist ein gespeicherter Zustand deines Projekts zu einem bestimmten Zeitpunkt.
* Git merkt sich, **was sich geändert hat, wann und von wem**.

Wichtiges Prinzip:
Git speichert nicht einfach viele Kopien von Dateien, sondern effizient die **Unterschiede zwischen Versionen**.

---

## 🔹 Die drei Bereiche in Git

Wenn du mit Git arbeitest, gibt es immer drei Ebenen:

### 1️⃣ **Working Directory (Arbeitsverzeichnis)**

Das sind die Dateien, die du gerade siehst und bearbeitest.

### 2️⃣ **Staging Area (Index)**

Eine „Zwischenablage“, in der du auswählst, **welche Änderungen in den nächsten Commit sollen**.

### 3️⃣ **Repository (Historie)**

Die offizielle Git-Historie mit all deinen Commits.

Typischer Ablauf:

```
Datei ändern → git add (stagen) → git commit (speichern)
```

---

# **Teil 1 – Was ist ein Upstream-Repository?**

## 🔹 Lokal vs. Remote

Es gibt zwei Orte, an denen dein Git-Repository existiert:

### ✅ Dein **lokales Repository**

→ Auf deinem eigenen Computer

### ✅ Ein **Remote-Repository (Upstream)**

→ Zum Beispiel auf **GitHub**

In dieser Übung nutzen wir GitHub als Upstream.

## 🔹 Was bedeutet „Upstream“?

Das **Upstream-Repository** ist:

* der **zentrale, gemeinsame Ort**, an dem der Code gespeichert wird,
* der Ort, mit dem du dich synchronisierst (`push` und `pull`),
* der Ort, von dem andere Teammitglieder den Code bekommen.

Merksatz:

> Dein lokales Git ist dein persönlicher Arbeitsbereich.
> GitHub (Upstream) ist das gemeinsame, offizielle Projekt.

---

# **Teil 2 – Ein Repository auf GitHub anlegen (Upstream)**

### Schritt 1: Repository erstellen

1. Gehe auf **[https://github.com/](https://github.com/)**
2. Klicke oben rechts auf **"+" → "New repository"**
3. Wähle:

* Repository name: `git-uebung`
* Visibility: **Public** (oder Private)
* ❗ **NICHT** „Add README“ auswählen
4. Klicke auf **Create repository**

Du erhältst eine URL wie:

```
https://github.com/dein-username/git-uebung.git
```

👉 Diese URL ist dein **Upstream-Repository**.

---

# **Teil 3 – Lokales Repository erstellen und verbinden**

## Aufgabe 1: Lokales Git-Repository erstellen

Im Terminal:

```bash
mkdir git-uebung
cd git-uebung
git init
```

Was passiert?

* `git init` erstellt einen unsichtbaren Ordner `.git`
* Dort speichert Git:

  * Alle Commits
  * Alle Branches
  * Die komplette Historie

Ohne `.git` ist dein Ordner **kein Git-Projekt**.

---

## Aufgabe 2: Upstream hinzufügen

```bash
git remote add origin https://github.com/DEIN-USERNAME/git-uebung.git
```

Erklärung:

* `remote` = ein externes Git-Repository
* `origin` = der Standardname für dein Upstream auf GitHub

Prüfe:

```bash
git remote -v
```

---

# **Teil 4 – Erste Datei, Staging und Commit**

## Aufgabe 3: Datei erstellen

```bash
echo "# Meine erste Git-Übung" > README.md
```

Prüfe den Status:

```bash
git status
```

👉 `README.md` ist **untracked** → Git verfolgt sie noch nicht.

---

## Aufgabe 4: Was bedeutet „Staging“?

```bash
git add README.md
```

Warum gibt es Staging?

Stell dir vor, du änderst 10 Dateien, willst aber nur 5 davon in einem Commit speichern.
➡️ Mit `git add` wählst du **gezielt aus**, was in den nächsten Commit kommt.

---

## Aufgabe 5: Erster Commit

```bash
git commit -m "Initiales README hinzufügen"
```

Was ist ein Commit?

Ein Commit ist:

* Ein gespeicherter Zustand deines Projekts
* Mit einer erklärenden Nachricht
* Teil deiner Git-Historie

---

# **Teil 5 – Änderungen zu GitHub (Upstream) pushen**

```bash
git push -u origin main
```

Erklärung:

* `push` = „Sende meine lokalen Commits nach GitHub“
* `origin` = dein Upstream
* `main` = der Branch

Jetzt kannst du dein Repository auf GitHub neu laden – die Datei ist sichtbar.

---

# **Teil 6 – Selektives Staging verstehen**

## Aufgabe 6: Zwei Dateien erstellen

```bash
echo "Hallo Welt" > file1.txt
echo "Git ist spannend" > file2.txt
```

## Aufgabe 7: Nur eine Datei stagen

```bash
git add file1.txt
git commit -m "file1.txt hinzufügen"
```

Jetzt:

```bash
git status
```

👉 `file1.txt` ist committed, `file2.txt` noch nicht.
Du kontrollierst also, **was in welchen Commit kommt**.

Committe nun auch die zweite Datei:

```bash
git add file2.txt
git commit -m "file2.txt hinzufügen"
git push
```

---

# **Teil 7 – Branches: Warum brauchen wir sie wirklich?**

## 🔹 Das Grundproblem ohne Branches

Stell dir vor, ihr arbeitet zu mehreren an einem Projekt.
Auf `main` liegt der stabile Stand.

Du willst ein neues Feature bauen – das dauert mehrere Tage.
Wenn du direkt auf `main` arbeitest:

* Der Code ist zwischendurch kaputt
* Andere können nicht sinnvoll weiterarbeiten
* Ein Release wäre riskant

👉 Genau deshalb brauchen wir **Branches**.

---

## 🔹 Das Kernkonzept von Branches

Ein **Branch ist ein paralleler Entwicklungszweig**.

Statt auf `main` zu arbeiten, machst du z. B.:

```
main        → stabil
feature-login → dein neuer Branch
```

Konzeptionell:

```
main:
A --- B --- C   (stabil)

feature-login:
             \
              D --- E --- F   (dein Feature)
```

Ergebnis:

* `main` bleibt sauber ✅
* Du kannst in Ruhe arbeiten ✅
* Andere können parallel arbeiten ✅

Erst wenn dein Feature fertig ist, wird es zurück in `main` gemerged.

---

## 🔹 Wofür nutzt man Branches in der Praxis?

### ✅ 1) Feature-Branches

Beispiele:

* `feature-login`
* `feature-dark-mode`
* `feature-export-csv`

Regel:

> Ein Branch = ein Feature

---

### ✅ 2) Bugfix-Branches

Statt direkt auf `main` zu ändern:

```
bugfix-crash-on-start
```

So bleibt `main` stabil, bis der Fix getestet ist.

---

### ✅ 3) Release-Branches (in größeren Projekten)

Oft gibt es:

```
main        → nächste Version
release-1.2 → aktuelle Kundenversion
```

So kann man Bugs in 1.2 fixen und gleichzeitig an 2.0 arbeiten.

---

## 🔹 Merksatz zu Branches

> **Branches ermöglichen unabhängiges, sicheres und paralleles Arbeiten, ohne den Hauptcode kaputt zu machen.**

---

# **Teil 8 – Wie sieht man Branches auf GitHub?**

## 🔹 Schritt 1: Repository öffnen

Gehe auf:

```
https://github.com/DEIN-USERNAME/git-uebung
```

Oben links siehst du:

```
main ▾
```

Das ist das **Branch-Dropdown**.

---

## 🔹 Schritt 2: Alle Branches anzeigen

Klicke auf:

```
main ▾
```

Du siehst z. B.:

```
main
feature-text
conflict-test
```

Das sind **alle Branches, die auf GitHub existieren**.

---

## 🔹 Schritt 3: Zwischen Branches wechseln

Wenn du auf `feature-text` klickst:

* Zeigt GitHub dir den Code **so, wie er in diesem Branch aussieht**
* Du kannst direkt sehen, wie er sich von `main` unterscheidet.

---

## 🔹 Schritt 4: Commits pro Branch sehen

Klicke oben auf **Commits**.

* Du siehst die Historie **nur für den aktuell ausgewählten Branch**
* Wechselst du den Branch, ändert sich auch die Commit-Liste.

---

# **Teil 9 – Arbeiten mit Branches (Praxis)**

## Aufgabe 8: Neuen Branch erstellen

```bash
git checkout -b feature-text
```

Prüfe:

```bash
git branch
```

Der aktuelle Branch ist mit `*` markiert.

---

## Aufgabe 9: Änderung im Branch

```bash
echo "\nDies ist ein Feature-Branch." >> README.md
git add README.md
git commit -m "Text im Feature-Branch ergänzen"
```

---

# **Teil 10 – Branch mergen (zusammenführen)**

Wechsle zurück zu `main`:

```bash
git checkout main
```

Merge den Branch:

```bash
git merge feature-text
```

Was passiert?

Git versucht, alle Änderungen aus `feature-text` in `main` zu integrieren.

Push das Ergebnis:

```bash
git push
```

---

# **Teil 11 – Was sind Merge Conflicts?**

Ein **Merge Conflict** entsteht, wenn:

* Zwei Branches **dieselbe Zeile in einer Datei unterschiedlich geändert haben**

Git weiß dann nicht:

> „Welche Version soll ich behalten?“

---

## Aufgabe 10: Absichtlich einen Conflict erzeugen

### Schritt 1: Neuer Branch

```bash
git checkout -b conflict-test
```

### Schritt 2: README ändern

```bash
echo "# Änderung im conflict-test Branch" > README.md
git add README.md
git commit -m "Änderung im conflict-test Branch"
```

### Schritt 3: Zurück zu main

```bash
git checkout main
```

### Schritt 4: Gleiche Zeile anders ändern

```bash
echo "# Änderung im main Branch" > README.md
git add README.md
git commit -m "Änderung im main Branch"
```

### Schritt 5: Merge versuchen

```bash
git merge conflict-test
```

👉 Jetzt bekommst du einen **Merge Conflict**.

---

# **Teil 12 – Merge Conflict auflösen**

Öffne `README.md`. Du siehst etwas wie:

```text
<<<<<<< HEAD
# Änderung im main Branch
=======
# Änderung im conflict-test Branch
>>>>>>> conflict-test
```

Löse den Conflict z. B. so:

```text
# Finale, aufgelöste Version
```

Dann:

```bash
git add README.md
git commit -m "Merge Conflict aufgelöst"
git push
```

---

# **Spickzettel – Die wichtigsten Git-Befehle**

| Befehl                 | Bedeutung                   |
| ---------------------- | --------------------------- |
| `git init`             | Neues Repository erstellen  |
| `git status`           | Zeigt geänderte Dateien     |
| `git add <datei>`      | Änderungen stagen           |
| `git commit -m "..."`  | Änderungen speichern        |
| `git push`             | Änderungen zu GitHub senden |
| `git branch`           | Branches anzeigen           |
| `git checkout -b name` | Neuen Branch erstellen      |
| `git merge name`       | Branch zusammenführen       |

---