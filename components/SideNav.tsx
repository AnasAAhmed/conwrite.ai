'use client'
import { SignOutButton, UserButton } from '@clerk/nextjs';
import { ChevronLeft, ChevronRight, History,  LayoutDashboard, LogOut, LoaderIcon, User, WalletCards } from 'lucide-react';
import Image from 'next/image';
import SmartLink from '@/components/SmartLink';
import React, { useEffect, useRef, useState } from 'react';
import DarkModeToggle from './Toggle';

const SideNav = () => {

  const [open, setOpen] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleCloseForMob = () =>{
    if(window.innerWidth<640){
      setOpen(false);
    }
  } 
  const toggleOpen = () => setOpen(!open);
  const toggleClose = () =>{
    if(window.innerWidth<640){
      setOpen(false);
    }
  } 

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        toggleCloseForMob();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const [load, setLoad] = useState(false)
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
          onClick={() => toggleOpen()}
          className='fixed cursor-pointer z-30 top-56 left-0 bg-primary-foreground border-gray-300 border-y border-r text-primary p-1 rounded-r-md'
        >
          <ChevronRight />
        </div>
      )}
      <div ref={dropdownRef} className={`z-20 duration-300 transition-transform max-sm:fixed -translate-x-96 ${open ? 'translate-x-0 w-64' : 'sm:fixed'}`}>
        <div className='flex flex-col justify-between h-screen overflow-y-auto bg-primary-foreground p-3 lg:p-5 shadow-sm border'>
          <div className="flex justify-between items-center">
            <SmartLink href={'/dashboard'} className="flex justify-start">
              <Image src={'/logo.svg'} className='dark:drop-shadow-[0_0_0.1rem_#ffffff70] dark:invert' alt='logo' width={130} height={88} />
            </SmartLink>
            <div onClick={() => toggleOpen()} className='sm:hisdden cursor-pointer'>
              <ChevronLeft />
            </div>
          </div>
          <hr className='my-4 border w-[90%]' />
          <div className="flex flex-col gap-4 flex-1">
            <div>
              {menuListt.map((menu, index) => (
                <SmartLink
                  href={menu.path}
                  key={index}
                  onClick={()=>setTimeout(()=>toggleClose(),120)}
                  className='flex group items-center gap-2 mb-2 p-3 hover:bg-border hover:text-primary rounded-md cursor-pointer'
                >
                  <menu.icon />
                  <h2 className='duration-300 group-hover:translate-x-4 text-lg'>{menu.name}</h2>
                </SmartLink>
              ))}
            </div>
            <SignOutButton >
              <div onClick={() => setLoad(true)} className='flex items-center group gap-2 mb-2 p-3 hover:bg-border hover:text-primary rounded-md cursor-pointer'>
                <LogOut />
                <span className='text-lg flex items-center gap-1 duration-300 group-hover:translate-x-1'>Sign out {load && <LoaderIcon className='animate-spin' />}</span>
              </div>
            </SignOutButton>
          </div>
          <div className="md:hidden flex flex-1 justify-between items-center gap-1 text-primary bg-primary-foreground rounded-md w-full">
            <DarkModeToggle />
            <UserButton />
          </div>
        </div>
      </div>
    </>
  )
}

export default SideNav

