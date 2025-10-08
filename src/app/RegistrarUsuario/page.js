'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

export default function RegistroUsuario() {
  const [form, setForm] = useState({ usuario: '', email: '', contraseña: '' });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!form.usuario.trim()) {
      alert('El nombre de usuario es obligatorio');
      return;
    }
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(form.usuario.trim())) {
      alert('El nombre de usuario no puede contener números ni caracteres especiales');
      return;
    }

  
    const emailRegex = /^[A-Za-z][A-Za-z0-9._%+-]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(form.email.trim())) {
      alert('Ingresa un correo electrónico válido que no comience con un número');
      return;
    }

  
    if (form.contraseña.length < 5) {
      alert('La contraseña debe tener al menos 5 caracteres');
      return;
    }

    
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
          <input
            name="usuario"
            placeholder="Usuario"
            value={form.usuario}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            required
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
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}
