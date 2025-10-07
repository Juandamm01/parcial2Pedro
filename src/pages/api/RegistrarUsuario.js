import { connectAtlas } from '../../../lib/mongodbAtlas';
import Usuario from '../../../models/Usuario';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  try {
    await connectAtlas();

    const { usuario, email, contraseña } = req.body;

    if (!usuario || !email || !contraseña) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const existe = await Usuario.findOne({ $or: [{ usuario }, { email }] });
    if (existe) {
      return res.status(409).json({ message: 'El usuario o el correo ya existen' });
    }

    const nuevoUsuario = new Usuario({ usuario, email, contraseña });
    await nuevoUsuario.save();

    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('❌ Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
}
