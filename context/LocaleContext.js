'use client'
import React, { createContext, useContext, useState } from 'react'

const LocaleContext = createContext({ locale: 'es', setLocale: () => {} })

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState('es')
  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  return useContext(LocaleContext)
}
