'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [form, setForm] = useState({ usuario: '', contraseña: '' });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) router.push('/registrar');
    else alert(data.message || 'Error al iniciar sesión');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-200 via-white to-indigo-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">Iniciar Sesión JUDAGE</h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <input
            name="usuario"
            placeholder="Usuario"
            value={form.usuario}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          {/* Input de contraseña con ojo */}
          <div className="relative">
            <input
              name="contraseña"
              type={showPassword ? 'text' : 'password'}
              placeholder="Contraseña"
              value={form.contraseña}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none pr-10"
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-all"
          >
            Ingresar
          </button>
        </form>
        <p className="text-center mt-4">
          <a href="/recuperar" className="text-indigo-500 hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
        </p>
      </div>
    </div>
  );
}
