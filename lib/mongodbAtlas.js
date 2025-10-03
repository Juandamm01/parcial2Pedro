import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_ATLAS_URI;

if (!MONGO_URI) {
  throw new Error('Por favor define MONGO_ATLAS_URI en .env.local');
}

let cached = global.mongooseAtlas;

if (!cached) {
  cached = global.mongooseAtlas = { conn: null, promise: null };
}

export async function connectAtlas() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      bufferCommands: false,
      dbName: 'parcial2',
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}