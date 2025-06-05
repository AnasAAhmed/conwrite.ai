// /app/api/delete-history/route.ts
import { deleteHistory } from '@/lib/actions';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { userId } =await auth();
        if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { historyId } = await req.json();

        if (!historyId || typeof historyId !== 'number') {
            return NextResponse.json({ error: 'Invalid history ID' }, { status: 400 });
        }

        const result = await deleteHistory(historyId, userId);
        return NextResponse.json({ message: result });
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
export const dynamic = 'force-dynamic'