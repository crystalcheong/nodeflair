import '@/styles/globals.css'

import ReduxProvider from '@/components/Core/providers/Provider.Redux'
import { ThemeProvider } from '@/components/Core/providers/Provider.Theme'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'

import { Routes } from '@generouted/react-router/lazy'

export const App = () => {
  return (
    <HelmetProvider>
      <ReduxProvider>
        <ThemeProvider>
          <Routes />
        </ThemeProvider>
      </ReduxProvider>
    </HelmetProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
