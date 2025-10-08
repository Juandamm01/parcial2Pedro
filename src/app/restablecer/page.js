'use client';
import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

export default function Restablecer() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get('token');

  const [contraseña, setContraseña] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/restablecer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, contraseña }),
    });
    const data = await res.json();
    alert(data.message);
    if (res.ok) router.push('/login');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6 text-black">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700">
          Restablecer contraseña
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nueva contraseña
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
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
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-all shadow-md"
          >
            Guardar contraseña
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-5">
          ¿Recordaste tu contraseña?{' '}
          <a
            href="/login"
            className="text-indigo-600 hover:underline font-medium"
          >
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
}
