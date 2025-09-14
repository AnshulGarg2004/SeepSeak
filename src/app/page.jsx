"use client"
import { assets } from "@/assets/assets";
import Message from "@/components/Message";
import PromptBox from "@/components/PromtBox";
import Sidebar from "@/components/Sidebar";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expand, setExpand] = useState(false);
  const {selectedChat} = useAppContext();
  const containerref = useRef(null);

  useEffect(() => {
    if(selectedChat) {
      setMessage(selectedChat.messages);
    }
  }, [selectedChat])

  useEffect(() => {
    if(containerref.current) {
      containerref.current.scrollTop({
        top: containerref.current.scrollHeight,
        behavior: 'smooth'
      })
  }}, [message])
  return (
    <div>
      <div className="flex h-screen">
        {/* --sidebar-- */}
        <Sidebar expand={expand} setExpand={setExpand}/>
        <div className="flex-1 flex items-center flex-col justify-center px-4 pb-8 bg-[#292a2d] text-white relative">
          <div className="md:hidden absolute items-center top-6 flex px-4 justify-between w-full">
            <Image onClick={() => (expand ? setExpand(false) : setExpand(true))} className="rotate-180" src={assets.menu_icon} alt="menu icon" />
            <Image className="opacity-70" src={assets.chat_icon} alt="chat icon" />
          </div>
          {message.length === 0 ?
            <>
            <div className="items-center flex  gap-3">
              <Image src={assets.logo_icon} alt="logo" className="h-16" />
            <p className="text-2xl font-medium ">Hi! I'm SeepSeak.</p>
            </div>
            <p className="text-sm mt-2">How can I help you today?</p>
            </> : 
            (
              <div ref={containerref} className="relative flex flex-col items-center justify-start w-full mt-20 max-h-screen overflow-y-auto">
                <p className="fixed top-8 border border-transparent hover:border-gray-500/50 py-1 px-2 rouunded-lg font-semibold mb-6">
                  {selectedChat.name}
                </p>
                {message.map((msg, index) => (
                  <Message key={index} role={msg.role} content={msg.content} />
                ))}
                {
                  isLoading && (
                    <div className="flex gap-4 max-w-3xl w-full py-3">
                      <Image src={assets.logo_icon} alt="logo" className="h-9 w-9 border border-white/15 rounded-full" />
                      <div className="loader flex justify-center items-center gap-1">
                        <div className="w-1 h-1 rounded-full bg-white animate-bounce">
                          
                        </div>

                        <div className="w-1 h-1 rounded-full bg-white animate-bounce">
                          
                        </div>

                        <div className="w-1 h-1 rounded-full bg-white animate-bounce">
                          
                        </div>
                      </div>
                    </div>
                  )
                }
                 </div>
            )}
            {/* --promtpt box */}
            <PromptBox isLoading={isLoading} setIsLoading={setIsLoading} />
            <p className="text-xs absolute text-gray-500 bottom-1">AI generated, for refrence only.</p>
        </div>
      </div>
    </div>
  );
}
