import { useMemo, useState } from 'react'
import { Check, RotateCcw, Search } from 'lucide-react'
import { getImageSlots } from '@/data/imageSlots'
import { useImageOverrides, resolveImage } from '@/lib/imageOverrides'

const inputCls =
  'w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-[13.5px] text-neutral-900 placeholder:text-neutral-400 focus:border-[#2323d6] focus:outline-none focus:ring-2 focus:ring-[#2323d6]/20'

function ImageRow({ slotKey, label, defaultUrl }: { slotKey: string; label: string; defaultUrl: string }) {
  const { overrides, setOverride, resetOverride } = useImageOverrides()
  const current = resolveImage(overrides, slotKey, defaultUrl)
  const [draft, setDraft] = useState(current)
  const [saved, setSaved] = useState(false)
  const isOverridden = Boolean(overrides[slotKey])

  const save = () => {
    if (!draft.trim()) return
    setOverride(slotKey, draft.trim())
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  const reset = () => {
    resetOverride(slotKey)
    setDraft(defaultUrl)
  }

  return (
    <div className="flex flex-col gap-3 border-b border-neutral-100 py-4 last:border-0 sm:flex-row sm:items-center">
      <img src={current} alt={label} className="h-16 w-24 shrink-0 rounded-lg object-cover ring-1 ring-black/5" />
      <div className="flex-1">
        <p className="text-[13.5px] font-medium text-neutral-800">
          {label}
          {isOverridden && (
            <span className="ml-2 rounded-full bg-[#00b67a]/10 px-2 py-0.5 text-[11px] font-semibold text-[#00b67a]">
              Custom
            </span>
          )}
        </p>
        <div className="mt-1.5 flex items-center gap-2">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="https://…"
            className={inputCls}
          />
          <button
            onClick={save}
            className="flex shrink-0 items-center gap-1.5 rounded-lg bg-[#2323d6] px-3 py-2 text-[13px] font-medium text-white transition-colors hover:bg-[#1a1ab8]"
          >
            {saved ? <Check className="h-3.5 w-3.5" /> : null}
            {saved ? 'Saved' : 'Save'}
          </button>
          {isOverridden && (
            <button
              onClick={reset}
              title="Reset to default image"
              className="flex shrink-0 items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-2 text-[13px] font-medium text-neutral-600 transition-colors hover:border-neutral-400"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function AdminImages() {
  const [query, setQuery] = useState('')
  const allSlots = useMemo(() => getImageSlots(), [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return allSlots
    return allSlots.filter((s) => s.label.toLowerCase().includes(q) || s.group.toLowerCase().includes(q))
  }, [query, allSlots])

  const groups = useMemo(() => {
    const map = new Map<string, typeof allSlots>()
    for (const slot of filtered) {
      if (!map.has(slot.group)) map.set(slot.group, [])
      map.get(slot.group)!.push(slot)
    }
    return Array.from(map.entries())
  }, [filtered])

  return (
    <div>
      <h1 className="font-display text-[1.8rem] font-medium text-neutral-900">Site images</h1>
      <p className="mt-1 text-[14.5px] text-neutral-500">
        Paste a public image URL and save to replace any photo on the live site — no code changes needed.
      </p>

      <div className="relative mt-6 max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search images…"
          className={`${inputCls} pl-9`}
        />
      </div>

      <div className="mt-6 space-y-8">
        {groups.map(([group, slots]) => (
          <div key={group} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 md:p-6">
            <h2 className="font-display text-[1.1rem] font-medium text-neutral-900">{group}</h2>
            <div className="mt-2">
              {slots.map((slot) => (
                <ImageRow key={slot.key} slotKey={slot.key} label={slot.label} defaultUrl={slot.default} />
              ))}
            </div>
          </div>
        ))}
        {groups.length === 0 && <p className="text-[14px] text-neutral-500">No images match your search.</p>}
      </div>
    </div>
  )
}
