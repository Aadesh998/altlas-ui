import { useState, type FormEvent } from 'react'
import { Check, RotateCcw } from 'lucide-react'
import { homepageContentStore } from '@/lib/homepageContentStore'
import { useSingletonStore } from '@/lib/dataStore'
import type { AccordionEntry, HomepageContent } from '@/data/homepageContent'

const inputCls =
  'w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-[13.5px] text-neutral-900 placeholder:text-neutral-400 focus:border-[#2323d6] focus:outline-none focus:ring-2 focus:ring-[#2323d6]/20'
const labelCls = 'mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-400'

function entriesToText(items: AccordionEntry[]): string {
  return items.map((i) => `${i.title} | ${i.body}`).join('\n')
}

function textToEntries(text: string): AccordionEntry[] {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const idx = line.indexOf('|')
      if (idx === -1) return { title: line, body: '' }
      return { title: line.slice(0, idx).trim(), body: line.slice(idx + 1).trim() }
    })
}

function paragraphsToText(paragraphs: string[]): string {
  return paragraphs.join('\n')
}

function textToParagraphs(text: string): string[] {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

interface Section {
  key: string
  title: string
  hint: string
}

const SECTIONS: Section[] = [
  { key: 'services', title: 'Services header', hint: 'The eyebrow + heading above the service category cards.' },
  { key: 'intro', title: 'Intro', hint: 'The "Introducing AXLE" two-column section.' },
  { key: 'darkCard', title: 'Dark card', hint: 'The dark "Effortless. Reliable. Everywhere." block.' },
  { key: 'difference', title: 'The AXLE difference', hint: 'Intro copy plus the big statement and rating.' },
  { key: 'whyDifferent', title: "Why we're different", hint: 'The dark accordion with 5 reasons.' },
  { key: 'process', title: 'The AXLE process', hint: 'The 4-step process cards.' },
  { key: 'ctaBanner', title: 'CTA banner', hint: 'The dark full-width call-to-action band.' },
  { key: 'newsletter', title: 'Newsletter', hint: 'The email signup heading and subtext.' },
  { key: 'ratingBar', title: 'Rating bar', hint: 'The thin "Excellent 4.9" strip near the top.' },
]

export default function AdminHomepage() {
  const { value, refresh } = useSingletonStore(homepageContentStore)
  const [form, setForm] = useState<HomepageContent>(value)
  const [saved, setSaved] = useState(false)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    homepageContentStore.set(form)
    refresh()
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  const reset = () => {
    const seed = homepageContentStore.reset()
    setForm(seed)
    refresh()
  }

  return (
    <div>
      <h1 className="font-display text-[1.8rem] font-medium text-neutral-900">Homepage sections</h1>
      <p className="mt-1 text-[14.5px] text-neutral-500">
        Edit the copy for every narrative section on the homepage, below the hero.
      </p>

      <form onSubmit={submit} className="mt-6 max-w-3xl space-y-4">
        {SECTIONS.map((section) => (
          <details key={section.key} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5" open={section.key === 'services'}>
            <summary className="cursor-pointer select-none font-display text-[1.15rem] font-medium text-neutral-900">
              {section.title}
            </summary>
            <p className="mt-1 text-[13px] text-neutral-500">{section.hint}</p>

            <div className="mt-4 space-y-4">
              {section.key === 'services' && (
                <>
                  <label className="block">
                    <span className={labelCls}>Eyebrow</span>
                    <input
                      className={inputCls}
                      value={form.services.eyebrow}
                      onChange={(e) => setForm((f) => ({ ...f, services: { ...f.services, eyebrow: e.target.value } }))}
                    />
                  </label>
                  <label className="block">
                    <span className={labelCls}>Heading</span>
                    <input
                      className={inputCls}
                      value={form.services.heading}
                      onChange={(e) => setForm((f) => ({ ...f, services: { ...f.services, heading: e.target.value } }))}
                    />
                  </label>
                </>
              )}

              {section.key === 'intro' && (
                <>
                  <label className="block">
                    <span className={labelCls}>Eyebrow</span>
                    <input
                      className={inputCls}
                      value={form.intro.eyebrow}
                      onChange={(e) => setForm((f) => ({ ...f, intro: { ...f.intro, eyebrow: e.target.value } }))}
                    />
                  </label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className={labelCls}>Heading, line 1</span>
                      <input
                        className={inputCls}
                        value={form.intro.headingLine1}
                        onChange={(e) => setForm((f) => ({ ...f, intro: { ...f.intro, headingLine1: e.target.value } }))}
                      />
                    </label>
                    <label className="block">
                      <span className={labelCls}>Heading, line 2</span>
                      <input
                        className={inputCls}
                        value={form.intro.headingLine2}
                        onChange={(e) => setForm((f) => ({ ...f, intro: { ...f.intro, headingLine2: e.target.value } }))}
                      />
                    </label>
                  </div>
                  <label className="block">
                    <span className={labelCls}>Paragraphs (one per line)</span>
                    <textarea
                      className={inputCls}
                      rows={5}
                      value={paragraphsToText(form.intro.paragraphs)}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, intro: { ...f.intro, paragraphs: textToParagraphs(e.target.value) } }))
                      }
                    />
                  </label>
                </>
              )}

              {section.key === 'darkCard' && (
                <>
                  <label className="block">
                    <span className={labelCls}>Heading</span>
                    <input
                      className={inputCls}
                      value={form.darkCard.heading}
                      onChange={(e) => setForm((f) => ({ ...f, darkCard: { ...f.darkCard, heading: e.target.value } }))}
                    />
                  </label>
                  <label className="block">
                    <span className={labelCls}>Paragraphs (one per line)</span>
                    <textarea
                      className={inputCls}
                      rows={5}
                      value={paragraphsToText(form.darkCard.paragraphs)}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, darkCard: { ...f.darkCard, paragraphs: textToParagraphs(e.target.value) } }))
                      }
                    />
                  </label>
                  <label className="block">
                    <span className={labelCls}>Button text</span>
                    <input
                      className={inputCls}
                      value={form.darkCard.ctaText}
                      onChange={(e) => setForm((f) => ({ ...f, darkCard: { ...f.darkCard, ctaText: e.target.value } }))}
                    />
                  </label>
                </>
              )}

              {section.key === 'difference' && (
                <>
                  <label className="block">
                    <span className={labelCls}>Heading</span>
                    <input
                      className={inputCls}
                      value={form.difference.heading}
                      onChange={(e) => setForm((f) => ({ ...f, difference: { ...f.difference, heading: e.target.value } }))}
                    />
                  </label>
                  <label className="block">
                    <span className={labelCls}>Paragraphs (one per line)</span>
                    <textarea
                      className={inputCls}
                      rows={4}
                      value={paragraphsToText(form.difference.paragraphs)}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, difference: { ...f.difference, paragraphs: textToParagraphs(e.target.value) } }))
                      }
                    />
                  </label>
                  <label className="block">
                    <span className={labelCls}>Button text</span>
                    <input
                      className={inputCls}
                      value={form.difference.ctaText}
                      onChange={(e) => setForm((f) => ({ ...f, difference: { ...f.difference, ctaText: e.target.value } }))}
                    />
                  </label>
                  <label className="block">
                    <span className={labelCls}>Big statement</span>
                    <textarea
                      className={inputCls}
                      rows={2}
                      value={form.difference.bigStatement}
                      onChange={(e) => setForm((f) => ({ ...f, difference: { ...f.difference, bigStatement: e.target.value } }))}
                    />
                  </label>
                  <label className="block">
                    <span className={labelCls}>Big statement subtext</span>
                    <textarea
                      className={inputCls}
                      rows={3}
                      value={form.difference.bigStatementSub}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, difference: { ...f.difference, bigStatementSub: e.target.value } }))
                      }
                    />
                  </label>
                  <label className="block max-w-[160px]">
                    <span className={labelCls}>Rating value</span>
                    <input
                      className={inputCls}
                      value={form.difference.ratingValue}
                      onChange={(e) => setForm((f) => ({ ...f, difference: { ...f.difference, ratingValue: e.target.value } }))}
                    />
                  </label>
                </>
              )}

              {section.key === 'whyDifferent' && (
                <>
                  <label className="block">
                    <span className={labelCls}>Heading</span>
                    <input
                      className={inputCls}
                      value={form.whyDifferent.heading}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, whyDifferent: { ...f.whyDifferent, heading: e.target.value } }))
                      }
                    />
                  </label>
                  <label className="block">
                    <span className={labelCls}>Accordion items — one per line, "Title | Body"</span>
                    <textarea
                      className={inputCls}
                      rows={8}
                      value={entriesToText(form.whyDifferent.items)}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, whyDifferent: { ...f.whyDifferent, items: textToEntries(e.target.value) } }))
                      }
                    />
                  </label>
                  <label className="block">
                    <span className={labelCls}>Button text</span>
                    <input
                      className={inputCls}
                      value={form.whyDifferent.ctaText}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, whyDifferent: { ...f.whyDifferent, ctaText: e.target.value } }))
                      }
                    />
                  </label>
                </>
              )}

              {section.key === 'process' && (
                <>
                  <label className="block">
                    <span className={labelCls}>Eyebrow</span>
                    <input
                      className={inputCls}
                      value={form.process.eyebrow}
                      onChange={(e) => setForm((f) => ({ ...f, process: { ...f.process, eyebrow: e.target.value } }))}
                    />
                  </label>
                  <label className="block">
                    <span className={labelCls}>Heading</span>
                    <input
                      className={inputCls}
                      value={form.process.heading}
                      onChange={(e) => setForm((f) => ({ ...f, process: { ...f.process, heading: e.target.value } }))}
                    />
                  </label>
                  <label className="block">
                    <span className={labelCls}>Subtext</span>
                    <textarea
                      className={inputCls}
                      rows={2}
                      value={form.process.subtext}
                      onChange={(e) => setForm((f) => ({ ...f, process: { ...f.process, subtext: e.target.value } }))}
                    />
                  </label>
                  <label className="block">
                    <span className={labelCls}>Steps — one per line, "Title | Body"</span>
                    <textarea
                      className={inputCls}
                      rows={6}
                      value={entriesToText(form.process.steps)}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, process: { ...f.process, steps: textToEntries(e.target.value) } }))
                      }
                    />
                  </label>
                </>
              )}

              {section.key === 'ctaBanner' && (
                <>
                  <label className="block">
                    <span className={labelCls}>Heading</span>
                    <input
                      className={inputCls}
                      value={form.ctaBanner.heading}
                      onChange={(e) => setForm((f) => ({ ...f, ctaBanner: { ...f.ctaBanner, heading: e.target.value } }))}
                    />
                  </label>
                  <label className="block">
                    <span className={labelCls}>Subtext</span>
                    <textarea
                      className={inputCls}
                      rows={2}
                      value={form.ctaBanner.subtext}
                      onChange={(e) => setForm((f) => ({ ...f, ctaBanner: { ...f.ctaBanner, subtext: e.target.value } }))}
                    />
                  </label>
                  <label className="block">
                    <span className={labelCls}>Button text</span>
                    <input
                      className={inputCls}
                      value={form.ctaBanner.ctaText}
                      onChange={(e) => setForm((f) => ({ ...f, ctaBanner: { ...f.ctaBanner, ctaText: e.target.value } }))}
                    />
                  </label>
                </>
              )}

              {section.key === 'newsletter' && (
                <>
                  <label className="block">
                    <span className={labelCls}>Heading</span>
                    <input
                      className={inputCls}
                      value={form.newsletter.heading}
                      onChange={(e) => setForm((f) => ({ ...f, newsletter: { ...f.newsletter, heading: e.target.value } }))}
                    />
                  </label>
                  <label className="block">
                    <span className={labelCls}>Subtext</span>
                    <textarea
                      className={inputCls}
                      rows={2}
                      value={form.newsletter.subtext}
                      onChange={(e) => setForm((f) => ({ ...f, newsletter: { ...f.newsletter, subtext: e.target.value } }))}
                    />
                  </label>
                </>
              )}

              {section.key === 'ratingBar' && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className={labelCls}>Rating value</span>
                    <input
                      className={inputCls}
                      value={form.ratingBar.ratingValue}
                      onChange={(e) => setForm((f) => ({ ...f, ratingBar: { ...f.ratingBar, ratingValue: e.target.value } }))}
                    />
                  </label>
                  <label className="block">
                    <span className={labelCls}>Review count</span>
                    <input
                      className={inputCls}
                      value={form.ratingBar.reviewCount}
                      onChange={(e) => setForm((f) => ({ ...f, ratingBar: { ...f.ratingBar, reviewCount: e.target.value } }))}
                    />
                  </label>
                </div>
              )}
            </div>
          </details>
        ))}

        <div className="sticky bottom-4 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-lg ring-1 ring-black/5">
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
            Reset all to default
          </button>
        </div>
      </form>
    </div>
  )
}
