'use client'
import Image from 'next/image';
import { useState, useEffect } from 'react';

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
        <button
            onClick={toggleDarkMode}
            className="text-black text-[22px] dark:text-white"
        >
            {darkMode ? <Image height={18} width={18} src="/sun.svg" alt="moon" /> : <Image height={18} width={18} src="/Moon.svg" alt="moon" />}
        </button>
    );
};

export default DarkModeToggle;