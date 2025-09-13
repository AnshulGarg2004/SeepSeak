import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useState } from 'react'

const PromtBox = ({isloading, setisloading}) => {
    const [promt, setpromt] = useState("");
  return (
    <form className={`w-full ${false ? 'max-w-3xl' : 'max-w-2xl'} bg-[#404045] p-4 rounded-3xl mt-4 transition-all`}>
        <textarea className='outline-none w-full resize-none overflow-hidden break-words bg-transparent' rows={2} pkaceholder="Message SeepSeak" onChange={(e) => setpromt(e.target.value)} value={promt} required></textarea>
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
                <button className={`${promt ? 'bg-primary' : 'bg-[#71717a]'} rounded-full p-2 cursor-pointer`}>
                    <Image className='w-3.5 aspect-square' src={promt ? assets.arrow_icon : assets.arrow_icon_dull} alt="arrow icon" />
                </button>
            </div>
        </div>
    </form>
  )
}

export default PromtBox
