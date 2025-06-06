import { db } from '@/lib/db';
import { BillingHistory } from '@/lib/schema';
import { auth } from '@clerk/nextjs/server';
import React from 'react';
import { count, desc, eq } from 'drizzle-orm';
import PaginationControls from '@/components/PaginationControls';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: "Billing | ConWrite.ai",
};
const Page = async (props: { searchParams: Promise<any> }) => {
  const { userId } = await auth.protect();
  if (!userId) return 'Unauthorized';
  const searchParams = await props.searchParams;
  let page = Number(searchParams?.page) || 1;
  const limit = 6
  const offset = (page - 1) * limit;

  const database = await db();
  const result = await database.select()
    .from(BillingHistory)
    .where(eq(BillingHistory.userId, userId))
    .limit(limit)
    .offset(offset)
    .orderBy(desc(BillingHistory.createdAt));

  const totalItemsResult = await database
    .select({ count: count() })
    .from(BillingHistory)
    .where(eq(BillingHistory.userId, userId))
    .execute();

  const totalItems = totalItemsResult[0]?.count || 0;
  const totalPages = Math.ceil(totalItems / limit);


  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Billing History</h1>
      <p className="text-md text-gray-500 mb-3">All your past payments and credit top-ups are shown below.</p>
      <div className="grid gap-4">
        {result.length > 0 ? result.map((item) => (
          <div key={item.id} className="bg-primary-foreground shadow-lg rounded-lg p-4">
            <div className="flex flex-wrap items-center justify-between mb-4">
              {/* <div className="break-words"> */}
              <h2 className="text-[15px] sm:text-lg truncate max-w-56 font-semibold">{item.email}</h2>
              <p className="text-sm truncate max-w-56 text-gray-500">{item.userId}</p>
              {/* </div> */}

            </div>
            <div className="flex flex-col justify-between">

              <div className="mb-4">
                <h3 className="text-md sm:text-lg font-semibold">Amount:</h3>
                <ul className="list-disc list-inside text-primary">
                  <li className="mt-1 text-sm sm:text-md">
                    {item.amount} {item.currency?.toUpperCase()}
                  </li>
                </ul>
              </div>
              <div className="mb-4">
                <h3 className="text-md sm:text-lg font-semibold">Credits:</h3>
                <ul className="list-disc list-inside text-primary">
                  <li className="mt-1 text-sm sm:text-md">
                    {item.credits}
                  </li>
                </ul>
              </div>
              <div className="mb-4">
                <h3 className="text-md sm:text-lg font-semibold">PaymentMethod:</h3>
                <ul className="list-disc list-inside text-primary">
                  <li className="mt-1 text-sm sm:text-md">
                    {item.paymentMethod}
                  </li>
                </ul>
              </div>
            </div>
            <div className="text-xs sm:text-sm flex items-center gap-2 text-gray-500">
              {new Date(item.createdAt).toLocaleDateString()}
            </div>
          </div>
        )) : <p className='text-lg mb-3'>No billing records found.</p>}
      </div>
      <PaginationControls currentPage={page} totalPages={totalPages} />
    </div>
  );
};

export default Page;
