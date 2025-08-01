import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import CreateUser from "@/components/CreateUser";
import ProgressBar from "@/components/ProgressBar";
import { Suspense } from "react";

const inter = Roboto({ subsets: ["latin"], weight: ['500', '700'] });

export const metadata: Metadata = {
  title: "ConWrite.ai | AI-Powered Content Creation & Chatbots",
  description:
    "Boost your productivity with ConWrite.ai – the ultimate AI tool for content generation, marketing copy, social media posts, and intelligent chatbot support. Powered by the latest AI technology.",
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
    title: "ConWrite.ai – Create Smarter Content with AI",
    description:
      "Discover ConWrite.ai, your all-in-one AI platform for generating SEO-optimized content, marketing copy, and chatbot interactions. Built with Next.js by Anas Ahmed.",
    url: `${process.env.ECOM_STORE_URL}`,
    images: [
      {
        url: '/hero.avif',
        width: 711,
        height: 400,
        alt: 'ConWrite.ai home preview',
      },
      {
        url: '/demo.png',
        width: 711,
        height: 400,
        alt: 'ConWrite.ai chat preview',
      },
    ],

    siteName: 'ConWrite.ai | AI Tools by Anas Ahmed',
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider signInUrl="/?auth=sign-in">
      <html lang="en" className="dark">
        <body className={inter.className}>
          <Suspense fallback={''}>
            <ProgressBar />
          </Suspense>
          <CreateUser />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
