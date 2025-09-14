import { getAuth } from "@clerk/nextjs/server";
import OpenAI from "openai";
export const maxDuration = 60;
import { NextResponse } from 'next/server';
import Chat from "@/models/Chat";
import ConnectDb from "@/config/db";

const openAI = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DEEPSEEK_API_KEY
})

export async function POST(req) {
    try {
        const {userId} = getAuth(req)
        
        if(!userId) {
            return NextResponse.json({success: false, message: "User not authenticated"}, {status: 401});
        }
        
        const {chatId, prompt} = await req.json();
        
        if (!chatId || !prompt) {
            return NextResponse.json({success: false, message: "Missing required fields"}, {status: 400});
        }
        
        await ConnectDb();
        const data = await Chat.findOne({userId, _id: chatId });
        
        if (!data) {
            return NextResponse.json({success: false, message: "Chat not found"}, {status: 404});
        }
        
        const userMessage = {
            role: "user",
            content: prompt,
            timestamp: Date.now()
        };
        data.messages.push(userMessage);

        const completion = await openAI.chat.completions.create({
            messages: [{role: 'user', content: prompt}],
            model: 'deepseek-chat',
            store: true
        })

        if (!completion.choices || completion.choices.length === 0) {
            return NextResponse.json({success: false, message: "No AI response"}, {status: 500});
        }

        const message = completion.choices[0].message;
        message.timestamp = Date.now();
        data.messages.push(message);

        await data.save();
        return NextResponse.json({success: true, data: message});
    }
    catch(error) {
        console.error('AI Chat Error:', error);
        return NextResponse.json({success: false, message: "Internal server error"}, {status: 500});
    }
}