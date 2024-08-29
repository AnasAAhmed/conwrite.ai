'use client'
import { useUsage } from '@/lib/useUsage.';
import { useEffect } from 'react'

const UserUsage = ({ usage, credits }: { usage: number, credits: number }) => {
    const resultPercentage = (usage * 100) / credits;

    const { setUsage, setMaxCredits } = useUsage()
    useEffect(() => {
        setUsage(usage);
        setMaxCredits(credits);
    }, []);
    return (
        <div className="flex flex-col gap-1 text-primary bg-primary-foreground py-[5px] px-2 border rounded-md w-44">
            <div className="flex items-center justify-between">
                <h1 className='text-xs font-medium'>Credits</h1>
                <span className='text-xs'>{usage}/{credits}</span>
            </div>
            <meter min={0} max={100} value={resultPercentage} low={90} high={60} optimum={30} className="bg-prdimary w-full rounded-full h-3 duration-500"></meter>
        </div>
    );
}

export default UserUsage