import Chat from "@/models/Chat";
import ConnectDb from "@/config/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        const {userId} = getAuth(req);
        if(!userId) {
            return NextResponse.json({success: false, message: "user not authenticated"});
        }
        // connect db and get all chats of user
        await ConnectDb();
        const data = await Chat.find({userId});
        return NextResponse.json({success: true,data});
    }
    catch(err) {
        console.error('Get chats error:', err);
        return NextResponse.json({success: false, message: "Internal server error"}, {status: 500});
    }
}