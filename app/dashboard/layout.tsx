import React from 'react'
import SideNav from '@/components/SideNav';
import Header from '@/components/Header';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "ConWrite | Dashboard",
    description: "DAshboard where you can access all templates",
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
