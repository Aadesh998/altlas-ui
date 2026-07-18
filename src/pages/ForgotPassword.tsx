import { useState, type FormEvent } from 'react'
import { CheckCircle2, Mail } from 'lucide-react'
import Navbar from '@/sections/Navbar'
import Footer from '@/sections/Footer'
import SmartLink from '@/components/SmartLink'

const inputCls =
  'w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-[15px] text-neutral-900 placeholder:text-neutral-400 focus:border-[#2323d6] focus:outline-none focus:ring-2 focus:ring-[#2323d6]/20'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setSending(true)
    // TODO: replace with a real request to the backend, which sends the reset email via Mailgun
    setTimeout(() => {
      setSending(false)
      setSent(true)
    }, 700)
  }

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <Navbar />
      <main className="flex min-h-screen items-center justify-center px-5 pb-16 pt-32">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5">
          {sent ? (
            <div className="text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-[#00b67a]" />
              <h1 className="mt-5 font-display text-[1.6rem] font-medium text-neutral-900">Check your email</h1>
              <p className="mt-2 text-[14.5px] leading-relaxed text-neutral-600">
                If an account exists for <span className="font-semibold text-neutral-900">{email}</span>, we've sent
                a link to reset your password.
              </p>
              <SmartLink
                href="/login"
                className="mt-6 inline-block rounded-lg bg-[#2323d6] px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-[#1a1ab8]"
              >
                Back to sign in
              </SmartLink>
            </div>
          ) : (
            <>
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#060650] text-white">
                <Mail className="h-5 w-5" />
              </span>
              <h1 className="mt-5 font-display text-[1.6rem] font-medium text-neutral-900">Reset your password</h1>
              <p className="mt-2 text-[14.5px] text-neutral-600">
                Enter the email on your account and we'll send you a link to reset your password.
              </p>
              <form onSubmit={submit} className="mt-6 space-y-4">
                <label className="block">
                  <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
                    Email
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={inputCls}
                    required
                  />
                </label>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full rounded-lg bg-[#2323d6] px-6 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-[#1a1ab8] disabled:opacity-60"
                >
                  {sending ? 'Sending…' : 'Send reset link'}
                </button>
              </form>
            </>
          )}

          <p className="mt-6 text-center text-[14px] text-neutral-600">
            Remembered your password?{' '}
            <SmartLink href="/login" className="font-semibold text-[#2323d6] hover:text-[#1a1ab8]">
              Sign in
            </SmartLink>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
