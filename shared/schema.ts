import { pgTable, text, serial, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const passwords = pgTable("passwords", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  password: text("password").notNull(),
  encryptedPassword: text("encrypted_password").notNull(),
  maxViews: integer("max_views").notNull(),
  remainingViews: integer("remaining_views").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  accessKey: text("access_key"),
  shareId: text("share_id").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const insertPasswordSchema = createInsertSchema(passwords)
  .pick({
    title: true,
    password: true,
    maxViews: true,
    accessKey: true,
  })
  .extend({
    expiryHours: z.number().min(1).max(168)
  });

export type InsertPassword = z.infer<typeof insertPasswordSchema>;
export type Password = typeof passwords.$inferSelect;
