"use client";
import { createContext, useContext, useState } from "react";

const ChatContentContext = createContext(null);

export function ChatContentProvider({ children }) {
    const [chatContent, setChatContent] = useState([]);
    const [groupMembers, setGroupMembers] = useState([]);
    const [senderUser, setSenderUser] = useState("")
    const [fileName, setFileName] = useState("")
    const [stage, setStage] = useState(0)

    return (
        <ChatContentContext.Provider value={{ chatContent, setChatContent, groupMembers, setGroupMembers, senderUser, setSenderUser, fileName, setFileName, stage, setStage }}>
            {children}
        </ChatContentContext.Provider>
    );
}

export function useChatContentContext() {
    const context = useContext(ChatContentContext);
    if (!context) throw new Error("useChatContentContext must be used inside ChatContentProvider");
    return context;
}