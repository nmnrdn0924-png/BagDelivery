import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const deliveryRequests = pgTable("delivery_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  currentAddress: text("current_address").notNull(),
  deliveryAddress: text("delivery_address").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertDeliveryRequestSchema = createInsertSchema(deliveryRequests).omit({
  id: true,
  createdAt: true,
});

export type InsertDeliveryRequest = z.infer<typeof insertDeliveryRequestSchema>;
export type DeliveryRequest = typeof deliveryRequests.$inferSelect;

export const advertiserRequests = pgTable("advertiser_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  companyName: text("company_name").notNull(),
  representative: text("representative").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAdvertiserRequestSchema = createInsertSchema(advertiserRequests).omit({
  id: true,
  createdAt: true,
});

export type InsertAdvertiserRequest = z.infer<typeof insertAdvertiserRequestSchema>;
export type AdvertiserRequest = typeof advertiserRequests.$inferSelect;
