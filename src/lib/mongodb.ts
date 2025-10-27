import mongoose from "mongoose";
const MONGODB_URI =
  "mongodb+srv://Arsot:K%40L2Um%2A%21QC0cUffzq@cluster0.vy5hzeu.mongodb.net/arsot?retryWrites=true&w=majority";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGO_DB_URI environment variable inside .env.local"
  );
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
const cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function dbConnect() {
  console.log("🔄 dbConnect called");

  if (cached.conn) {
    console.log("✅ Using cached MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log(
      "🔄 Creating new MongoDB connection to:",
      MONGODB_URI.substring(0, 50) + "..."
    );
    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log("✅ MongoDB connection established successfully");
        return mongoose;
      })
      .catch((error) => {
        console.error("❌ MongoDB connection failed:", error);
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
    console.log("✅ MongoDB connection ready");
  } catch (e) {
    console.error("❌ Error in dbConnect:", e);
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
