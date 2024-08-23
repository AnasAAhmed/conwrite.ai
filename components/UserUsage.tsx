'use client'
import { useUsage } from '@/lib/useUsage.';
import React, { useEffect } from 'react'

const UserUsage = ({ result,max}: { result: number,max:number }) => {
    const resultPercentage = (result * 100) / max;
    const { setUsage } = useUsage()
    useEffect(() => {
        setUsage(result)
    }, [])
    return (
        <div className="flex flex-col gap-1 text-primary bg-primary-foreground pb-2 px-2 border rounded-md min-w-[10em] w-[16rem]">
            <div className="flex items-center justify-between">
                <h1 className=' text-xl font-medium'>Credits</h1>
                <span className='text-xs'>{result}/{max}</span>
            </div>
            <div className="bg-gray-300 dark:bg-gray-600 w-full rounded-full h-3">
                <div className="bg-primary rounded-full h-3 duration-500" style={{ width: `${resultPercentage}%` }}></div>
            </div>
        </div>
    )
}

export default UserUsage
