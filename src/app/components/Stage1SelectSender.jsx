"use client";

import React, { useState } from "react";
import { useChatContentContext } from "@/context/ChatContentContext";

const Stage1SelectSender = () => {
    const { groupMembers, senderUser, setSenderUser, setStage } = useChatContentContext();
    const [search, setSearch] = useState("");

    const filteredMembers = groupMembers.filter((name) =>
        name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <main className="bg-[#111b21] text-[#e9edef]">
            <div className="container mx-auto min-h-dvh flex items-center justify-center px-4">
                <div className="w-full sm:max-w-md bg-[#1e2a33] rounded-2xl p-6 sm:shadow-lg text-center flex flex-col gap-4">

                    {/* Heading */}
                    <h2 className="text-xl font-bold text-[#00a884]">
                        👥 Which one are you from the list below?
                    </h2>

                    {/* Search Input */}
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search member..."
                        className="w-full px-4 py-2 rounded-md bg-[#263238] border border-[#2a3b48] text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00a884]"
                    />

                    {/* Member List */}
                    <ul className="max-h-72 overflow-y-auto mt-2 bg-[#111b21] rounded-lg p-3 text-left border border-[#263238]">
                        {filteredMembers.length === 0 ? (
                            <li className="text-sm text-gray-400">No member found.</li>
                        ) : (
                            filteredMembers.map((name) => (
                                <li
                                    key={name}
                                    onClick={() => setSenderUser(name)}
                                    className={`py-2 px-3 rounded text-sm border-b border-[#263238] cursor-pointer transition ${
                                        senderUser === name
                                            ? "bg-[#00a884] text-[#111b21] font-semibold"
                                            : "hover:bg-[#1e2a33]"
                                    }`}
                                >
                                    {name}
                                </li>
                            ))
                        )}
                    </ul>

                    {/* Confirm Button */}
                    {senderUser && (
                        <button
                            onClick={() => setStage(2)}
                            className="mt-4 bg-[#00a884] text-[#111b21] font-semibold py-2 px-5 rounded-md cursor-pointer transition hover:bg-[#00906f]"
                        >
                            ✅ Confirm as "{senderUser}"
                        </button>
                    )}

                    {/* Continue Without Selection */}
                    <button
                        onClick={() => {
                            setSenderUser("");
                            setStage(2);
                        }}
                        className="mt-2 bg-transparent border border-[#00a884] text-[#00a884] py-2 px-5 rounded-md hover:bg-[#00a884] hover:text-[#111b21] transition"
                    >
                        😎 I never sent a message
                    </button>
                </div>
            </div>
        </main>
    );
};

export default Stage1SelectSender;
