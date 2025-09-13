'use client'
import React, { createContext, useContext, useState } from 'react'

const RouteContext = createContext({
  selectedPlanIds: [],
  addPlan: () => {},
  removePlan: () => {}
})

export function RouteProvider({ children }) {
  const [selectedPlanIds, setSelectedPlanIds] = useState([])

  const addPlan = (id) => {
    setSelectedPlanIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }

  const removePlan = (id) => {
    setSelectedPlanIds((prev) => prev.filter((pid) => pid !== id))
  }

  return (
    <RouteContext.Provider value={{ selectedPlanIds, addPlan, removePlan }}>
      {children}
    </RouteContext.Provider>
  )
}

export function useRoute() {
  return useContext(RouteContext)
}
