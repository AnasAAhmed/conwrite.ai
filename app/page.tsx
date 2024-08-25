import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

export default function Home() {

  const { userId } = auth()
  return (
    <main className="flex bg-no-repeat flex-col  items-center justify-center bg-cover">
      <div className="px-3 sm:px-6 py-1 w-full items-center border-b justify-between text-sm flex">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/logo.svg"
          alt="Next.js Logo"
          width={100}
          height={37}
          priority
        />
        <Link href={userId ? '/dashboard' : "/sign-in"}
        >
          <Button size={'sm'}>{userId ? 'Dashboard' : "Login"}</Button>
        </Link>
      </div>

      <div className="relative z-[-1] w-full h-[400px] flex dark:bg-[url('https://preline.co/assets/svg/examples-dark/polygon-bg-element.svg')] bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] bg-no-repeat items-center justify-center bg-cover place-items-center flex-col gap-3">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/logo.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
        <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-neutral-200">AI Content<span className="bg-clip-text bg-gradient-to-tl from-blue-600 to-violet-600 text-transparent"> Generator</span></h1>
        <p className="text-lg mt-3 max-w-[43rem] text-center text-gray-600 dark:text-neutral-400">Revolutionize your content creation with our AI-powered app, delivering engaging and high-quality text in seconds.</p>
      </div>

      <div className="mb-20 grid text-center lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Docs{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <Link
          href="/chat"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Chat-bot{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Try our new AI chat bot for free without login.
          </p>
        </Link>

        <Link
          href="/dashboard"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Templates{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Explore starter templates for our AI powered tools.
          </p>
        </Link>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Pricing{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
