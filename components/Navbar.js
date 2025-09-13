'use client'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabaseClient'

export default function Navbar({ user }) {
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  // Scroll suave hacia la sección de categorías si está presente
  const handleCategoriasClick = () => {
    if (typeof window !== 'undefined') {
      const catSection = document.getElementById('categorias')
      if (catSection) catSection.scrollIntoView({ behavior: 'smooth' })
      else router.push('/#categorias')
    }
  }

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow">
      <div className="flex items-center space-x-2">
        <img src="/images/entrenevados.png" alt="logo" className="h-12 w-auto" />
        <span className="text-2xl font-bold text-green-700 select-none">
          Entre<span className="text-amber-500">Nevados</span>
        </span>
      </div>
      <div className="flex items-center space-x-4">
        <a href="/" className="hover:text-green-600">Inicio</a>
        <button
          type="button"
          className="hover:text-green-600 bg-transparent"
          style={{ border: 'none', background: 'none', cursor: 'pointer' }}
          onClick={handleCategoriasClick}
        >Categorías</button>
        {!user ? (
          <>
            <a href="/login" className="hover:text-green-600">Ingresar</a>
            <a
              href="/login"
              className="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500"
            >Registrarse</a>
          </>
        ) : (
          <div className="flex items-center space-x-3">
            <span className="text-gray-700">{user.email}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500"
            >Cerrar sesión</button>
          </div>
        )}
      </div>
    </nav>
  )
}
