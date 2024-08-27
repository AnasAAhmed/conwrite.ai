import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'
import UserUsage from './UserUsage';
import DarkModeToggle from './Toggle';
import Link from 'next/link';

const Header = async () => {

  return (
    <div className='p-2 gap-2 shadow-sm border-b flex bg-accent justify-between items-center'>
      <Link href={'/'} className="cursor-pointer flex justify-start">
        <Image src={'/logo.svg'} alt='logo' className='dark:drop-shadow-[0_0_0.1rem_#ffffff70] dark:invert ' width={70} height={70} />
      </Link>
      <div className="flex justify-between gap-3">
        <DarkModeToggle />
        <h2 className="hidden sm:block bg-primary text-primary-foreground py-2 rounded-full text-xs px-2">
          ️‍🔥Join Membership in just for $9.99/Month
        </h2>
        <UserButton />
      </div>
    </div>
  )
}

export default Header
