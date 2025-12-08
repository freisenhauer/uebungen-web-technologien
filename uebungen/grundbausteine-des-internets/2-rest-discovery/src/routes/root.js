import express from "express";
import { getNextInstructions } from "../instructions.js";
import { progress } from "../progress.js";

const router = express.Router();

// Root Route
router.get("/", (req, res) => {
    progress.visitedRoot = true;

    res.json({
        message: "Willkommen zur REST Discovery API!",
        description:
            "Diese API führt dich durch die Grundkonzepte von REST. Folge den Anweisungen in den Responses.",
        resources: {
            books: "/books",
            authors: "/authors",
        },
        _instructions: getNextInstructions(),
    });
});

export default router;
