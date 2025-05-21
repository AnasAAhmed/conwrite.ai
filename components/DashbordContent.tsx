'use client'
import React, { useState } from 'react'
import TemplateList from './TemplateList'
import Search from './Search'

const DashbordContent = ({ templates }: { templates: Template[] }) => {
    const [userSearchInput, setUserSearchInput] = useState<string>('');

    return (
        <div>
            <Search onSearchInput={(value: string) => setUserSearchInput(value)} />
            <TemplateList templates={templates} userSearchInput={userSearchInput} />
        </div>
    )
}

export default DashbordContent
