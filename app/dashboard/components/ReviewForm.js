'use client'
import { useState } from 'react'
import { supabase } from '../../../lib/supabaseClient'
import { useAuth } from '../../../context/AuthContext'

export default function ReviewForm({ planId, onSuccess }) {
  const { user } = useAuth()
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      setError('Debes iniciar sesión para dejar una reseña.')
      return
    }
    setLoading(true)
    setError('')

    const { error } = await supabase.from('reviews').insert({
      user_id: user.id,
      plan_id: planId,
      rating,
      comment
    })

    setLoading(false)

    if (error) {
      setError('Error al guardar la reseña. Intenta de nuevo.')
      return
    }

    setRating(5)
    setComment('')
    onSuccess && onSuccess()
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-3 border p-4 rounded bg-gray-50">
      <h3 className="text-lg font-semibold">Dejar una reseña</h3>
      <label>
        Calificación:
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="ml-2 border rounded px-2 py-1"
        >
          {[5, 4, 3, 2, 1].map(n => (
            <option key={n} value={n}>{n} estrella{n > 1 ? 's' : ''}</option>
          ))}
        </select>
      </label>
      <label>
        Comentario:
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          className="w-full mt-1 border rounded p-2"
          placeholder="Escribe tu opinión aquí"
        />
      </label>
      {error && <p className="text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? 'Guardando...' : 'Enviar reseña'}
      </button>
    </form>
  )
}
