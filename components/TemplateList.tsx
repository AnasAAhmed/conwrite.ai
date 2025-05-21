'use client'
import Templates from '@/lib/Templates'
import Image from 'next/image'
import SmartLink from '@/components/SmartLink';
import React, { useEffect, useState } from 'react'


const TemplateList = ({ templates, userSearchInput }: { templates: Template[]; userSearchInput: string }) => {

  const [templateList, setTemplateList] = useState<Template[]>([])

  useEffect(() => {
    if (userSearchInput) {
      const filter = templates.filter(item => item.name.toLowerCase().includes(userSearchInput.toLowerCase()))
      setTemplateList(filter);
    } else {
      setTemplateList(Templates);
    }
  }, [userSearchInput])
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-8'>
      {templateList.map((item: Template, i: number) => (
        <SmartLink href={`/dashboard/content/${item.slug}`} key={i} className="p-5 group shadow-md rounded-md border bg-primary-foreground flex flex-col gap-3" >
          <Image src={item.icon} alt='icon' width={50} height={50} />
          <h2 className='font-medium group-hover:translate-x-4 duration-300'>{item.name}</h2>

          <p className='text-gray-400 line-clamp-3'>{item.desc}</p>
        </SmartLink>
      ))}
    </div>
  )
}

export default TemplateList
