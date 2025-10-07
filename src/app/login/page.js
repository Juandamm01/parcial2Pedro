'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [form, setForm] = useState({ usuario: '', contraseña: '' });
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
    <div style={{ maxWidth: '400px', margin: 'auto', paddingTop: '50px' }}>
      <h2>Iniciar Sesión JUDAGE</h2>
      <form onSubmit={handleSubmit}>
        <input name="usuario" placeholder="Usuario" value={form.usuario} onChange={handleChange} required />
        <input name="contraseña" type="password" placeholder="Contraseña" value={form.contraseña} onChange={handleChange} required />
        <button type="submit">Ingresar</button>
      </form>
      <p style={{ marginTop: '10px' }}>
        <a href="/recuperar">¿Olvidaste tu contraseña?</a>
      </p>
    </div>
  );
}
