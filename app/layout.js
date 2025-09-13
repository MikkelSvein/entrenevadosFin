'use client'
import { IntlProvider } from 'react-intl'
import Navbar from '../components/Navbar'
import './globals.css'
import { AuthProvider } from '../context/AuthContext'
import { LocaleProvider, useLocale } from '../context/LocaleContext'
import { RouteProvider } from '../context/RouteContext'  // Importa el nuevo contexto

function IntlWrapper({ children }) {
  const { locale } = useLocale()
  const messages = require(`../locales/${locale}/common.json`)
  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  )
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <LocaleProvider>
          <AuthProvider>
            <RouteProvider> {/* Envuelve aquí el nuevo contexto */}
              <IntlWrapper>
                <Navbar />
                {children}
              </IntlWrapper>
            </RouteProvider>
          </AuthProvider>
        </LocaleProvider>
      </body>
    </html>
  )
}
