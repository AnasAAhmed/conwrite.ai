'use client';
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { generateAIChat } from "@/lib/actions";
import { Loader, Send } from "lucide-react";
import TypeWriter from './Typewriter';
import Image from 'next/image';

const Chat = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [isNewRes, setIsNewRes] = useState<boolean>(false);
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
        }, 200)

    }, [chatHistory]);

    const total: number = chatHistory.reduce(
        (acc, chat) => acc + chat.response.replace(/[\s\*]+/g, '').length,
        0
    );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (total > 2000) return alert('Please login to try AI further.');
        setLoading(true);
        try {
            const response = await generateAIChat({
                aiPrompt,
                maxTokens: 2000 - total,
            });

            setChatHistory((prevHistory) => [
                ...prevHistory,
                { prompt: aiPrompt, response }
            ]);
            setAiPrompt('');
            setIsNewRes(true);
        } catch (error) {
            const err = error as Error
            console.error(err);
            alert('An error occurred. Please try again.' + err.message);
        } finally {
            setLoading(false);
        }
    };
    const promptCard = [
        {
            prompt: "Help me prepare for an interview",
            img: "/pic.svg"
        },
        {
            prompt: "Explain nostalgia to a kindergartener",
            img: "/hat.svg"
        },
        {
            prompt: "Recipe with what's in my kitchen",
            img: "/bulb.svg"
        },
        {
            prompt: "Fun fact about the Roman Empire",
            img: "/box.svg"
        },

    ]
    return (
        <>
            <div className="mb-28 px-1 sm:px-12 p-3 space-y-4">
                <div className="flex mb-20 justify-center">
                    <div style={{ opacity: 1 }}>
                        <div className="mx-3 mt-12 flex max-w-3xl flex-wrap items-stretch justify-center gap-4">
                            <Image src={'/logo.svg'} className='dark:drop-shadow-[0_0_0.1rem_#ffffff70] dark:invert' alt='logo' width={130} height={130} />
                            <div className="flex max-w-3xl flex-wrap items-stretch justify-center gap-4">
                                {promptCard.map((i, _) => (
                                    <button key={_} onClick={() => setAiPrompt(i.prompt)} className="relative flex w-40 flex-col gap-2 rounded-2xl border border-token-border-light px-3 pb-4 pt-3 text-start align-top text-[15px] shadow-xxs transition enabled:hover:bg-token-main-surface-secondary disabled:cursor-not-allowed">
                                        <Image src={i.img} className='dark:drop-shadow-[0_0_0.1rem_#ffffff70] dark:invert' alt='logo' width={24} height={24} />
                                        <div className="line-clamp-3 max-w-full text-balance text-gray-600 dark:text-gray-500 break-word">{i.prompt}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {/* <Button variant={'ghost'} onClick={() => setChatHistory([])}>Clear Chat History</Button> */}
                {chatHistory.map((chat, index) => (
                    <div key={index} className="my-6">
                        <div className="flex justify-end mb-2">
                            <p className="bg-accent text-gray-800 dark:text-gray-300 font-thin p-2 rounded-lg">You: {chat.prompt}</p>
                        </div>
                        <div className="flex justify-start">
                            <TypeWriter isNewRes={isNewRes} txt={chat.response} />
                        </div>
                    </div>
                ))}
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
                    <Button type="submit" disabled={loading} variant="secondary" className="rounded-full">
                        {loading ? <Loader className="animate-spin mr-1" /> : <Send />}
                    </Button>
                </form>
                <p className="text-xs dark:text-gray-300">Words: {total}/2000</p>
            </div>
        </>
    );
};

export default Chat;
