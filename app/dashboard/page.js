'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabaseClient'
import Navbar from '../../components/Navbar'
import dynamic from 'next/dynamic'
import Plans from './components/PlansList.js'

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

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    )
  }

  return (
    <>
      <Navbar user={user} />
      <div className="flex h-[calc(100vh-72px)]">
        {/* Columna izquierda: planes */}
        <aside className="w-1/3 p-6 overflow-y-auto bg-gray-50">
          <h2 className="text-xl font-bold mb-4">Tus Planes</h2>
          <Plans />
        </aside>

        {/* Columna derecha: mapa */}
        <main className="flex-1">
          <MapView />
        </main>
      </div>
    </>
  )
}
