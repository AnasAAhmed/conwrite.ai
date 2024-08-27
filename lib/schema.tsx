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
    credits: integer('credits').default(20000),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
});
