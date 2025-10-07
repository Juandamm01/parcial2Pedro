import { connectAtlas } from '../../../lib/mongodbAtlas';
import Usuario from '../../../models/Usuario';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  await connectAtlas();

  const { email } = req.body;
  const usuario = await Usuario.findOne({ email });
  if (!usuario) return res.status(404).json({ message: 'Correo no registrado' });

  const token = crypto.randomBytes(32).toString('hex');
  usuario.resetToken = token;
  usuario.resetTokenExp = Date.now() + 3600000; // 1 hora
  await usuario.save();

  const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/restablecer?token=${token}`;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"JUDAGE Soporte" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Restablecer contraseña',
    html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
           <a href="${resetLink}">${resetLink}</a>`,
  });

  res.status(200).json({ message: 'Correo enviado. Revisa tu bandeja de entrada.' });
}
