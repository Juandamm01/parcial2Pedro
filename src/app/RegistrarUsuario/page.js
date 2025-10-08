'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; 

export default function RegistroUsuario() {
  const [form, setForm] = useState({ usuario: '', email: '', contraseña: '' });
  const router = useRouter();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/RegistrarUsuario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      alert('Usuario creado correctamente');
      router.push('/login'); 
    } else {
      alert(data.message || 'Error al registrar usuario');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-400 via-purple-400 to-indigo-600 text-black">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">Registro de Usuario</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="usuario" placeholder="Usuario" value={form.usuario} onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none" required />
          <input name="email" type="email" placeholder="Correo electrónico" value={form.email} onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none" required />
          <input name="contraseña" type="password" placeholder="Contraseña" value={form.contraseña} onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none" required />
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-all">
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}
