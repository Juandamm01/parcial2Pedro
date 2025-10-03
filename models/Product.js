import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  nombre: String,
  precio: Number,
  descripcion: String,
  foto: String,
  stock: Number,
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);