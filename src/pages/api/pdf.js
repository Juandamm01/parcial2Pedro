// src/pages/api/pdf.js
import { connectAtlas } from '../../../lib/mongodbAtlas';
import Product from '../../../models/Product';
import PDFDocument from 'pdfkit';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  try {
    await connectAtlas();
    const products = await Product.find();
    if (!products.length) return res.status(404).json({ message: 'No hay productos' });

    const doc = new PDFDocument({ autoFirstPage: true });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="inventario.pdf"');

    doc.pipe(res);

    doc.fontSize(20).text('Inventario de Productos', { align: 'center' });
    doc.moveDown();

    for (const p of products) {
      doc.fontSize(14).text(`Nombre: ${p.nombre}`);
      doc.text(`Precio: $${p.precio}`);
      doc.text(`Descripción: ${p.descripcion}`);
      doc.text(`Stock: ${p.stock}`);

      if (p.imagenBase64 && p.imagenBase64.startsWith('data:image')) {
        try {
          const base64Data = p.imagenBase64.replace(/^data:image\/\w+;base64,/, '');
          const imgBuffer = Buffer.from(base64Data, 'base64');
          doc.moveDown(0.5);
          doc.image(imgBuffer, { width: 150, height: 150 });
          doc.moveDown();
        } catch (imgErr) {
          console.error('Error cargando imagen de producto:', p.nombre, imgErr);
        }
      } else {
        doc.moveDown(1);
      }

      doc.moveDown();
    }

    doc.end();
  } catch (err) {
    console.error('Error generando PDF:', err);
    res.status(500).json({ message: 'Error generando PDF' });
  }
}
