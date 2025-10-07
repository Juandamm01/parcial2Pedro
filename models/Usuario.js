const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  usuario: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  resetToken: { type: String, default: null },
  resetTokenExp: { type: Date, default: null },
});

module.exports = mongoose.models.Usuario || mongoose.model('Usuario', usuarioSchema);
