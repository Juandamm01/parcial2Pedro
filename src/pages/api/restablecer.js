import { connectAtlas } from '../../../lib/mongodbAtlas';
import Usuario from '../../../models/Usuario';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  await connectAtlas();

  const { token, contraseña } = req.body;
  const usuario = await Usuario.findOne({
    resetToken: token,
    resetTokenExp: { $gt: Date.now() },
  });

  if (!usuario) return res.status(400).json({ message: 'Token inválido o expirado' });

  usuario.contraseña = contraseña;
  usuario.resetToken = null;
  usuario.resetTokenExp = null;
  await usuario.save();

  res.status(200).json({ message: 'Contraseña actualizada correctamente' });
}
