import CheckOut from '@/components/CheckOut'
import { plans } from '@/lib/Templates';
import React from 'react'

export async function generateMetadata({ params }: { params: { slug: string } }) {

    const selectedPlan = plans.find(item => item.slug === params.slug!);

    return {
        title: selectedPlan?.name + " | ConWrite.ai",
        description:
            `Boost your productivity with ${selectedPlan?.name} package ConWrite.ai – the ultimate AI tool for content generation, marketing copy, social media posts, and intelligent chatbot support. Powered by the latest AI technology.`,
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
            },
        },
        openGraph: {
            title: selectedPlan?.name + " | ConWrite.ai",
            description:
                `Discover ${selectedPlan?.name} package at ConWrite.ai, your all-in-one AI platform for generating SEO-optimized content, marketing copy, and chatbot interactions. Built with Next.js by Anas Ahmed.`,
            url: `${process.env.ECOM_STORE_URL}`,
            images: [
                {
                    url: '/pricing.webp',
                    width: 711,
                    height: 400,
                    alt: 'ConWrite.ai home preview',
                },

            ],
            siteName: 'ConWrite.ai | AI Tools by Anas Ahmed',
        },
    }
};

const page = ({ params }: { params: { slug: string } }) => {
    const selectedPlan = plans.find(item => item.slug === params.slug!);
   return (
        <CheckOut selectedPlan={selectedPlan} />
    )
}

export default page
