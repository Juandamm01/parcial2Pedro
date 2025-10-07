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
      reader.readAsDataURL(file);
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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700">
          Registrar Producto
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              name="nombre"
              placeholder="Nombre del producto"
              value={form.nombre}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
            <input
              name="precio"
              type="number"
              placeholder="Precio"
              value={form.precio}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea
              name="descripcion"
              placeholder="Descripción del producto"
              value={form.descripcion}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 focus:ring-2 focus:ring-indigo-400 outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock disponible</label>
            <input
              name="stock"
              type="number"
              placeholder="Cantidad en stock"
              value={form.stock}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Imagen del producto</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFile}
              required
              className="w-full text-sm text-gray-600 border border-gray-300 rounded-lg p-2 file:mr-3 file:py-1 file:px-3 file:border-0 file:rounded-md file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200 cursor-pointer"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-all shadow-md"
          >
            Guardar producto
          </button>
        </form>

        {pdfVisible && (
          <div className="text-center mt-6">
            <a
              href={`/${pdfNombre}.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg font-medium transition-all shadow-md"
            >
              📄 Ver PDF generado
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
