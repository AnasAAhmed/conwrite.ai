// app/api/ai/save/route.ts
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { AIOutput, BillingHistory, UserData } from "@/lib/schema"; // adjust as needed
import { sql, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { creditsNo, email, amount, paymentMethod, currency } = body;

    if (![13000, 50000, 150000].includes(creditsNo)) {
        return NextResponse.json("Invalid credit amount", { status: 409 });
    }
    const { userId } = await auth();

    if (!userId || !email) {
        return NextResponse.json("Unauthorized email or user id is missing", { status: 401 });
    }
    if (!amount) {
        return NextResponse.json("Amount is missing", { status: 400 });
    }
    try {
        const database = await db();
        const user = await database.query.UserData.findFirst({
            where: eq(UserData.userId, userId),
        });

        if (!user) { return NextResponse.json("User not found", { status: 401 }) };

        // calculate remaining credits
        const remaining = (user.credits || 0) - (user.usage || 0);
        const newCredits = remaining + creditsNo;

        await database
            .update(UserData)
            .set({
                credits: newCredits,
                usage: 0
            })
            .where(eq(UserData.userId, userId));

        await database.insert(BillingHistory).values({
            userId,
            email,
            credits: creditsNo,
            amount,
            createdAt: new Date(),
        });
        revalidatePath('/dashboard');
        return NextResponse.json('Payment Successful', { status: 200 });

    } catch (error) {
        const typeError = error as Error;
        console.error("Error in checkout:", typeError);
        return NextResponse.json(typeError.message, { status: 500 });
    }
}
export const dynamic = 'force-dynamic'
