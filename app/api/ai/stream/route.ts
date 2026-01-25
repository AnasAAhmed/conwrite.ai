import { NextRequest, NextResponse } from 'next/server';
import { model } from '@/lib/AI_Modal';
import { tavily, TavilySearchResponse } from '@tavily/core';
export async function POST(req: NextRequest) {
  let prompt: string;
  let webSearch: boolean;

  try {
    const body = await req.json();
    prompt = body.prompt;
    webSearch = body.webSearch;

    if (!prompt) {
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
        // if (webSearch) {
        //   try {
        //     const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY! });
        //     searchRes = await tvly.search(prompt, { maxResults: 3 });
        //   } catch (err) {
        //     console.error('[Tavily Error]', err);
        //     controller.enqueue(encoder.encode('\n[Search unavailable]\n'));
        //   }
        // }

        const result = await model.generateContentStream({
          contents: [{
            role: "user", parts: [{
              text: `${prompt} ${searchRes ? ' search results:' + JSON.stringify(searchRes) : ''
                }` +
                (!webSearch
                  ? ' medium answer'
                  : ' Summarize these search results and include links')
            }]
          }],
          tools: webSearch ? [{ googleSearch: {} }] as any : [],
        })

        for await (const chunk of result.stream) {
          const text = await chunk.text();

          controller.enqueue(encoder.encode(text));
        }
      } catch (err) {
        console.error('[Stream Error]', err);
        controller.enqueue(
          encoder.encode('\n[Error generating response, please retry]\n'+(err as Error)?.message)
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
export const dynamic = 'force-dynamic'
