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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-400 via-purple-400 to-indigo-600">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">Recuperar Contraseña</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Correo registrado" value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none" required />
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-all">
            Enviar enlace
          </button>
        </form>
      </div>
    </div>
  );
}
