'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import Navbar from '../components/Navbar'
import '../globals.css' // 👈 Importa tu CSS global AQUÍ

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }
    fetchSession()
    const { data: listener } = supabase.auth.onAuthStateChange(() => fetchSession())
    return () => listener?.subscription.unsubscribe()
  }, [])

  return (
    <html lang="es">
      <body className="bg-gray-50 min-h-screen">
        <Navbar user={user} />
        <main>{children}</main>
      </body>
    </html>
  )
}
