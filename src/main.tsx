import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { AuthProvider } from '@/lib/auth'
import { AdminAuthProvider } from '@/lib/adminAuth'
import { ImageOverridesProvider } from '@/lib/imageOverrides'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ImageOverridesProvider>
        <AdminAuthProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </AdminAuthProvider>
      </ImageOverridesProvider>
    </BrowserRouter>
  </StrictMode>,
)
