'use server';

import { db } from './db';
import { auth } from '@clerk/nextjs/server';
import { AIOutput, UserData } from './schema';
import { revalidatePath } from 'next/cache';
import { and, eq, sql } from 'drizzle-orm';

//get
export async function generateAIContent({
  aiResponse,
  formData,
  templateSlug,
  trimmedLength
}: {
  aiResponse: string;
  formData: any;
  templateSlug: string;
  trimmedLength: number;
}) {
  const { userId } = auth();
  try {

    if (userId) {
      const database = await db();
      await database.insert(AIOutput).values({
        formData: JSON.stringify(formData),
        aiResponse,
        templateSlug,
        createdBy: userId,
        createdAt: new Date(),
      });
      await database
        .update(UserData)
        .set({
          usage: sql`${UserData.usage} + ${trimmedLength}`,
        })
        .where(eq(UserData.userId, userId));
    }

    revalidatePath('/dashboard/history');
    return 'Succesfully created history';
  } catch (error) {
    const tyeError = error as Error
    console.error("Error in creating AI content:", tyeError);
    return (`Failed to create AI content: ${tyeError.message}`);
  }
}
//get
export async function generateAIChat({ aiPrompt, maxTokens }: { aiPrompt: string, maxTokens: number }) {

  if (maxTokens < 1) return "Not enough Credits/Words left";
  if (!aiPrompt) return "Please add a prompt";
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: maxTokens,
    responseMimeType: "text/plain",
  };

  const {
    GoogleGenerativeAI,
  } = require("@google/generative-ai");

  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(aiPrompt +'short answer');

  return result.response.text();

};

//post 
export async function createUser({ userId, email }: { userId: string; email: string }) {
  if (userId) {
    try {
      const database = await db();
      const existingUser = await database
        .select()
        .from(UserData)
        .where(eq(UserData.userId, userId));

      if (existingUser.length === 0) {
        await database.insert(UserData).values({
          userId,
          email,
          createdAt: new Date(),
        });
        revalidatePath('/dashboard');
        return 'User created  ';
      }

      return 'User already exists';
    } catch (error) {
      const tyeError = error as Error;
      console.error("Error in createUser:", tyeError);
      return tyeError.message;
    }
  }
}

//delete
export async function deleteHistory(historyId: number) {
  const { userId } = auth();
  if (!userId) throw new Error('Unauthorized');
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
export async function checkout(credits: number) {
  const { userId } = auth(); // Assuming auth() provides the userId
  if (!userId) {
    return 'Unauthorized';
  }

  try {
    const database = await db(); // Ensure your db() function returns the database connection

    await database
      .update(UserData)
      .set({
        credits, // Set new credits value directly
        usage: 0 // Set usage to 0
      })
      .where(eq(UserData.userId, userId)); // Use the 'eq' function to match userId

    revalidatePath('/dashboard'); // Ensure this path is correctly awaited or used

    return 'Payment Successful';
  } catch (error) {
    const typeError = error as Error;
    console.error("Error in checkout:", typeError);
    return typeError.message;
  }
}