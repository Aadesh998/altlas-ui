import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export interface Booking {
  id: string
  carName: string
  rideType: string
  fare: string
  pickup: string
  dropoff: string
  when: string
  guests: string
  createdAt: string
}

interface StoredUser {
  phone: string
  name: string
  email: string
  password: string
  phoneVerified: boolean
  bookings: Booking[]
}

interface AuthUser {
  phone: string
  name: string
  email: string
  phoneVerified: boolean
  bookings: Booking[]
}

interface AuthContextValue {
  user: AuthUser | null
  ready: boolean
  signup: (data: {
    phone: string
    firstName: string
    lastName: string
    email: string
    password: string
  }) => { ok: true } | { ok: false; error: string }
  login: (phone: string, password: string) => { ok: true } | { ok: false; error: string }
  logout: () => void
  addBooking: (booking: Booking) => void
  emailExists: (email: string) => boolean
}

const USERS_KEY = 'axle_users'
const SESSION_KEY = 'axle_session'

const AuthContext = createContext<AuthContextValue | null>(null)

function normalizePhone(phone: string) {
  return phone.replace(/[^\d+]/g, '')
}

function readUsers(): Record<string, StoredUser> {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) ?? '{}')
  } catch {
    return {}
  }
}

function writeUsers(users: Record<string, StoredUser>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function toAuthUser(stored: StoredUser): AuthUser {
  return {
    phone: stored.phone,
    name: stored.name,
    email: stored.email,
    phoneVerified: stored.phoneVerified,
    bookings: stored.bookings,
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const phone = localStorage.getItem(SESSION_KEY)
    if (phone) {
      const stored = readUsers()[phone]
      if (stored) setUser(toAuthUser(stored))
    }
    setReady(true)
  }, [])

  const signup: AuthContextValue['signup'] = ({ phone, firstName, lastName, email, password }) => {
    const key = normalizePhone(phone)
    const users = readUsers()
    if (users[key]) return { ok: false, error: 'An account with this mobile number already exists.' }
    const newUser: StoredUser = {
      phone: key,
      name: `${firstName.trim()} ${lastName.trim()}`.trim(),
      email: email.trim().toLowerCase(),
      password,
      phoneVerified: true,
      bookings: [],
    }
    users[key] = newUser
    writeUsers(users)
    localStorage.setItem(SESSION_KEY, key)
    setUser(toAuthUser(newUser))
    return { ok: true }
  }

  const login: AuthContextValue['login'] = (phone, password) => {
    const key = normalizePhone(phone)
    const stored = readUsers()[key]
    if (!stored || stored.password !== password) {
      return { ok: false, error: 'Incorrect mobile number or password.' }
    }
    localStorage.setItem(SESSION_KEY, key)
    setUser(toAuthUser(stored))
    return { ok: true }
  }

  const logout = () => {
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
  }

  const addBooking: AuthContextValue['addBooking'] = (booking) => {
    setUser((prev) => {
      if (!prev) return prev
      const users = readUsers()
      const stored = users[prev.phone]
      if (!stored) return prev
      stored.bookings = [booking, ...stored.bookings]
      writeUsers(users)
      return { ...prev, bookings: stored.bookings }
    })
  }

  const emailExists: AuthContextValue['emailExists'] = (email) => {
    const key = email.trim().toLowerCase()
    return Object.values(readUsers()).some((u) => u.email === key)
  }

  return (
    <AuthContext.Provider value={{ user, ready, signup, login, logout, addBooking, emailExists }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export interface BookingWithUser extends Booking {
  userName: string
  userPhone: string
  userEmail: string
}

/** For the admin dashboard — every booking across every registered account, newest first. */
export function getAllBookings(): BookingWithUser[] {
  const users = readUsers()
  return Object.values(users)
    .flatMap((u) => u.bookings.map((b) => ({ ...b, userName: u.name, userPhone: u.phone, userEmail: u.email })))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function getAllUsers(): StoredUser[] {
  return Object.values(readUsers())
}
