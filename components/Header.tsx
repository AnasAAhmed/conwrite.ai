import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'
import DarkModeToggle from './Toggle';
import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { UserData } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import UserUsage from '@/components/UserUsage';

const Header = async () => {
  const { userId: currentUSer } = auth();
  if (!currentUSer) return 'Unauthorized';

  const database = await db();
  const result = await database.select({
    usage: UserData.usage,
    credits: UserData.credits,
  }).from(UserData).where(eq(UserData.userId, currentUSer))
  return (
    <div className='p-2 gap-2 shadow-sm border-b flex bg-accent justify-between items-center'>
      <Link href={'/'} className="md:hidden cursor-pointer flex justify-start">
        <Image src={'/logo.svg'} alt='logo' className='dark:drop-shadow-[0_0_0.1rem_#ffffff70] dark:invert ' width={70} height={70} />
      </Link>
      {result.length > 0 && <UserUsage usage={result[0].usage!} credits={result[0].credits!} />}
      <div className="hidden md:flex justify-between items-center gap-3">
        <DarkModeToggle />
        <h2 className="bg-primary text-primary-foreground py-2 rounded-full text-xs px-2">
          ️‍🔥Join Membership in just for $9.99/Month
        </h2>
        <UserButton signInUrl='/'/>
      </div>
    </div>
  )
}

export default Header
