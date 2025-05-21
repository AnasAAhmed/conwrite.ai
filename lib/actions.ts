'use server';

import { db } from './db';
import { auth } from '@clerk/nextjs/server';
import { AIOutput } from './schema';
import { and, eq } from 'drizzle-orm';



//delete
export async function deleteHistory(historyId: number, userId: string) {
  if (!userId) throw new Error('UserId is missing');
  try {
    const database = await db();
    await database
      .delete(AIOutput)
      .where(
        and(
          eq(AIOutput.createdBy, userId),
          eq(AIOutput.id, historyId)
        )
      );

    return 'Deleted Successfully';
  } catch (error) {
    const tyeError = error as Error
    console.error("Error in deleteHistory:", tyeError);
    return tyeError.message;
  }
}
