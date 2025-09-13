"use client"
import { assets } from "@/assets/assets";
import Message from "@/components/Message";
import PromtBox from "@/components/PromtBox";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [message, setmessage] = useState([]);
  const [isloading, setisloading] = useState(false);
  const [expand, setexpand] = useState(false);
  return (
    <div>
      <div className="flex h-screen">
        {/* --sidebar-- */}
        <Sidebar expand={expand} setexpand={setexpand}/>
        <div className="flex-1 flex items-center flex-col justify-center px-4 pb-8 bg-[#292a2d] text-white relative">
          <div className="md:hidden absolute items-center top-6 flex px-4 justify-between w-full">
            <Image onClick={() => (expand ? setexpand(false) : setexpand(true))} className="rotate-180" src={assets.menu_icon} alt="menu icon" />
            <Image className="opacity-70" src={assets.chat_icon} alt="chat icon" />
          </div>
          {message.length !== 0 ?
            <>
            <div className="items-center flex  gap-3">
              <Image src={assets.logo_icon} alt="logo" className="h-16" />
            <p className="text-2xl font-medium ">Hi! I'm SeepSeak.</p>
            </div>
            <p className="text-sm mt-2">How can I help you today?</p>
            </> : 
            (
              <div>
                <Message role='ai' content='What day is today'/>
              </div>
            )}
            {/* --promtpt box */}
            <PromtBox isloading={isloading} setisloading={setisloading} />
            <p className="text-xs absolute text-gray-500 bottom-1">AI generated, for refrence only.</p>
        </div>
      </div>
    </div>
  );
}
