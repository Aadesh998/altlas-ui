import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

// Fixed admin credential — mock auth for demo purposes, matching the rest of this
// project's localStorage-based auth. Replace with real backend auth before going live.
const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'AxleAdmin@2026'

const SESSION_KEY = 'axle_admin_session'

interface AdminAuthContextValue {
  isAdmin: boolean
  ready: boolean
  login: (username: string, password: string) => { ok: true } | { ok: false; error: string }
  logout: () => void
}

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null)

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setIsAdmin(localStorage.getItem(SESSION_KEY) === 'true')
    setReady(true)
  }, [])

  const login: AdminAuthContextValue['login'] = (username, password) => {
    if (username.trim() !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return { ok: false, error: 'Incorrect username or password.' }
    }
    localStorage.setItem(SESSION_KEY, 'true')
    setIsAdmin(true)
    return { ok: true }
  }

  const logout = () => {
    localStorage.removeItem(SESSION_KEY)
    setIsAdmin(false)
  }

  return <AdminAuthContext.Provider value={{ isAdmin, ready, login, logout }}>{children}</AdminAuthContext.Provider>
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider')
  return ctx
}
