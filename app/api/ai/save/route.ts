// app/api/ai/save/route.ts
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { AIOutput, UserData } from "@/lib/schema"; // adjust as needed
import { sql, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { userId } = auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const { aiResponse, formData, templateSlug, trimmedLength } = await req.json();

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

    revalidatePath('/dashboard/history');

    return new Response("Successfully created history", { status: 200 });
  } catch (error) {
    const err = error as Error;
    console.error("Error in saving AI content:", err);
    return new Response(`Failed to save AI content: ${err.message}`, { status: 500 });
  }
}
