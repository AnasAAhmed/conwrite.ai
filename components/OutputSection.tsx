'use client'
import React, { useEffect, useRef, useState } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import dynamic from 'next/dynamic';
import { Button } from './ui/button';
import { Check, Copy } from 'lucide-react';

const Editor = dynamic(
  () => import('@toast-ui/react-editor').then(mod => mod.Editor),
  { ssr: false }
);

const OutputSection = ({ result }: { result: string }) => {
    const [isCopy, setIsCopy] = useState(false);
    const editorRef = useRef<any>(null);
    const [darkMode, setDarkMode] = useState(false);
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        let el = document.getElementsByClassName("toastui-editor-defaultUI")[0];

        // 👇 Default to dark if no theme is saved
        if (savedTheme === 'dark' || savedTheme === null) {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
            if (el) el.classList.add("toastui-editor-dark");
        } else {
            setDarkMode(false);
            document.documentElement.classList.remove('dark');
            if (el) el.classList.remove("toastui-editor-dark");
        }
        const editorInstance = editorRef.current.getInstance();

        if (editorInstance) {
            editorInstance.setMarkdown(result);

            setTimeout(() => {
                editorInstance?.blur();
            }, 0);
        }

    }, [result]);

    const copyResult = () => {
        const editorInstance = editorRef.current?.getInstance();
        const currentContent = editorInstance?.getMarkdown();

        navigator.clipboard.writeText(currentContent || '')
            .then(() => {
                setIsCopy(true);
                setTimeout(() => setIsCopy(false), 3000); // Reset copy state after 2 seconds
            })
            .catch(err => {
                console.log('Could not copy text: ', err);
            });
    };

    const toggleDarkMode = () => {
        if (darkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }

        setDarkMode(!darkMode);
    };
    return (
        <div className='bg-primary-foreground text-primary shadow-lg border rounded-lg'>
            <div className="flex justify-between items-center p-5">
                <h2>Your Result</h2>
                <abbr title={isCopy ? "Copied" : "Copy result"}>
                    <Button onClick={copyResult}>
                        {isCopy ? <><Check className='w-5 h-5 mr-1' />Copied</> : <> <Copy className='w-4 h-4 mr-1' />Copy </>}

                    </Button>
                </abbr>
            </div>

            <Editor
                ref={editorRef}
                autoFocus={false}
                // theme={'dark'}
                initialValue=""
                height="600px"
                initialEditType="wysiwyg"
                useCommandShortcut={true}
            />
            {/* <Markdown >{result}</Markdown> */}
            {/* <Viewer
                ref={editorRef}
                initialValue={result}
                theme={'dark'}
                height="600px"
            /> */}
        </div>
    );
}

export default OutputSection;
