// app/api/gemini-chat/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { aiPrompt, chatHistory, maxTokens } = body;

    if (!aiPrompt || maxTokens < 1) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const { GoogleGenerativeAI } = require('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // Convert your client history to Gemini format
    const history = chatHistory.map((msg: { prompt: string; response: string }) => ({
      role: 'user',
      parts: [{ text: msg.prompt }],
    })).flatMap((entry:any, idx:number) => [
      entry,
      {
        role: 'model',
        parts: [{ text: chatHistory[idx].response }],
      }
    ]);

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: maxTokens,
      responseMimeType: 'text/plain',
    };

    const chat = model.startChat({ generationConfig, history });

    const result = await chat.sendMessage(aiPrompt + ' medium answer');
    const responseText = result.response.text();

    return NextResponse.json({ response: responseText });
  } catch (error) {
    console.error('[Gemini Chat Error]', error);
    return NextResponse.json({ error: 'Internal server error '+(error as Error).message }, { status: 500 });
  }
}
