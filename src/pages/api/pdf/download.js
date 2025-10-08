import { getGridFSBucket } from '@/lib/gridfs';

export default async function handler(req, res) {
  const { filename } = req.query;
  if (!filename) return res.status(400).send('Nombre de archivo requerido');

  const bucket = await getGridFSBucket();
  const downloadStream = bucket.openDownloadStreamByName(filename);

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=${filename}`);

  downloadStream.pipe(res);
}
