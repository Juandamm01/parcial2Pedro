'use client';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-400 to-purple-500 text-white">
      <div className="bg-white/20 backdrop-blur-md p-10 rounded-3xl shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4">Bienvenido a JUDAGE</h1>
        <p className="mb-6 text-lg">Elige una opción para continuar:</p>
        <div className="flex gap-4">
          <button
            onClick={() => router.push('/RegistrarUsuario')}
            className="bg-white text-indigo-700 px-6 py-2 rounded-lg font-semibold hover:bg-indigo-100 transition-all"
          >
            Registrar Usuario
          </button>
          <button
            onClick={() => router.push('/login')}
            className="bg-indigo-700 px-6 py-2 rounded-lg font-semibold hover:bg-indigo-800 transition-all"
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}
