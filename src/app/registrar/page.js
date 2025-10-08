'use client';

import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import { ArrowLeft, Edit, Trash2, PlusCircle, FileDown } from 'lucide-react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function RegistrarProducto() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    stock: '',
    imagenBase64: '',
  });
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);

  // Cargar todos los productos
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(setProducts);
  }, []);

  // Convertir archivo de imagen a Base64
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, imagenBase64: reader.result });
    };
    reader.readAsDataURL(file);
  };

  // Crear o actualizar producto
const handleSubmit = async (e) => {
  e.preventDefault();

  // Validaciones antes de enviar
  if (!form.nombre.trim()) {
    alert('El nombre del producto es obligatorio');
    return;
  }
  if (!form.precio || isNaN(form.precio) || Number(form.precio) <= 0) {
    alert('Debe ingresar un precio válido mayor que 0');
    return;
  }
  if (!form.descripcion.trim()) {
    alert('La descripción no puede estar vacía');
    return;
  }
  if (!form.stock || isNaN(form.stock) || Number(form.stock) < 0) {
    alert('El stock debe ser un número igual o mayor que 0');
    return;
  }
  if (!form.imagenBase64) {
    alert('Debe seleccionar una imagen válida');
    return;
  }

  try {
    const method = editing ? 'PUT' : 'POST';
    const res = await fetch('/api/products', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      throw new Error('Error al guardar el producto');
    }

    // Limpiar formulario
    setForm({
      nombre: '',
      precio: '',
      descripcion: '',
      stock: '',
      imagenBase64: '',
    });
    setEditing(null);

    // Actualizar lista sin recargar
    const updated = await fetch('/api/products').then(res => res.json());
    setProducts(updated);

  } catch (error) {
    console.error(error);
    alert('Hubo un problema al registrar el producto');
  }
};


  // Eliminar producto
  const handleDelete = async (id) => {
    await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
    setProducts(products.filter(p => p._id !== id));
    setViewing(null);
  };

  // Editar producto
  const handleEdit = (p) => {
    setEditing(p._id);
    setForm(p);
    setViewing(null);
  };

  // Descargar PDF
  const handleDownloadPDF = async () => {
    try {
      const res = await fetch('/api/pdf'); // Llama al endpoint que genera el PDF
      if (!res.ok) return alert('Error al generar el PDF.');

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'inventario.pdf';
      a.click();

      window.URL.revokeObjectURL(url); // Liberar memoria
    } catch (err) {
      console.error(err);
      alert('Error al generar o descargar el PDF.');
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(3, products.length),
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="p-6 flex flex-col items-center w-full min-h-screen bg-gray-50">
      {!viewing ? (
        <>
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
            {editing ? 'Actualizar Producto' : 'Registrar Producto'}
          </h1>

          {/* Botón de PDF */}
          <div className="flex justify-end w-full max-w-5xl mb-6">
            <button
              onClick={handleDownloadPDF}
              className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow transition"
            >
              <FileDown className="mr-2" /> Descargar Inventario (PDF)
            </button>
          </div>

          {/* Formulario */}
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md mb-8 space-y-4 text-black"
          >
            <input
              type="text"
              placeholder="Nombre del producto"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="number"
              placeholder="Precio"
              value={form.precio}
              onChange={(e) => setForm({ ...form, precio: e.target.value })}
              className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="number"
              placeholder="Stock"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-400"
              required
            />
            <textarea
              placeholder="Descripción"
              value={form.descripcion}
              onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
              className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-400"
              rows="3"
            ></textarea>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-gray-700 border border-gray-300 p-2 rounded-lg cursor-pointer"
            />

            {/* Vista previa */}
            {form.imagenBase64 && (
              <div className="relative w-40 h-40 mx-auto mt-2">
                <Image
                  src={form.imagenBase64}
                  alt={form.nombre ? `Imagen de ${form.nombre}` : 'Imagen subida'}
                  fill
                  className="object-cover rounded-xl border"
                />
              </div>
            )}

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold flex items-center justify-center"
              type="submit"
            >
              <PlusCircle className="mr-2" size={20} />
              {editing ? 'Actualizar Producto' : 'Registrar Producto'}
            </button>
          </form>

          {/* Carrusel */}
          {products.length > 0 ? (
            <div className="w-full max-w-5xl">
              <h2 className="text-2xl font-semibold mb-4 text-center text-blue-700">
                Inventario de Productos
              </h2>
              <Slider {...sliderSettings}>
                {products.map((p) => (
                  <div key={p._id} className="p-3">
                    <div
                      onClick={() => setViewing(p)}
                      className="bg-white shadow-md rounded-2xl cursor-pointer hover:scale-105 transition-transform flex flex-col items-center justify-center p-4"
                    >
                      <div className="relative w-40 h-40 mb-3">
                        <Image
                          src={
                            p.imagenBase64 && p.imagenBase64.startsWith('data:image')
                              ? p.imagenBase64
                              : 'https://via.placeholder.com/300x300?text=Sin+Imagen'
                          }
                          alt={p.nombre ? `Imagen del producto ${p.nombre}` : 'Producto sin nombre'}
                          fill
                          className="object-cover rounded-xl"
                        />
                      </div>
                      <h3 className="text-lg font-semibold text-center">
                        {p.nombre || 'Sin nombre'}
                      </h3>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          ) : (
            <p className="text-gray-500 mt-4">Aún no hay productos registrados.</p>
          )}
        </>
      ) : (
        // Vista individual del producto
        <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md text-center relative">
          <button
            onClick={() => setViewing(null)}
            className="absolute top-4 left-4 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="mr-1" size={18} /> Volver
          </button>

          <div className="relative w-48 h-48 mx-auto mb-4 mt-6">
            <Image
              src={
                viewing.imagenBase64 && viewing.imagenBase64.startsWith('data:image')
                  ? viewing.imagenBase64
                  : 'https://via.placeholder.com/300x300?text=Sin+Imagen'
              }
              alt={viewing.nombre ? `Imagen del producto ${viewing.nombre}` : 'Producto sin nombre'}
              fill
              className="object-cover rounded-xl"
            />
          </div>

          <h2 className="text-2xl font-bold mb-2">{viewing.nombre}</h2>
          <p className="text-gray-700 mb-2">💲 Precio: ${viewing.precio}</p>
          <p className="text-gray-700 mb-2">📦 Stock: {viewing.stock}</p>
          <p className="text-gray-600 mb-6">{viewing.descripcion}</p>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => handleEdit(viewing)}
              className="flex items-center bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
            >
              <Edit className="mr-2" /> Editar
            </button>
            <button
              onClick={() => handleDelete(viewing._id)}
              className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              <Trash2 className="mr-2" /> Eliminar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
