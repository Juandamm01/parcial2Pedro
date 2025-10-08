import { connectAtlas } from '../../../lib/mongodbAtlas';
import Product from '../../../models/Product';

export default async function handler(req, res) {
  try {
    await connectAtlas();

    switch (req.method) {
      case 'GET': {
        const products = await Product.find();
        return res.status(200).json(products);
      }

      case 'POST': {
        const newProduct = await Product.create(req.body);
        return res.status(201).json(newProduct);
      }

      case 'PUT': {
        const updated = await Product.findByIdAndUpdate(req.body._id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: 'Producto no encontrado' });
        return res.status(200).json(updated);
      }

      case 'DELETE': {
        const deleted = await Product.findByIdAndDelete(req.query.id);
        if (!deleted) return res.status(404).json({ message: 'Producto no encontrado' });
        return res.status(200).json({ message: 'Producto eliminado correctamente' });
      }

      default:
        return res.status(405).json({ message: 'Método no permitido' });
    }
  } catch (error) {
    console.error('Error en API /products:', error);
    return res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
}
