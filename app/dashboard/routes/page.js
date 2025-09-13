'use client'
import { useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { useRouter } from 'next/navigation'
import RoutePlanner from '../components/RoutePlanner'
import dynamic from 'next/dynamic'
import { supabase } from '../../../lib/supabaseClient'

const RouteMapView = dynamic(() => import('../components/RouteMapView'), { ssr: false })
const TranslatorRequestButton = dynamic(() => import('../components/TranslatorRequestButton'), { ssr: false })

const plans = [
  { id: 1, title: 'Turismo de Aventura', coords: [4.6584, -75.2976] },
  { id: 2, title: 'Turismo de Naturaleza', coords: [4.5, -75.3] },
  { id: 3, title: 'Turismo Histórico', coords: [4.45, -75.25] },
]

export default function RoutesPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [selectedPlans, setSelectedPlans] = useState([])
  const [routeName, setRouteName] = useState('')
  const [savedRouteId, setSavedRouteId] = useState(null)
  const [saving, setSaving] = useState(false)

  const handleSaveRoute = async () => {
    if (!user) return alert('Debes iniciar sesión para guardar una ruta')
    if (!routeName.trim()) return alert('Ingresa un nombre para la ruta')
    if (selectedPlans.length === 0) return alert('Selecciona al menos un plan')

    setSaving(true)

    try {
      let { data: route, error } = await supabase
        .from('routes')
        .insert([{ user_id: user.id, name: routeName }])
        .select()
        .single()

      if (error) throw error

      const insertSites = selectedPlans.map((planId, index) => ({
        route_id: route.id,
        plan_id: planId,
        position: index + 1,
      }))
      const { error: siteError } = await supabase.from('route_sites').insert(insertSites)

      if (siteError) throw siteError

      setSavedRouteId(route.id)
      alert('Ruta guardada con éxito')
    } catch (e) {
      alert('Error al guardar la ruta: ' + e.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-4">Planifica tu ruta turística</h1>
        <input
          type="text"
          placeholder="Nombre de tu ruta"
          value={routeName}
          onChange={(e) => setRouteName(e.target.value)}
          className="border p-2 rounded w-full mb-4"
          disabled={saving}
        />
        <RoutePlanner plans={plans} onRouteChange={setSelectedPlans} />
        <button
          disabled={saving}
          onClick={handleSaveRoute}
          className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {saving ? 'Guardando...' : 'Guardar Ruta'}
        </button>
      </div>

      {savedRouteId && (
        <div>
          <TranslatorRequestButton userId={user.id} routeId={savedRouteId} />

          <div className="mt-6">
            <RouteMapView plans={plans.filter((p) => selectedPlans.includes(p.id))} />
          </div>
        </div>
      )}
    </div>
  )
}
