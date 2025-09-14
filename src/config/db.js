import mongoose from "mongoose";

let cached = global.mongoose || {conn: null, promise: null};

export default async function ConnectDb() {
    if(cached.conn) return cached.conn;
    
    if(!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI is not defined');
    }
    
    if(!cached.promise) {
        cached.promise = mongoose.connect(process.env.MONGODB_URI);
    }
    
    try {
        cached.conn = await cached.promise;
        global.mongoose = cached;
        console.log('MongoDB connected successfully');
    } catch(error) {
        console.error('Error connecting to MongoDB:', error);
        cached.promise = null;
        throw error;
    }

    return cached.conn;
}