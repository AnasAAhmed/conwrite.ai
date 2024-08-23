import { SearchIcon } from 'lucide-react'
import React from 'react'

const Search = ({ onSearchInput }: any) => {
  return (
    <div className='p-10 text-white flex justify-center items-center bg-gradient-to-br from-slate-600 via-black to-slate-600 flex-col'>
      <h2 className='text-3xl font-bold'>Browse All Templates</h2>
      <p className="">What would you like create today?</p>
      <div className="w-full flex justify-center">
        <div className="flex gap-2 items-center p-2 w-[60%] border rounded-md bg-primary-foreground my-5 ">
          <SearchIcon className='text-primary' />
          <input
            type="text"
            placeholder='Search...'
            className='outline-none text-primary bg-transparent w-full'
            onChange={(e) => onSearchInput(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

export default Search
