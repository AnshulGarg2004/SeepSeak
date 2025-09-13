import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

const ChatLabel = ({ openmenu, setopenmenu }) => {
  const handleMenuToggle = () => {
    setopenmenu(prev => ({ open: !prev.open }));
  };

  return (
    <div className='flex items-center justify-between p-2 text-white/80 hover:bg-white/10 rounded-lg text-sm group cursor-pointer'>
      <p className='truncate max-w-[80%]'>
        Chat Name here
      </p>

      {/* Menu Button */}
      <div className='relative flex items-center justify-center h-6 w-6 hover:bg-black/80 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity' onClick={handleMenuToggle}>
        <Image
          src={assets.three_dots}
          className='w-4'
          alt="three dots"
        />

        {/* Dropdown Menu */}
        {openmenu.open && (
          <div className='absolute right-0 top-7 bg-[#2a2d35] rounded-md w-28 py-1 z-50 shadow-xl border border-white/10'>
            <div className='flex items-center gap-2 hover:bg-white/10 px-2 py-1.5 text-xs cursor-pointer'>
              <Image src={assets.pencil_icon} alt="rename" className='w-3.5' />
              <p>Rename</p>
            </div>
            <div className='flex items-center gap-2 hover:bg-white/10 px-2 py-1.5 text-xs cursor-pointer'>
              <Image src={assets.delete_icon} alt="delete" className='w-3.5' />
              <p>Delete</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatLabel;
