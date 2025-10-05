import { connectAtlas } from '../../../lib/mongodbAtlas';
import Usuario from '../../../models/Usuario';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    await connectAtlas();

    const { usuario, contraseña } = req.body;

    const existe = await Usuario.findOne({ usuario });
    if (existe) {
      return res.status(409).json({ message: 'El usuario ya existe' });
    }

    const nuevoUsuario = new Usuario({ usuario, contraseña });
    await nuevoUsuario.save();

    res.status(201).json({ message: 'Usuario registrado correctamente' });
} catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error en el servidor', error });
}
}