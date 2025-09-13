import { assets } from '@/assets/assets';
import { useAppContext } from '@/context/AppContext';
import { useClerk, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import React, { useState } from 'react';
import ChatLabel from './ChatLabel';

const Sidebar = ({ expand, setexpand }) => {
  const {openSignIn} = useClerk()
  const {user} = useAppContext()
  const [openmenu, setopenmenu] = useState({id: 0, open: false})
  return (
    <div
      className={`
        flex flex-col justify-between
        bg-[#212327] pt-7
        transition-all duration-300
        z-50 h-screen
        ${expand ? 'w-64 px-4' : 'w-0 md:w-20 md:px-2'}
        overflow-hidden relative
      `}
    >
      {/* TOP SECTION */}
      <div>
        {/* Logo and Toggle */}
        <div className={`flex ${expand ? 'flex-row justify-between items-center' : 'flex-col items-center gap-4'} mb-6`}>
          <Image
            src={expand ? assets.logo_text : assets.logo_icon}
            alt="logo"
            className={`transition-all duration-300 ${expand ? 'w-36' : 'w-10'}`}
            width={expand ? 144 : 40}
            height={expand ? 36 : 40}
          />

          {/* Toggle Button */}
          <div
            onClick={() => setexpand(!expand)}
            className={`group relative flex items-center justify-center hover:bg-gray-500/20 transition-all duration-300 h-10 w-10 rounded-lg cursor-pointer ${expand ? '' : 'mt-0'}`}
          >
            <Image src={assets.menu_icon} alt="menu icon" className="md:hidden w-6 h-6" />
            <Image
              src={expand ? assets.sidebar_close_icon : assets.sidebar_icon}
              alt="toggle sidebar"
              className="hidden md:block w-7"
              width={28}
              height={28}
            />

            {/* Tooltip */}
            <div
              className={`
                absolute w-max text-white text-xs px-3 py-2 rounded-lg shadow-lg bg-black
                transition-opacity duration-200 pointer-events-none
                ${expand ? 'top-12 left-1/2 -translate-x-1/2' : '-top-12 left-1/2 -translate-x-1/2'}
                opacity-0 group-hover:opacity-100
              `}
            >
              {expand ? 'Close Sidebar' : 'Open Sidebar'}
              <div
                className={`
                  w-3 h-3 absolute bg-black rotate-45
                  ${expand ? 'top-[-6px] left-1/2 -translate-x-1/2' : 'left-1/2 -translate-x-1/2 -bottom-1.5'}
                `}
              />
            </div>
          </div>
        </div>

        {/* New Chat Button */}
        <button
          className={`flex items-center justify-center cursor-pointer ${
            expand
              ? 'bg-primary hover:opacity-90 rounded-2xl gap-2 p-2.5 w-max'
              : 'group relative h-9 w-9 hover:bg-gray-500/30 rounded-lg mx-auto'
          }`}
        >
          <Image
            src={expand ? assets.chat_icon : assets.chat_icon_dull}
            alt="chat icon"
            className={expand ? 'w-6' : 'w-7'}
          />

          {/* Tooltip */}
          {!expand && (
            <div className='absolute w-max -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition bg-black text-white text-xs px-3 py-2 rounded-lg shadow-lg pointer-events-none'>
              New Chat
              <div className='w-3 h-3 absolute bg-black rotate-45 left-1/2 -translate-x-1/2 -bottom-1.5'></div>
            </div>
          )}

          {expand && <p className='text-white font-medium'>New Chat</p>}
        </button>

        {/* Recents */}
        <div className={`mt-8 text-white/25 text-sm ${expand ? 'block' : 'hidden'}`}>
          <p className='my-1'>Recents</p>
          <ChatLabel openmenu={openmenu} setopenmenu={setopenmenu}/>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="flex flex-col gap-3 pb-6">
        {/* QR + Profile group */}
        <div className="flex flex-col gap-3">
          {/* QR (Get App) — hover only */}
          <div
            className={`
              group relative flex items-center cursor-pointer
              ${expand
                ? 'gap-3 text-white/80 text-sm p-2.5 hover:bg-white/10 rounded-lg'
                : 'h-10 w-10 mx-auto hover:bg-gray-500/30 rounded-lg justify-center'}
            `}
          >
            <Image
              src={expand ? assets.phone_icon : assets.phone_icon_dull}
              alt="phone icon"
              className={expand ? 'w-5' : 'w-6.5'}
            />

            {expand && <span>Get App</span>}

            {/* QR tooltip on hover (for both states) */}
            <div className='absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition z-50 hidden group-hover:block'>
              <div className='relative w-max bg-black text-white text-sm p-3 rounded-lg shadow-lg'>
                <Image src={assets.qrcode} alt="barcode" className='w-44' />
                <p className="text-center text-xs mt-2">Scan to get Seepseak App</p>
                <div className='absolute w-3 h-3 bg-black rotate-45 left-1/2 -translate-x-1/2 -bottom-1.5'></div>
              </div>
            </div>
          </div>

          {/* Profile */}
          <div
          onClick={user ? null: openSignIn}
            className={`
              flex items-center cursor-pointer
              ${expand
                ? 'hover:bg-white/10 p-2 rounded-lg gap-3'
                : 'h-10 w-10 mx-auto hover:bg-gray-500/30 rounded-lg justify-center'}
            `}
          >
            {user ? <UserButton/> :
            <Image src={assets.profile_icon} alt="profile" className='w-7' />}
            {expand && <span className='text-white/70 text-sm'>My Profile</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
