'use client'
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Moon, Sun } from 'lucide-react';

const DarkModeToggle = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        let el = document.getElementsByClassName("toastui-editor-defaultUI")[0];

        // 👇 Default to dark if no theme is saved
        if (savedTheme === 'dark' || savedTheme === null) {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
            /*usually this will only work for if the Editor 
            is mounted on the page that your currently on so this code also
            there in useffeect where this Editore is used*/
            // if (el) el.classList.add("toastui-editor-dark") ;
        } else {
            setDarkMode(false);
            document.documentElement.classList.remove('dark');
            /*usually this will only work for if the Editor 
            is mounted on the page that your currently on so this code also
            there in useffeect where this Editore is used*/
            // if (el) el.classList.remove("toastui-editor-dark");
        }
    }, []);

    const toggleDarkMode = () => {
        let el = document.getElementsByClassName("toastui-editor-defaultUI")[0];
        if (darkMode) {
            document.documentElement.classList.remove('dark');
            if (el) el.classList.remove("toastui-editor-dark");
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            if (el) el.classList.add("toastui-editor-dark");
            localStorage.setItem('theme', 'dark');
        }
        setDarkMode(!darkMode);
    };
    return (
        <Button
            onClick={toggleDarkMode}
            variant={'outline'}
            size={'icon'}
            className='mx-2'
        >
            {!darkMode ? <Sun/> : <Moon/>}
        </Button>
    );
};

export default DarkModeToggle;