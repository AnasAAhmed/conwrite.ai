// app/api/ai/save/route.ts
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { AIOutput, UserData } from "@/lib/schema"; // adjust as needed
import { sql, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { creditsNo } = body;

    if (![13000, 50000, 150000].includes(creditsNo)) {
        return new Response("Invalid credit amount", { status: 409 });
    }
    const { userId } = auth();

    if (!userId) {
        return new Response("Unauthorized", { status: 401 });
    }
    try {
        const database = await db();

        await database
            .update(UserData)
            .set({
                credits: creditsNo,
                usage: 0
            })
            .where(eq(UserData.userId, userId));

        revalidatePath('/dashboard');
        return new Response('Payment Successful', { status: 200 });

    } catch (error) {
        const typeError = error as Error;
        console.error("Error in checkout:", typeError);
        return new Response(typeError.message, { status: 500 });
    }
}
