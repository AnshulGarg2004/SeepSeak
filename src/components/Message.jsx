"use client"
import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'
import { toast } from 'react-toastify';

const Message = ({ role, content }) => {
  const copyMsg = async () => {
    try {
      if (!content || typeof content !== 'string') {
        toast.error('No content to copy');
        return;
      }
      await navigator.clipboard.writeText(content);
      toast.success('Copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy');
    }
  }

  return (
    <div className='flex flex-col items-center w-full max-w-3xl text-sm'>
      <div className={`flex flex-col w-full mb-8 ${role === 'user' && 'items-end'}`}>
        <div className={`group relative flex max-w-2xl rounded-xl ${role === 'user' ? 'bg-[#414158] px-5 py-3' : 'gap-3'}`}>
          <div className={`opacity-0 group-hover:opacity-100 absolute ${role === 'user' ? '-left-14 top-3' : 'left-9 -bottom-7'} transition-opacity duration-200`}>
            <div className='flex items-center gap-2 opacity-70'>
              {role === 'user' ? (
                <>
                  <Image onClick={copyMsg} src={assets.copy_icon} alt="copy" className="w-4 cursor-pointer" width={16} height={16} />
                  <Image src={assets.pencil_icon} alt="pencil" className="w-4 cursor-pointer" width={16} height={16} />
                </>
              ) : (
                <>
                  <Image onClick={copyMsg} src={assets.copy_icon} alt="copy" className="w-4 cursor-pointer" width={16} height={16} />
                  <Image src={assets.regenerate_icon} alt="regenerate" className="w-4 cursor-pointer" width={16} height={16} />
                  <Image src={assets.like_icon} alt="like" className="w-4 cursor-pointer" width={16} height={16} />
                  <Image src={assets.dislike_icon} alt="dislike" className="w-4 cursor-pointer" width={16} height={16} />
                </>
              )}
            </div>
          </div>
          {role === 'user' ? (
            <span className='text-white/90'>{content}</span>
          ) : (
            <>
              <Image src={assets.logo_icon} alt='logo' className='h-9 w-9 p-1 border border-white/15 rounded-full' width={36} height={36} />
              <div className='space-y-4 w-full overflow-hidden'>
                <div className='text-white/90 whitespace-pre-wrap'>{content}</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Message