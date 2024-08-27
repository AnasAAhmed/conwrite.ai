'use client'
import { useUsage } from '@/lib/useUsage.';
import { useEffect } from 'react'

const UserUsage = ({usage, credits }: { usage: number, credits: number }) => {
    const resultPercentage = (usage * 100) / credits;

    const { setUsage, setMaxCredits } = useUsage()
    useEffect(() => {
        setUsage(usage);
        setMaxCredits(credits);
    }, []);
    return (
        <div className="flex mt-20 flex-col gap-1 text-primary bg-primary-foreground pb-2 px-2 border rounded-md w-full">
            <div className="flex items-center justify-between">
                <h1 className=' text-xl font-medium'>Credits</h1>
                <span className='text-xs'>{usage}/{credits}</span>
            </div>
            <div className="bg-gray-300 dark:bg-gray-600 w-full rounded-full h-3">
                <div className="bg-primary rounded-full h-3 duration-500" style={{ width: `${resultPercentage}%` }}></div>
            </div>
        </div>
    )
}

export default UserUsage
