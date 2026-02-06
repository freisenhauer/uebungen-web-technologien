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
|------------------------|-----------------------------|
| `git init`             | Neues Repository erstellen  |
| `git status`           | Zeigt geänderte Dateien     |
| `git add <datei\>`     | Änderungen stagen           |
| `git commit -m "..."`  | Änderungen speichern        |
| `git push`             | Änderungen zu GitHub senden |
| `git branch`           | Branches anzeigen           |
| `git checkout -b name` | Neuen Branch erstellen      |
| `git merge name`       | Branch zusammenführen       |

---

# **Git FAQ – Praxisrelevante Themen und Lösungen**

Dieses FAQ erklärt praxisrelevante Themen, die in echten Projekten häufig auftreten, und zeigt **Lösungen und Vorgehensweisen**.  
Ziel: Du lernst problemorientiert, wie Git in der Praxis genutzt wird.

---

## **1. Was passiert beim `git pull`?**

`git pull` ist eine Kombination aus:

1. `git fetch` → Git lädt neue Commits vom Remote-Repository herunter, ohne sie in deinen lokalen Branch zu integrieren.  
2. `git merge` → Git versucht, diese Änderungen in deinen aktuellen Branch zu mergen.

**Wichtig:**

- Wenn keine Konflikte existieren, merge Git automatisch.  
- Wenn Änderungen dieselben Zeilen betreffen, entsteht ein **Merge Conflict**, den du manuell lösen musst.  
- Alternative: `git pull --rebase` wendet deine lokalen Commits nach dem Remote-Stand an, was die Historie linear hält.

**Praxis-Tipp:** Nutze Pull regelmäßig, um Konflikte früh zu erkennen.

---

## **2. Wie kann ich Commits rückgängig machen?**

- **`git revert <commit>`**: erstellt einen neuen Commit, der die Änderungen eines früheren Commits rückgängig macht.  
  → Sicher für bereits gepushte Commits.
  
- **`git reset`**: setzt den Branch auf einen früheren Commit zurück.  
  - `--soft`: behält Änderungen im Staging.  
  - `--mixed`: behält Änderungen im Working Directory.  
  - `--hard`: löscht alles unwiderruflich.  
  → Vorsicht: `reset` von gepushten Commits kann Probleme für andere Entwickler verursachen.

**Merksatz:**  
> `revert` = sicher für gemeinsame Repos, `reset` = lokal und vorsichtig nutzen.

---

## **3. Sauber mit mehreren Entwicklern arbeiten**

- **Feature-Branches**: Jeder arbeitet in einem eigenen Branch, z. B. `feature-login`.  
- **Pull Requests (PR)**: Änderungen werden erst via PR in `main` gemerged, nach Review.  
- **Code Review**: Kollegen prüfen Änderungen, bevor sie gemerged werden.  
- **Branching-Strategien**: z. B. GitFlow: `main`, `develop`, `feature`, `release`, `hotfix`.

**Praxis-Tipp:**  
Regelmäßiges Pushen, Pullen und Reviews verhindern große Konflikte.

---

## **4. Selektives Committen von Änderungen**

- Git erlaubt, nur bestimmte Teile einer Datei zu committen: `git add -p`.  
- Vorteil: du kannst mehrere Änderungen in einer Datei sauber in getrennten Commits speichern.  
- Nach dem Commit zeigt `git log -p`, welche Änderungen übernommen wurden.

**Praxis-Tipp:**  
Immer kleine, thematisch zusammenhängende Commits machen – erleichtert Review und Debugging.

---

## **5. Projekt-Historie analysieren**

- **`git log`** zeigt alle Commits.  
- Mit Optionen wie `--oneline`, `--graph`, `--all` sieht man Branch-Struktur und Verlauf.  
- Filter nach Autor, Datei oder Datum möglich: `git log --author="Name"` oder `git log -- <datei>`.  
- GUI-Tools (`gitk`, VSCode Git) oder GitHub Insights helfen, die Historie visuell zu erfassen.

**Praxis-Tipp:**  
Vor einem Merge die Historie prüfen, um Überraschungen zu vermeiden.

---

## **6. Gelöschte Branches oder Commits wiederherstellen**

- **`git reflog`** zeigt alle Bewegungen im Repository (Checkout, Commit, Reset).  
- Gelöschte Branches lassen sich oft wiederherstellen:  
  ```bash
  git checkout -b <branchname> <commit-hash>
  ```

* **`git cherry-pick <commit>`** kann einzelne Commits auf einen anderen Branch anwenden.

**Praxis-Tipp:**
Reflog ist dein Retter bei versehentlichem Löschen oder Reset.

---

## **7. Unterschiede zwischen Branches erkennen**

* `git diff branch1 branch2` zeigt alle Änderungen zwischen zwei Branches.
* `git diff --name-status branch1 branch2` zeigt nur Dateinamen und Status.
* Auf GitHub Pull Requests können diese Unterschiede automatisch visualisieren.

**Praxis-Tipp:**
Vor einem Merge immer prüfen, welche Änderungen tatsächlich übernommen werden.

---

## **9. Git mit IDEs und GUI-Tools nutzen**

* IDEs wie VSCode oder IntelliJ bieten Git-Integration: Commit, Branch, Merge, Pull, Push.
* GUI-Tools wie GitHub Desktop oder Sourcetree erleichtern Visualisierung und Konfliktlösung.
* CLI bleibt mächtig, besonders für fortgeschrittene Operationen (`rebase`, `stash`, `cherry-pick`).

**Praxis-Tipp:**
CLI für komplexe Aufgaben, GUI/IDE für Überblick und schnelle Aufgaben.

**Absoluter Geheimtrick**:

Ich persönlich verwende [lazygit](https://github.com/jesseduffield/lazygit). Dabei handelt es sich um eine **SEHR** mächtige und effiziente Terminal UI.
Ich kann `lazygit` jedem empfehlen, der sich mit dem Terminal und vim wohl fühlt.
Für alle anderen sind die GUI Integrationen in IDEs aber auch sehr hilfreich.

---

## **10. Weitere Praxislösungen**

* **Große oder sensible Dateien vermeiden**: `.gitignore` nutzen.
* **Generierter Code wird nicht eingecheckt!** (Build Output, etc.): `.gitignore` nutzen.
* **Experimentelle Änderungen sichern**: `git stash` speichert temporär, ohne zu committen.
* **Forking & Upstream-Remotes**: Open-Source-Projekte oft mit Fork → Clone → Pull Request Workflow.
* **Merge-Tools**: Konflikte lassen sich grafisch lösen (`meld`, VSCode Merge Editor).
* **Releases planen**: Branches sauber halten, Feature-Branches regelmäßig mergen.
