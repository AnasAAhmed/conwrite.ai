import { db } from '@/lib/db';
import { AIOutput } from '@/lib/schema';
import { UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import Image from 'next/image'
import React from 'react'
import UserUsage from './UserUsage';
import DarkModeToggle from './Toggle';

const Header = async () => {
  const { userId } = auth();
  if (!userId) return 'Unauthorized';

  const database = await db();
  const result = await database.select({
    aiResponse: AIOutput.aiResponse, // or any other field you need
  })
    .from(AIOutput)
    .where(eq(AIOutput.createdBy, userId));

  let total: number = 0;
  result.forEach(i => {
    total = total+Number(i.aiResponse?.length)
  })

  return (
    <div className='p-2 gap-2 shadow-sm border-b flex bg-accent justify-between items-center'>
      <div className="sm:hidden flex justify-start">
        <Image src={'/logo.svg'} alt='logo' className='dark:drop-shadow-[0_0_0.1rem_#ffffff70] dark:invert' width={120} height={100} />
      </div>
      <UserUsage result={total} max={20000}/>
      <div className="flex justify-between gap-3">
        <DarkModeToggle/>
        <h2 className="hidden sm:block bg-primary text-primary-foreground py-2 rounded-full text-xs px-2">
          ️‍🔥Join Membership in just for $9.99/Month
        </h2>
        <UserButton />
      </div>
    </div>
  )
}

export default Header
