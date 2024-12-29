import { neon } from "@neondatabase/serverless";

const testConnection = async () => {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    await sql`SELECT 1`;
    console.log("Database connection successful!");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

testConnection();
