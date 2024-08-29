// import Templates from '@/lib/Templates'
// import { SearchIcon } from 'lucide-react'
// import React from 'react'

// const Search = ({ onSearchInput }: any) => {
//   return (
//     <div className="p-10 text-white flex justify-center items-center bg-gradient-to-br from-slate-600 via-black to-slate-600 flex-col">
//       <h2 className="text-3xl font-bold">Browse All Templates</h2>
//       <p>What would you like to create today?</p>
//       <div className="w-full flex justify-center">
//         <div className="relative flex items-center w-[60%] border rounded-md bg-primary-foreground my-5">
//           <SearchIcon className="text-primary mx-2" />
//           <input
//             type="text"
//             placeholder="Search..."
//             list="template"
//             className="outline-none text-primary bg-transparent w-full py-2 px-3"
//             onChange={(e) => onSearchInput(e.target.value)}
//           />
//           <datalist id="template" className="w-full h-5">
//             {Templates.map((item, i) => (
//                 <option key={i} value={item.name}>sssss</option>
//             ))}
//           </datalist>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Search

import Templates from '@/lib/Templates'
import { SearchIcon } from 'lucide-react'
import React, { useState } from 'react'

const Search = ({ onSearchInput }: any) => {
  const [filteredTemplates, setFilteredTemplates] = useState(Templates)
  const [showOptions, setShowOptions] = useState(false)
  const [placeHolder, setPlaceHolder] = useState('')

  const handleInputChange = (value: string) => {
    onSearchInput(value)
    setPlaceHolder(value);
    if (value) {
      setFilteredTemplates(
        Templates.filter((item) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        )
      )
      setShowOptions(true)
    } else {
      setFilteredTemplates(Templates)
      setShowOptions(false)
    }
  }

  return (
    <div className="sm:p-10 p-7 text-white flex justify-center items-center bg-gradient-to-br from-slate-600 via-black to-slate-600 flex-col">
      <h2 className="sm:text-3xl text-xl text-center font-bold">Browse All Templates</h2>
      <p className='sm:text-md text-sm text-center'>What would you like to create today?</p>
      <div className="w-full flex justify-center">
        <div className="relative flex items-center sm:w-[60%] w-full border rounded-md bg-primary-foreground my-5">
          <SearchIcon className="text-primary mx-2" />
          <input
            type="text"
            placeholder="Search..."
            className="outline-none text-primary bg-transparent w-full py-2 px-3"
            value={placeHolder}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => setShowOptions(true)}
            onBlur={() => setTimeout(() => setShowOptions(false), 100)} // Delay to allow click on option
          />
          {showOptions && (
            <div className="absolute top-full left-0 w-full bg-primary-foreground text-primary mt-1 rounded-md shadow-lg max-h-48 overflow-y-auto z-10">
              {filteredTemplates.map((item, i) => (
                <div
                  key={i}
                  className="px-3 py-2 cursor-pointer hover:bg-accent"
                  onMouseDown={() => handleInputChange(item.name)} // onMouseDown to prevent input blur
                >
                  <p className='truncate min-w-20'>{item.name}</p>
                  {/* <p className='text-xs text-gray-500'>{item.category}</p> */}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Search
