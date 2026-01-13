'use client'

import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react'
import Button from '@/components/ui/Button'
import LiquidEther from '@/components/ui/LiquidEther'

// Rainbow colors matching our logo/button gradient
const rainbowColors = ['#a855f7', '#ec4899', '#facc15', '#22d3ee', '#a855f7']

export default function ContactPage() {
  return (
    <div className="bg-[var(--theme-background)]">
      {/* Hero with LiquidEther */}
      <div className="relative isolate overflow-hidden min-h-[50vh] flex items-center">
        <div className="absolute inset-0 -z-10">
          <LiquidEther
            colors={rainbowColors}
            mouseForce={20}
            cursorSize={100}
            resolution={0.5}
            autoDemo={true}
            autoSpeed={0.5}
            autoIntensity={2.2}
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 w-full">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-[var(--theme-text)] sm:text-6xl">
              Kontakt
            </h1>
            <p className="mt-6 text-lg leading-8 text-[var(--theme-textSecondary)]">
              Wir freuen uns von dir zu hören. Egal ob Fragen, Feedback oder
              Partnerschaftsanfragen.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Options */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl bg-[var(--theme-surface)] p-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30">
              <Mail className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="mt-6 text-base font-semibold text-[var(--theme-text)]">Email</h3>
            <p className="mt-2 text-sm text-[var(--theme-textSecondary)]">
              Für allgemeine Anfragen
            </p>
            <a
              href="mailto:hello@bookicorn.com"
              className="mt-4 inline-block text-sm font-semibold text-primary-600 hover:text-primary-700"
            >
              hello@bookicorn.com
            </a>
          </div>

          <div className="rounded-2xl bg-[var(--theme-surface)] p-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30">
              <MessageSquare className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="mt-6 text-base font-semibold text-[var(--theme-text)]">
              Live Chat
            </h3>
            <p className="mt-2 text-sm text-[var(--theme-textSecondary)]">
              Mo-Fr, 9-18 Uhr
            </p>
            <button className="mt-4 inline-block text-sm font-semibold text-primary-600 hover:text-primary-700">
              Chat starten
            </button>
          </div>

          <div className="rounded-2xl bg-[var(--theme-surface)] p-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30">
              <Phone className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="mt-6 text-base font-semibold text-[var(--theme-text)]">
              Telefon
            </h3>
            <p className="mt-2 text-sm text-[var(--theme-textSecondary)]">
              Für Enterprise-Kunden
            </p>
            <a
              href="tel:+4930123456789"
              className="mt-4 inline-block text-sm font-semibold text-primary-600 hover:text-primary-700"
            >
              +49 30 123 456 789
            </a>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--theme-text)] text-center">
            Schreib uns eine Nachricht
          </h2>
          <form className="mt-8 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-[var(--theme-text)]"
                >
                  Vorname
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  className="mt-1 block w-full rounded-lg border border-[var(--theme-border)] bg-[var(--theme-background)] px-4 py-3 text-[var(--theme-text)] shadow-sm placeholder:text-[var(--theme-textTertiary)] focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-[var(--theme-text)]"
                >
                  Nachname
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  className="mt-1 block w-full rounded-lg border border-[var(--theme-border)] bg-[var(--theme-background)] px-4 py-3 text-[var(--theme-text)] shadow-sm placeholder:text-[var(--theme-textTertiary)] focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[var(--theme-text)]"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full rounded-lg border border-[var(--theme-border)] bg-[var(--theme-background)] px-4 py-3 text-[var(--theme-text)] shadow-sm placeholder:text-[var(--theme-textTertiary)] focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label
                htmlFor="studioName"
                className="block text-sm font-medium text-[var(--theme-text)]"
              >
                Studio Name (optional)
              </label>
              <input
                type="text"
                id="studioName"
                name="studioName"
                className="mt-1 block w-full rounded-lg border border-[var(--theme-border)] bg-[var(--theme-background)] px-4 py-3 text-[var(--theme-text)] shadow-sm placeholder:text-[var(--theme-textTertiary)] focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-[var(--theme-text)]"
              >
                Betreff
              </label>
              <select
                id="subject"
                name="subject"
                required
                className="mt-1 block w-full rounded-lg border border-[var(--theme-border)] bg-[var(--theme-background)] px-4 py-3 text-[var(--theme-text)] shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Bitte wählen</option>
                <option value="general">Allgemeine Anfrage</option>
                <option value="demo">Demo anfordern</option>
                <option value="enterprise">Enterprise Anfrage</option>
                <option value="partnership">Partnerschaft</option>
                <option value="support">Technischer Support</option>
                <option value="feedback">Feedback</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-[var(--theme-text)]"
              >
                Nachricht
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="mt-1 block w-full rounded-lg border border-[var(--theme-border)] bg-[var(--theme-background)] px-4 py-3 text-[var(--theme-text)] shadow-sm placeholder:text-[var(--theme-textTertiary)] focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Wie können wir dir helfen?"
              />
            </div>

            <div>
              <Button type="submit" variant="primary" fullWidth>
                Nachricht senden
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Location */}
      <div className="bg-[var(--theme-surface)] py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex items-center justify-center gap-2 text-[var(--theme-textSecondary)]">
              <MapPin className="h-5 w-5" />
              <span>Made with love in Germany</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
