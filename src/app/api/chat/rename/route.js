import ConnectDb from "@/config/db";
import Chat from "@/models/Chat";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const {userId} = getAuth(req);

        if(!userId) {
            return NextResponse.json({success: false, message: "user not authenticated"});
        }

        const {chatId, name} = await req.json();
        
        if (!chatId || !name) {
            return NextResponse.json({success: false, message: "Missing required fields"}, {status: 400});
        }
        
        await ConnectDb();

        const result = await Chat.findOneAndUpdate({_id: chatId, userId},{title: name}, {new: true});
        
        if (!result) {
            return NextResponse.json({success: false, message: "Chat not found"}, {status: 404});
        }

        return NextResponse.json({success: true, message: "chat renamed successfully"});
    }
    catch(err) {
        return NextResponse.json({success: false, message: err.message});
    }
    
}