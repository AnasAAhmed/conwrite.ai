import AuthModal from '@/components/AuthModal';
import Chat from '@/components/Chat'
import SmartLink from '@/components/SmartLink';
import { Metadata } from 'next';
import Image from 'next/image';
import React from 'react'

export const metadata: Metadata = {
    title: "Ai-ChatBot | ConWrite.ai",
    description: "Meet Your AI Companion: The Gemini AI-Powered Chatbot Experience lightning-fast, insightful conversations with our AI chatbot, built on the powerful Gemini AI LLM.  Get instant answers, creative assistance, and personalized support, all in one convenient place.",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
    openGraph: {
        title: "Ai-ChatBot | ConWrite.ai",
        description: "Meet Your AI Companion: The Gemini AI-Powered Chatbot Experience lightning-fast, insightful conversations with our AI chatbot, built on the powerful Gemini AI LLM.  Get instant answers, creative assistance, and personalized support, all in one convenient place.",
        url: `${process.env.ECOM_STORE_URL}/chat`,
        images: [
            {
                url: '/demo3.png',
                width: 711,
                height: 400,
                alt: 'ConWrite.ai Ai-Chatbot',
            },
        ],
        siteName: 'ConWrite.ai | AI Tools by Anas Ahmed',
    },
};
export const dynamic = 'force-static'
const page = () => {
    return (
        <div className='px-4'>
            <div className="px-3 sm:px-6 py-1 w-full  items-center border-b justify-between text-sm flex">
                <SmartLink title="home" href={'/'}>
                    <Image
                        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                        src="/logo.svg"
                        alt="Next.js Logo"
                        width={100}
                        height={37}
                        priority
                    />
                </SmartLink>
                <AuthModal />
            </div>
            <Chat />
        </div>
    )
}

export default page;