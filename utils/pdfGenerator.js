import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export default function generarPDF(producto) {
const doc = new PDFDocument();
const filePath = path.join(process.cwd(), 'public', `${producto.nombre}.pdf`);
const stream = fs.createWriteStream(filePath);

doc.pipe(stream);

    doc.fontSize(20).text('📦 Registro de Producto', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Nombre: ${producto.nombre}`);
    doc.text(`Precio: $${producto.precio}`);
    doc.text(`Descripción: ${producto.descripcion}`);
    doc.text(`Imagen: ${producto.imagen}`);

doc.end();

    stream.on('finish', () => {
    console.log(`PDF generado: ${filePath}`);
  });
}