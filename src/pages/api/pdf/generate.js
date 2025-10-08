import { getGridFSBucket } from '@/lib/gridfs';
import connectDB from '@/lib/mongodbAtlas';
import Product from '@/models/Product';
import PDFDocument from 'pdfkit';
import stream from 'stream';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).send('Método no permitido');

  await connectDB();
  const products = await Product.find();

  const bucket = await getGridFSBucket();
  const doc = new PDFDocument();
  const passThrough = new stream.PassThrough();

  doc.pipe(passThrough);

  doc.fontSize(18).text('Inventario de Productos', { align: 'center' });
  doc.moveDown();

  products.forEach((product) => {
    doc.fontSize(12).text(`Nombre: ${product.name}`);
    doc.text(`Precio: $${product.price}`);
    doc.text(`Stock: ${product.stock}`);
    doc.moveDown();
  });

  doc.end();

  const uploadStream = bucket.openUploadStream('inventario.pdf');
  passThrough.pipe(uploadStream);

  uploadStream.on('finish', () => {
    res.status(200).json({ message: 'PDF generado y guardado con éxito.' });
  });

  uploadStream.on('error', (err) => {
    res.status(500).json({ message: 'Error al guardar el PDF', error: err });
  });
}
