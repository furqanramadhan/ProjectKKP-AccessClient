import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env" });

export default defineConfig({
  schema: "./db/schema.ts", // Path to the schema file
  dialect: "postgresql", // Specifies PostgreSQL as the database dialect
  out: "./drizzle", // Output folder where generated files will be saved
  dbCredentials: {
    url: process.env.DATABASE_URL!, // Database URL from .env
  },
  verbose: true,
  strict: true,
});
