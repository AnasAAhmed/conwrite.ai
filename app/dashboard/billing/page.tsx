import { Button } from "@/components/ui/button";
import { SignedIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { url } from "inspector";
import Image from "next/image";

const page = async () => {
    const { userId } = auth();

    const plans = [
        {
            _id: 1,
            name: "Free",
            icon: "/free-plan.svg",
            price: 0,
            credits: '20k',
            inclusions: [
                {
                    label: "20k Free Credits",
                    isIncluded: true,
                },
                {
                    label: "Basic Access to Services",
                    isIncluded: true,
                },
                {
                    label: "Priority Customer Support",
                    isIncluded: false,
                },
                {
                    label: "Priority Updates",
                    isIncluded: false,
                },
            ],
        },
        {
            _id: 2,
            name: "Pro Package",
            icon: "/free-plan.svg",
            price: 99,
            credits: '70k',
            inclusions: [
                {
                    label: "70k Credits",
                    isIncluded: true,
                },
                {
                    label: "Full Access to Services",
                    isIncluded: true,
                },
                {
                    label: "Priority Customer Support",
                    isIncluded: true,
                },
                {
                    label: "Priority Updates",
                    isIncluded: false,
                },
            ],
        },
        {
            _id: 3,
            name: "Premium Package",
            icon: "/free-plan.svg",
            price: 299,
            credits: '200k',
            inclusions: [
                {
                    label: "200k Credits",
                    isIncluded: true,
                },
                {
                    label: "Full Access to Services",
                    isIncluded: true,
                },
                {
                    label: "Priority Customer Support",
                    isIncluded: true,
                },
                {
                    label: "Priority Updates",
                    isIncluded: true,
                },
            ],
        },
    ];
    return (
        <>
            <section className="px-8">
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
                                <SignedIn>
                                    <section>
                                        <Button
                                            type="submit"
                                            role="link"
                                            className="w-full bg-primary rounded-full bg-cover"
                                            // style={{backgroundImage:'url(/gradient.svg)'}}
                                        >
                                            Buy Credit
                                        </Button>
                                    </section>
                                </SignedIn>
                            )}
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
};

export default page;