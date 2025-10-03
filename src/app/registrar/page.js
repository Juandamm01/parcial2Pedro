'use client';
import { useState } from 'react';

export default function RegistrarProducto() {
  const [form, setForm] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    foto: '',
    stock: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert('Producto registrado exitosamente');
      setForm({
        nombre: '',
        precio: '',
        descripcion: '',
        foto: '',
        stock: '',
      });
    } else {
      const error = await res.json();
      alert(error.message || 'Error al registrar producto');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', paddingTop: '50px' }}>
      <h2>Registrar Producto</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <input
          name="precio"
          type="number"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
          required
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
          required
        />
        <input
          name="foto"
          placeholder="URL de la foto"
          value={form.foto}
          onChange={handleChange}
          required
        />
        <input
          name="stock"
          type="number"
          placeholder="Cantidad en stock"
          value={form.stock}
          onChange={handleChange}
          required
        />
        <button type="submit">Guardar producto</button>
      </form>
    </div>
  );
}