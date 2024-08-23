'use client'
import { SignOutButton } from '@clerk/nextjs'
import { History, Home, LogOut, User, WalletCards } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const SideNav = () => {
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
  ]
  const path = usePathname()
  return (
    <div className='h-screen bg-primary-foreground p-5 shadow-sm border'>
      <Link href={'/'} className="flex justify-start">
        <Image src={'/logo.svg'} className='dark:drop-shadow-[0_0_0.1rem_#ffffff70] dark:invert' alt='logo' width={130} height={88} />
      </Link>
      <hr className='my-4 border w-[90%]' />
      <div className="mt-8">
        {menuListt.map((menu, index) => (
          <Link
            href={menu.path}
            key={index}
            className={`flex  group items-center gap-2 mb-2 p-3 hover:bg-border hover:text-primary rounded-md cursor-pointer ${path === menu.path && 'bg-border text-primary'}`}>
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
    </div>
  )
}

export default SideNav
