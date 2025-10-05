const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  descripcion: { type: String, required: true },
  stock: { type: Number, required: true },
  imagenBase64: { type: String }, // 👈 opcional, pero válido
});

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);