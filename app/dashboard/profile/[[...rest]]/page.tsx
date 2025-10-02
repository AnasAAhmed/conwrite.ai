import SignInRedirect from '@/components/SignInRedirect';
import Loader from '@/components/ui/loader';
import { ClerkLoaded, ClerkLoading, UserProfile } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server';
import { Metadata } from 'next';
import React from 'react'
export const metadata: Metadata = {
  title: "Profile | ConWrite.ai",
};
const page = async () => {
  const { userId } = await auth();
  if (!userId) return <SignInRedirect text='Unauthorized' redirectTo='/dashboard/billing' />;
  return (
    <div className='w-full h-fuldl my-8  flex justify-center items-center'>
      <div className='overflow-y-auto'>

        <ClerkLoading>
          <Loader />
        </ClerkLoading>

        <ClerkLoaded>
          <UserProfile routing="hash" />
        </ClerkLoaded>
      </div>
    </div>
  )
}

export default page;