'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabaseClient'
import dynamic from 'next/dynamic'

const MapView = dynamic(() => import('./components/MapView'), { ssr: false })
const Plans = dynamic(() => import('./components/PlansList'), { ssr: false })

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (data?.user) {
        setUser(data.user)
      } else {
        router.push('/login')
      }
    }
    getUser()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar con planes */}
      <div className="w-1/3 p-4 bg-gray-50 overflow-y-auto">
        <h2 className="font-bold text-lg mb-4">
          Bienvenido, {user?.email}
        </h2>
        {/* ✅ Botón con el mismo estilo que el resto */}
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 bg-amber-400 text-white rounded-lg hover:bg-amber-500 transition"
        >
          Cerrar Sesión
        </button>

        <h3 className="font-semibold mt-6 mb-2">Tus Planes</h3>
        <Plans />
      </div>

      {/* Mapa */}
      <div className="flex-1">
        <MapView />
      </div>
    </div>
  )
}
