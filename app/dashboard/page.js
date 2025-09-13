'use client'
import { useState } from 'react'
import PlansList from './components/PlansList'
import MapView from './components/MapView'

export default function Dashboard() {
  const [selectedPlan, setSelectedPlan] = useState(null)

  return (
    <div className="flex flex-col md:flex-row md:space-x-4 p-4">
      <div className="md:w-1/3 mb-4 md:mb-0">
        <PlansList onSelect={setSelectedPlan} />
      </div>
      <div className="md:w-2/3 h-[500px]">
        <MapView selectedPlan={selectedPlan} />
      </div>
    </div>
  )
}
