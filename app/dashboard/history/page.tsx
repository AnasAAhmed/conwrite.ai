import { db } from '@/lib/db';
import { AIOutput } from '@/lib/schema';
import { auth } from '@clerk/nextjs/server';
import React from 'react';
import { count, desc, eq, sql } from 'drizzle-orm';
import Templates from '@/lib/Templates';
import Image from 'next/image';
import Link from 'next/link';
import PaginationControls from '@/components/PaginationControls';
import Delete from '@/components/Delete';

const Page = async ({ searchParams }: { searchParams: any }) => {
    let page = Number(searchParams?.page) || 1;
    const limit = 6
    const offset = (page - 1) * limit;
    const { userId } = auth();
    if (!userId) return 'Unauthorized';

    const database = await db();
    const result = await database.select()
        .from(AIOutput)
        .where(eq(AIOutput.createdBy, userId))
        .limit(limit)
        .offset(offset)
        .orderBy(desc(AIOutput.createdAt));

    const totalItemsResult = await database
        .select({ count: count() })
        .from(AIOutput)
        .where(eq(AIOutput.createdBy, userId))
        .execute();

    const totalItems = totalItemsResult[0]?.count || 0;
    const totalPages = Math.ceil(totalItems / limit);

    const filterTemp = (slug: string) => {
        const selectedTemp = Templates.find((item => item.slug === slug));
        return selectedTemp ? (
            <div className="flex items-center gap-2">
                <Image src={selectedTemp.icon} alt="icon" width={40} height={40} />
                <Link href={'/dashborad/content/' + selectedTemp.slug} className="font-bold text-lg">{selectedTemp.name}</Link>
            </div>
        ) : null;
    };

    return (
        <div className="container mx-auto p-6">
                <h1 className="text-2xl font-bold mb-2">History</h1>
            <p className='text-md text-gray-500 mb-3'>Search your periviously generated AI content</p>
            <div className="grid gap-4">
                {result.length > 0 ? result.map((item) => (
                    <div key={item.id} className="bg-primary-foreground shadow-lg rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                            {filterTemp(item.templateSlug)}
                            <div className="text-sm flex items-center gap-2 text-gray-500">
                                {new Date(item.createdAt).toLocaleDateString()}
                                <Delete historyId={item.id} />
                            </div>
                        </div>
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold">Prompt:</h3>
                            <ul className="list-disc list-inside text-primary">
                                {Object.entries(JSON.parse(item.formData)).map(([key, value], index) => (
                                    <li key={index} className="mt-1">
                                        <span className="font-medium capitalize">{key}: </span>
                                        {String(value)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <details className="bg-accent rounded-lg p-3">
                            <summary className="cursor-pointer font-medium flex justify-between items-center">

                                <span>AI Response</span>
                                <span>({item.aiResponse?.replace(/[\s\*]+/g, '').trim().length}) words</span>
                            </summary>
                            <pre className="mt-2 text-primary whitespace-pre-wrap">{item.aiResponse}</pre>
                        </details>
                    </div>
                )) : <p className='text-lg mb-3'>You have not created any AI content yet.</p>}
            </div>
            <PaginationControls currentPage={page} totalPages={totalPages} />
        </div>
    );
};

export default Page;
