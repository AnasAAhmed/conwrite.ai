import Chat from '@/components/Chat'
import SmartLink from '@/components/SmartLink';
import { Button } from '@/components/ui/button';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';
import React from 'react'

const page = () => {
    const { userId } = auth()
    return (
        <div>
            <div className="px-3 sm:px-6 py-1 w-full items-center border-b justify-between text-sm flex">
                <SmartLink href={'/'}>
                    <Image
                        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                        src="/logo.svg"
                        alt="Next.js Logo"
                        width={100}
                        height={37}
                        priority
                    />
                </SmartLink>
                <SmartLink href={userId ? '/dashboard' : "/sign-in"}
                >
                    <Button size={'sm'}>{userId ? 'Dashboard' : "Login"}</Button>
                </SmartLink>
            </div>
            <Chat />
        </div>
    )
}

export default page;