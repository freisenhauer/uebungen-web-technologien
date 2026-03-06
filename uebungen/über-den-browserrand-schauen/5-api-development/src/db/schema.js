import { relations } from "drizzle-orm";
import { integer, pgTable, text } from "drizzle-orm/pg-core";

export const studiengaenge = pgTable("studiengaenge", {
    studiengangsID: integer("studiengangs_id").primaryKey().generatedAlwaysAsIdentity(),
    studiengangsBezeichnung: text("studiengangs_bezeichnung").notNull(),
});

export const studierende = pgTable("studierende", {
    matrikelnummer: integer("matrikelnummer").primaryKey().generatedAlwaysAsIdentity(),
    name: text("name").notNull(),
    studiengang: integer("studiengang")
        .notNull()
        .references(() => studiengaenge.studiengangsID),
});

export const studierendeRelations = relations(studierende, ({ one }) => ({
    studiengangDetails: one(studiengaenge, {
        fields: [studierende.studiengang],
        references: [studiengaenge.studiengangsID],
    }),
}));

export const studiengaengeRelations = relations(studiengaenge, ({ many }) => ({
    studierende: many(studierende),
}));
