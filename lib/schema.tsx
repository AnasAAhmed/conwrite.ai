import { pgTable, serial, varchar, timestamp, integer } from "drizzle-orm/pg-core";

export const AIOutput = pgTable('ai_output', {
    id: serial('id').primaryKey(),
    formData: varchar('formData').notNull(),
    aiResponse: varchar('ai_response', { length: 8192 }),
    templateSlug: varchar('template_slug', { length: 100 }).notNull(),
    createdBy: varchar('created_by', { length: 100 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
});

export const UserData = pgTable('user_data', {
    id: serial('id').primaryKey(),
    userId: varchar('userId').notNull(),
    email: varchar('email').notNull(),
    usage: integer('usage').default(0),
    credits: integer('credits').default(6000),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
});

export const BillingHistory = pgTable('billing_history', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(), 
  amount: integer('amount').notNull().default(0), 
  credits: integer('credits').notNull().default(6000),
  currency: varchar('currency', { length: 10 }).default('usd'), 
  paymentMethod: varchar('payment_method', { length: 50 }).default('cars'), 
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});
