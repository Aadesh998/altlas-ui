import { useState, type FormEvent } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { Lock } from 'lucide-react'
import Navbar from '@/sections/Navbar'
import Footer from '@/sections/Footer'
import SmartLink from '@/components/SmartLink'
import { useAuth } from '@/lib/auth'

const inputCls =
  'w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-[15px] text-neutral-900 placeholder:text-neutral-400 focus:border-[#2323d6] focus:outline-none focus:ring-2 focus:ring-[#2323d6]/20'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const redirect = params.get('redirect') || '/'

  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const result = login(phone, password)
    if (!result.ok) return setError(result.error)
    navigate(redirect)
  }

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <Navbar />
      <main className="flex min-h-screen items-center justify-center px-5 pb-16 pt-32">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#060650] text-white">
            <Lock className="h-5 w-5" />
          </span>
          <h1 className="mt-5 font-display text-[1.8rem] font-medium text-neutral-900">Sign in</h1>
          <p className="mt-2 text-[14.5px] text-neutral-600">Welcome back to AXLE.</p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
                Mobile number
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 555 123 4567"
                className={inputCls}
                required
              />
            </label>
            <label className="block">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
                  Password
                </span>
                <SmartLink href="/forgot-password" className="text-[12.5px] font-medium text-[#2323d6] hover:text-[#1a1ab8]">
                  Forgot password?
                </SmartLink>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={inputCls}
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

          <p className="mt-6 text-center text-[14px] text-neutral-600">
            New to AXLE?{' '}
            <SmartLink
              href={`/signup${redirect !== '/' ? `?redirect=${encodeURIComponent(redirect)}` : ''}`}
              className="font-semibold text-[#2323d6] hover:text-[#1a1ab8]"
            >
              Create an account
            </SmartLink>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
