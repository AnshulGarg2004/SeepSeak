"use client"
import { useAuth, useUser } from "@clerk/nextjs";
import { createContext, useContext, useEffect, useState, useCallback } from "react"
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext)
}

export const AppContextProvider = ({children}) => {
    const {user, isLoaded} = useUser();
    const {getToken} = useAuth();

    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);

    const createNewChat = useCallback(async () => {
        try {
            if(!user) {
               return null; 
            }
            const token = await getToken();
            
            if (!token) {
                throw new Error('Authentication token not available');
            }

            await axios.post('/api/chat/create', {}, {headers: {
                Authorization: `Bearer ${token}`
            }});
            
            await fetchUserChat();
        }
        catch(error) {
            toast.error(error.message);
        }
    }, [user, getToken]);

    const fetchUserChat = useCallback(async () => {
        try {
            const token = await getToken();
            
            if (!token) {
                throw new Error('Authentication token not available');
            }
            
            const {data} = await axios.get('/api/chat/get', {headers: {
                Authorization: `Bearer ${token}`
            }});
            
            if(data.success) {
                setChats(data.data);
                
                if(data.data.length === 0) {
                    await createNewChat();
                } else {
                    data.data.sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt));
                    setSelectedChat(data.data[0]);
                }
            } else {
                toast.error(data.message);
            }
        }
        catch(error) {
            toast.error(error.message); 
        }
    }, [getToken, createNewChat]);

    useEffect(() => {
        if(user && isLoaded) {
            fetchUserChat();
        }
    }, [user, isLoaded, fetchUserChat]);

    const value = {
        user,
        isLoaded,
        chats, 
        setChats, 
        selectedChat, 
        setSelectedChat, 
        fetchUserChat, 
        createNewChat
    }
    
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}