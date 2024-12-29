import { text, pgTable } from "drizzle-orm/pg-core";

export const TextExample = pgTable("test_table", {
  id: text("id").primaryKey().notNull(),
  plaidId: text("plaid_id"),
  name: text("name").notNull(),
  userId: text("user_id").notNull(),
});
