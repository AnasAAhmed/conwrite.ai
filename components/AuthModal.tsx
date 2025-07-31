'use client';
import { useEffect, useState } from "react";
import { ClerkLoaded, ClerkLoading, SignIn, SignUp, useUser } from "@clerk/nextjs";

import SmartLink from '@/components/SmartLink';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useRouter, useSearchParams } from "next/navigation";
import DarkModeToggle from "./Toggle";
import Loader from "./ui/loader";
import Button from "./design-components/Button";

export default function AuthModal() {
    const { user } = useUser();
    const [open, setOpen] = useState(false);
    const [authType, setAuthType] = useState<"sign-in" | "sign-up">("sign-in");
    const searchParams = useSearchParams()
    const router = useRouter();

    useEffect(() => {
        const auth = searchParams.get('auth')
        if (auth) {
            setOpen(true)
            setAuthType(auth as "sign-in" | "sign-up")
        }
    }, [searchParams]);

    return (
        <>
            <Dialog
                open={open}
                onOpenChange={(isOpen) => {
                    setOpen(isOpen);
                    if (!isOpen) {
                        const current = new URLSearchParams(searchParams.toString());
                        current.delete("auth");
                        current.delete("redirect_url");
                        router.replace(`?${current.toString()}`);
                    }
                }}
            >
                <DialogTitle asChild>
                    <p className="sr-only">This dialog needs a title</p>
                </DialogTitle>

                <div className="flex items-center gap-3">
                    <DarkModeToggle />
                    {user ? <SmartLink href={'/dashboard'}
                    >
                        <Button>Dashboard</Button>
                    </SmartLink> :
                        <Button onClick={()=>setOpen(!open)} title="Login to your account">
                            {/* <DialogTrigger > */}
                                Log-in
                            {/* </DialogTrigger> */}
                        </Button>
                    }
                </div>
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
