import { assets } from '@/assets/assets'
import { useAppContext } from '@/context/AppContext'
import Image from 'next/image'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const PromptBox = ({isLoading, setIsLoading}) => {
    const [prompt, setPrompt] = useState("");
    const { user, chats } = useAppContext();
    const handleKeyDown = (e) => {
        if(e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendPromt(e);
        }
    }
    // const {user} = useAppContext();
    const sendPromt = async (e) => {
        const promtCopy = promt;
        try {
            e.preventDefault();
            if(!user) {
                return toast.error("login to sed message");
            }
            if(isLoading) return toast.error("wait for previous message to be completed");
            setIsLoading(true);
            setPrompt("");

            const useprompt = {
                role: 'user', 
                content: prompt,
                timestamp: Date.now()
            }
            setchats((prev) => prev.map((chat) => chat._id === selectchat._id ? {...chat, messages: [...chat.messages, useprompt]} : chat))
            setSelectedChat((prev) => ({...prev, messages: [...prev.messages, useprompt]}))
            const {data} = await axios.post('/api/chat/ai', {
                chatId: selectchat._id,
                prompt: prompt
            })
            if(data.success) {
                setchats((prev) => prev.map((chat) => chat._id === selectchat._id ? {...chat, messages: [...chat.messages, data.data]} : chat))
                const message = data.data.content;
                const messageToken = message.split(" ");
                let assistantMsg = {
                    role: 'assistant',
                    content: "",
                    timestamp: Date.now()
                }
                setSelectedChat((prev) =>( {
                    ...prev, 
                    messages: [...prev.messages, assistantMsg]
                }))

                for (let i = 0;i<messageToken.length; i++) {
                    setTimeout(() => {
                        assistantMsg.content = messageToken.slice(0, i + 1).join(" ");
                        setSelectedChat((prev) => {
                            const updatedMsg = [
                                ...prev.messages.slice(0, -1), assistantMsg]
                            
                            return {...prev, messages: updatedMessages}
                        })
                    }, 100 * i)
                }
            }
            else {
                toast.error(data.message);
                setPrompt(promtCopy);
            }
        }
        catch(error) {
            toast.error(error.message);
            setPrompt(promtCopy);
        }
        finally {
            setIsLoading(false)
        }

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!prompt.trim() || !user) return;
        
        setIsLoading(true);
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user._id, message: prompt })
            });
            
            if (response.ok) {
                setPrompt("");
            }
        } catch (error) {
            console.error('Error saving message:', error);
        } finally {
            setIsLoading(false);
        }
    };
  return (
    <form onSubmit={sendPromt} className={`w-full ${selectchat ? 'max-w-3xl' : 'max-w-2xl'} max-w-2xl bg-[#404045] p-4 rounded-3xl mt-4 transition-all`}>
        <textarea onKeyDown={handleKeyDown}
        className='outline-none w-full resize-none overflow-hidden break-words bg-transparent text-white placeholder:text-gray-400' rows={2} placeholder="Message SeepSeak" onChange={(e) => setPrompt(e.target.value)} value={prompt} required></textarea>
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
                <button type="submit" disabled={!prompt.trim() || isLoading} className={`${prompt ? 'bg-primary' : 'bg-[#71717a]'} rounded-full p-2 cursor-pointer disabled:opacity-50`}>
                    <Image className='w-3.5 aspect-square' src={prompt ? assets.arrow_icon : assets.arrow_icon_dull} alt="arrow icon" />
                </button>
            </div>
        </div>
    </form>
  )
}

export default PromptBox
