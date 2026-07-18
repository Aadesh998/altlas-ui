import { useState, type FormEvent } from 'react'
import { Pencil, Plus, Trash2, X } from 'lucide-react'
import { destinationsStore } from '@/lib/destinationsStore'
import { useLocalStore, slugify } from '@/lib/dataStore'
import { ICON_OPTIONS, resolveIcon, type IconName } from '@/data/icons'
import type { Destination } from '@/data/destinations'
import SmartLink from '@/components/SmartLink'

const inputCls =
  'w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-[13.5px] text-neutral-900 placeholder:text-neutral-400 focus:border-[#2323d6] focus:outline-none focus:ring-2 focus:ring-[#2323d6]/20'

const CATEGORIES = ['Hill Station', 'Pilgrimage', 'Heritage', 'Spiritual & Adventure'] as const

const emptyForm = {
  name: '',
  region: '',
  category: CATEGORIES[0] as Destination['category'],
  icon: ICON_OPTIONS[0] as IconName,
  tagline: '',
  distanceFromDelhi: '',
  idealDuration: '',
  bestTime: '',
  overview: '',
  highlights: '',
  image1: '',
  image2: '',
  image3: '',
}

function toForm(d: Destination) {
  return {
    name: d.name,
    region: d.region,
    category: d.category,
    icon: d.icon,
    tagline: d.tagline,
    distanceFromDelhi: d.distanceFromDelhi,
    idealDuration: d.idealDuration,
    bestTime: d.bestTime,
    overview: d.overview,
    highlights: d.highlights.join('\n'),
    image1: d.images[0] ?? '',
    image2: d.images[1] ?? '',
    image3: d.images[2] ?? '',
  }
}

const PLACEHOLDER_IMAGE = 'https://loremflickr.com/1200/800/india,travel/all'

export default function AdminDestinations() {
  const { items, refresh } = useLocalStore(destinationsStore)
  const [editingSlug, setEditingSlug] = useState<string | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')

  const startAdd = () => {
    setForm(emptyForm)
    setEditingSlug(null)
    setShowAdd(true)
    setError('')
  }

  const startEdit = (d: Destination) => {
    setForm(toForm(d))
    setEditingSlug(d.slug)
    setShowAdd(true)
    setError('')
  }

  const cancel = () => {
    setShowAdd(false)
    setEditingSlug(null)
    setError('')
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const slug = editingSlug ?? slugify(form.name)
    const payload: Destination = {
      slug,
      name: form.name.trim(),
      region: form.region.trim(),
      category: form.category,
      icon: form.icon,
      tagline: form.tagline.trim(),
      distanceFromDelhi: form.distanceFromDelhi.trim(),
      idealDuration: form.idealDuration.trim(),
      bestTime: form.bestTime.trim(),
      overview: form.overview.trim(),
      highlights: form.highlights.split('\n').map((h) => h.trim()).filter(Boolean),
      images: [
        form.image1.trim() || `${PLACEHOLDER_IMAGE}?lock=1`,
        form.image2.trim() || `${PLACEHOLDER_IMAGE}?lock=2`,
        form.image3.trim() || `${PLACEHOLDER_IMAGE}?lock=3`,
      ],
    }
    try {
      if (editingSlug) destinationsStore.update(editingSlug, payload)
      else destinationsStore.add(payload)
      refresh()
      cancel()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  const remove = (slug: string) => {
    if (!confirm('Delete this destination? Packages referencing it will keep showing its name as plain text.')) return
    destinationsStore.remove(slug)
    refresh()
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-[1.8rem] font-medium text-neutral-900">Destinations</h1>
          <p className="mt-1 text-[14.5px] text-neutral-500">
            Shown on /tours and linked from the Navbar. Fine-tune photos afterward on the{' '}
            <SmartLink href="/admin/images" className="text-[#2323d6] hover:underline">Site images</SmartLink> page.
          </p>
        </div>
        <button
          onClick={startAdd}
          className="flex items-center gap-2 rounded-lg bg-[#2323d6] px-4 py-2.5 text-[14px] font-medium text-white hover:bg-[#1a1ab8]"
        >
          <Plus className="h-4 w-4" />
          Add destination
        </button>
      </div>

      {showAdd && (
        <form onSubmit={submit} className="mt-6 grid gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:grid-cols-2">
          <div className="flex items-center justify-between sm:col-span-2">
            <h2 className="font-display text-[1.2rem] font-medium text-neutral-900">
              {editingSlug ? 'Edit destination' : 'New destination'}
            </h2>
            <button type="button" onClick={cancel} className="rounded-md p-1 hover:bg-neutral-100">
              <X className="h-4 w-4" />
            </button>
          </div>
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">Name</span>
            <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className={inputCls} required />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">Region / state</span>
            <input value={form.region} onChange={(e) => setForm((f) => ({ ...f, region: e.target.value }))} placeholder="Himachal Pradesh" className={inputCls} required />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">Category</span>
            <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as Destination['category'] }))} className={inputCls}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">Icon</span>
            <select value={form.icon} onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value as IconName }))} className={inputCls}>
              {ICON_OPTIONS.map((i) => <option key={i} value={i}>{i}</option>)}
            </select>
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">Tagline</span>
            <input value={form.tagline} onChange={(e) => setForm((f) => ({ ...f, tagline: e.target.value }))} className={inputCls} required />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">Distance from Delhi</span>
            <input value={form.distanceFromDelhi} onChange={(e) => setForm((f) => ({ ...f, distanceFromDelhi: e.target.value }))} placeholder="~540 km · 12-13 hrs by road" className={inputCls} required />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">Ideal duration</span>
            <input value={form.idealDuration} onChange={(e) => setForm((f) => ({ ...f, idealDuration: e.target.value }))} placeholder="4-5 days" className={inputCls} required />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">Best time to visit</span>
            <input value={form.bestTime} onChange={(e) => setForm((f) => ({ ...f, bestTime: e.target.value }))} placeholder="Mar-Jun & Oct-Feb (snow)" className={inputCls} required />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">Overview</span>
            <textarea value={form.overview} onChange={(e) => setForm((f) => ({ ...f, overview: e.target.value }))} rows={3} className={inputCls} required />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">Highlights, one per line</span>
            <textarea value={form.highlights} onChange={(e) => setForm((f) => ({ ...f, highlights: e.target.value }))} rows={4} className={inputCls} required />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
              Photo URLs (optional — leave blank for a placeholder, refine later in Site images)
            </span>
            <div className="grid gap-2">
              <input value={form.image1} onChange={(e) => setForm((f) => ({ ...f, image1: e.target.value }))} placeholder="Photo 1 URL" className={inputCls} />
              <input value={form.image2} onChange={(e) => setForm((f) => ({ ...f, image2: e.target.value }))} placeholder="Photo 2 URL" className={inputCls} />
              <input value={form.image3} onChange={(e) => setForm((f) => ({ ...f, image3: e.target.value }))} placeholder="Photo 3 URL" className={inputCls} />
            </div>
          </label>
          {error && <p className="text-[13px] text-red-600 sm:col-span-2">{error}</p>}
          <button type="submit" className="mt-1 rounded-lg bg-[#2323d6] px-6 py-2.5 text-[14px] font-medium text-white hover:bg-[#1a1ab8] sm:col-span-2">
            {editingSlug ? 'Save changes' : 'Add destination'}
          </button>
        </form>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((d) => {
          const Icon = resolveIcon(d.icon)
          return (
            <div key={d.slug} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
              <img src={d.images[0]} alt={d.name} className="h-32 w-full object-cover" />
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-[#2323d6]" />
                    <div>
                      <h3 className="font-display text-[1.05rem] font-medium text-neutral-900">{d.name}</h3>
                      <p className="text-[12px] text-neutral-500">{d.region}</p>
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <button onClick={() => startEdit(d)} className="rounded-md p-1.5 text-neutral-500 hover:bg-neutral-100">
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => remove(d.slug)} className="rounded-md p-1.5 text-red-500 hover:bg-red-50">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
