'use client';
import { useState } from 'react';

export default function Recuperar() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/recuperar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    alert(data.message);
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', paddingTop: '50px' }}>
      <h2>Recuperar contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Correo registrado" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button type="submit">Enviar enlace</button>
      </form>
    </div>
  );
}
