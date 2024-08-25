'use server';

import { db } from './db';
import { auth } from '@clerk/nextjs/server';
import { AIOutput } from './schema';
import { revalidatePath } from 'next/cache';

export async function generateAIContent({ finalAIPrompt, formData, templateSlug, maxTokens }: { finalAIPrompt: string, formData: any, templateSlug: string, maxTokens: number }) {
  const { userId } = auth();
  if (maxTokens <= 0) return "Not enough Credits";
  if (!finalAIPrompt) return "Please add a prompt";
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

  const result = await chatSession.sendMessage(finalAIPrompt);

  if (userId) {
    const database = await db();
    await database.insert(AIOutput).values({
      formData: JSON.stringify(formData),
      aiResponse: result.response.text(),
      templateSlug,
      createdBy: userId,
      createdAt: new Date(),
    });
  }
  revalidatePath('/dashboard/history')
  return result.response.text();

}

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

  const result = await chatSession.sendMessage(aiPrompt+'not long answer');

  return result.response.text();

}
