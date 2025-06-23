import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ChatContentProvider } from "@/context/ChatContentContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "WhatsApp Chat Beautifier",
  description: "View your exported WhatsApp chats in a beautiful and organized format instead of plain text.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#111b21] text-white`}
      >
        <ChatContentProvider>
          {children}
        </ChatContentProvider>
      </body>
    </html>
  );
}
