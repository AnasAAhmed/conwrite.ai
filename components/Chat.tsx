'use client'
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { generateAIChat } from "@/lib/actions";
import { Loader, Send } from "lucide-react";
import TypeWriter from './Typewriter';

const Chat = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [aiPrompt, setAiPrompt] = useState<string>('');
    const [chatHistory, setChatHistory] = useState<Array<{ prompt: string, response: string }>>([]);


    useEffect(() => {
        const savedChatHistory = localStorage.getItem('chatHistory');
        if (savedChatHistory) {
            setChatHistory(JSON.parse(savedChatHistory));
        }
    }, []);

    useEffect(() => {
        setTimeout(() => {
            localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
        }, 300)
    
    }, [chatHistory]);

 

    let total: number = 0;
    chatHistory.forEach(i => {
        total = total + Number(i.response?.length)
    })
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (total > 2000) return alert('Please login to try AI further.');
        setLoading(true);

        try {
            const response = await generateAIChat({
                aiPrompt,
                maxTokens:2000-total,
            });
            setChatHistory((prevHistory) => [
                ...prevHistory,
                { prompt: aiPrompt, response }
            ]);
            setAiPrompt('');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <div className="container my-28 p-3 space-y-4">
                {/* <Button variant={'ghost'} onClick={() =>setChatHistory([])}>Clear Chat History</Button> */}

                {chatHistory.map((chat, index) => (
                    <div key={index} className="bubble">
                        <div className="flex justify-end ">
                           <p className='bg-accent dark:text-gray-300 font-thin p-2 rounded-lg mb-2'> You:  {chat.prompt}</p>
                        </div>
                        <div className="bg-primary-foreground dark:text-gray-300 p-2 rounded-lg">
                            <TypeWriter txt={chat.response} />
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="response bg-primary-foreground dark:text-gray-300 p-2 rounded-lg">
                        <Loader className='animate-spin mr-1' /> AI is typing...
                    </div>
                )}
            </div>
            <div className="fixed bottom-0 p-2 gap-3 flex flex-col justify-center bg-white dark:bg-black items-center w-full">
                <form onSubmit={handleSubmit} className="flex gap-2 w-[80%] items-center p-2 border rounded-full bg-border">
                    <input
                        type="text"
                        maxLength={400}
                        value={aiPrompt}
                        onChange={(e) => setAiPrompt(e.target.value)}
                        placeholder="Chat to AI"
                        className="px-4 dark:text-gray-300 outline-none bg-transparent w-full"
                    />
                    <Button disabled={loading} variant={'secondary'} className='rounded-full'>
                        {loading ? <Loader className='animate-spin mr-1' /> : <Send />}
                    </Button>
                </form>
                <p className="text-xs dark:text-gray-300 ">words({total}/2000)</p>
            </div>
        </>
    );
};

export default Chat;
