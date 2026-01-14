'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: 'Wie hoch sind eure Gebuhren?',
    answer: 'Wir nehmen 0% Provision auf deine Buchungen im Early Bird Tarif. Es fallen lediglich die Standard-Transaktionsgebuhren des Zahlungsanbieters (z.B. Stripe) an.',
  },
  {
    question: 'Was passiert nach den 10 Early Bird Platzen?',
    answer: 'Nach den ersten 10 Platzen erhoht sich der Preis auf den regularen Tarif von 49 EUR/Monat. Alle Early Bird Kunden behalten ihren Preis dauerhaft, solange sie aktiv bleiben.',
  },
  {
    question: 'Kann ich jederzeit kundigen?',
    answer: 'Ja, Bookicorn ist monatlich kundbar. Keine langen Vertrage, keine Knebelvertrage. Du kannst jederzeit aufhoren.',
  },
  {
    question: 'Hilft ihr beim Umzug der Daten?',
    answer: 'Absolut! Unser Team unterstutzt dich beim Import deiner Kunden- und Kursdaten aus deinem alten System. Die meisten Studios sind innerhalb eines Tages umgezogen.',
  },
  {
    question: 'Ist Bookicorn DSGVO-konform?',
    answer: 'Ja, vollstandig. Alle Daten werden in der EU gespeichert, wir haben einen Auftragsverarbeitungsvertrag (AVV) und erfullen alle DSGVO-Anforderungen.',
  },
  {
    question: 'Wie funktioniert das Credit-System?',
    answer: 'Bookicorn nutzt ein FIFO (First In, First Out) Credit-System. Du erstellst Pakete mit Credits, die deine Kunden kaufen. Credits werden automatisch nach Kaufdatum verbraucht. Es gibt 4 Aktivierungsmodi: Sofort, Bei erster Nutzung, Ab Datum, oder Trainer-gebunden.',
  },
]

function AccordionItem({ item, isOpen, onToggle, darkMode }: { item: FAQItem; isOpen: boolean; onToggle: () => void; darkMode?: boolean }) {
  return (
    <div className={cn("border-b", "border-[var(--theme-border)]")}>
      <button
        onClick={onToggle}
        className="w-full py-6 flex justify-between items-center text-left focus:outline-none"
      >
        <span className={cn(
          "text-lg font-medium text-[var(--theme-text)] pr-4 transition-colors",
          isOpen && "text-primary-500"
        )}>
          {item.question}
        </span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-primary-500 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[var(--theme-textTertiary)] flex-shrink-0" />
        )}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-[var(--theme-textSecondary)] leading-relaxed">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl font-bold text-[var(--theme-text)] text-center mb-12"
      >
        Noch Fragen?
      </motion.h2>

      {/* FAQ Items */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {faqItems.map((item, i) => (
          <AccordionItem
            key={i}
            item={item}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </motion.div>
    </div>
  )
}
