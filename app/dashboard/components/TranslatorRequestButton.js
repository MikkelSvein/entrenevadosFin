'use client'
import { useState } from 'react'
import { supabase } from '../../../lib/supabaseClient'

export default function TranslatorRequestButton({ userId, routeId }) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleRequestTranslator = async () => {
    setLoading(true)
    setMessage('')

    const { error } = await supabase.from('translator_requests').insert({
      user_id: userId,
      route_id: routeId,
    })

    setLoading(false)

    if (error) {
      setMessage('Error enviando solicitud. Intenta de nuevo.')
    } else {
      setMessage('Solicitud de traductor enviada correctamente.')
    }
  }

  return (
    <div>
      <button
        disabled={loading}
        onClick={handleRequestTranslator}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Enviando...' : 'Solicitar traductor acompañante'}
      </button>
      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  )
}
