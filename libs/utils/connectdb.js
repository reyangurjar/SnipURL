
import mongoose from "mongoose"
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export default async function dbConnect() {
  if (cached.conn) {
    console.log("connected to previous mongodb session")

    return cached.conn;
  }

  if(process.env.MONGO_URI !== null){


  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
        dbName: "SnipUrlDB",
   
    };
    cached.promise = mongoose.connect(process.env.MONGO_URI, opts).then((mongoose) => {
      console.log("connected to mongodb")
      return mongoose;
    }).catch((err)=> console.log(err));
  }
}
  else{
    console.log("MongoDB URI not found")
  }
  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  
}
