import { useState, type FormEvent } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { CheckCircle2, KeyRound, Lock, Phone, User } from 'lucide-react'
import Navbar from '@/sections/Navbar'
import Footer from '@/sections/Footer'
import SmartLink from '@/components/SmartLink'
import { useAuth } from '@/lib/auth'

const inputCls =
  'w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-[15px] text-neutral-900 placeholder:text-neutral-400 focus:border-[#2323d6] focus:outline-none focus:ring-2 focus:ring-[#2323d6]/20'

const DEMO_OTP = '123456'

const STEPS = ['Mobile number', 'Verify OTP', 'Your details', 'Set password']

function Stepper({ step }: { step: number }) {
  return (
    <div className="mb-8 flex items-center gap-2">
      {STEPS.map((label, i) => (
        <div key={label} className="flex flex-1 items-center gap-2">
          <div
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold transition-colors ${
              i < step
                ? 'bg-[#00b67a] text-white'
                : i === step
                  ? 'bg-[#2323d6] text-white'
                  : 'bg-neutral-100 text-neutral-400'
            }`}
          >
            {i < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
          </div>
          {i < STEPS.length - 1 && (
            <div className={`h-0.5 flex-1 rounded ${i < step ? 'bg-[#00b67a]' : 'bg-neutral-100'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

export default function Signup() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const redirect = params.get('redirect') || '/'

  const [step, setStep] = useState(0)
  const [error, setError] = useState('')

  // Step 1
  const [phone, setPhone] = useState('')
  // Step 2
  const [otp, setOtp] = useState('')
  const [otpSentTo, setOtpSentTo] = useState('')
  // Step 3
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  // Step 4
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const sendOtp = (e: FormEvent) => {
    e.preventDefault()
    setError('')
    if (phone.trim().replace(/\D/g, '').length < 7) {
      return setError('Enter a valid mobile number.')
    }
    // TODO: replace with real SMS OTP send once backend is wired up
    setOtpSentTo(phone.trim())
    setStep(1)
  }

  const verifyOtp = (e: FormEvent) => {
    e.preventDefault()
    setError('')
    // TODO: replace with real OTP verification against backend
    if (otp.trim() !== DEMO_OTP) {
      return setError(`Incorrect code. For this demo, use ${DEMO_OTP}.`)
    }
    setStep(2)
  }

  const submitDetails = (e: FormEvent) => {
    e.preventDefault()
    setError('')
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      return setError('Please fill in all fields.')
    }
    setStep(3)
  }

  const submitPassword = (e: FormEvent) => {
    e.preventDefault()
    setError('')
    if (password.length < 6) return setError('Password must be at least 6 characters.')
    if (password !== confirmPassword) return setError('Passwords do not match.')

    const result = signup({ phone, firstName, lastName, email, password })
    if (!result.ok) {
      setError(result.error)
      setStep(0)
      return
    }
    navigate(redirect)
  }

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <Navbar />
      <main className="flex min-h-screen items-center justify-center px-5 pb-16 pt-32">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5">
          <Stepper step={step} />

          {step === 0 && (
            <form onSubmit={sendOtp} className="space-y-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#060650] text-white">
                <Phone className="h-5 w-5" />
              </span>
              <h1 className="font-display text-[1.6rem] font-medium text-neutral-900">Create an account</h1>
              <p className="text-[14.5px] text-neutral-600">
                Enter your mobile number and we'll send you a one-time code to verify it.
              </p>
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
              {error && <p className="text-[13.5px] text-red-600">{error}</p>}
              <button
                type="submit"
                className="w-full rounded-lg bg-[#2323d6] px-6 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-[#1a1ab8]"
              >
                Send OTP
              </button>
            </form>
          )}

          {step === 1 && (
            <form onSubmit={verifyOtp} className="space-y-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#060650] text-white">
                <KeyRound className="h-5 w-5" />
              </span>
              <h1 className="font-display text-[1.6rem] font-medium text-neutral-900">Verify your number</h1>
              <p className="text-[14.5px] text-neutral-600">
                We sent a 6-digit code to <span className="font-semibold text-neutral-900">{otpSentTo}</span>.{' '}
                <span className="text-neutral-400">(Demo code: {DEMO_OTP})</span>
              </p>
              <label className="block">
                <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
                  One-time code
                </span>
                <input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                  inputMode="numeric"
                  maxLength={6}
                  className={`${inputCls} tracking-[0.4em]`}
                  required
                />
              </label>
              {error && <p className="text-[13.5px] text-red-600">{error}</p>}
              <button
                type="submit"
                className="w-full rounded-lg bg-[#2323d6] px-6 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-[#1a1ab8]"
              >
                Verify
              </button>
              <button
                type="button"
                onClick={() => setStep(0)}
                className="w-full text-center text-[13.5px] text-neutral-500 hover:text-neutral-700"
              >
                Change mobile number
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={submitDetails} className="space-y-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#060650] text-white">
                <User className="h-5 w-5" />
              </span>
              <h1 className="font-display text-[1.6rem] font-medium text-neutral-900">Tell us about you</h1>
              <p className="text-[14.5px] text-neutral-600">Just the basics — you can update these later.</p>
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
                    First name
                  </span>
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Jane"
                    className={inputCls}
                    required
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
                    Last name
                  </span>
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    className={inputCls}
                    required
                  />
                </label>
              </div>
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
              {error && <p className="text-[13.5px] text-red-600">{error}</p>}
              <button
                type="submit"
                className="w-full rounded-lg bg-[#2323d6] px-6 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-[#1a1ab8]"
              >
                Continue
              </button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={submitPassword} className="space-y-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#060650] text-white">
                <Lock className="h-5 w-5" />
              </span>
              <h1 className="font-display text-[1.6rem] font-medium text-neutral-900">Set a password</h1>
              <p className="text-[14.5px] text-neutral-600">
                You'll use your mobile number and this password to sign in next time.
              </p>
              <label className="block">
                <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
                  Password
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className={inputCls}
                  required
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
                  Confirm password
                </span>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className={inputCls}
                  required
                />
              </label>
              {error && <p className="text-[13.5px] text-red-600">{error}</p>}
              <button
                type="submit"
                className="w-full rounded-lg bg-[#2323d6] px-6 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-[#1a1ab8]"
              >
                Complete signup
              </button>
            </form>
          )}

          <p className="mt-6 text-center text-[14px] text-neutral-600">
            Already have an account?{' '}
            <SmartLink
              href={`/login${redirect !== '/' ? `?redirect=${encodeURIComponent(redirect)}` : ''}`}
              className="font-semibold text-[#2323d6] hover:text-[#1a1ab8]"
            >
              Sign in
            </SmartLink>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
