import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { UserData } from '@/lib/schema'; // adjust path as needed
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, email } = body;

    if (!userId || !email) {
      return NextResponse.json({ error: 'Missing userId or email' }, { status: 400 });
    }

    const database = await db();
    const existingUser = await database
      .select()
      .from(UserData)
      .where(eq(UserData.userId, userId));

    if (existingUser.length === 0) {
      await database.insert(UserData).values({
        userId,
        email,
        createdAt: new Date(),
      });
      revalidatePath('/dashboard');
      return NextResponse.json({ message: 'User created' }, { status: 201 });
    }

    return NextResponse.json({ message: 'User already exists' }, { status: 200 });
  } catch (error) {
    const err = error as Error;
    console.error('Error in createUser API:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
