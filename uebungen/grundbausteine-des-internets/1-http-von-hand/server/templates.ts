import type { ServerData } from "./types.js";

export function renderHomePage(port: number): string {
    return `
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTTP von Hand - Server</title>
    <style>
        body {
            font-family: 'Courier New', monospace;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background-color: #1e1e1e;
            color: #d4d4d4;
        }
        h1 {
            color: #4ec9b0;
        }
        .endpoint {
            background-color: #2d2d2d;
            padding: 15px;
            margin: 10px 0;
            border-left: 3px solid #569cd6;
        }
        code {
            background-color: #1e1e1e;
            padding: 2px 6px;
            border-radius: 3px;
            color: #ce9178;
        }
    </style>
</head>
<body>
    <h1>HTTP von Hand - Test Server</h1>
    <p>Dieser Server läuft auf Port ${port} und unterstützt folgende Endpunkte:</p>

    <div class="endpoint">
        <strong>GET /</strong> - Diese Seite (HTML)
    </div>

    <div class="endpoint">
        <strong>GET /api/echo</strong> - Zeigt Details des Requests (JSON)
    </div>

    <div class="endpoint">
        <strong>GET /api/data</strong> - Beispieldaten mit Content-Negotiation
    </div>

    <div class="endpoint">
        <strong>POST /api/greet</strong> - Akzeptiert JSON-Body <code>{"name":"...", "age":...}</code>
    </div>

    <div class="endpoint">
        <strong>GET /notfound</strong> - Erzwingt 404 Not Found
    </div>

    <div class="endpoint">
        <strong>GET /redirect</strong> - Leitet auf / um (301)
    </div>

    <div class="endpoint">
        <strong>GET /teapot</strong> - 418 I'm a teapot
    </div>

    <p>Nutze <code>curl</code> um Requests zu senden:</p>
    <pre><code>curl -v http://localhost:${port}/</code></pre>
</body>
</html>
	`.trim();
}

export function renderDataAsHTML(data: ServerData): string {
    return `
<!DOCTYPE html>
<html>
<head><title>Daten</title></head>
<body>
    <h1>${data.message}</h1>
    <p>Timestamp: ${data.timestamp}</p>
    <p>Server: ${data.server}</p>
</body>
</html>
	`.trim();
}

export function renderDataAsPlainText(data: ServerData): string {
    return `Message: ${data.message}\nTimestamp: ${data.timestamp}\nServer: ${data.server}`;
}
