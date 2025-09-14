import User from "@/models/User";
import { Webhook } from "svix";
import ConnectDb from "@/config/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const wh = new Webhook(process.env.SIGNING_SECRET || process.env.CLERK_WEBHOOK_SECRET)
        const headerPayload = await headers();
        const svixHeaders = {
            'svix-id': headerPayload.get('svix-id'),
            'svix-timestamp' : headerPayload.get('svix-timestamp'),
            'svix-signature': headerPayload.get('svix-signature')
        }

        const payload = await req.json();
        const body = JSON.stringify(payload)
        const {data, type} = wh.verify(body, svixHeaders);

        await ConnectDb();
        
        const userData = {
            _id: data.id,
            email: data.email_addresses?.[0]?.email_address,
            name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
            image: data.image_url || ''
        };
        
        

        switch(type) {
            case 'user.created':
                const newUser = await User.create(userData);
                console.log('User created:', newUser);
                break;
            case 'user.updated':
                const updatedUser = await User.findByIdAndUpdate(data.id, userData, { new: true });
                console.log('User updated:', updatedUser);
                break;
            case 'user.deleted':
                const deletedUser = await User.findByIdAndDelete(data.id);
                console.log('User deleted:', deletedUser);
                break;
            default:
                console.log('Unknown event type:', type);
                break;
        }
        return NextResponse.json({message: 'Event received'}, {status: 200})
    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json({error: 'Webhook failed'}, {status: 400})
    }
}