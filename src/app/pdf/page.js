'use client';
import { useEffect, useState } from 'react';

export default function PDFPage() {
  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    fetch('/api/pdf/list')
      .then(res => res.json())
      .then(setPdfs);
  }, []);

  const generatePDF = async () => {
    await fetch('/api/pdf/generate');
    alert('PDF generado con éxito');
    const updated = await fetch('/api/pdf/list').then(res => res.json());
    setPdfs(updated);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de PDFs</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={generatePDF}
      >
        Generar PDF del Inventario
      </button>

      <ul>
        {pdfs.map((file) => (
          <li key={file._id} className="mb-2">
            <a
              href={`/api/pdf/download?filename=${file.filename}`}
              className="text-blue-600 underline"
            >
              {file.filename}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
