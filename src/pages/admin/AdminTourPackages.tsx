import { useState, type FormEvent } from 'react'
import { Pencil, Plus, Trash2, X } from 'lucide-react'
import { tourPackagesStore } from '@/lib/tourPackagesStore'
import { useLocalStore, slugify } from '@/lib/dataStore'
import { PACKAGE_TYPE_LABELS, type PackageType, type TourPackage } from '@/data/tourPackages'

const inputCls =
  'w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-[13.5px] text-neutral-900 placeholder:text-neutral-400 focus:border-[#2323d6] focus:outline-none focus:ring-2 focus:ring-[#2323d6]/20'

const TYPES: PackageType[] = ['local-delhi', 'local-outstation', 'multi-day']

const emptyForm = {
  title: '',
  type: 'local-delhi' as PackageType,
  duration: '',
  destinations: '',
  indicativeFrom: '',
  carType: 'Sedan',
  highlights: '',
}

function toForm(p: TourPackage) {
  return {
    title: p.title,
    type: p.type,
    duration: p.duration,
    destinations: p.destinations.join(', '),
    indicativeFrom: p.indicativeFrom,
    carType: p.carType,
    highlights: p.highlights.join('\n'),
  }
}

export default function AdminTourPackages() {
  const { items, refresh } = useLocalStore(tourPackagesStore)
  const [filter, setFilter] = useState<PackageType | 'all'>('all')
  const [editingSlug, setEditingSlug] = useState<string | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')

  const visible = filter === 'all' ? items : items.filter((p) => p.type === filter)

  const startAdd = () => {
    setForm(emptyForm)
    setEditingSlug(null)
    setShowAdd(true)
    setError('')
  }

  const startEdit = (p: TourPackage) => {
    setForm(toForm(p))
    setEditingSlug(p.slug)
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
    const payload: TourPackage = {
      slug: editingSlug ?? slugify(form.title),
      type: form.type,
      title: form.title.trim(),
      duration: form.duration.trim(),
      destinations: form.destinations.split(',').map((d) => d.trim()).filter(Boolean),
      indicativeFrom: form.indicativeFrom.trim(),
      carType: form.carType.trim(),
      highlights: form.highlights.split('\n').map((h) => h.trim()).filter(Boolean),
    }
    try {
      if (editingSlug) tourPackagesStore.update(editingSlug, payload)
      else tourPackagesStore.add(payload)
      refresh()
      cancel()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  const remove = (slug: string) => {
    if (!confirm('Delete this package? This cannot be undone.')) return
    tourPackagesStore.remove(slug)
    refresh()
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-[1.8rem] font-medium text-neutral-900">Tour packages</h1>
          <p className="mt-1 text-[14.5px] text-neutral-500">Local sightseeing and multi-day tour packages shown on /tours.</p>
        </div>
        <button
          onClick={startAdd}
          className="flex items-center gap-2 rounded-lg bg-[#2323d6] px-4 py-2.5 text-[14px] font-medium text-white hover:bg-[#1a1ab8]"
        >
          <Plus className="h-4 w-4" />
          Add package
        </button>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`rounded-full px-4 py-2 text-[13px] font-medium ${filter === 'all' ? 'bg-[#060650] text-white' : 'bg-white text-neutral-600 ring-1 ring-neutral-200'}`}
        >
          All
        </button>
        {TYPES.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`rounded-full px-4 py-2 text-[13px] font-medium ${filter === t ? 'bg-[#060650] text-white' : 'bg-white text-neutral-600 ring-1 ring-neutral-200'}`}
          >
            {PACKAGE_TYPE_LABELS[t]}
          </button>
        ))}
      </div>

      {showAdd && (
        <form onSubmit={submit} className="mt-6 grid gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:grid-cols-2">
          <div className="flex items-center justify-between sm:col-span-2">
            <h2 className="font-display text-[1.2rem] font-medium text-neutral-900">
              {editingSlug ? 'Edit package' : 'New package'}
            </h2>
            <button type="button" onClick={cancel} className="rounded-md p-1 hover:bg-neutral-100">
              <X className="h-4 w-4" />
            </button>
          </div>
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">Title</span>
            <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className={inputCls} required />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">Type</span>
            <select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as PackageType }))} className={inputCls}>
              {TYPES.map((t) => (
                <option key={t} value={t}>{PACKAGE_TYPE_LABELS[t]}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">Duration</span>
            <input value={form.duration} onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))} placeholder="4 days / 3 nights" className={inputCls} required />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">Destination(s), comma separated</span>
            <input value={form.destinations} onChange={(e) => setForm((f) => ({ ...f, destinations: e.target.value }))} placeholder="Manali, Shimla" className={inputCls} required />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">Car type</span>
            <input value={form.carType} onChange={(e) => setForm((f) => ({ ...f, carType: e.target.value }))} placeholder="Sedan / SUV" className={inputCls} required />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">Indicative price</span>
            <input value={form.indicativeFrom} onChange={(e) => setForm((f) => ({ ...f, indicativeFrom: e.target.value }))} placeholder="₹18,000" className={inputCls} required />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">Highlights, one per line</span>
            <textarea value={form.highlights} onChange={(e) => setForm((f) => ({ ...f, highlights: e.target.value }))} rows={4} className={inputCls} required />
          </label>
          {error && <p className="text-[13px] text-red-600 sm:col-span-2">{error}</p>}
          <button type="submit" className="mt-1 rounded-lg bg-[#2323d6] px-6 py-2.5 text-[14px] font-medium text-white hover:bg-[#1a1ab8] sm:col-span-2">
            {editingSlug ? 'Save changes' : 'Add package'}
          </button>
        </form>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {visible.map((p) => (
          <div key={p.slug} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="rounded-full bg-[#060650]/5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#060650]">
                  {PACKAGE_TYPE_LABELS[p.type]}
                </span>
                <h3 className="mt-2 font-display text-[1.15rem] font-medium text-neutral-900">{p.title}</h3>
                <p className="text-[12.5px] text-neutral-500">{p.destinations.join(', ')} · {p.duration}</p>
              </div>
              <div className="flex shrink-0 gap-1">
                <button onClick={() => startEdit(p)} className="rounded-md p-1.5 text-neutral-500 hover:bg-neutral-100">
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => remove(p.slug)} className="rounded-md p-1.5 text-red-500 hover:bg-red-50">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            <p className="mt-3 text-[14px] font-semibold text-neutral-900">{p.indicativeFrom}* <span className="text-[12.5px] font-normal text-neutral-500">({p.carType})</span></p>
          </div>
        ))}
        {visible.length === 0 && <p className="text-[14px] text-neutral-500">No packages in this filter.</p>}
      </div>
    </div>
  )
}
