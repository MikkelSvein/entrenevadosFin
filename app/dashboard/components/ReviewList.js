'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabaseClient'

export default function ReviewList({ planId }) {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('id, rating, comment, created_at, user:profiles(full_name)')
        .eq('plan_id', planId)
        .order('created_at', { ascending: false })

      if (!error && data) {
        setReviews(data)
      }
    }
    fetchReviews()
  }, [planId])

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Reseñas</h3>
      {reviews.length === 0 && <p>No hay reseñas aún.</p>}
      {reviews.map(({ id, user, rating, comment, created_at }) => (
        <div key={id} className="border-b border-gray-200 py-2">
          <p className="font-medium">{user?.full_name ?? 'Anónimo'}</p>
          <p>{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</p>
          {comment && <p>{comment}</p>}
          <small className="text-gray-500 text-xs">{new Date(created_at).toLocaleDateString()}</small>
        </div>
      ))}
    </div>
  )
}
