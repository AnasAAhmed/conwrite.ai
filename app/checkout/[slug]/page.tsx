import CheckOut from '@/components/CheckOut'
import { plans } from '@/lib/Templates';
import React from 'react'

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;

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
       
    }
};

const page = async (props: { params: Promise<{ slug: string }> }) => {
    const params = await props.params;
    const selectedPlan = plans.find(item => item.slug === params.slug!);
    return (
         <CheckOut selectedPlan={selectedPlan} />
     )
}

export default page
