"use client";

import { FormEvent, useEffect, useState } from "react";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Environment from "../config/env";

export default function Chat() {
    const [response, setResponse] = useState<any[]>([]);
    const [userinput, setInput] = useState("");

    const handlePost = async (e: FormEvent) => {
        e.preventDefault();

        const userdata = {
            role: "user",
            content: [
                {
                    text: userinput,
                },
            ],
        };

        setInput("");
        setResponse((prev) => [...prev, userdata]);

        const url = Environment.INVOKE_URI;
        const body = {
            conversation: [...response, userdata],
        };
        try {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": "default123456",
                },
                body: JSON.stringify(body),
            });

            if (!res.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await res.json();
            console.log(data);
            const assistantData = {
                role: "assistant",
                content: [{ text: data }],
            };
            setResponse((prev) => [...prev, assistantData]);
        } catch (error) {
            console.error("Error making POST request:", error);
        }
    };

    return (
        <section className='w-full mx-auto flex h-full flex-col focus-visible:outline-0 '>
            <div className='flex-1 overflow-hidden'>
                <div className='h-full'>
                    <div className='h-full overflow-auto w-full'>
                        <div className='flex flex-col text-sm md:pb-9'>
                            <div className='sticky top-0 p-3 mb-1.5 flex items-center justify-between z-10 h-14 font-semibold bg-token-main-surface-primary'>
                                <div className='flex items-center gap-0 overflow-hidden'>
                                    CodeYou
                                </div>
                            </div>

                            {response.map((chat, i) => {
                                if (chat.role === "user") {
                                    return (
                                        <div
                                            className='flex items-end justify-end mb-4 w-[45%] mx-auto'
                                            key={i}
                                        >
                                            <div className='bg-blue-500 text-white rounded-lg px-4 py-2 shadow-md'>
                                                <p className='text-sm'>
                                                    {chat.content[0].text}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                }
                                if (chat.role === "assistant") {
                                    return (
                                        <div
                                            className='flex items-start mb-4 w-[45%] mx-auto'
                                            key={i}
                                        >
                                            <div className='bg-gray-300 text-gray-800 rounded-lg px-4 py-2 shadow-md'>
                                                <p className='text-sm'>
                                                    {chat.content[0].text}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full md:pt-0 md:border-transparent md:dark:border-transparent'>
                <div className='text-base px-3 m-auto md:px-5 lg:px-1 xl:px-5'>
                    <div className='mx-auto flex flex-1 gap-4 text-base md:gap-5 lg:gap-6 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem]'>
                        <form
                            onSubmit={handlePost}
                            className='w-full'
                            typeof='button'
                            aria-haspopup='dialog'
                            aria-expanded='false'
                            aria-controls='radix-:r2:'
                        >
                            <div className='relative flex h-full max-w-full flex-1 flex-col'>
                                <div className='flex w-full items-center'>
                                    <div className='flex w-full flex-col gap-1.5 rounded-[26px] p-1.5 transition-colors bg-[#e5e5e5]'>
                                        <div className='flex gap-1.5 md:gap-2 items-center'>
                                            <div className='flex min-w-0 flex-1 flex-col'>
                                                <input
                                                    onChange={(e) =>
                                                        setInput(
                                                            e.currentTarget
                                                                .value
                                                        )
                                                    }
                                                    value={userinput}
                                                    type='text'
                                                    placeholder='Type your message...'
                                                    className='flex-grow rounded-lg px-4 py-2 focus:outline-none outline-none bg-[#e5e5e5] focus:border-blue-500'
                                                />
                                            </div>
                                            <button
                                                className='mb-1 me-1 rounded-full bg-blue-500 text-white px-3 py-2'
                                                onClick={handlePost}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faArrowRight}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
