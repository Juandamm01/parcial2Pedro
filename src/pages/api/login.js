import { connectAtlas } from '../../../lib/mongodbAtlas';
import Usuario from '../../../models/Usuario';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    await connectAtlas();

    const { usuario, contraseña } = req.body;

    const usuarioEncontrado = await Usuario.findOne({ usuario });

    if (!usuarioEncontrado) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    if (usuarioEncontrado.contraseña !== contraseña) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    res.status(200).json({ message: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error en el servidor', error });
  }
}