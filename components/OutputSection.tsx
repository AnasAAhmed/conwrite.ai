'use client'
import React, { useEffect, useRef, useState } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import { Editor } from '@toast-ui/react-editor';
import { Button } from './ui/button';
import { Check, Copy } from 'lucide-react';

const OutputSection = ({ result }: { result: string }) => {
    const [isCopy, setIsCopy] = useState(false);
    const editorRef = useRef<any>(null);
    useEffect(() => {
        const editorInstance = editorRef.current.getInstance();
        
        if (editorInstance) {
            editorInstance.setMarkdown(result);

            const editableEl = editorInstance?.editor?.el?.querySelector('iframe')?.contentWindow?.document?.activeElement;
            editableEl?.blur(); 
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
                <abbr title={isCopy ? "Copied" : "Copy result"}>
                    <Button onClick={copyResult}>
                        {isCopy ? <><Check className='w-5 h-5 mr-1' />Copied</> : <> <Copy className='w-4 h-4 mr-1' />Copy </>}

                    </Button>
                </abbr>
            </div>
            {/* <Viewer
                initialValue={result}
                ref={editorRef}
                theme={'light'}
                height="600px"
            /> */}

            <Editor
                ref={editorRef}
                // theme={'dark'}
                initialValue=""
                height="600px"
                initialEditType="wysiwyg"
                useCommandShortcut={true}
            // toolbarItems={[]}
            />
        </div>
    );
}

export default OutputSection;
