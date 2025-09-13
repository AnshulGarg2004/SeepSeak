import { assets } from '@/assets/assets'
import { useAppContext } from '@/context/AppContext'
import Image from 'next/image'
import React, { useState } from 'react'

const PromtBox = ({isloading, setisloading}) => {
    const [promt, setpromt] = useState("");
    const { user } = useAppContext();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!promt.trim() || !user) return;
        
        setisloading(true);
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user._id, message: promt })
            });
            
            if (response.ok) {
                setpromt("");
            }
        } catch (error) {
            console.error('Error saving message:', error);
        } finally {
            setisloading(false);
        }
    };
  return (
    <form onSubmit={handleSubmit} className={`w-full ${false ? 'max-w-3xl' : 'max-w-2xl'} bg-[#404045] p-4 rounded-3xl mt-4 transition-all`}>
        <textarea className='outline-none w-full resize-none overflow-hidden break-words bg-transparent text-white placeholder:text-gray-400' rows={2} placeholder="Message SeepSeak" onChange={(e) => setpromt(e.target.value)} value={promt} required></textarea>
        <div className='flex items-center justify-between text-sm'>
            <div className='flex items-center gap-2'>
                <p className='flex items-center gap-2 text-xs border border-gray-300/40 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20 transition'>
                    <Image src={assets.deepthink_icon} alt="deepthink icon" className='h-5 ' />
                    SeepThink (R1)
                </p>

                <p className='flex items-center gap-2 text-xs border border-gray-300/40 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20 transition'>
                    <Image src={assets.search_icon} alt="deepthink icon" className='h-5 ' />
                    Search
                </p>
            </div>
            <div className='flex items-center gap-2'>
                <Image src={assets.pin_icon} alt="pin icon" className='w-4 cursor-pointer'/>
                <button type="submit" disabled={!promt.trim() || isloading} className={`${promt ? 'bg-primary' : 'bg-[#71717a]'} rounded-full p-2 cursor-pointer disabled:opacity-50`}>
                    <Image className='w-3.5 aspect-square' src={promt ? assets.arrow_icon : assets.arrow_icon_dull} alt="arrow icon" />
                </button>
            </div>
        </div>
    </form>
  )
}

export default PromtBox
