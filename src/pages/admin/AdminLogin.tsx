import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { ShieldCheck } from 'lucide-react'
import { useAdminAuth } from '@/lib/adminAuth'

const inputCls =
  'w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-[15px] text-neutral-900 placeholder:text-neutral-400 focus:border-[#2323d6] focus:outline-none focus:ring-2 focus:ring-[#2323d6]/20'

export default function AdminLogin() {
  const { login } = useAdminAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const result = login(username, password)
    if (!result.ok) return setError(result.error)
    navigate('/admin')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#060650] px-5">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#060650] text-white">
          <ShieldCheck className="h-5 w-5" />
        </span>
        <h1 className="mt-5 font-display text-[1.7rem] font-medium text-neutral-900">AXLE Admin</h1>
        <p className="mt-2 text-[14.5px] text-neutral-600">Sign in to manage bookings, requests and site images.</p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
              Username
            </span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className={inputCls}
              autoComplete="username"
              required
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
              Password
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={inputCls}
              autoComplete="current-password"
              required
            />
          </label>
          {error && <p className="text-[13.5px] text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-lg bg-[#2323d6] px-6 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-[#1a1ab8]"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}
