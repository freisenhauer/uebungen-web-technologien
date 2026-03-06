import { Router } from "express";
import {
    createStudiengang,
    getStudiengang,
    listStudiengaenge,
} from "../services/studiengaenge.js";

export const studiengaengeRouter = new Router();

studiengaengeRouter.get("/", async (req, res) => {
    const studiengaenge = await listStudiengaenge();
    res.status(200).json(studiengaenge);
});

studiengaengeRouter.get("/:id", async (req, res) => {
    const studiengangId = Number.parseInt(req.params.id, 10);

    if (Number.isNaN(studiengangId)) {
        return res.status(400).json({ message: "id must be a number" });
    }

    const studiengang = await getStudiengang(studiengangId);
    if (!studiengang) {
        return res.status(404).json({ message: "studiengang not found" });
    }

    res.status(200).json(studiengang);
});

studiengaengeRouter.post("/", async (req, res) => {
    const { studiengangsBezeichnung } = req.body ?? {};
    if (
        typeof studiengangsBezeichnung !== "string" ||
        studiengangsBezeichnung.trim().length === 0
    ) {
        return res
            .status(400)
            .json({ message: "studiengangsBezeichnung is required" });
    }

    const studiengang = await createStudiengang(studiengangsBezeichnung.trim());
    res.status(201).json(studiengang);
});

studiengaengeRouter.put("/:id", (req, res) => {
    res.status(501).json({ message: "not implemented" });
});

studiengaengeRouter.delete("/:id", (req, res) => {
    res.status(501).json({ message: "not implemented" });
});
