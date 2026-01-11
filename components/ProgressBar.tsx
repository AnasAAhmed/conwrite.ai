'use client';

import { useThemeStore } from "@/lib/useTheme";
// import { useEffect } from 'react';
// import { useSearchParams } from 'next/navigation';
// import { useProgressStore } from '@/lib/useProgressBar';
import NextTopLoader from "nextjs-toploader";

export default function ProgressBar() {
  // const searchParams = useSearchParams();
  // const progress = useProgressStore((s) => s.progress);
  // const complete = useProgressStore((s) => s.complete);
  // const loading = useProgressStore((s) => s.loading);
  // useEffect(() => {
  //   if (loading) return complete();
  // }, [searchParams]);
  const { theme } = useThemeStore();
  return (
    // <div className="fixed top-0 left-0 z-[9999] h-[3px] w-full bg-transparent">
    //   <div
    //     className="h-full bg-primary transition-all duration-200 ease-linear"
    //     style={{
    //       width: `${progress}%`,
    //       opacity: loading ? 1 : 0,
    //     }}
    //   >
    //     <div className="absolute top-0 left-[-50%] h-full w-[50%] bg-gradient-to-r from-transparent via-primary-foreground/60 to-transparent animate-shine" />


    //   </div>
    // </div>
    <NextTopLoader
      color={theme==="dark"?"white":"black"}
      height={3}
      showSpinner={false}
    />
  );
}
