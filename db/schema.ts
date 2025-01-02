import {
  text,
  pgTable,
  integer,
  point,
  boolean,
  serial,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey().notNull(),
  plaidId: text("plaid_id"),
  name: text("name").notNull(),
  userId: text("user_id").notNull(),
});

export const companies = pgTable("company", {
  companyId: serial("id").primaryKey().notNull(),
  companyName: text("name").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  region: text("region").notNull(),
  postalCode: integer("postal_code").notNull(),
  country: text("country").notNull(),
  geoLocation: point("geo_location"),
  isActive: boolean("is_active").notNull(),
  isExternalCompany: boolean("is_external").notNull(),
  contactPersonName: text("contact_person_name").notNull(),
  phoneCompany: text("phone").notNull(),
});

export const userCompany = pgTable("user_company", {
  userId: text("id").primaryKey().notNull(),
});

export const insertAccountSchema = createInsertSchema(accounts);
