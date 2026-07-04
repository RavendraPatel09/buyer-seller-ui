import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './lib/theme/ThemeContext'
import { GlobalErrorBoundary } from '@medicycle/ui'
import App from './App'
import './index.css'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalErrorBoundary>
        <HelmetProvider>
          <ThemeProvider defaultTheme="dark">
            <App />
          </ThemeProvider>
        </HelmetProvider>
      </GlobalErrorBoundary>
    </QueryClientProvider>
  </StrictMode>,
)
