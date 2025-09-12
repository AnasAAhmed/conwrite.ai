import { Button } from "@/components/ui/button";
import Image from "next/image";
import SmartLink from '@/components/SmartLink';
import { Metadata } from "next";
import AuthModal from "@/components/AuthModal";
import { Facebook, Github, Instagram, LinkedinIcon } from "lucide-react";
import { Suspense } from "react";
import { pricing } from "@/constants";
import Header from "@/components/design-components/Header";
import Footer from "@/components/design-components/Footer";


// export const dynamic = 'force-static';
export const metadata: Metadata = {
    title: "Pricing | ConWrite.ai",
    description:
        "Pricing page at ConWrite.ai discover our premium packges for the ultimate use of our AI tool for content generation, marketing copy, social media posts, and intelligent chatbot support. Powered by the latest AI technology.",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
    openGraph: {
        title: "Pricing | ConWrite.ai",
        description:
            "Pricing page at ConWrite.ai discover our premium packges for the ultimate use of our AI tool for content generation, marketing copy, social media posts, and intelligent chatbot support. Powered by the latest AI technology.",
        url: `${process.env.ECOM_STORE_URL}/pricing`,
        images: [
            {
                url: '/pricing.webp',
                width: 711,
                height: 400,
                alt: 'ConWrite.ai pricing',
            },
        ],
        siteName: 'ConWrite.ai | AI Tools by Anas Ahmed',
    },
};
const page = () => {

    return (
        <main className="flex pt-20 bg-no-repeat scroll-smooth flex-col  items-center justify-center bg-cover">
            <Header />
            {/* 
            <div className="px-3 sm:px-6 py-1 w-full items-center border-b justify-between text-sm flex">
                <SmartLink href={'/'} title="home">
                    <Image
                        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                        src="/logo.svg"
                        alt="Next.js Logo"
                        width={100}
                        height={37}
                        priority
                    />
                </SmartLink>
                <Suspense fallback={<div className='h-5 w-16 p-1 rounded-md bg-gray-300 animate-pulse' />}>
                    <AuthModal />
                </Suspense>
            </div> */}
            <section className="px-8">
                <ul className="mt-11 grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-9 xl:grid-cols-3">
                    {pricing.map((plan) => (
                        <li key={plan.name} className="w-full rounded-[16px] border-2 border-purple-200/20 bg-primary-foreground p-8 shadow-xl shadow-purple-200/20 lg:max-w-none">
                            <div className="flex-center flex-col gap-3">
                                <Image src={plan.icon} alt="check" width={50} height={50} />
                                <p className="font-semibold text-[20px] leading-[140%] mt-2 text-primary">
                                    {plan.name}
                                </p>
                                <p className="text-[36px] font-semibold sm:text-[44px] leading-[120%] sm:leading-[56px] text-dark-600">${plan.price}</p>
                                <p className="font-normal text-[16px] leading-[140%]">{plan.credits} Credits</p>
                            </div>

                            {/* Inclusions */}
                            <ul className="flex flex-col gap-5 py-9">
                                {plan.inclusions.map((inclusion) => (
                                    <li
                                        key={plan.name + inclusion.label}
                                        className="flex items-center gap-4"
                                    >
                                        <Image
                                            src={`/${inclusion.isIncluded ? "check.svg" : "cross.svg"
                                                }`}
                                            alt="check"
                                            width={24}
                                            height={24}
                                        />
                                        <p className="font-normal text-[16px] leading-[140%]">{inclusion.label}</p>
                                    </li>
                                ))}
                            </ul>

                            {plan.name === "Free" ? (
                                <Button variant="outline" className="w-full rounded-full bg-accent bg-cover text-primary hover:text-primary">
                                    Free Consumable
                                </Button>
                            ) : (
                                // <SignedIn>
                                plan.slug ? <SmartLink href={`/checkout/${plan.slug}`}>
                                    <Button
                                        type="submit"
                                        role="SmartLink"
                                        className="w-full bg-primary rounded-full bg-cover"
                                    >
                                        Buy Credit
                                    </Button>
                                </SmartLink>
                                    :
                                    <Button
                                        type="submit"
                                        role="SmartLink"
                                        disabled
                                        className="w-full bg-primary rounded-full bg-cover"
                                    >
                                        Free Consumable
                                    </Button>
                                //  </SignedIn> 
                            )}
                        </li>
                    ))}
                </ul>
            </section>
            <Footer />
        </main>
    );
};

export default page;