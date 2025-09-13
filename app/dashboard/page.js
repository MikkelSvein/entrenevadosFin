'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabaseClient'
import MapView from './components/MapView'
import Plans from './components/PlansList'

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
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded mb-6"
        >
          Cerrar Sesión
        </button>
        <h3 className="font-semibold mb-2">Tus Planes</h3>
        <Plans />
      </div>

      {/* Mapa */}
      <div className="flex-1">
        <MapView />
      </div>
    </div>
  )
}
