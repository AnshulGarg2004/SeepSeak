import ConnectDb from "@/config/db";
import Chat from "@/models/Chat";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const {userId} = getAuth(req)
    if(!userId) {
      return NextResponse.json({success: false, message: "user not authenticated"})
    }
    // prepare chat data to be stored in database
    const chatData = {
      userId, 
      messages: [], 
      title: "New Chat"
    };

    await ConnectDb();
    await Chat.create(chatData);

    return NextResponse.json({success: true, message: "Chat created successfully"})
  } 
  catch(err) {
    return NextResponse.json({success: false, message: err.message})
  }
}