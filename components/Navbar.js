import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  return (
    <header className="bg-white/90 backdrop-blur sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/">
            {/* Imagen en vez del texto */}
            <Image
              src="/images/entrenevados.png"
              alt="Logo EntreNevados"
              width={200}
              height={100}
              className="object-contain"
              priority
            />
          </Link>
        </div>
        <nav className="flex items-center gap-6">
          <Link href="/">Inicio</Link>
          <Link href="#">Categorías</Link>
          <Link href="/login" className="text-gray-700">Ingresar</Link>
          <Link href="/login" className="px-4 py-2 bg-amber-400 text-white rounded-lg">Registrarse</Link>
        </nav>
      </div>
    </header>
  )
}
