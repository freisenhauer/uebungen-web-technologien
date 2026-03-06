import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    host: "localhost",
    user: "foo",
    password: "foo",
    database: "foo",
    ssl: false,
  },
});