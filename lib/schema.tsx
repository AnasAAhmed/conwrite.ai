import { pgTable, serial, varchar, jsonb, timestamp } from "drizzle-orm/pg-core";

export const AIOutput = pgTable('ai_output', {
    id: serial('id').primaryKey(),
    formData: varchar('formData').notNull(), 
    aiResponse: varchar('ai_response', { length: 8192 }), // Adjust length based on expected size
    templateSlug: varchar('template_slug', { length: 100 }).notNull(),
    createdBy: varchar('created_by', { length: 100 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull(), // Use timestamp type for date storage
});
