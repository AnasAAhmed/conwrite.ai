'use client'
import Search from '@/components/Search';
import TemplateList from '@/components/TemplateList';
import { useState } from 'react';

const Page: React.FC = () => {
  const [userSearchInput, setUserSearchInput] = useState<string>('');

  return (
    <div>
      <Search onSearchInput={(value: string) => setUserSearchInput(value)} />
      <TemplateList userSearchInput={userSearchInput} />
    </div>
  );
};

export default Page;
