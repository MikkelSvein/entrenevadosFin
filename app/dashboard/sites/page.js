'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Filters from '../../../components/Filters'
import { supabase } from '../../../lib/supabaseClient'

export default function SitesPage() {
  const [filters, setFilters] = useState([])
  const [sites, setSites] = useState([])
  const router = useRouter()

  useEffect(() => {
    const fetchSites = async () => {
      let query = supabase.from('sites').select('*, site_tags(tag_id, tags(name))')
      if (filters.length > 0) {
        query = query.contains('site_tags->tags->name', filters)
      }
      const { data, error } = await query
      if (!error) setSites(data)
    }
    fetchSites()
  }, [filters])

  const handleGoToDashboard = () => {
    if (filters.length === 0) {
      alert('Selecciona al menos una categoría para filtrar')
      return
    }
    router.push(`/dashboard?filters=${encodeURIComponent(filters.join(','))}`)
  }

  return (
    <div className="flex gap-6 p-6">
      <Filters onFilterChange={setFilters} />

      <div className="flex-1">
        <div className="mb-4">
          <button
            onClick={handleGoToDashboard}
            className="bg-amber-400 text-white px-4 py-2 rounded hover:bg-amber-500"
          >
            Filtrar y ver en el dashboard
          </button>
        </div>

        <div className="grid gap-4">
          {sites.map((site) => (
            <div key={site.id} className="p-4 border rounded bg-gray-50">
              <h3 className="text-lg font-bold">{site.name}</h3>
              <p>{site.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
