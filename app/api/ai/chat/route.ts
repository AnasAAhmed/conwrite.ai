import { NextRequest, NextResponse } from 'next/server';
import { tavily, TavilySearchResponse } from '@tavily/core';
import { model } from '@/lib/AI_Modal';

export async function POST(req: NextRequest) {
  let aiPrompt: string;
  let chatHistory: { prompt: string; response: string }[];
  let maxTokens: number;
  let webSearch: boolean;

  try {
    const body = await req.json();
    aiPrompt = body.aiPrompt;
    chatHistory = body.chatHistory || [];
    maxTokens = body.maxTokens;
    webSearch = body.webSearch;

    if (!aiPrompt || maxTokens < 1) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }
  } catch (err) {
    console.error('[Request Parse Error]', err);
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        let searchRes: TavilySearchResponse | null = null;
        if (webSearch) {
          try {
            const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY! });
            searchRes = await tvly.search(aiPrompt, { maxResults: 3 });
          } catch (err) {
            console.error('[Tavily Error]', err);
            controller.enqueue(encoder.encode('\n[Search unavailable]\n'));
          }
        }

        const history = chatHistory.flatMap((msg, idx) => [
          { role: 'user', parts: [{ text: msg.prompt }] },
          { role: 'model', parts: [{ text: msg.response }] },
        ]);
        
        const chat = model.startChat({
          generationConfig: {
            temperature: 1,
            topP: 0.95,
            topK: 64,
            maxOutputTokens: maxTokens,
            responseMimeType: 'text/plain',
          },
          history,
        });

        const result = await chat.sendMessageStream(
          `user:${aiPrompt} ${
            searchRes ? ' search results:' + JSON.stringify(searchRes) : ''
          }` +
            (!webSearch
              ? ' medium answer'
              : ' Summarize these search results and include links in markdown format')
        );

        for await (const chunk of result.stream) {
          const text = await chunk.text();
          controller.enqueue(encoder.encode(text));
        }
      } catch (err) {
        console.error('[Stream Error]', err);
        controller.enqueue(
          encoder.encode('\n[Error generating response, please retry]\n')
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'no-cache',
    },
  });
}

export const dynamic = 'force-dynamic';
