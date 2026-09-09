import { sql } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }), email: text("email").notNull().unique(),
  name: text("name").notNull(), role: text("role", { enum: ["admin", "operator", "provider"] }).notNull(),
  active: integer("active", { mode: "boolean" }).notNull().default(true), createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
export const providers = sqliteTable("providers", {
  id: integer("id").primaryKey({ autoIncrement: true }), userId: integer("user_id").references(() => users.id),
  businessName: text("business_name").notNull(), phone: text("phone").notNull(), vehicleType: text("vehicle_type").notNull(),
  status: text("status", { enum: ["offline", "available", "busy"] }).notNull().default("offline"),
  latitude: real("latitude"), longitude: real("longitude"), updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
export const services = sqliteTable("services", {
  id: integer("id").primaryKey({ autoIncrement: true }), code: text("code").notNull().unique(), type: text("type").notNull(),
  company: text("company").notNull(), origin: text("origin").notNull(), destination: text("destination").notNull().default("—"),
  distance: real("distance").notNull().default(0), price: integer("price").notNull(),
  status: text("status", { enum: ["Disponible", "Asignado", "En camino", "Finalizado"] }).notNull().default("Disponible"),
  providerName: text("provider_name"), eta: integer("eta"), createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
