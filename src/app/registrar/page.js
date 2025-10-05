'use client';
import { useState } from 'react';

export default function RegistrarProducto() {
  const [form, setForm] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    foto: '',
    stock: '',
    imagenBase64: '', 
  });

  const [pdfVisible, setPdfVisible] = useState(false);
  const [pdfNombre, setPdfNombre] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setForm((prevForm) => ({ ...prevForm, imagenBase64: reader.result }));
    };

    if (file) {
      reader.readAsDataURL(file); // 👈 convierte a base64
    }
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

      setPdfNombre(form.nombre);
      setPdfVisible(true);

      setForm({
        nombre: '',
        precio: '',
        descripcion: '',
        foto: '',
        stock: '',
        imagenBase64: '',
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
          name="stock"
          type="number"
          placeholder="Cantidad en stock"
          value={form.stock}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          required
        />
        <button type="submit">Guardar producto</button>
      </form>

      {pdfVisible && (
        <a
          href={`/${pdfNombre}.pdf`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#0070f3',
            color: '#fff',
            borderRadius: '5px',
            textDecoration: 'none',
          }}
        >
          📄 Ver PDF generado
        </a>
      )}
    </div>
  );
}