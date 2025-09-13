'use client'
import { useState } from 'react'

export default function RoutePlanner({ plans, onRouteChange }) {
  const [selectedPlans, setSelectedPlans] = useState([])

  const togglePlan = (planId) => {
    setSelectedPlans((prev) =>
      prev.includes(planId) ? prev.filter((id) => id !== planId) : [...prev, planId]
    )
    onRouteChange && onRouteChange(selectedPlans)
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Selecciona los planes para tu ruta</h2>
      <ul className="space-y-2">
        {plans.map((plan) => (
          <li key={plan.id}>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedPlans.includes(plan.id)}
                onChange={() => togglePlan(plan.id)}
                className="mr-2"
              />
              {plan.title}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}
