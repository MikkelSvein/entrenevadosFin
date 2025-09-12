'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabaseClient'
import Navbar from '../../components/Navbar'
import dynamic from 'next/dynamic'

const MapView = dynamic(() => import('./components/MapView'), { ssr: false })

export default function Dashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
      } else {
        setUser(user)
      }
      setLoading(false)
    }

    getUser()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row h-[calc(100vh-72px)]">
        <aside className="md:w-1/3 p-6 overflow-y-auto bg-gray-50">
          <h2 className="text-2xl font-bold mb-4">
            Bienvenido, {user?.email}
          </h2>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 mb-6"
          >
            Cerrar Sesión
          </button>

          <h3 className="text-xl font-semibold mb-2">Tus Planes</h3>
          <p className="text-gray-500">Aquí podrás ver tus planes guardados.</p>
        </aside>
        <main className="flex-1">
          <MapView />
        </main>
      </div>
    </>
  )
}
