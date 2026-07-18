import { useState, type FormEvent } from 'react'
import { Check, RotateCcw } from 'lucide-react'
import { heroContentStore } from '@/lib/heroContentStore'
import { useSingletonStore } from '@/lib/dataStore'

const inputCls =
  'w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-[13.5px] text-neutral-900 placeholder:text-neutral-400 focus:border-[#2323d6] focus:outline-none focus:ring-2 focus:ring-[#2323d6]/20'

export default function AdminHero() {
  const { value, refresh } = useSingletonStore(heroContentStore)
  const [form, setForm] = useState(value)
  const [saved, setSaved] = useState(false)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    heroContentStore.set(form)
    refresh()
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  const reset = () => {
    const seed = heroContentStore.reset()
    setForm(seed)
    refresh()
  }

  return (
    <div>
      <h1 className="font-display text-[1.8rem] font-medium text-neutral-900">Homepage hero</h1>
      <p className="mt-1 text-[14.5px] text-neutral-500">
        The heading, subtext and button on the very first thing visitors see.
      </p>

      <form onSubmit={submit} className="mt-6 max-w-2xl space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
              Heading, line 1
            </span>
            <input
              value={form.headingLine1}
              onChange={(e) => setForm((f) => ({ ...f, headingLine1: e.target.value }))}
              className={inputCls}
              required
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
              Heading, line 2
            </span>
            <input
              value={form.headingLine2}
              onChange={(e) => setForm((f) => ({ ...f, headingLine2: e.target.value }))}
              className={inputCls}
              required
            />
          </label>
        </div>
        <label className="block">
          <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
            Subtext
          </span>
          <textarea
            value={form.subtext}
            onChange={(e) => setForm((f) => ({ ...f, subtext: e.target.value }))}
            rows={3}
            className={inputCls}
            required
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
            Button text
          </span>
          <input
            value={form.ctaText}
            onChange={(e) => setForm((f) => ({ ...f, ctaText: e.target.value }))}
            className={inputCls}
            required
          />
        </label>
        <div className="flex items-center gap-3 pt-1">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-[#2323d6] px-6 py-2.5 text-[14px] font-medium text-white hover:bg-[#1a1ab8]"
          >
            {saved && <Check className="h-3.5 w-3.5" />}
            {saved ? 'Saved' : 'Save changes'}
          </button>
          <button
            type="button"
            onClick={reset}
            className="flex items-center gap-2 rounded-lg border border-neutral-200 px-4 py-2.5 text-[14px] font-medium text-neutral-600 hover:border-neutral-400"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset to default
          </button>
        </div>
      </form>
    </div>
  )
}
