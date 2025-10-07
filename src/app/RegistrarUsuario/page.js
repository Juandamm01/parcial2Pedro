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
    <div style={{ maxWidth: '400px', margin: 'auto', paddingTop: '50px' }}>
      <h2>Registro de Usuario JUDAGE</h2>
      <form onSubmit={handleSubmit}>
        <input name="usuario" placeholder="Usuario" value={form.usuario} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Correo" value={form.email} onChange={handleChange} required />
        <input name="contraseña" type="password" placeholder="Contraseña" value={form.contraseña} onChange={handleChange} required />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}
