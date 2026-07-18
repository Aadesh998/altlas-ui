import { useState, type FormEvent } from 'react'
import { Pencil, Plus, Trash2, X } from 'lucide-react'
import { servicePackagesStore } from '@/lib/servicePackagesStore'
import { serviceCategoriesStore } from '@/lib/serviceCategoriesStore'
import { useLocalStore, slugify } from '@/lib/dataStore'
import type { ServiceCategory, ServicePackage } from '@/data/servicePackages'

const inputCls =
  'w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-[13.5px] text-neutral-900 placeholder:text-neutral-400 focus:border-[#2323d6] focus:outline-none focus:ring-2 focus:ring-[#2323d6]/20'

function makeEmptyForm(defaultCategory: string) {
  return {
    title: '',
    category: defaultCategory as ServiceCategory,
    vehicle: 'Sedan',
    route: '',
    includes: '',
    basePrice: '',
    extraKmRate: '',
    extraHourRate: '',
    nightCharge: '',
  }
}

function toForm(p: ServicePackage) {
  return {
    title: p.title,
    category: p.category,
    vehicle: p.vehicle,
    route: p.route ?? '',
    includes: p.includes.join('\n'),
    basePrice: p.basePrice,
    extraKmRate: p.extraKmRate,
    extraHourRate: p.extraHourRate ?? '',
    nightCharge: p.nightCharge ?? '',
  }
}

export default function AdminServicePackages() {
  const { items, refresh } = useLocalStore(servicePackagesStore)
  const { items: SERVICE_CATEGORIES } = useLocalStore(serviceCategoriesStore)
  const [filter, setFilter] = useState<ServiceCategory | 'all'>('all')
  const [editingSlug, setEditingSlug] = useState<string | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState(makeEmptyForm(SERVICE_CATEGORIES[0]?.slug ?? ''))
  const [error, setError] = useState('')

  const visible = filter === 'all' ? items : items.filter((p) => p.category === filter)

  const startAdd = () => {
    setForm(makeEmptyForm(SERVICE_CATEGORIES[0]?.slug ?? ''))
    setEditingSlug(null)
    setShowAdd(true)
    setError('')
  }

  const startEdit = (p: ServicePackage) => {
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
    const payload: ServicePackage = {
      slug: editingSlug ?? slugify(form.title),
      category: form.category,
      title: form.title.trim(),
      vehicle: form.vehicle.trim(),
      route: form.route.trim() || undefined,
      includes: form.includes.split('\n').map((i) => i.trim()).filter(Boolean),
      basePrice: form.basePrice.trim(),
      extraKmRate: form.extraKmRate.trim(),
      extraHourRate: form.extraHourRate.trim() || undefined,
      nightCharge: form.nightCharge.trim() || undefined,
    }
    try {
      if (editingSlug) servicePackagesStore.update(editingSlug, payload)
      else servicePackagesStore.add(payload)
      refresh()
      cancel()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  const remove = (slug: string) => {
    if (!confirm('Delete this package? This cannot be undone.')) return
    servicePackagesStore.remove(slug)
    refresh()
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-[1.8rem] font-medium text-neutral-900">Service packages</h1>
          <p className="mt-1 text-[14.5px] text-neutral-500">
            City rides, airport transfers, chauffeur hire, corporate travel and events & weddings packages.
          </p>
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
        {SERVICE_CATEGORIES.map((c) => (
          <button
            key={c.slug}
            onClick={() => setFilter(c.slug)}
            className={`rounded-full px-4 py-2 text-[13px] font-medium ${filter === c.slug ? 'bg-[#060650] text-white' : 'bg-white text-neutral-600 ring-1 ring-neutral-200'}`}
          >
            {c.title}
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
            <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">Category</span>
            <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as ServiceCategory }))} className={inputCls}>
              {SERVICE_CATEGORIES.map((c) => (
                <option key={c.slug} value={c.slug}>{c.title}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">Vehicle</span>
            <input value={form.vehicle} onChange={(e) => setForm((f) => ({ ...f, vehicle: e.target.value }))} placeholder="Sedan / SUV" className={inputCls} required />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">Route (optional)</span>
            <input value={form.route} onChange={(e) => setForm((f) => ({ ...f, route: e.target.value }))} placeholder="Gurgaon → IGI T3" className={inputCls} />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">Includes, one per line</span>
            <textarea value={form.includes} onChange={(e) => setForm((f) => ({ ...f, includes: e.target.value }))} rows={3} className={inputCls} required />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">Base price</span>
            <input value={form.basePrice} onChange={(e) => setForm((f) => ({ ...f, basePrice: e.target.value }))} placeholder="₹2,500" className={inputCls} required />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">Extra km rate</span>
            <input value={form.extraKmRate} onChange={(e) => setForm((f) => ({ ...f, extraKmRate: e.target.value }))} placeholder="₹14/km" className={inputCls} required />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">Extra hour rate (optional)</span>
            <input value={form.extraHourRate} onChange={(e) => setForm((f) => ({ ...f, extraHourRate: e.target.value }))} placeholder="₹150/hr" className={inputCls} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">Night charge (optional)</span>
            <input value={form.nightCharge} onChange={(e) => setForm((f) => ({ ...f, nightCharge: e.target.value }))} placeholder="₹500/night" className={inputCls} />
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
                  {p.vehicle}
                </span>
                <h3 className="mt-2 font-display text-[1.15rem] font-medium text-neutral-900">{p.title}</h3>
                {p.route && <p className="text-[12.5px] text-neutral-500">{p.route}</p>}
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
            <p className="mt-3 text-[14px] font-semibold text-neutral-900">{p.basePrice}*</p>
          </div>
        ))}
        {visible.length === 0 && <p className="text-[14px] text-neutral-500">No packages in this filter.</p>}
      </div>
    </div>
  )
}
