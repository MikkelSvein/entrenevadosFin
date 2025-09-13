'use client'
import { useState } from 'react'

const plansData = [
  { id: 1, name: 'Nevado del Tolima', type: 'Aventura', coords: [4.6584, -75.2976], image: '/images/aventura.jpg' },
  { id: 2, name: 'Ibagué Centro Histórico', type: 'Histórico', coords: [4.4389, -75.2322], image: '/images/historico.jpg' },
  { id: 3, name: 'Parque Natural Regional', type: 'Naturaleza', coords: [4.55, -75.28], image: '/images/naturaleza.jpg' },
  { id: 4, name: 'Fiestas Tradicionales', type: 'Cultural', coords: [4.45, -75.24], image: '/images/cultural.jpg' },
  { id: 5, name: 'Rafting Río Combeima', type: 'Aventura', coords: [4.60, -75.3], image: '/images/aventura.jpg' },
]

const types = [...new Set(plansData.map(p => p.type))]

export default function PlansList({ onSelect }) {
  const [selectedType, setSelectedType] = useState(types[0])

  const filteredPlans = plansData.filter(p => p.type === selectedType)

  return (
    <div className="flex flex-col">
      <div className="mb-4 flex space-x-3 overflow-auto">
        {types.map(type => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-3 py-1 rounded-md font-semibold whitespace-nowrap ${
              selectedType === type ? 'bg-yellow-400 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <ul className="space-y-2 divide-y divide-gray-200 overflow-auto max-h-72">
        {filteredPlans.map(plan => (
          <li
            key={plan.id}
            onClick={() => onSelect(plan)}
            className="cursor-pointer p-2 hover:bg-yellow-50 rounded flex items-center gap-3"
            tabIndex={0}
          >
            <img
              src={plan.image || '/images/default.jpg'}
              alt={`${plan.type} imagen`}
              className="w-16 h-12 object-cover rounded"
            />
            <span>{plan.name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
