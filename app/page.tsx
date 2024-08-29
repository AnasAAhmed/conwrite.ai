import { Button } from "@/components/ui/button";
import { plans } from "@/lib/Templates";
import { auth } from "@clerk/nextjs/server";
import { ArrowBigRight, ArrowRight, ChevronRight, Facebook, Github, Instagram, Linkedin, LinkedinIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {

  const { userId } = auth()
  return (
    <main className="flex bg-no-repeat scroll-smooth flex-col  items-center justify-center bg-cover">
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
          href="#docs"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className="mb-3 gap-2 flex items-center text-2xl font-semibold">
            Docs{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              <ChevronRight />
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Find in-depth information about Conwrite.ai features and AI.
          </p>
        </a>

        <Link
          href="/chat"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className="mb-3 gap-2 flex items-center text-2xl font-semibold">
            AI Chat{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              <ChevronRight />
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
          <h2 className="mb-3 gap-2 flex items-center text-2xl font-semibold">
            Templates{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              <ChevronRight />
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Explore starter templates for our AI powered tools.
          </p>
        </Link>

        <a
          href="#pricing"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className="mb-3 gap-2 flex items-center text-2xl font-semibold">
            Pricing{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              <ChevronRight />
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
      <div id="docs" className="my-16 flex flex-col gap-8 justify-center">
        <h1 className="text-center text-2xl sm:text-4xl">How it works?</h1>
        <h1 className="text-center text-xl sm:text-3xl">Select Tool form dashboard</h1>
        <p className=" text-center text-md sm:text-lg">Select a tool from Dashboard after login find it with our search bar. </p>
        <div className=" border ring-[0.3px] rounded-md">
          <Image src={'/demo.png'} alt="hero" width={1000} height={1000} className="rounded-md"></Image>
        </div>
        <h1 className="text-center text-xl sm:text-3xl">Creating AI-Content </h1>
        <p className=" text-center text-md sm:text-lg">From selected tool put a prompt as per input and wait for your result in rich text Editor and get track of your credits in realtime.</p>
        <div className=" border ring-[0.3px] rounded-md">
          <Image src={'/demo2.png'} alt="hero" width={1000} height={1000} className="rounded-md"></Image>
        </div>
        <h1 className=" text-center text-xl sm:text-3xl">AI-Chatbot</h1>
        <p className=" text-center text-md sm:text-lg">try out our free chatbot without even login in Just Put a Prompt to get most out of our AI-Chatbot and gets a track to your free credits</p>
        <div className=" border ring-[0.3px] rounded-md">
          <Image src={'/demo3.png'} alt="hero" width={1000} height={1000} className="rounded-md"></Image>
        </div>
      </div>
      <section id="pricing" className="px-8 my-16">
        <ul className="mt-11 grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-9 xl:grid-cols-3">
          {plans.map((plan) => (
            <li key={plan.name} className="w-full rounded-[16px] border-2 border-purple-200/20 bg-primary-foreground p-8 shadow-xl shadow-purple-200/20 lg:max-w-none">
              <div className="flex-center flex-col gap-3">
                <Image src={plan.icon} alt="check" width={50} height={50} />
                <p className="font-semibold text-[20px] leading-[140%] mt-2 text-primary">
                  {plan.name}
                </p>
                <p className="text-[36px] font-semibold sm:text-[44px] leading-[120%] sm:leading-[56px] text-dark-600">${plan.price}</p>
                <p className="font-normal text-[16px] leading-[140%]">{plan.credits} Credits</p>
              </div>

              {/* Inclusions */}
              <ul className="flex flex-col gap-5 py-9">
                {plan.inclusions.map((inclusion) => (
                  <li
                    key={plan.name + inclusion.label}
                    className="flex items-center gap-4"
                  >
                    <Image
                      src={`/${inclusion.isIncluded ? "check.svg" : "cross.svg"
                        }`}
                      alt="check"
                      width={24}
                      height={24}
                    />
                    <p className="font-normal text-[16px] leading-[140%]">{inclusion.label}</p>
                  </li>
                ))}
              </ul>

              {plan.name === "Free" ? (
                <Button variant="outline" className="w-full rounded-full bg-accent bg-cover text-primary hover:text-primary">
                  Free Consumable
                </Button>
              ) : (
                <Link href={`/checkout?id=${plan._id}`}>
                  <Button
                    type="submit"
                    role="link"
                    className="w-full bg-primary rounded-full bg-cover"
                  >
                    Buy Credit
                  </Button>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </section>
      <footer className="h-12 px-2 sm:px-8 flex justify-between w-full bg-accent items-center border">
        <p className="text-gray-700 ">Conwrite.ai All Right Reserved &copy;</p>
        <p className="text-gray-700">Made By Anas Ahmed</p>
        <div className="flex gap-4 justify-between items-center">
          <Instagram/>
          <Github/>
          <Facebook/>
          <LinkedinIcon/>
        </div>
      </footer>
    </main>
  );
}
