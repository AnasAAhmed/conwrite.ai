'use client'
import { Button } from '@/components/ui/button'
import { checkout } from '@/lib/actions'
import { plans } from '@/lib/Templates'
import { ArrowLeft, Loader } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

const page = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const params = new URLSearchParams(searchParams.toString());
    const id = params.get('id');
    const selectedPlan = plans.find(item => item._id === parseInt(id!));
    const [res, setRes] = useState<string>('');
    const [load, setLoad] = useState<boolean>(false);
    const onSubmit = async () => {
        setLoad(true)
        try {
            const res = await checkout(selectedPlan?.creditsNo!);
            setRes(res);
            router.push('/dashboard')
        } catch (error) {
            console.log('CheckOut Error:', error);
        } 
    }

    return (
        <>
            <section className="bg-white pb-8 pt-6 antialiased dark:bg-gray-900 md:pb-16">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <Link className='' href={'/dashboard/billing'}>
                        <Button className='group' variant={'link'}>
                            <ArrowLeft className='group-hover:-translate-x-2 duration-300 -translate-x-1' size={'1rem'} />
                            Back
                        </Button>
                    </Link>
                    <div className="mx-auto max-w-5xl">
                        <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                            <span className="font-medium">Info alert!</span> This is fake payment form do not put your real card information. For fake payment you this card number: 4242-4242-4242-4242.
                        </div>
                        <div className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">

                            Payment
                        </div>

                        <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
                            <form action={onSubmit} className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8">
                                <div className="mb-6 grid grid-cols-2 gap-4">
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="full_name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Full name (as displayed on card)* </label>
                                        <input type="text" id="full_name" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Bonnie Green" required />
                                    </div>

                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="card-number-input" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Card number* </label>
                                        <input type="number" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" maxLength={20} placeholder="xxxx-xxxx-xxxx-xxxx" required />
                                    </div>

                                    <div>
                                        <label htmlFor="card-expiration-input" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Card expiration* </label>
                                        <div className="relative">
                                            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                                                <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </div>
                                            <input datepicker-format="mm/yy" id="card-expiration-input" type="date" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-9 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="12/23" required />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="cvv-input" className="mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white">
                                            Security code
                                            <button data-tooltip-target="cvv-desc" data-tooltip-trigger="hover" className="text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white">
                                                <abbr title="The last 3 digits on back of card">
                                                    <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                        <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z" clipRule="evenodd" />
                                                    </svg></abbr>
                                            </button>
                                        </label>
                                        <input type="number" maxLength={3} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="CVV" required />
                                    </div>
                                </div>

                                <Button type="submit" variant={'outline'} className="w-full focus:outline-none focus:ring-1  focus:ring-blue-500 ">{load && <Loader className="animate-spin mr-1" />} {res ? res : 'Pay now'}</Button>
                            </form>

                            <div className="mt-6 grow sm:mt-8 lg:mt-0">
                                <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
                                    <div className="space-y-2">
                                        <dl className="flex items-center justify-between gap-4">
                                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Package</dt>
                                            <dd className="text-base font-medium text-blue-500">{selectedPlan?.name}</dd>
                                        </dl>
                                        <dl className="flex items-center justify-between gap-4">
                                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                                            <dd className="text-base font-medium text-gray-900 dark:text-white">${selectedPlan?.price}</dd>
                                        </dl>

                                        <dl className="flex items-center justify-between gap-4">
                                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                                            <dd className="text-base font-medium text-green-500">$0</dd>
                                        </dl>

                                    </div>

                                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                        <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                                        <dd className="text-base font-bold text-gray-900 dark:text-white">${selectedPlan?.price}</dd>
                                    </dl>
                                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                        <dt className="text-base font-bold text-gray-900 dark:text-white">Number of credits you will get</dt>
                                        <dd className="text-base font-bold text-gray-900 dark:text-white">{selectedPlan?.credits}</dd>
                                    </dl>
                                </div>

                                <div className="mt-6 flex items-center justify-center gap-8">
                                    <img className="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg" alt="" />
                                    <img className="hidden h-8 w-auto dark:flex" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal-dark.svg" alt="" />
                                    <img className="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg" alt="" />
                                    <img className="hidden h-8 w-auto dark:flex" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg" alt="" />
                                    <img className="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg" alt="" />
                                    <img className="hidden h-8 w-auto dark:flex" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg" alt="" />
                                </div>
                            </div>
                        </div>

                        <p className="mt-6 text-center text-gray-500 dark:text-gray-400 sm:mt-8 lg:text-left">
                            Payment processed by <span className="font-medium cursor-pointer text-primary-700 underline hover:no-underline dark:text-primary-500">(Company)</span> for <span className="font-medium cursor-pointer  text-primary-700 underline hover:no-underline dark:text-primary-500">Example LLC</span>
                            - Pakistan
                        </p>
                    </div>
                </div>
            </section>

            <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/datepicker.min.js"></script>
        </>
    )
}

export default page
