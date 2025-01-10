import { text, pgTable, integer, json, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

import { sql } from "drizzle-orm";

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey().notNull(),
  plaidId: text("plaid_id"),
  name: text("name").notNull(),
  userId: text("user_id").notNull(),
});

export const organizations = pgTable("organizations", {
  id: text("id").primaryKey(), // Primary key, Clerk Organization ID
  name: text("name").notNull(), // Nama organisasi
  slug: text("slug").notNull().unique(), // Slug unik
  imageUrl: text("image_url"), // URL gambar organisasi (nullable)
  membersCount: integer("members_count").notNull().default(0), // Jumlah anggota, default 0
  maxAllowedMemberships: integer("max_allowed_memberships")
    .notNull()
    .default(5), // Batas anggota maksimal, default 5
  publicMetadata: json("public_metadata").default(sql`'{}'::json`), // Metadata publik
  privateMetadata: json("private_metadata").default(sql`'{}'::json`), // Metadata privat
  createdAt: timestamp("created_at").notNull().defaultNow(), // Timestamp pembuatan
  updatedAt: timestamp("updated_at").notNull().defaultNow(), // Timestamp pembaruan
});

export const insertAccountSchema = createInsertSchema(accounts);
export const insertOrganizationSchema = createInsertSchema(organizations);
