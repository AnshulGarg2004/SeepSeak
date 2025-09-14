import ConnectDb from "@/config/db";
import Chat from "@/models/Chat";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';

export async function DELETE(req, { params }) {
    try {
        const {userId} = getAuth(req);
        
        if(!userId) {
            return NextResponse.json({success: false, message: "User not authenticated"}, {status: 401});
        }
        
        const chatId = params.id;
        
        if (typeof chatId !== 'string' || !chatId.trim()) {
            return NextResponse.json({success: false, message: "Invalid chat ID"}, {status: 400});
        }
        
        await ConnectDb();
        
        const result = await Chat.deleteOne({_id: chatId, userId});
        
        if (result.deletedCount === 0) {
            return NextResponse.json({success: false, message: "Chat not found"}, {status: 404});
        }
        
        return NextResponse.json({success: true, message: "Chat deleted successfully"});
    }
    catch(err) {
        console.error('Delete Error:', err);
        return NextResponse.json({success: false, message: "Internal server error"}, {status: 500});
    }
}