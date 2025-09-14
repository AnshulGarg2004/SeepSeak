"use client"
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '@/assets/assets'
import { useAppContext } from '@/context/AppContext';
import Image from 'next/image'
import React from 'react'

const ChatLabel = ({ openMenu, setOpenMenu, id, name = "Chat Name here"}) => {
  const handleMenuToggle = () => {
    setOpenMenu(prev => ({ open: !prev.open }));
  };
  
  const {fetchUserChat} = useAppContext()
  
  const selectChat = () => {
    // Chat selection logic can be implemented here
    console.log('Selected chat:', id);
  }

  const handleRename = async () => {
    const newName = prompt("Enter new name", name);
    if(!newName) return toast.error("Name cannot be empty");
    try {
      const {data} = await axios.put('/api/chat/rename', {
        chatId: id,
        name: newName
      })
      if(data.success) {
        setOpenMenu({id: 0, open: false})
        toast.success(data.message);
        fetchUserChat();
      } else {
        toast.error(data.message);
      }
    } catch(error) {
      toast.error(error.message);
    }
  }
  
  const handleDelete = async () => {
    if(window.confirm("Are you sure you want to delete this chat?")) {
      try {
        const {data} = await axios.delete(`/api/chat/delete/${id}`)
        if(data.success) {
          setOpenMenu({id: 0, open: false})
          toast.success(data.message);
          fetchUserChat();
        } else {
          toast.error(data.message);
        }
      } catch(error) {
        toast.error(error.message);
      }
    }
  }
  
  return (
    <div onClick={selectChat} className='flex items-center justify-between p-2 text-white/80 hover:bg-white/10 rounded-lg text-sm group cursor-pointer'>
      <p className='truncate max-w-[80%]'>
        {name}
      </p>

      {/* Menu Button */}
      <div onClick={(e) => {e.stopPropagation(); setOpenMenu({id: id, open: !openMenu.open})}} className='relative flex items-center justify-center h-6 w-6 hover:bg-black/80 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity'>
        <Image
          src={assets.three_dots}
          className='w-4'
          alt="three dots"
          width={16}
          height={16}
        />

        {/* Dropdown Menu */}
        {openMenu.open && openMenu.id === id && (
          <div className='absolute right-0 top-7 bg-[#2a2d35] rounded-md w-28 py-1 z-50 shadow-xl border border-white/10'>
            <div onClick={handleRename} className='flex items-center gap-2 hover:bg-white/10 px-2 py-1.5 text-xs cursor-pointer'>
              <Image src={assets.pencil_icon} alt="rename" className='w-3.5' width={14} height={14} />
              <p>Rename</p>
            </div>
            <div onClick={handleDelete} className='flex items-center gap-2 hover:bg-white/10 px-2 py-1.5 text-xs cursor-pointer'>
              <Image src={assets.delete_icon} alt="delete" className='w-3.5' width={14} height={14} />
              <p>Delete</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatLabel;