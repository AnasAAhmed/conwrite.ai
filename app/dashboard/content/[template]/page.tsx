'use client'
import OutputSection from '@/components/OutputSection'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { generateAIContent } from '@/lib/actions'
import Templates from '@/lib/Templates'
import { useUsage } from '@/lib/useUsage.'
import { ArrowLeft, Loader } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'


const page = ({ params }: { params: { template: string } }) => {

  const selectedTemp = Templates.find((item => item.slug === params.template));
  const [loading, setLoading] = useState<boolean>(false);
  const [aiOutput, setAiOutput] = useState<string>('');
  const [formData, setFormData] = useState<any>();
  const { usage } = useUsage();
const maxTokens =10000 - usage
console.log(maxTokens);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const onSubmit = async (e: any) => {
    e.preventDefault()
    // if (usage > 10000) return alert('fuck of bitch upgrade asshole');
    setLoading(true);
    try {
      const selectdPrompt = selectedTemp?.aiPrompt;
      const finalAIPrompt = JSON.stringify(formData) + ", " + selectdPrompt;
      const output = await generateAIContent({
        finalAIPrompt,
        formData,
        templateSlug: params.template,
        maxTokens
      });
      setAiOutput(output);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className='p-5'>
      <Link className='' href={'/dashboard'}>
        <Button className='group' variant={'link'}>
          <ArrowLeft className='group-hover:-translate-x-2 duration-300 -translate-x-1' size={'1rem'} />
          Back
        </Button>
      </Link>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 py-5'>
        <div className={`p-5 shadow-md border bg-primary-foreground rounded-lg ${loading && "opacity-40 cursor-not-allowed"}`}>
          <Image src={selectedTemp!.icon} alt='icon' width={70} height={70} />
          <h2 className='font-bold text-2xl my-2 text-primary'>{selectedTemp?.name}</h2>
          <p className="text-gray-500 text-sm">{selectedTemp?.desc}</p>

          <form className="mt-6 " onSubmit={onSubmit}>
            {selectedTemp?.form?.map((item, i) => (
              <div key={i} className="mt-2 flex flex-col gap-2 mb-7 outline-none">
                <label className='font-bold' htmlFor={item.name}>{item.label}</label>
                {item.field == 'input' ?
                  <Input
                    id={item.name}
                    name={item.name}
                    required={item.required}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                  :
                  <Textarea
                    id={item.name}
                    name={item.name}
                    required={item.required}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                }
              </div>
            ))}
            <Button disabled={loading} className='w-full'>
              {loading && <Loader className=' animate-spin mr-2' />}
              Generate Content
            </Button>
          </form>
        </div>
        <div className="col-span-2">
          <OutputSection result={aiOutput} />
        </div>
      </div>
    </div>
  )
}

export default page
