import {db} from "../db/client.js";
import { eq } from "drizzle-orm";
import { studiengaenge } from "../db/schema.js";

export async function listStudiengaenge() {
    return await db.query.studiengaenge.findMany();
}

export async function getStudiengang(id) {
    return await db.query.studiengaenge.findFirst({
        where: eq(studiengaenge.studiengangsID, id),
    });
}

export async function createStudiengang(studiengangsBezeichnung) {
    const [createdStudiengang] = await db
        .insert(studiengaenge)
        .values({ studiengangsBezeichnung })
        .returning();

    return createdStudiengang;
}
