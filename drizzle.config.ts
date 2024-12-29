import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema.ts", // Path to your schema
  dialect: "postgresql", // Database dialect (PostgreSQL)
  out: "./drizzle", // Output directory for generated files
  dbCredentials: {
    url: process.env.DATABASE_URL!, // Directly use process.env to get the DATABASE_URL
  },
});
