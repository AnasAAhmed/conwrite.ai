'use client';
import { useEffect, useState } from "react";
import { SignIn, SignUp, useUser } from "@clerk/nextjs";

import { Button } from "./ui/button";
import SmartLink from '@/components/SmartLink';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useSearchParams } from "next/navigation";
import DarkModeToggle from "./Toggle";

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
                <DialogContent className="max-w-md p-0">

                    {authType === "sign-in" ? (
                        <SignIn routing="virtual" signUpUrl="?auth=sign-up" />
                    ) : (
                        <SignUp routing="virtual" signInUrl="?auth=sign-in" />
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}
