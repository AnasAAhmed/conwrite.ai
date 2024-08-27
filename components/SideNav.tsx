import { SignOutButton } from '@clerk/nextjs';
import { History, Home, LogOut, User, WalletCards } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { UserData } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import UserUsage from './UserUsage';

const SideNav = async () => {

  const { userId: currentUSer } = auth();
  if (!currentUSer) return 'Unauthorized';

  const database = await db();
  const result = await database.select({
    usage: UserData.usage,
    credits: UserData.credits,
  }).from(UserData).where(eq(UserData.userId, currentUSer))

  const menuListt = [
    {
      name: "Home",
      icon: Home,
      path: '/dashboard'
    },
    {
      name: "History",
      icon: History,
      path: '/dashboard/history'
    },
    {
      name: "Billing",
      icon: WalletCards,
      path: '/dashboard/billing'
    },
    {
      name: "Profile",
      icon: User,
      path: '/dashboard/profile'
    },
  ];
  return (
    <div className='h-screen bg-primary-foreground p-5 shadow-sm border '>
      <Link href={'/'} className="flex justify-start">
        <Image src={'/logo.svg'} className='dark:drop-shadow-[0_0_0.1rem_#ffffff70] dark:invert' alt='logo' width={130} height={88} />
      </Link>
      <hr className='my-4 border w-[90%]' />
      <div className="mt-8">
        {menuListt.map((menu, index) => (
          <Link
            href={menu.path}
            key={index}
            className={`flex  group items-center gap-2 mb-2 p-3 hover:bg-border hover:text-primary rounded-md cursor-pointer`}>
            <menu.icon />
            <h2 className='duration-300 group-hover:translate-x-4 text-lg'>{menu.name}</h2>
          </Link>
        ))}
        <SignOutButton >
          <div
            className='flex items-center group gap-2 mb-2 p-3 hover:bg-border hover:text-primary rounded-md cursor-pointer '>
            <LogOut />
            <Link href={'/'} className='text-lg duration-300 group-hover:translate-x-4'>Sign out</Link>
          </div>
        </SignOutButton>
      </div>
      {result.length > 0 && <UserUsage usage={result[0].usage!} credits={result[0].credits!} />}

    </div>
  )
}

export default SideNav
