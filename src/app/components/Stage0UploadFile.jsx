"use client";

import { useChatContentContext } from "@/context/ChatContentContext";
import { parseWhatsappChat } from "@/utils/parseWhatsappChat";
import Image from "next/image";

const Stage0UploadFile = () => {
    const {
        chatContent,
        setChatContent,
        setGroupMembers,
        fileName,
        setFileName,
        setStage,
    } = useChatContentContext();

    // Handle file selection and parsing
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.name.endsWith(".txt")) {
            alert("❌ Only .txt files are allowed.");
            return;
        }

        setFileName(file.name);

        const reader = new FileReader();
        reader.onload = (e) => {
            const rawText = e.target.result;
            const { messages, participants } = parseWhatsappChat(rawText);

            if (messages.length === 0) {
                alert("⚠️ No valid messages found. Please check your .txt file.");
                return;
            }

            setChatContent(messages);
            setGroupMembers(participants);
        };

        reader.readAsText(file);
    };

    // Move to next stage if data is valid
    const handleProcessFile = () => {
        if (chatContent?.length > 0) {
            setStage(1);
        } else {
            alert("⚠️ Please upload a valid WhatsApp .txt file first.");
        }
    };

    return (
        <main className="bg-[#111b21] text-[#e9edef]">
            <div className="container mx-auto min-h-dvh flex items-center justify-center px-4">
                <div className="w-full sm:max-w-md bg-[#1e2a33] rounded-2xl p-8 sm:shadow-lg text-center">
                    {/* Hero Image */}
                    <div className="mb-4 flex justify-center">
                        <Image
                            src="./hero_image.png"
                            width={200}
                            height={200}
                            alt="WhatsApp Chat Beautifier Logo"
                            priority
                        />
                    </div>

                    {/* Instructions */}
                    <p className="text-sm mb-6 text-gray-300">
                        Upload your <code>.txt</code> chat file to parse and view messages beautifully.
                    </p>

                    {/* File Input */}
                    <label className="cursor-pointer block mb-4">
                        <input
                            type="file"
                            accept=".txt"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <div className="bg-[#00a884] text-[#111b21] py-2 px-4 rounded-lg font-semibold hover:bg-opacity-90 transition">
                            Select WhatsApp File
                        </div>
                    </label>

                    {/* File Status & Button */}
                    {fileName && (
                        <>
                            <p className="text-xs text-[#e9edef] mb-4 truncate">
                                📄 <strong>{fileName}</strong> selected
                            </p>
                            <button
                                onClick={handleProcessFile}
                                className="mt-2 bg-transparent border border-[#00a884] text-[#00a884] py-2 px-4 rounded-lg hover:bg-[#00a884] hover:text-[#111b21] transition"
                            >
                                Process File
                            </button>
                        </>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Stage0UploadFile;
