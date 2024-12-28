import { text, pgTable } from "drizzle-orm/pg-core";

export const TextExample = pgTable("test_table", {
  id: text("id").primaryKey().notNull(),
  name: text("name").notNull(),
  userId: text("user_id").notNull(),
});
