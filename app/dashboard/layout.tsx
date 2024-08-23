import React from 'react'
import SideNav from '@/components/SideNav';
import Header from '@/components/Header';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "ConWrite | Dashboard",
    description: "DAshboard where you can access all templates",
};

const layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className='h-screen bg-accent'>
            <div className='md:w-64 hidden lg:block fixed'>
                <SideNav />
            </div>
            <div className="bg-accent lg:ml-64">
                <Header />
                {children}
            </div>
        </div>
    )
}

export default layout
