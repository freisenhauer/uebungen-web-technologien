import type { NextFunction, Request, Response } from "express";

export function requestLoggingMiddleware(
    req: Request,
    _res: Response,
    next: NextFunction,
): void {
    console.log("\n========== Incoming Request ==========");
    console.log(`${req.method} ${req.url} HTTP/${req.httpVersion}`);
    console.log("Headers:");
    for (const [key, value] of Object.entries(req.headers)) {
        console.log(`  ${key}: ${value}`);
    }
    if (
        req.method === "POST" ||
        req.method === "PUT" ||
        req.method === "PATCH"
    ) {
        console.log("(Body will be parsed by route handler)");
    }
    console.log("======================================\n");
    next();
}
