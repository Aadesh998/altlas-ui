import { useState, type FormEvent } from 'react'
import { Pencil, Plus, Star, Trash2, X } from 'lucide-react'
import { testimonialsStore } from '@/lib/testimonialsStore'
import { useLocalStore, slugify } from '@/lib/dataStore'
import type { Testimonial } from '@/data/testimonials'

const inputCls =
  'w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-[13.5px] text-neutral-900 placeholder:text-neutral-400 focus:border-[#2323d6] focus:outline-none focus:ring-2 focus:ring-[#2323d6]/20'

const emptyForm = { title: '', text: '', name: '', detail: '', rating: 5 }

function toForm(t: Testimonial) {
  return { title: t.title, text: t.text, name: t.name, detail: t.detail, rating: t.rating }
}

export default function AdminTestimonials() {
  const { items, refresh } = useLocalStore(testimonialsStore)
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

  const startEdit = (t: Testimonial) => {
    setForm(toForm(t))
    setEditingSlug(t.slug)
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
    const payload: Testimonial = {
      slug: editingSlug ?? slugify(form.name),
      title: form.title.trim(),
      text: form.text.trim(),
      name: form.name.trim(),
      detail: form.detail.trim(),
      rating: Math.min(5, Math.max(1, form.rating)),
    }
    try {
      if (editingSlug) testimonialsStore.update(editingSlug, payload)
      else testimonialsStore.add(payload)
      refresh()
      cancel()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  const remove = (slug: string) => {
    if (!confirm('Delete this review?')) return
    testimonialsStore.remove(slug)
    refresh()
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-[1.8rem] font-medium text-neutral-900">Testimonials</h1>
          <p className="mt-1 text-[14.5px] text-neutral-500">Customer reviews shown on the homepage.</p>
        </div>
        <button
          onClick={startAdd}
          className="flex items-center gap-2 rounded-lg bg-[#2323d6] px-4 py-2.5 text-[14px] font-medium text-white hover:bg-[#1a1ab8]"
        >
          <Plus className="h-4 w-4" />
          Add review
        </button>
      </div>

      {showAdd && (
        <form onSubmit={submit} className="mt-6 grid gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:grid-cols-2">
          <div className="flex items-center justify-between sm:col-span-2">
            <h2 className="font-display text-[1.2rem] font-medium text-neutral-900">
              {editingSlug ? 'Edit review' : 'New review'}
            </h2>
            <button type="button" onClick={cancel} className="rounded-md p-1 hover:bg-neutral-100">
              <X className="h-4 w-4" />
            </button>
          </div>
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">Title</span>
            <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className={inputCls} required />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">Review text</span>
            <textarea value={form.text} onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))} rows={3} className={inputCls} required />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">Customer name</span>
            <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className={inputCls} required />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">Detail (service, city)</span>
            <input value={form.detail} onChange={(e) => setForm((f) => ({ ...f, detail: e.target.value }))} placeholder="Airport transfer, Gurgaon" className={inputCls} required />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">Rating (1-5)</span>
            <input
              type="number"
              min={1}
              max={5}
              value={form.rating}
              onChange={(e) => setForm((f) => ({ ...f, rating: Number(e.target.value) }))}
              className={inputCls}
              required
            />
          </label>
          {error && <p className="text-[13px] text-red-600 sm:col-span-2">{error}</p>}
          <button type="submit" className="mt-1 rounded-lg bg-[#2323d6] px-6 py-2.5 text-[14px] font-medium text-white hover:bg-[#1a1ab8] sm:col-span-2">
            {editingSlug ? 'Save changes' : 'Add review'}
          </button>
        </form>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {items.map((t) => (
          <div key={t.slug} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-[#00b67a] text-[#00b67a]" />
                ))}
              </div>
              <div className="flex shrink-0 gap-1">
                <button onClick={() => startEdit(t)} className="rounded-md p-1.5 text-neutral-500 hover:bg-neutral-100">
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => remove(t.slug)} className="rounded-md p-1.5 text-red-500 hover:bg-red-50">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            <h3 className="mt-2 font-display text-[1.05rem] font-medium text-neutral-900">{t.title}</h3>
            <p className="mt-1 text-[13px] text-neutral-600">{t.text}</p>
            <p className="mt-3 text-[13px] font-medium text-neutral-900">{t.name} <span className="font-normal text-neutral-500">· {t.detail}</span></p>
          </div>
        ))}
        {items.length === 0 && <p className="text-[14px] text-neutral-500">No reviews yet.</p>}
      </div>
    </div>
  )
}
