import Reveal from '@/components/Reveal'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { faqsStore } from '@/lib/faqsStore'
import { useLocalStore } from '@/lib/dataStore'

export default function Faqs() {
  const { items: FAQS } = useLocalStore(faqsStore)

  return (
    <section id="faqs" className="scroll-mt-24 bg-[#faf9f6] pb-24 md:pb-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[12px] font-medium uppercase tracking-[0.3em] text-neutral-500">Good to know</p>
          <h2 className="mt-4 font-display text-[2.4rem] font-medium leading-tight text-neutral-900 md:text-[3rem]">
            Frequently asked questions
          </h2>
          <p className="mt-5 text-[15.5px] leading-relaxed text-neutral-600">
            Everything about cancellations, payments and how a ride with AXLE works. Can't find your answer?{' '}
            <a href="#footer" className="font-semibold text-[#2323d6] hover:text-[#1a1ab8]">
              Get in touch
            </a>
            .
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-12 max-w-3xl rounded-2xl bg-white px-6 shadow-sm ring-1 ring-black/5 md:px-10">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((item) => (
              <AccordionItem key={item.slug} value={item.slug} className="border-neutral-100">
                <AccordionTrigger className="py-6 font-display text-[1.1rem] font-medium text-neutral-900 hover:no-underline md:text-[1.2rem]">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-[14.5px] leading-relaxed text-neutral-600">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}
