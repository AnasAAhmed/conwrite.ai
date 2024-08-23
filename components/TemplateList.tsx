'use client'
import Templates from '@/lib/Templates'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export interface TEMPLATE {
  name: string,
  desc: string,
  icon: string,
  category: string,
  aiPrompt: string,
  slug: string,
  form?: FORM[],
}

export interface FORM {
  label: string,
  field: string,
  name: string,
  required?: boolean,
}

const TemplateList = ({ userSearchInput }: { userSearchInput: string }) => {

  const [templateList, setTemplateList] = useState<TEMPLATE[]>([])

  useEffect(() => {
    if (userSearchInput) {
      const filter = Templates.filter(item => item.name.toLowerCase().includes(userSearchInput.toLowerCase()))
      setTemplateList(filter);
    } else {
      setTemplateList(Templates);
    }
  }, [userSearchInput])
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-8'>
      {templateList.map((item: TEMPLATE, i: number) => (
        <Link href={`/dashboard/content/${item.slug}`} key={i} className="p-5 group shadow-md rounded-md border bg-primary-foreground flex flex-col gap-3" >
          <Image className='group-hover:animate-bounce' src={item.icon} alt='icon' width={50} height={50} />
          <h2 className='font-medium group-hover:translate-x-4 duration-300'>{item.name}</h2>

          <p className='text-gray-400 line-clamp-3'>{item.desc}</p>
        </Link>
      ))}
    </div>
  )
}

export default TemplateList
