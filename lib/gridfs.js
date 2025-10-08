import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';
import { mongoClient } from './mongodbAtlas';

let bucket;

export const getGridFSBucket = async () => {
  if (!bucket) {
    const client = await mongoClient;
    const db = client.db();
    bucket = new GridFSBucket(db, { bucketName: 'pdf' });
  }
  return bucket;
};
