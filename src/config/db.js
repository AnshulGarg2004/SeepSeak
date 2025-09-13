import mongoose from "mongoose";

let cached = global.mongoose || {conn: null, promise: null};

export default async function Conncetdb() {
    if(cached.conn) return cached.conn;
    if(!cached.promise) {
        cached.promise = mongoose.connect(process.env.MONGODB_URI).then((moongose) => mongoose);

    }
    try {
        cached.conn = await cached.promise;
    }
    catch(error) {
        console.log("Error connceting mongodb" + error );
    }

    return cached.conn;
}