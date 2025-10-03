'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

export default function SignInRedirect({ text, redirectTo }: { text?: string; redirectTo?: string }) {
  const router = useRouter();

  useEffect(() => {
    // // const timeout = setTimeout(() => {
    // //   router.push(`/?auth=sign-in&redirect_url=${encodeURIComponent(redirectTo||'/')}`);
    // // }, 3000); // auto-redirect after 3 seconds

    // return () => clearTimeout(timeout);
  }, [redirectTo, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary-foreground px-6">
      {text && <h1 className="text-2xl font-semibold mb-4">{text}</h1>}
      <h2 className="text-xl font-semibold mb-4">Hold on! You need to sign in</h2>
      <p className="text-center text-accent-foreground max-w-md mb-8">
        To access this content, please sign in. You’ll be redirected shortly, or you can use the buttons below to navigate.
      </p>
      <div className="flex justify-center flex-wrap gap-4">
        <button
          onClick={() =>
            router.push(`/?auth=sign-in&redirect_url=${encodeURIComponent(redirectTo || '/')}`)
          }
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Login Now
        </button>
        <Button
          onClick={() => router.push('/')}
        >
          Go to Home
        </Button>
        <Button
          onClick={() => router.back()}
        >
          Go Back
        </Button>
      </div>
    </div>
  );
}
