'use client'
import Image from 'next/image';
import { useState, useEffect } from 'react';

const DarkModeToggle = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        if (darkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
         const toggleDarkMode=()=>{
    let el = document.getElementsByClassName("toastui-editor-defaultUI")[0];
    if(el.classList.contains("toastui-editor-dark"))
      el.classList.remove("toastui-editor-dark");
    else el.classList.add("toastui-editor-dark");
  }
  toggleDarkMode()
        setDarkMode(!darkMode);
    };

    return (
            <button
                onClick={toggleDarkMode}
                className="text-black text-[22px] dark:text-white"
            >
             {darkMode?<Image height={18} width={18} src="/sun.svg" alt="moon" />:<Image height={18} width={18} src="/Moon.svg" alt="moon" />} 
            </button>
    );
};

export default DarkModeToggle;