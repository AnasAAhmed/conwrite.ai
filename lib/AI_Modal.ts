// 'use server'
import { GoogleGenerativeAI } from '@google/generative-ai';
// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 64,
//   maxOutputTokens: 2000,
//   responseMimeType: "text/plain",
// };

const apiKey = process.env.GEMINI_API_KEY!;//process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
export const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});
