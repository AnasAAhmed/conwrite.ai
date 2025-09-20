'use client'
import React, { useEffect, useRef, useState } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import dynamic from 'next/dynamic';
import { Button } from './ui/button';
import { Check, Copy } from 'lucide-react';
import Loader from './ui/loader';

const Editor = dynamic(
    () => import('@toast-ui/react-editor').then(mod => mod.Editor),
    {
        ssr: false,
        loading: () => <Loader />,
    }
);

const OutputSection = ({ result }: { result: string }) => {
    const [isCopy, setIsCopy] = useState(false);
    const editorRef = useRef<any>(null);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || savedTheme === null) {
            setTheme('dark');
            document.documentElement.classList.add('dark');
        } else {
            setTheme('light');
            document.documentElement.classList.remove('dark');
        }
    }, []);

    useEffect(() => {
        const editorInstance = editorRef.current?.getInstance();
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

    return (
        <div className='bg-primary-foreground text-primary shadow-lg border rounded-lg'>
            <div className="flex justify-between items-center p-5">
                <h2>Your Result</h2>
                <Button title={isCopy ? "Copied" : "Copy result"} onClick={copyResult}>
                    {isCopy ? <><Check className='w-5 h-5 mr-1' />Copied</> : <> <Copy className='w-4 h-4 mr-1' />Copy </>}

                </Button>
            </div>
            <Editor
                ref={editorRef}
                autoFocus={false}
                theme={theme}
                initialValue=""
                height="600px"
                initialEditType="wysiwyg"
                useCommandShortcut={true}
            />
        </div>
    );
}

export default OutputSection;
