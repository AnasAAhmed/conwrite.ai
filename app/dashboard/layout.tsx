import React from 'react'
import SideNav from '@/components/SideNav';
import Header from '@/components/Header';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "ConWrite | Dashboard",
    description:
        "Dashboard where you can access all templates. Boost your productivity with ConWrite.ai – the ultimate AI tool for content generation, marketing copy, social media posts, and intelligent chatbot support. Powered by the latest AI technology.",
    keywords: [
        'ConWrite.ai',
        'AI content generator',
        'AI writing tool',
        'AI chatbot',
        'Anas Ahmed',
        'Next.js AI tools',
        'SEO content generator',
        'OpenAI Chatbot',
        'GPT-powered assistant',
        'AI marketing tools'
    ],
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
    openGraph: {
        title: "ConWrite | Dashboard",
        description: "Dashboard where you can access all templates only for logged in users",
         url: `${process.env.ECOM_STORE_URL}`,
        images: [
            {
                url: '/demo.png',
                width: 400,
                height: 400,
                alt: 'ConWrite.ai Logo',
            },
        ],
        siteName: 'ConWrite.ai | AI Tools by Anas Ahmed',
    },
};

const layout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {

    return (
        <div className='h-screen flex bg-accent'>
            <SideNav />
            <div className="bg-accent w-full overflow-y-auto lgs:ml-64 md:sml-44">
                <Header />
                {children}
            </div>
        </div>
    )
}

export default layout
