import { UserProfile } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <div className='w-full h-full py-8 flex justify-center items-center'>
      <UserProfile routing='hash' />
    </div>
  )
}

export default page;