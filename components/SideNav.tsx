'use client'
import { SignOutButton, UserButton } from '@clerk/nextjs';
import { ChevronLeft, ChevronRight, History, Home, LayoutDashboard, LogOut, User, WalletCards } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import DarkModeToggle from './Toggle';

const SideNav = () => {

  const [open, setOpen] = useState(true)
  const menuListt = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
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
    <>
      {!open && (
        <div
          onClick={() => setOpen(!open)}
          className='fixed cursor-pointer z-30 top-56 left-0 bg-primary-foreground border-gray-300 border-y border-r text-primary p-1 rounded-r-md'
        >
          <ChevronRight />
        </div>
      )}
      <div className={`z-20 ${open ? 'lg:w-72 w-56 md:block max-sm:fixed' : 'hidden'}`}>
        <div className='flex flex-col justify-between h-screen overflow-y-auto bg-primary-foreground p-3 lg:p-5 shadow-sm border'>
          <div className="flex justify-between items-center">
            <Link href={'/'} className="flex justify-start">
              <Image src={'/logo.svg'} className='dark:drop-shadow-[0_0_0.1rem_#ffffff70] dark:invert' alt='logo' width={130} height={88} />
            </Link>
            <div onClick={() => setOpen(!open)} className='sm:hidden cursor-pointer'>
              <ChevronLeft />
            </div>
          </div>
          <hr className='my-4 border w-[90%]' />
          <div className="flex flex-col gap-4 flex-1">
            <div>
              {menuListt.map((menu, index) => (
                <Link
                  href={menu.path}
                  key={index}
                  className='flex group items-center gap-2 mb-2 p-3 hover:bg-border hover:text-primary rounded-md cursor-pointer'
                >
                  <menu.icon />
                  <h2 className='duration-300 group-hover:translate-x-4 text-lg'>{menu.name}</h2>
                </Link>
              ))}
            </div>
            <SignOutButton>
              <div className='flex items-center group gap-2 mb-2 p-3 hover:bg-border hover:text-primary rounded-md cursor-pointer'>
                <LogOut />
                <span className='text-lg duration-300 group-hover:translate-x-4'>Sign out</span>
              </div>
            </SignOutButton>
          </div>
          <div className="md:hidden flex justify-between items-center gap-1 text-primary bg-primary-foreground rounded-md w-full">
            <DarkModeToggle />
            <UserButton />
          </div>
        </div>
      </div>
    </>
  )
}

export default SideNav

