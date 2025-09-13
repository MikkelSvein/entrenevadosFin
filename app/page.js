// app/page.js
'use client'

export default function HomePage() {
  return (
    <main>
      {/* Otras secciones... */}

      <section id="categorias" className="pt-24 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card: Aventura */}
          <div className="bg-white rounded-xl p-6 shadow">
            <img src="/images/aventura.jpg" alt="Aventura" className="rounded-xl mb-4" />
            <h2 className="text-xl font-bold text-center mb-2">Turismo de Aventura</h2>
            <p className="text-center text-gray-600 mb-3">Deportes extremos, escalada y senderismo en los nevados del Tolima.</p>
            <div className="flex flex-wrap gap-2 mb-5 justify-center">
              <span className="bg-gray-100 px-3 py-1 rounded">Escalada</span>
              <span className="bg-gray-100 px-3 py-1 rounded">Parapente</span>
              <span className="bg-gray-100 px-3 py-1 rounded">Rafting</span>
              <span className="bg-gray-100 px-3 py-1 rounded">Cañón Combeima</span>
            </div>
            <button className="w-full flex items-center justify-center bg-amber-500 text-white font-semibold py-2 rounded">
              <span className="mr-2">📸</span>Explorar Aventura
            </button>
          </div>
          {/* Añade más cards para cada nuevo tipo de turismo */}
          {/* Ejemplo: Turismo Termal */}
          <div className="bg-white rounded-xl p-6 shadow">
            <img src="/images/termal.jpg" alt="Termal" className="rounded-xl mb-4" />
            <h2 className="text-xl font-bold text-center mb-2">Turismo Termal</h2>
            <p className="text-center text-gray-600 mb-3">Aguas termales y centros de relajación y bienestar.</p>
            <div className="flex flex-wrap gap-2 mb-5 justify-center">
              <span className="bg-gray-100 px-3 py-1 rounded">Termales Murillo</span>
              <span className="bg-gray-100 px-3 py-1 rounded">Termales La Cabaña</span>
              <span className="bg-gray-100 px-3 py-1 rounded">Relajación</span>
              <span className="bg-gray-100 px-3 py-1 rounded">Spa</span>
            </div>
            <button className="w-full flex items-center justify-center bg-amber-500 text-white font-semibold py-2 rounded">
              <span className="mr-2">📸</span>Explorar Termal
            </button>
          </div>
          {/* Más cards según el ejemplo anterior... */}
        </div>
      </section>
    </main>
  )
}
