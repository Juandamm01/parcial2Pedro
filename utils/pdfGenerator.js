import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export default function generarPDF(producto) {
  const doc = new PDFDocument();
  const filePath = path.join(process.cwd(), 'public', `${producto.nombre}.pdf`);
  const stream = fs.createWriteStream(filePath);

  doc.pipe(stream);

  // Título
  doc.fontSize(20).text('📦 Registro de Producto', { align: 'center' });
  doc.moveDown();

  // Datos del producto
  doc.fontSize(14).text(`Nombre: ${producto.nombre}`);
  doc.text(`Precio: $${producto.precio}`);
  doc.text(`Descripción: ${producto.descripcion}`);
  doc.text(`Stock: ${producto.stock}`);
  doc.moveDown();

  // Imagen embebida en Base64
  if (producto.imagenBase64) {
    try {
      doc.image(producto.imagenBase64, {
        fit: [200, 200],
        align: 'center',
        valign: 'center',
      });
    } catch (err) {
      console.error('❌ Error al insertar imagen en PDF:', err);
      doc.text('⚠️ No se pudo mostrar la imagen.');
    }
  } else {
    doc.text('⚠️ No se recibió imagen.');
  }

  doc.end();

  stream.on('finish', () => {
    console.log(`✅ PDF generado: ${filePath}`);
  });
}