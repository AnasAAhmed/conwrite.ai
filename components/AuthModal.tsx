'use client';
import { useEffect, useState } from "react";
import { ClerkLoaded, ClerkLoading, SignIn, SignUp, useUser } from "@clerk/nextjs";

import { Button } from "./ui/button";
import SmartLink from '@/components/SmartLink';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useSearchParams } from "next/navigation";
import DarkModeToggle from "./Toggle";
import Loader from "./ui/loader";

export default function AuthModal() {
    const { user } = useUser();
    const [open, setOpen] = useState(false);
    const [authType, setAuthType] = useState<"sign-in" | "sign-up">("sign-in");
    const searchParams = useSearchParams()

    useEffect(() => {
        const auth = searchParams.get('auth')
        if (auth) {
            setAuthType(auth as "sign-in" | "sign-up")
        }
    }, [searchParams]);

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                {user ?
                    <div className="flex items-center gap-3">
                        <DarkModeToggle />
                        <SmartLink href={'/dashboard'}
                        >
                            <Button size={'sm'}>Dashboard</Button>
                        </SmartLink>  </div> :
                    <DialogTrigger >
                        Login
                    </DialogTrigger>
                }
                <DialogContent className="max-w-md min-h-96 p-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Loader />
                    </div>
                    {authType === "sign-in" ? (
                        <>
                            <ClerkLoading> <Loader /></ClerkLoading>
                            <ClerkLoaded><SignIn routing="virtual" signUpUrl="?auth=sign-up" /></ClerkLoaded>
                        </>
                    ) : (
                        <>
                            <ClerkLoading> <Loader /></ClerkLoading>
                            <ClerkLoaded><SignUp routing="virtual" signInUrl="?auth=sign-in" /></ClerkLoaded>
                        </>
                    )}
                </DialogContent>
            </Dialog >
        </>
    );
}
