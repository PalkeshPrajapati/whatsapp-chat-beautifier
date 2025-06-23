"use client";

import React, { useRef } from "react";
import { useChatContentContext } from "@/context/ChatContentContext";
import Image from "next/image";
import { getColorForUser } from "@/utils/getColorForUser";

const Stage2Chat = () => {
    const { chatContent, groupMembers, senderUser, fileName } = useChatContentContext();
    const topRef = useRef(null);
    const bottomRef = useRef(null);
    let lastDate = "";

    return (
        <main className="mx-auto min-h-dvh bg-[#161717] bg-[url(../../public/chat-bg.jpg)] bg-contain bg-fixed">
            {/* Scroll Anchor: Top */}
            <div ref={topRef} />

            {/* Header */}
            <div className="bg-[#202c33] p-4 mb-2 border-b border-[#2a3b48] sticky top-0 z-10">
                <div className="container mx-auto flex flex-wrap items-center justify-between gap-4">
                    {/* Logo + Group Info */}
                    <div className="flex items-center gap-4">
                        <div className="rounded-full">
                            <Image
                                src="./logo.png"
                                width={35}
                                height={35}
                                alt="App Logo"
                            />
                        </div>
                        <div className="text-left max-w-[60vw] overflow-hidden">
                            <div className="font-semibold text-[#e9edef] text-sm truncate">
                                {fileName.replace(/\.txt$/, "")}
                            </div>
                            <div className="text-xs text-[#aebac1] truncate">
                                {groupMembers.join(", ")}
                            </div>
                        </div>
                    </div>

                    {/* Scroll Buttons */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => topRef.current?.scrollIntoView({ behavior: "smooth" })}
                            className="text-xs bg-[#00a884] text-[#111b21] px-3 py-1 rounded hover:bg-opacity-90 transition"
                        >
                            👆 Old Chat
                        </button>
                        <button
                            onClick={() => bottomRef.current?.scrollIntoView({ behavior: "smooth" })}
                            className="text-xs bg-[#00a884] text-[#111b21] px-3 py-1 rounded hover:bg-opacity-90 transition"
                        >
                            👇 New Chat
                        </button>
                    </div>
                </div>
            </div>

            {/* Chat Content */}
            {chatContent.map((chat, index) => {
                const isSender = chat.sender === senderUser;
                const isSystem = chat.sender === "System_*!#0)^%";
                const isNewDate = chat.date !== lastDate;

                if (isNewDate) lastDate = chat.date;

                return (
                    <div key={index}>
                        {/* Date Divider */}
                        {isNewDate && (
                            <div className="flex justify-center text-white/60 text-xs">
                                <span className="p-2 my-2 rounded-lg bg-[#1d1f1f]">
                                    {chat.date}
                                </span>
                            </div>
                        )}

                        {/* Chat Bubble */}
                        {isSystem ? (
                            <div className="flex justify-center text-[#ffd279] text-center text-sm">
                                <span className="p-2 my-2 rounded-lg bg-[#1d1f1f] max-w-xs sm:max-w-sm md:max-w-lg">
                                    {chat.content}
                                </span>
                            </div>
                        ) : (
                            <div className={`container mx-auto flex ${isSender ? "flex-row-reverse" : ""}`}>
                                <div
                                    className={`${isSender ? "bg-[#144d37] mr-4" : "bg-[#242626] ml-4"
                                        } w-fit max-w-2/4 m-1 py-2 px-4 rounded-lg flex flex-col gap-0.5`}
                                >
                                    <span
                                        className="text-ellipsis whitespace-nowrap overflow-hidden text-sm font-semibold"
                                        style={{
                                            color: isSender ? "#05d838" : getColorForUser(chat.sender),
                                        }}
                                    >
                                        {chat.sender}
                                    </span>
                                    <span
                                        className="break-words whitespace-pre-wrap"
                                    >
                                        {chat.content}
                                    </span>
                                    <span className="text-white/60 text-xs flex justify-end">
                                        {chat.time}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}

            {/* Scroll Anchor: Bottom */}
            <div ref={bottomRef} className="pt-10" />
        </main>
    );
};

export default Stage2Chat;