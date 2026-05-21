const mongoose = require('mongoose');

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  try {
    cached.promise = mongoose.connect(process.env.MONGO_URL);
    cached.conn = await cached.promise;

    console.log("✅ MongoDB Connected");

    return cached.conn;
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err.message);
    throw err;
  }
}

module.exports = connectDB;