import type { NextFunction, Request, Response } from "express";

export function requestLoggingMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
): void {
    // Log Request
    console.log("\n========== Incoming Request ==========");
    console.log(`${req.method} ${req.url} HTTP/${req.httpVersion}`);
    console.log("Headers:");
    for (const [key, value] of Object.entries(req.headers)) {
        console.log(`  ${key}: ${value}`);
    }

    // Log request body if present
    if (req.body && Object.keys(req.body).length > 0) {
        console.log("\nBody:");
        const bodyString =
            typeof req.body === "string"
                ? req.body
                : JSON.stringify(req.body, null, 2);
        const lines = bodyString.split("\n");
        const maxLines = 5;
        if (lines.length > maxLines) {
            console.log(lines.slice(0, maxLines).join("\n"));
            console.log(`... (${lines.length - maxLines} weitere Zeilen)`);
        } else {
            console.log(bodyString);
        }
    }

    console.log("======================================\n");

    // Capture response body
    const originalSend = res.send;
    const originalJson = res.json;
    let responseBody = "";

    // Override res.send to capture body
    res.send = function (body): Response {
        responseBody = typeof body === "string" ? body : JSON.stringify(body);
        return originalSend.call(this, body);
    };

    // Override res.json to capture body
    res.json = function (body): Response {
        responseBody = JSON.stringify(body, null, 2);
        return originalJson.call(this, body);
    };

    // Log Response when finished
    res.on("finish", () => {
        console.log("========== Outgoing Response =========");
        console.log(
            `HTTP/${req.httpVersion} ${res.statusCode} ${res.statusMessage}`,
        );
        console.log("Headers:");
        const headers = res.getHeaders();
        for (const [key, value] of Object.entries(headers)) {
            console.log(`  ${key}: ${value}`);
        }

        // Log body (trimmed to ~5 lines)
        if (responseBody) {
            console.log("\nBody:");
            const lines = responseBody.split("\n");
            const maxLines = 5;
            if (lines.length > maxLines) {
                console.log(lines.slice(0, maxLines).join("\n"));
                console.log(`... (${lines.length - maxLines} weitere Zeilen)`);
            } else {
                console.log(responseBody);
            }
        }

        console.log("======================================\n");
    });

    next();
}
