import { UserProfile } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <UserProfile routing='hash' />
    </div>
  )
}

export default page;