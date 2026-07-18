import { useState, type FormEvent } from 'react'
import { Pencil, Plus, Trash2, X } from 'lucide-react'
import { serviceCategoriesStore } from '@/lib/serviceCategoriesStore'
import { useLocalStore, slugify } from '@/lib/dataStore'
import type { ServiceCategoryData } from '@/data/serviceCategories'
import SmartLink from '@/components/SmartLink'

const inputCls =
  'w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-[13.5px] text-neutral-900 placeholder:text-neutral-400 focus:border-[#2323d6] focus:outline-none focus:ring-2 focus:ring-[#2323d6]/20'

const emptyForm = {
  title: '',
  image: '',
  cardText: '',
  tagline: '',
}

function toForm(c: ServiceCategoryData) {
  return {
    title: c.title,
    image: c.image,
    cardText: c.cardText,
    tagline: c.tagline,
  }
}

const PLACEHOLDER_IMAGE = 'https://loremflickr.com/1200/1600/car,india'

export default function AdminServiceCategories() {
  const { items, refresh } = useLocalStore(serviceCategoriesStore)
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

  const startEdit = (c: ServiceCategoryData) => {
    setForm(toForm(c))
    setEditingSlug(c.slug)
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
    const slug = editingSlug ?? slugify(form.title)
    const payload: ServiceCategoryData = {
      slug,
      title: form.title.trim(),
      image: form.image.trim() || `${PLACEHOLDER_IMAGE}?lock=${Math.abs(slug.length * 7)}`,
      cardText: form.cardText.trim(),
      tagline: form.tagline.trim(),
    }
    try {
      if (editingSlug) serviceCategoriesStore.update(editingSlug, payload)
      else serviceCategoriesStore.add(payload)
      refresh()
      cancel()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  const remove = (slug: string) => {
    if (!confirm('Delete this service category? Existing service packages under it will keep the old category slug as plain text.')) return
    serviceCategoriesStore.remove(slug)
    refresh()
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-[1.8rem] font-medium text-neutral-900">Service categories</h1>
          <p className="mt-1 text-[14.5px] text-neutral-500">
            Shown as cards on the homepage Services section, in the Navbar/Footer, and as category page headers. Manage
            the packages within each category on the{' '}
            <SmartLink href="/admin/service-packages" className="text-[#2323d6] hover:underline">Service packages</SmartLink> page.
          </p>
        </div>
        <button
          onClick={startAdd}
          className="flex items-center gap-2 rounded-lg bg-[#2323d6] px-4 py-2.5 text-[14px] font-medium text-white hover:bg-[#1a1ab8]"
        >
          <Plus className="h-4 w-4" />
          Add category
        </button>
      </div>

      {showAdd && (
        <form onSubmit={submit} className="mt-6 grid gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:grid-cols-2">
          <div className="flex items-center justify-between sm:col-span-2">
            <h2 className="font-display text-[1.2rem] font-medium text-neutral-900">
              {editingSlug ? 'Edit category' : 'New category'}
            </h2>
            <button type="button" onClick={cancel} className="rounded-md p-1 hover:bg-neutral-100">
              <X className="h-4 w-4" />
            </button>
          </div>
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">Title</span>
            <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="City Rides" className={inputCls} required />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">Tagline (used as the category page subheading)</span>
            <input value={form.tagline} onChange={(e) => setForm((f) => ({ ...f, tagline: e.target.value }))} className={inputCls} required />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">Card text (short blurb shown on the homepage card)</span>
            <textarea value={form.cardText} onChange={(e) => setForm((f) => ({ ...f, cardText: e.target.value }))} rows={2} className={inputCls} required />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
              Card image URL (optional — leave blank for a placeholder, refine later in Site images)
            </span>
            <input value={form.image} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))} placeholder="https://…" className={inputCls} />
          </label>
          {error && <p className="text-[13px] text-red-600 sm:col-span-2">{error}</p>}
          <button type="submit" className="mt-1 rounded-lg bg-[#2323d6] px-6 py-2.5 text-[14px] font-medium text-white hover:bg-[#1a1ab8] sm:col-span-2">
            {editingSlug ? 'Save changes' : 'Add category'}
          </button>
        </form>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c) => (
          <div key={c.slug} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
            <img src={c.image} alt={c.title} className="h-32 w-full object-cover" />
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-display text-[1.05rem] font-medium text-neutral-900">{c.title}</h3>
                  <p className="mt-0.5 text-[12px] text-neutral-500">{c.tagline}</p>
                </div>
                <div className="flex shrink-0 gap-1">
                  <button onClick={() => startEdit(c)} className="rounded-md p-1.5 text-neutral-500 hover:bg-neutral-100">
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => remove(c.slug)} className="rounded-md p-1.5 text-red-500 hover:bg-red-50">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
