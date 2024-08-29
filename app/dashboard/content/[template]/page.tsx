'use client'
import React, { useState } from 'react';
import OutputSection from '@/components/OutputSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { generateAIContent } from '@/lib/actions';
import Templates from '@/lib/Templates';
import { ArrowLeft, Loader } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from 'next/navigation';
import { chatSession } from '@/lib/AI_Modal';
import { useUsage } from '@/lib/useUsage.';

const page = ({ params }: { params: { template: string } }) => {

  const selectedTemp = Templates.find((item) => item.slug === params.template);
  const [loading, setLoading] = useState<boolean>(false);
  const [aiOutput, setAiOutput] = useState<string>('');
  const [formData, setFormData] = useState<any>();
  const [limitReached, setLimitReached] = useState<boolean>(false);
  const { usage, maxCredits } = useUsage();
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData:any) => ({ ...prevData, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (usage > maxCredits) {
      setLimitReached(true);
      return;
    }
    setLoading(true);
    try {
      const selectdPrompt = selectedTemp?.aiPrompt;
      const finalAIPrompt = JSON.stringify(formData) + ", " + selectdPrompt;
      const result = await chatSession.sendMessageStream(finalAIPrompt);
      let accumalatedText = '';
      for await (const chunk of result.stream) {
        const chunkTxt = await chunk.text(); 
        accumalatedText += chunkTxt;
        setAiOutput(accumalatedText);
      }

      let trimmedLength = accumalatedText.replace(/[\s\*]+/g, '').trim().length;

      const res = await generateAIContent({
        aiResponse: accumalatedText,
        formData,
        templateSlug: params.template,
        trimmedLength
      });
      console.log(res);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-5'>
      {limitReached && <LimitReached />}
        <Button onClick={()=>router.back()} className='group' variant={'link'}>
          <ArrowLeft className='group-hover:-translate-x-2 duration-300 -translate-x-1' size={'1rem'} />
          Back
        </Button>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 py-5'>
        <div className={`p-5 shadow-md border bg-primary-foreground rounded-lg ${loading && "opacity-40 cursor-not-allowed"}`}>
          <Image src={selectedTemp!.icon} alt='icon' width={70} height={70} />
          <h2 className='font-bold text-2xl my-2 text-primary'>{selectedTemp?.name}</h2>
          <p className="text-gray-500 text-sm">{selectedTemp?.desc}</p>

          <form className="mt-6 " onSubmit={onSubmit}>
            {selectedTemp?.form?.map((item, i) => (
              <div key={i} className="mt-2 flex flex-col gap-2 mb-7 outline-none">
                <label className='font-bold' htmlFor={item.name}>{item.label}</label>
                {item.field === 'input' ? (
                  <Input
                    id={item.name}
                    name={item.name}
                    required={item.required}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                ) : (
                  <Textarea
                    id={item.name}
                    name={item.name}
                    required={item.required}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                )}
              </div>
            ))}
            <Button disabled={loading} className='w-full'>
              {loading && <Loader className='animate-spin mr-2' />}
              Generate Content
            </Button>
          </form>
        </div>
        <div className="md:col-span-2">
          <OutputSection result={aiOutput} />
        </div>
      </div>
    </div>
  );
};

export default page;
const LimitReached = () => {

  const router = useRouter();

  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex justify-between items-center">
            <p>Insufficient Credits</p>
            <AlertDialogCancel
              className="border-0 p-0 hover:bg-transparent"
            >
              <Image
                src="/close.svg"
                alt="credit coins"
                width={24}
                height={24}
                className="cursor-pointer"
              />
            </AlertDialogCancel>
          </div>

          <Image
            src="/stacked-coins.png"
            alt="credit coins"
            width={462}
            height={122}
          />

          <AlertDialogTitle >
            Oops.... Looks like you&#39;ve run out of free credits!
          </AlertDialogTitle>

          <AlertDialogDescription className="py-3">
            No worries, though - you can keep enjoying our services by grabbing
            more credits.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className='w-full'
          >
            No, Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="w-full"
            onClick={() => router.push("/dashboard/billing")}
          >
            Yes, Proceed
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
