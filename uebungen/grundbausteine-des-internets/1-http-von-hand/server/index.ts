import express from "express";
import { AVAILABLE_ROUTES, PORT } from "./constants.js";
import {
    handle404,
    handleCrash,
    handleData,
    handleEcho,
    handleGreet,
    handleHomePage,
    handleRedirect,
    handleTeapot,
} from "./handlers.js";
import { requestLoggingMiddleware } from "./middleware.js";

// ========== Server Setup ==========

const app = express();

// Middleware
app.use(express.json());
app.use(express.text());
app.use(requestLoggingMiddleware);

// Routes
app.get("/", handleHomePage);
app.get("/api/echo", handleEcho);
app.get("/api/data", handleData);
app.post("/api/greet", handleGreet);
app.get("/redirect", handleRedirect);
app.get("/teapot", handleTeapot);
app.get("/crash", handleCrash);

// 404 Handler für alle anderen Routen
app.use(handle404);

// ========== Server Start ==========

function printStartupMessage(port: number): void {
    const separator = "=".repeat(50);
    console.log(`\n${separator}`);
    console.log("  HTTP von Hand - Server gestartet");
    console.log(separator);
    console.log(`\n  URL: http://localhost:${port}`);
    console.log("\n  Verfügbare Endpunkte:");
    for (const route of AVAILABLE_ROUTES) {
        console.log(`    ${route}`);
    }
    console.log("\n  Nutze curl für HTTP-Requests:");
    console.log(`    curl -v http://localhost:${port}/`);
    console.log(`\n${separator}\n`);
}

app.listen(PORT, () => {
    printStartupMessage(PORT);
});
