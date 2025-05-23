import { db } from '@/lib/db';
import {  BillingHistory } from '@/lib/schema';
import { auth } from '@clerk/nextjs/server';
import React from 'react';
import { count, desc, eq } from 'drizzle-orm';
import PaginationControls from '@/components/PaginationControls';
import { Metadata } from 'next';
export const metadata: Metadata = {
    title: "Billing | ConWrite.ai",
};
const Page = async ({ searchParams }: { searchParams: any }) => {
    let page = Number(searchParams?.page) || 1;
    const limit = 6
    const offset = (page - 1) * limit;
    const { userId } = auth();
    if (!userId) return 'Unauthorized';

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
          <div className="flex justify-between items-center mb-2">
            <div>
              <h2 className="text-lg font-semibold">{item.email}</h2>
              <p className="text-sm text-gray-500">{item.userId}</p>
            </div>
            <div className="text-sm text-gray-500">
              {new Date(item.createdAt).toLocaleDateString()}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mt-2">
            <div>
              <p><span className="font-medium">Amount:</span> {item.amount} {item.currency?.toUpperCase()}</p>
              <p><span className="font-medium">Credits:</span> {item.credits}</p>
            </div>
            <div>
              <p><span className="font-medium">Payment Method:</span> {item.paymentMethod}</p>
            </div>
          </div>
        </div>
      )) : (
        <p className="text-lg mb-3">No billing records found.</p>
      )}
    </div>

    <PaginationControls currentPage={page} totalPages={totalPages} />
  </div>
);

};

export default Page;
