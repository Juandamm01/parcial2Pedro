import { connectAtlas } from '../../../lib/mongodbAtlas';
import Product from '../../../models/Product';
import generarPDF from '../../../utils/pdfGenerator'; 
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    await connectAtlas();

    const nuevoProducto = new Product(req.body);
    await nuevoProducto.save();

    generarPDF(req.body); 

    res.status(201).json({ message: 'Producto guardado en MongoDB Atlas y PDF generado' });
  } catch (error) {
    console.error('Error al guardar producto:', error);
    res.status(500).json({ message: 'Error al guardar producto', error });
  }
}