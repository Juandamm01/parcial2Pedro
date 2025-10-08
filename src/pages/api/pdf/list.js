import { getGridFSBucket } from '@/lib/gridfs';

export default async function handler(req, res) {
  const bucket = await getGridFSBucket();
  const files = await bucket.find().toArray();
  res.status(200).json(files);
}
