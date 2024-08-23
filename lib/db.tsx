"use server";

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from '@/lib/schema';

export const db = async () => {
    const sql = neon(process.env.DB_URL!);
    return drizzle(sql, { schema });
};
