import { UserProfile } from '@clerk/nextjs'
import { Metadata } from 'next';
import React from 'react'
export const metadata: Metadata = {
    title: "Profile | ConWrite.ai",
};
const page = () => {
  return (
    <div className='w-full h-fuldl my-8  flex justify-center items-center'>
      <div className='overflow-y-auto'>

      <UserProfile routing='hash' />
      </div>
    </div>
  )
}

export default page;