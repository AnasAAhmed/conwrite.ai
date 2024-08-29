import { UserProfile } from '@clerk/nextjs'
import React from 'react'

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