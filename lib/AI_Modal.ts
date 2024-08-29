const { GoogleGenerativeAI } = require("@google/generative-ai");
const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 2000,
    responseMimeType: "text/plain",
  };

  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY//process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  export const chatSession = model.startChat({
    generationConfig,
    history: [],
  });
