import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import CreateUser from "@/components/CreateUser";

const inter = Roboto({ subsets: ["latin"], weight: ['500', '700'] });

export const metadata: Metadata = {
  title: "ConWrite.ai",
  description: "Generate Content with the power of ai ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" >
        <body className={inter.className}>
          <CreateUser />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
