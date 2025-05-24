import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const buildContextMarkdown = (formData: any, aiPrompt: string) => {
  let context = `### Prompt: ${aiPrompt}\n\n`;
  for (const key in formData) {
    context += `**${capitalize(key)}:** ${formData[key]}\n`;
  }
  return context;
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
