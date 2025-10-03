import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const initialChat = [
  {
    "prompt": "which team is at 7th position in pubg mobile world cup",
    "response": "Okay, here's a summary of the search results, focused on identifying the 7th place team in the PUBG Mobile World Cup:\n\n*   The search results indicate that a Pakistani team called **4Thrives** finished in 7th place at the PUBG Mobile World Cup.\n*   There are also references to the **PUBG Mobile World Cup 2025**, which is part of the Esports World Cup 2025. This event will feature 24 teams and a $3,000,000 prize pool.\n\nHere are the links from the search results:\n\n*   [PUBG Mobile World Cup 2025 (Liquipedia)](https://liquipedia.net/pubgmobile/PUBG_Mobile_World_Cup/2025)\n*   [Pakistani team finishes 7th in PUBG Mobile World Cup (Facebook)](https://www.facebook.com/groups/asportsofficial/posts/2952260761624814/)\n*   [PUBG Mobile World Cup 2025 (Wikipedia)](https://en.wikipedia.org/wiki/PUBG_Mobile_World_Cup_2025)"
  }]

export const buildContextMarkdown = (formData: any, aiPrompt: string) => {
  let context = `### Prompt: ${aiPrompt}\n\n`;
  for (const key in formData) {
    context += `**${capitalize(key)}:** ${formData[key]}\n`;
  }
  return context;
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
