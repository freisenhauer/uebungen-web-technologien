import type { Request, Response } from "express";
import { AVAILABLE_ROUTES, PORT } from "./constants.js";
import {
    renderDataAsHTML,
    renderDataAsPlainText,
    renderHomePage,
} from "./templates.js";
import type { GreetRequestBody, ServerData } from "./types.js";

export function handleHomePage(_req: Request, res: Response): void {
    const html = renderHomePage(PORT);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.send(html);
}

export function handleEcho(req: Request, res: Response): void {
    const requestInfo = {
        method: req.method,
        url: req.url,
        httpVersion: req.httpVersion,
        headers: req.headers,
        query: req.query,
        timestamp: new Date().toISOString(),
    };
    res.json(requestInfo);
}

export function handleData(req: Request, res: Response): void {
    const accept = req.get("Accept") || "*/*";

    const data: ServerData = {
        message: "Dies sind Beispieldaten",
        timestamp: new Date().toISOString(),
        server: "HTTP von Hand Server",
    };

    if (accept.includes("application/json") || accept.includes("*/*")) {
        res.setHeader("Content-Type", "application/json");
        res.json(data);
    } else if (accept.includes("text/html")) {
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.send(renderDataAsHTML(data));
    } else if (accept.includes("text/plain")) {
        res.setHeader("Content-Type", "text/plain");
        res.send(renderDataAsPlainText(data));
    } else {
        res.status(406).json({
            error: "Not Acceptable",
            supportedTypes: ["application/json", "text/html", "text/plain"],
        });
    }
}

export function handleGreet(req: Request, res: Response): void {
    console.log("POST Body received:", req.body);

    const contentType = req.get("Content-Type");

    if (!contentType || !contentType.includes("application/json")) {
        res.status(400).json({
            error: "Bad Request",
            message: 'Content-Type muss "application/json" sein',
        });
        return;
    }

    const { name, age } = req.body as GreetRequestBody;

    if (!name) {
        res.status(400).json({
            error: "Bad Request",
            message: 'Feld "name" ist erforderlich',
        });
        return;
    }

    const greeting = age
        ? `Hallo ${name}, du bist ${age} Jahre alt!`
        : `Hallo ${name}!`;

    res.json({
        greeting,
        receivedData: req.body,
        timestamp: new Date().toISOString(),
    });
}

export function handleNotFound(_req: Request, res: Response): void {
    res.status(404).json({
        error: "Not Found",
        message: "Die angeforderte Ressource existiert nicht",
        code: 404,
    });
}

export function handleRedirect(_req: Request, res: Response): void {
    res.redirect(301, "/");
}

export function handleTeapot(_req: Request, res: Response): void {
    res.status(418).json({
        error: "I'm a teapot",
        message:
            "Dieser Server ist eine Teekanne und kann keinen Kaffee kochen.",
        code: 418,
        rfc: "RFC 2324 - Hyper Text Coffee Pot Control Protocol",
    });
}

export function handle404(_req: Request, res: Response): void {
    res.status(404).json({
        error: "Not Found",
        message: "Diese Route existiert nicht",
        availableRoutes: AVAILABLE_ROUTES,
    });
}
