'use client'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabaseClient'

export default function Navbar({ user }) {
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img
          // Cambia h-12 por h-8, h-10, h-16, etc., para ajustar tamaño
          src="/images/entrenevados.png"
          alt="logo"
          className="h-12 w-auto"
        />
      </div>

      {/* Links / acciones */}
      <div className="flex items-center space-x-4">
        <a href="/" className="hover:text-green-600">Inicio</a>
        <a href="/categorias" className="hover:text-green-600">Categorías</a>

        {!user ? (
          <>
            <a href="/login" className="hover:text-green-600">Ingresar</a>
            <a
              href="/login"
              className="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500"
            >
              Registrarse
            </a>
          </>
        ) : (
          <div className="flex items-center space-x-3">
            <span className="text-gray-700">{user.email}</span>
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
