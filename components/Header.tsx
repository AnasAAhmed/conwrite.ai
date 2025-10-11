import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'
import DarkModeToggle from './Toggle';
import SmartLink from '@/components/SmartLink';
import UserUsage from '@/components/UserUsage';
import { auth } from '@clerk/nextjs/server';
import { getUserCredits } from '@/lib/actions';

const Header = async () => {
  const { userId } = await auth();
  if (!userId) return null;
  const result = await getUserCredits(userId);
  return (
    <div className='p-2 gap-2 border-primary/20 shadow-sm border-b flex bg-accent justify-between items-center'>
      <SmartLink href={'/'} className="md:hdidden cursor-pointer flex justify-start">
        <Image src={'/logo-icon.png'} title='Conwrite.ai logo' alt='Conwrite.ai logo' width={50} height={50} />
        <h1 className="hidden bg-clip-text bg-gradient-to-tr from-blue-400 to-violet-700  text-transparent sm:flex py-2 items-center rounded-full font-semibold text-xl md:text-2xl px-2">
          Conwrite.ai
        </h1>
      </SmartLink>
      <SmartLink href={'/pricing'}>
        <h2 className="hidden md:flex bg-primary text-primary-foreground py-2 rounded-full text-xs px-2">
          ️‍🔥Join Membership in just for $9.99/Month
        </h2>
      </SmartLink>
      <div className="flex justify-between items-center gap-3">
        <div className="hidden md:flex justify-between items-center gap-3">
          <DarkModeToggle />
          <UserButton signInUrl='/' />
        </div>
        {result.length > 0 && <UserUsage usage={result[0].usage!} credits={result[0].credits!} />}
      </div>
    </div>
  )
}

export default Header
