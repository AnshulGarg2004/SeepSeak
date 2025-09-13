import Chat from "@/models/Chat";
import Conncetdb from "@/config/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await Conncetdb();
    const { userId, message } = await req.json();

    if (!userId || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let chat = await Chat.findOne({ userId }).sort({ createdAt: -1 });
    
    if (!chat) {
      chat = new Chat({
        userId,
        title: message.substring(0, 50) + "...",
        messages: []
      });
    }

    chat.messages.push({
      role: 'user',
      content: message
    });

    chat.messages.push({
      role: 'assistant',
      content: "I'm processing your request..."
    });

    await chat.save();

    return NextResponse.json({ success: true, chat }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}