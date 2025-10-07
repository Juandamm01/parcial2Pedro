'use client';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div style={{ textAlign: 'center', paddingTop: '100px' }}>
      <h1>Bienvenido a JUDAGE</h1>
      <p>Elige una opción para continuar:</p>
      <button onClick={() => router.push('/RegistrarUsuario')}>Registrar Usuario</button>
      <button onClick={() => router.push('/login')} style={{ marginLeft: '10px' }}>
        Iniciar Sesión
      </button>
    </div>
  );
}
