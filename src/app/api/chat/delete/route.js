import Conncetdb from "@/config/db";
import Chat from "@/models/Chat";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const {userID} = getAuth();
        const {chatId} = await req.json();
        
        // Validate chatId is a string to prevent NoSQL injection
        if (typeof chatId !== 'string' || !chatId.trim()) {
            return NextResponse.json({success: false, message: "Invalid chat ID"}, {status: 400});
        }

        if(!userID) {
            return NextResponse.json({success: false, message: "user not authenticated"});
        }
        await Conncetdb();

        await Chat.deleteOne({_id: chatId, userID});

        return NextResponse.json({success: true, message: "chat deleted successfully"});
    }
    catch(err) {
        return NextResponse.json({success: false, message: err.message});
    }
    
}