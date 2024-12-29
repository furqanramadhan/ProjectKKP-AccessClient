import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

// Check for environment variable
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing");
}

// Create connection
const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql);
