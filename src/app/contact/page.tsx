'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  Phone,
  ArrowLeft,
  Loader2,
  CheckCircle,
  Sparkles,
  MessageSquare,
  Video,
} from 'lucide-react'
import Button from '@/components/ui/Button'
import { LazyLiquidEther } from '@/components/ui/LazyLiquidEther'
import SplitText from '@/components/ui/SplitText'

type ContactType = 'message' | 'callback' | 'meeting' | null

// Bookicorn Logo Farben: #EE4035 (Rot), #2D61F0 (Blau), #A6D30F (Lime)
const contactOptions = [
  {
    id: 'message' as const,
    icon: MessageSquare,
    title: 'Nachricht schreiben',
    description: 'Schreib uns und wir melden uns innerhalb von 24h',
    color: '#2D61F0', // Blau
    buttonText: 'Nachricht verfassen',
  },
  {
    id: 'callback' as const,
    icon: Phone,
    title: 'Rückruf vereinbaren',
    description: 'Wir rufen dich zu deiner Wunschzeit an',
    color: '#EE4035', // Rot
    buttonText: 'Rückruf anfordern',
  },
  {
    id: 'meeting' as const,
    icon: Video,
    title: 'Video-Call buchen',
    description: 'Persönliches Gespräch per Video',
    color: '#A6D30F', // Lime/Grün
    buttonText: 'Termin wählen',
  },
]

export default function ContactPage() {
  const [selectedType, setSelectedType] = useState<ContactType>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  // Message form
  const [messageForm, setMessageForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    studioName: '',
    message: '',
  })

  // Callback form
  const [callbackForm, setCallbackForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    preferredTime: '',
    notes: '',
  })

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...messageForm,
          subject: 'general',
          type: 'message',
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Fehler beim Senden')
      }

      setSuccess(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: callbackForm.firstName,
          lastName: callbackForm.lastName,
          email: callbackForm.email,
          subject: 'callback',
          message: `Rückruf gewünscht!\n\nTelefon: ${callbackForm.phone}\nBevorzugte Zeit: ${callbackForm.preferredTime}\n\nNotizen: ${callbackForm.notes || 'Keine'}`,
          type: 'callback',
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Fehler beim Senden')
      }

      setSuccess(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setSelectedType(null)
    setSuccess(false)
    setError('')
    setMessageForm({ firstName: '', lastName: '', email: '', studioName: '', message: '' })
    setCallbackForm({ firstName: '', lastName: '', email: '', phone: '', preferredTime: '', notes: '' })
  }

  return (
    <div className="bg-[var(--theme-background)] min-h-screen">
      {/* Hero */}
      <div className="relative isolate overflow-hidden min-h-[45vh] flex items-center">
        <LazyLiquidEther />
        <div className="mx-auto max-w-7xl px-6 pt-40 pb-16 sm:pt-48 sm:pb-24 lg:px-8 w-full">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-[#A6D30F]" />
              <span className="text-sm font-medium text-[var(--theme-text)]">
                Wir antworten in unter 24 Stunden
              </span>
            </motion.div>
            <SplitText
              text="Lass uns sprechen"
              tag="h1"
              className="text-4xl font-bold tracking-tight text-[var(--theme-text)] sm:text-6xl"
              delay={30}
              duration={0.6}
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-lg leading-8 text-[var(--theme-textSecondary)]"
            >
              Wähle wie du uns erreichen möchtest
            </motion.p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-5xl px-6 pb-24 lg:px-8 pt-8">
        {!selectedType && !success && (
          <div className="grid gap-6 md:grid-cols-3">
            {contactOptions.map((option, i) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="group relative overflow-hidden rounded-3xl bg-[var(--theme-surface)] border border-[var(--theme-border)] p-8"
                  style={{
                    boxShadow: `0 0 0 0 ${option.color}00`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 25px 50px -12px ${option.color}30`
                    e.currentTarget.style.borderColor = option.color
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 0 0 ${option.color}00`
                    e.currentTarget.style.borderColor = ''
                  }}
                >
                  <div className="flex flex-col h-full">
                    {/* Icon */}
                    <div
                      className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6 transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundColor: option.color }}
                    >
                      <option.icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-[var(--theme-text)] mb-2">
                      {option.title}
                    </h3>
                    <p className="text-[var(--theme-textSecondary)] text-sm leading-relaxed mb-6 flex-grow">
                      {option.description}
                    </p>

                    {/* Button */}
                    <div className="mt-auto">
                      <Button
                        variant="secondary"
                        fullWidth
                        onClick={() => setSelectedType(option.id)}
                      >
                        {option.buttonText}
                      </Button>
                    </div>
                  </div>
              </motion.div>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* Success State */}
          {success && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-lg mx-auto"
            >
              <div className="relative overflow-hidden rounded-3xl bg-[var(--theme-surface)] border border-[var(--theme-border)] p-12 text-center">
                <div className="absolute inset-0 bg-gradient-to-br from-[#A6D30F]/10 to-[#2D61F0]/10" />
                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
                    style={{ backgroundColor: '#A6D30F' }}
                  >
                    <CheckCircle className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-[var(--theme-text)] mb-3">
                    Perfekt!
                  </h3>
                  <p className="text-[var(--theme-textSecondary)] mb-8">
                    {selectedType === 'callback'
                      ? 'Wir rufen dich so schnell wie möglich zurück!'
                      : 'Wir melden uns innerhalb von 24 Stunden bei dir.'}
                  </p>
                  <Button variant="secondary" onClick={resetForm}>
                    Weitere Anfrage stellen
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Message Form */}
          {selectedType === 'message' && !success && (
            <motion.div
              key="message-form"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="max-w-2xl mx-auto"
            >
              <div className="mb-8">
                <Button
                  variant="secondary"
                  size="sm"
                  icon={ArrowLeft}
                  onClick={() => setSelectedType(null)}
                >
                  Zurück zur Auswahl
                </Button>
              </div>

              <div className="rounded-3xl bg-[var(--theme-surface)] border border-[var(--theme-border)] p-8 md:p-10">
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className="inline-flex items-center justify-center w-12 h-12 rounded-xl"
                    style={{ backgroundColor: '#2D61F0' }}
                  >
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[var(--theme-text)]">
                      Nachricht schreiben
                    </h2>
                    <p className="text-sm text-[var(--theme-textSecondary)]">
                      Erzähl uns von deinem Projekt
                    </p>
                  </div>
                </div>

                {error && (
                  <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleMessageSubmit} className="space-y-5">
                  <div className="grid gap-5 md:grid-cols-2">
                    <InputField
                      label="Vorname"
                      value={messageForm.firstName}
                      onChange={(v) => setMessageForm({ ...messageForm, firstName: v })}
                      required
                    />
                    <InputField
                      label="Nachname"
                      value={messageForm.lastName}
                      onChange={(v) => setMessageForm({ ...messageForm, lastName: v })}
                      required
                    />
                  </div>
                  <InputField
                    label="Email"
                    type="email"
                    value={messageForm.email}
                    onChange={(v) => setMessageForm({ ...messageForm, email: v })}
                    required
                  />
                  <InputField
                    label="Studio Name"
                    value={messageForm.studioName}
                    onChange={(v) => setMessageForm({ ...messageForm, studioName: v })}
                    optional
                  />
                  <TextAreaField
                    label="Deine Nachricht"
                    value={messageForm.message}
                    onChange={(v) => setMessageForm({ ...messageForm, message: v })}
                    placeholder="Erzähl uns, wie wir dir helfen können..."
                    required
                  />
                  <Button type="submit" variant="primary" fullWidth disabled={loading}>
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      'Nachricht senden'
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          )}

          {/* Callback Form */}
          {selectedType === 'callback' && !success && (
            <motion.div
              key="callback-form"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="max-w-2xl mx-auto"
            >
              <div className="mb-8">
                <Button
                  variant="secondary"
                  size="sm"
                  icon={ArrowLeft}
                  onClick={() => setSelectedType(null)}
                >
                  Zurück zur Auswahl
                </Button>
              </div>

              <div className="rounded-3xl bg-[var(--theme-surface)] border border-[var(--theme-border)] p-8 md:p-10">
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className="inline-flex items-center justify-center w-12 h-12 rounded-xl"
                    style={{ backgroundColor: '#EE4035' }}
                  >
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[var(--theme-text)]">
                      Rückruf vereinbaren
                    </h2>
                    <p className="text-sm text-[var(--theme-textSecondary)]">
                      Wir rufen dich persönlich an
                    </p>
                  </div>
                </div>

                {error && (
                  <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleCallbackSubmit} className="space-y-5">
                  <div className="grid gap-5 md:grid-cols-2">
                    <InputField
                      label="Vorname"
                      value={callbackForm.firstName}
                      onChange={(v) => setCallbackForm({ ...callbackForm, firstName: v })}
                      required
                    />
                    <InputField
                      label="Nachname"
                      value={callbackForm.lastName}
                      onChange={(v) => setCallbackForm({ ...callbackForm, lastName: v })}
                      required
                    />
                  </div>
                  <InputField
                    label="Email"
                    type="email"
                    value={callbackForm.email}
                    onChange={(v) => setCallbackForm({ ...callbackForm, email: v })}
                    required
                  />
                  <InputField
                    label="Telefonnummer"
                    type="tel"
                    value={callbackForm.phone}
                    onChange={(v) => setCallbackForm({ ...callbackForm, phone: v })}
                    placeholder="+49 123 456789"
                    required
                  />
                  <SelectField
                    label="Bevorzugte Zeit"
                    value={callbackForm.preferredTime}
                    onChange={(v) => setCallbackForm({ ...callbackForm, preferredTime: v })}
                    options={[
                      { value: '', label: 'Bitte wählen' },
                      { value: 'morning', label: 'Vormittags (9-12 Uhr)' },
                      { value: 'afternoon', label: 'Nachmittags (12-17 Uhr)' },
                      { value: 'evening', label: 'Abends (17-19 Uhr)' },
                      { value: 'anytime', label: 'Jederzeit' },
                    ]}
                    required
                  />
                  <TextAreaField
                    label="Worum geht es?"
                    value={callbackForm.notes}
                    onChange={(v) => setCallbackForm({ ...callbackForm, notes: v })}
                    placeholder="Optional: Kurze Info zum Thema des Gesprächs..."
                    rows={3}
                  />
                  <Button type="submit" variant="primary" fullWidth disabled={loading}>
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      'Rückruf anfordern'
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          )}

          {/* Calendly */}
          {selectedType === 'meeting' && !success && (
            <motion.div
              key="meeting"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="max-w-2xl mx-auto"
            >
              <div className="mb-8">
                <Button
                  variant="secondary"
                  size="sm"
                  icon={ArrowLeft}
                  onClick={() => setSelectedType(null)}
                >
                  Zurück zur Auswahl
                </Button>
              </div>

              <div className="rounded-3xl bg-[var(--theme-surface)] border border-[var(--theme-border)] p-8 md:p-10 text-center">
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
                  style={{ backgroundColor: '#A6D30F' }}
                >
                  <Video className="w-8 h-8 text-white" />
                </div>

                <h2 className="text-2xl font-bold text-[var(--theme-text)] mb-3">
                  Video-Call buchen
                </h2>
                <p className="text-[var(--theme-textSecondary)] mb-8 max-w-md mx-auto">
                  Buche einen kostenlosen 15-minütigen Video-Call und wir zeigen dir, wie Bookicorn dein Studio auf das nächste Level bringt.
                </p>

                <div className="flex flex-col gap-4 items-center">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => {
                      // @ts-ignore
                      if (window.Calendly) {
                        // @ts-ignore
                        window.Calendly.initPopupWidget({
                          url: 'https://calendly.com/unicorn-factory-daniel/meetup?hide_event_type_details=1&hide_gdpr_banner=1'
                        })
                      }
                    }}
                  >
                    Termin auswählen
                  </Button>
                  <p className="text-sm text-[var(--theme-textTertiary)]">
                    Kostenlos & unverbindlich
                  </p>
                </div>

                <div className="mt-10 pt-8 border-t border-[var(--theme-border)] grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-[var(--theme-text)]">15</p>
                    <p className="text-sm text-[var(--theme-textSecondary)]">Minuten</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[var(--theme-text)]">1:1</p>
                    <p className="text-sm text-[var(--theme-textSecondary)]">Gespräch</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold" style={{ color: '#A6D30F' }}>Free</p>
                    <p className="text-sm text-[var(--theme-textSecondary)]">Kostenlos</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Contact Info */}
        {!selectedType && !success && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16 text-center"
          >
            <p className="text-[var(--theme-textSecondary)] mb-4">
              Oder schreib uns direkt an
            </p>
            <a
              href="mailto:kontakt@bookicorn.net"
              className="inline-flex items-center gap-2 font-medium transition-colors"
              style={{ color: '#2D61F0' }}
            >
              <Mail className="w-5 h-5" />
              kontakt@bookicorn.net
            </a>
          </motion.div>
        )}
      </div>
    </div>
  )
}

// Reusable Input Field Component
function InputField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required,
  optional,
}: {
  label: string
  type?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
  optional?: boolean
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[var(--theme-text)] mb-2">
        {label}
        {optional && (
          <span className="text-[var(--theme-textTertiary)] font-normal ml-1">(optional)</span>
        )}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background)] text-[var(--theme-text)] placeholder:text-[var(--theme-textTertiary)] focus:outline-none focus:ring-2 focus:ring-[#2D61F0]/50 focus:border-[#2D61F0] transition-all"
      />
    </div>
  )
}

// Reusable TextArea Field Component
function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  required,
  rows = 5,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
  rows?: number
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[var(--theme-text)] mb-2">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className="w-full px-4 py-3 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background)] text-[var(--theme-text)] placeholder:text-[var(--theme-textTertiary)] focus:outline-none focus:ring-2 focus:ring-[#2D61F0]/50 focus:border-[#2D61F0] transition-all resize-none"
      />
    </div>
  )
}

// Reusable Select Field Component
function SelectField({
  label,
  value,
  onChange,
  options,
  required,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  required?: boolean
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[var(--theme-text)] mb-2">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full px-4 py-3 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-background)] text-[var(--theme-text)] focus:outline-none focus:ring-2 focus:ring-[#2D61F0]/50 focus:border-[#2D61F0] transition-all"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
