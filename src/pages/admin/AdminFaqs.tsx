import { useState, type FormEvent } from 'react'
import { Pencil, Plus, Trash2, X } from 'lucide-react'
import { faqsStore } from '@/lib/faqsStore'
import { useLocalStore, slugify } from '@/lib/dataStore'
import type { Faq } from '@/data/faqs'

const inputCls =
  'w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-[13.5px] text-neutral-900 placeholder:text-neutral-400 focus:border-[#2323d6] focus:outline-none focus:ring-2 focus:ring-[#2323d6]/20'

const emptyForm = { q: '', a: '' }

export default function AdminFaqs() {
  const { items, refresh } = useLocalStore(faqsStore)
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

  const startEdit = (f: Faq) => {
    setForm({ q: f.q, a: f.a })
    setEditingSlug(f.slug)
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
    const payload: Faq = {
      slug: editingSlug ?? slugify(form.q),
      q: form.q.trim(),
      a: form.a.trim(),
    }
    try {
      if (editingSlug) faqsStore.update(editingSlug, payload)
      else faqsStore.add(payload)
      refresh()
      cancel()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  const remove = (slug: string) => {
    if (!confirm('Delete this FAQ?')) return
    faqsStore.remove(slug)
    refresh()
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-[1.8rem] font-medium text-neutral-900">FAQs</h1>
          <p className="mt-1 text-[14.5px] text-neutral-500">Shown near the bottom of the homepage.</p>
        </div>
        <button
          onClick={startAdd}
          className="flex items-center gap-2 rounded-lg bg-[#2323d6] px-4 py-2.5 text-[14px] font-medium text-white hover:bg-[#1a1ab8]"
        >
          <Plus className="h-4 w-4" />
          Add FAQ
        </button>
      </div>

      {showAdd && (
        <form onSubmit={submit} className="mt-6 space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-[1.2rem] font-medium text-neutral-900">
              {editingSlug ? 'Edit FAQ' : 'New FAQ'}
            </h2>
            <button type="button" onClick={cancel} className="rounded-md p-1 hover:bg-neutral-100">
              <X className="h-4 w-4" />
            </button>
          </div>
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">Question</span>
            <input value={form.q} onChange={(e) => setForm((f) => ({ ...f, q: e.target.value }))} className={inputCls} required />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400">Answer</span>
            <textarea value={form.a} onChange={(e) => setForm((f) => ({ ...f, a: e.target.value }))} rows={4} className={inputCls} required />
          </label>
          {error && <p className="text-[13px] text-red-600">{error}</p>}
          <button type="submit" className="rounded-lg bg-[#2323d6] px-6 py-2.5 text-[14px] font-medium text-white hover:bg-[#1a1ab8]">
            {editingSlug ? 'Save changes' : 'Add FAQ'}
          </button>
        </form>
      )}

      <div className="mt-6 space-y-3">
        {items.map((f) => (
          <div key={f.slug} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-[1.05rem] font-medium text-neutral-900">{f.q}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-neutral-600">{f.a}</p>
              </div>
              <div className="flex shrink-0 gap-1">
                <button onClick={() => startEdit(f)} className="rounded-md p-1.5 text-neutral-500 hover:bg-neutral-100">
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => remove(f.slug)} className="rounded-md p-1.5 text-red-500 hover:bg-red-50">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-[14px] text-neutral-500">No FAQs yet.</p>}
      </div>
    </div>
  )
}
